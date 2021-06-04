import firebase from '../../../firebaseConfig';

export default {
    carregarFarmacias: async () =>{
        var farmaciasDisponiveis = await firebase.firestore().collection("farmacias").get();
        var retorno  = farmaciasDisponiveis.docs.map((doc) => {return {id: doc.id, info: doc.data()}});
        return retorno;
    },

    carregarServicos: async (servicos) => {
        var servicosCadastrados = await firebase.firestore().collection("servicos").get();
        const servicosDaFarmacia = servicos.map(
            (id) => {
                var arrayServicos = servicosCadastrados.docs.map(
                    (doc) => {
                        if (doc.id === id) {
                            return {id: doc.id, info: doc.data()}
                        }
                        else {
                            return null
                        }
                    }
                )
                var objServico = arrayServicos.find(servico => servico !== null)
                return objServico;
            }
        );
        return servicosDaFarmacia;
    },

    salvarConsulta: (consulta, usuario, userDispatch) => {
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
                            registrosConsulta: [...usuario.registrosConsulta, consulta]
                        });
                        userDispatch({
                            type: 'setConsulta',
                            payload: {
                                registrosConsulta: [...usuario.registrosConsulta, consulta]
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