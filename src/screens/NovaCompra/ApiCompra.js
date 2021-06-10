import firebase from '../../../firebaseConfig';

export default {
    carregarFarmacias: async () =>{
        var farmaciasDisponiveis = await firebase.firestore().collection("farmacias").get();
        var retorno  = farmaciasDisponiveis.docs.map((doc) => {return {id: doc.id, info: doc.data()}});
        return retorno;
    },

    carregarProdutos: async (produtos) => {
        var produtosCadastrados = await firebase.firestore().collection("produtos").get();
        const produtosDaFarmacia = produtos.map(
            (id) => {
                var arrayProdutos = produtosCadastrados.docs.map(
                    (doc) => {
                        if (doc.id === id) {
                            return {id: doc.id, info: doc.data()}
                        }
                        else {
                            return null
                        }
                    }
                )
                var objProduto = arrayProdutos.find(produto => produto !== null)
                return objProduto;
            }
        );
        return produtosDaFarmacia;
    },

    salvarCompra: async (compra, usuario, userDispatch) => {
        compra.carrinho.map((item)=>{
            firebase.firestore().collection("produtos").doc(item.item.id)
            .get()
            .then((documentSnapshot) => {
                var unidadesDisponiveis = documentSnapshot.data().unidades - item.comprados;
                unidadesDisponiveis === 0
                    ?   firebase.firestore().collection("produtos").doc(item.item.id)
                        .update({
                            disponivel: false,
                            unidades: unidadesDisponiveis
                        })
                    :   firebase.firestore().collection("produtos").doc(item.item.id)
                        .update({
                            unidades: unidadesDisponiveis
                        })
                
            })
            .catch((error) => {
                console.log(error.message);
                alert("Ocorreu algum erro! Por favor tente novamente.");
                verLoading(false);
            });
            
        });

        var user = firebase.auth().currentUser;
        if (user) {
            firebase.firestore().collection("users")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc.data().id === user.uid){
                        firebase.firestore().collection("users")
                        .doc(doc.id)
                        .update({
                            registrosCompra: [...usuario.registrosCompra, compra]
                        });
                        userDispatch({
                            type: 'setCompra',
                            payload: {
                                registrosCompra: [...usuario.registrosCompra, compra]
                            } 
                        });
                    }
                });
            })
            .catch((error) => {
                console.log(error.message);
                alert("Ocorreu algum erro! Por favor tente novamente.");
                verLoading(false);
            });                    
        }
        else {
            alert("Ocorreu algum erro! Por favor tente novamente.");
        }
    }
}