import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../firebaseConfig';
/*
    sempre que for importar de algum arquivo do projeto verifique o caminho dentro das ''
        exemplo: '../firebaseConfig' é diferente de '../../firebaseConfig'
    ./ acessa a mesma pasta, ../ volta uma pasta, e / entra em uma pasta ou arquivo
        exemplo './assets/fonts/centuryGothic.ttf'
    digite ./ ou ../ e aguarde o visual code exibir as opções. use as setas do teclado para escolher
*/

//const admin = {nome: 'ADMIN', email: 'admin@admin.com', senha: '123456'};
const firebaseErrors = {//"traduzindo" possíveis erros de autenticação
    'auth/user-not-found': 'Este email não está cadastrado',
    'auth/invalid-email': 'Insira um email válido (exemplo@exemplo.com)',
    'auth/wrong-password': 'Senha incorreta',
    'auth/email-already-in-use': 'Este email já está cadastrado',
    'auth/weak-password': 'Sua senha deve ter no mínimo 6 caracteres'
};
/*Explicando o dispatch: dispatch significa despachar/enviar algo para algum lugar. Nos casos abaixo a ação dispatch() envia um objeto {} para o reducer. Esse objeto tem um type e um payload. O type vai definir qual ação o Reducer vai fazer, e o payload é o conteúdo que será introduzido. O payload também pode ter um objeto {}, e dentro desse objeto tem o(s) conteudo(s), que seram lidos no reducer.

Ou seja, por exemplo, em    payload: {nome: 1nome, senha: 1senha}    
    payload é uma propriedade que será despachada,
    {nome: 1nome, senha: 1senha} (ou qualquer coisa que vier depois dos : ) é o conteúdo de payload,
    nome e senha são propriedades do conteúdo de payload,
    1nome e 1senha são os conteúdos dessas propriedades.
Propriedade é diferente de conteúdo. propriedade é o "titulo" e conteúdo/valor é o que vem depois do :
a regra dos : é uma regra geral do react. todo objeto que tenha um par propriedade:valor deve ser escrito assim, e a vírgula separa os pares (o ultimo par não tem virgula no final, ou seja, se só tiver um par, não precisa de vírgula).
Dica: para saber os nomes das propriedades de um objeto, passe o mouse em cima dele e veja o par  nome:tipo, sendo tipo o tipo aceitavel (string, numero, booleano). Teste, passando o mouse em cima de firebaseErrors.   

O reducer pega o objeto, e repassa as propriedades na leitura   propriedade.valor   . A propriedade sempre vem primeiro, então se um objeto tiver muitas propriedades é comum ler propriedade.propriedade.propriedade.valor
    se a propriedade tem um objeto com dois valores por exemplo, despache os dois separados:
        dispatch({valor1: propriedade.valor1, valor2: propriedade.valor2})
Fazer propriedade.valor1.valor2 é completamente errado (a menos que dentro de valor1 tenha um valor2, exemplo {valor1:{valor2}, valor2}). Então despache com atenção.

Nos casos abaixo o Reducer vai considerar o objeto {type, payload} como uma action, e considerar suas propriedades também, na leitura  action.type ou action.payload.valor  lê suas propriedades/conteúdos nome e senha.

Sempre considere que conteúdo pode ser qualquer coisa. Então muitas vezes é comum ver:
objeto: {algo: { algo: {algo: valor} }, algo2: valor }*/

export default {
    autenticar: async (navigation, userDispatch) => {//lógica para o Preload
        firebase.auth().onAuthStateChanged(//entenda vendo a documentação do firebase
            function(user) {//verifique se algum usuario solicitou autenticação
                if (user) {//se sim, pegue as informações dele do banco de dados
                    firebase.firestore().collection("users")
                    .get() //esse user é um registro de autenticação login/senha do firebase, não um user padrão do banco de dados. É melhor pegar o user do banco ao invés do user da autenticação. Por isso, pegue todos os users com o get, e encontre o user do banco que tem o mesmo id do user da autenticação 
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {//cada doc é um documento/usuario de users. cada documento tem um id, nome, etc. Então verifique se o id do documento/usuario é igual ao id do usuario que solocitou a autenticação. leitura: para cada doc, pegue doc e faça alguma coisa (nesse caso, pegue doc e faça uma verificação if).
                            if(doc.data().id === user.uid){//doc.data() pega todos os dados de um único documento. no caso todos os dados de um usuario. user é uma propriedade firebase, e tem suas propriedades prédefinidas. Teste abaixo, digitando user. e espere carregar a lista de propriedades (em azul. roxo são funções) disponíveis
                                userDispatch({
                                    type: 'setAll',
                                    payload: doc.data() 
                                });
                                let chaves = [
                                    ["avatar", doc.data().avatar],
                                    ["buscasRecentes", JSON.stringify(doc.data().buscasRecentes)],
                                    ["cartaoFidelidade", JSON.stringify(doc.data().cartaoFidelidade)],
                                    ["email", doc.data().email],
                                    ["farmaciasSalvas", JSON.stringify(doc.data().farmaciasSalvas)],
                                    ["id", doc.data().id],
                                    ["informacoesAdicionais",JSON.stringify(doc.data().informacoesAdicionais)],
                                    ["latitude", doc.data().latitude],
                                    ["locaisSalvos", JSON.stringify(doc.data().locaisSalvos)],
                                    ["longitude", doc.data().longitude],
                                    ["nome", doc.data().nome],
                                    ["registrosCompra", JSON.stringify(doc.data().registrosCompra)],
                                    ["registrosConsulta", JSON.stringify(doc.data().registrosConsulta)],
                                    ["registrosPessoais", JSON.stringify(doc.data().registrosPessoais)],
                                    ["senha", doc.data().senha],
                                    ["telefone", doc.data().telefone]
                                ];
                                AsyncStorage.multiSet(chaves);
                                navigation.reset({ routes: [{name: 'MainTab'}] });
                                alert(`Bem vindo ${doc.data().nome}!`);
                                console.log(doc.data());
                            }
                        });
                    });                    
                }
                else { //se não, apresente a(s) tela(s) reponsável por solicitar a autenticação
                    navigation.reset({ routes: [{name: 'Login'}] });//nesse caso, login é a principal
                }
            }
        );
    },

    login: async (email, senha) => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .catch((error) => {//caso dê erro, pegue esse erro e faça algo
            try {
                throw firebaseErrors[error.code] || error.message;//compare o código do erro com algum erro da lista do inicio. se for igual a algum da lista traduza a mensagem, se não for, apenas exiba
            } catch (e) {                        
                alert(e);
            }
        });
    },

    cadastro: async (nome, email, senha) => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then((userCredential) => {
            var user = userCredential.user;
            firebase.firestore().collection("users")
            .add({
                avatar: '',
                buscasRecentes: [],
                cartaoFidelidade: [],
                email: email,
                farmaciasSalvas: [],
                id: user.uid ,
                informacoesAdicionais: [],
                latitude: '',
                locaisSalvos: [],
                longitude: '',
                nome: nome.toUpperCase(),
                registrosCompra: [],
                registrosConsulta: [],
                registrosPessoais: [],
                senha: senha,
                telefone:''
            })
            .catch((error) => {
                console.error("Error adding document: ", error.code);
            });
        })
        .catch((error) => {
            try {
                throw firebaseErrors[error.code] || error.message;
            } catch (e) {
                alert(e);
            }
            
        });  
    },

    sair: async(userDispatch) => {
        firebase.auth().signOut()
        .then(async () => {
            userDispatch({
                type: 'clearState'
            });
            await AsyncStorage.getAllKeys((error,keys)=>AsyncStorage.multiRemove(keys));
            alert("Desconectado!");
        })
        .catch((error) => {
            console.log(error.message);
            alert("Ocorreu algum erro! Por favor tente novamente.");
        });
    },

    excluirConta: async(senha, userDispatch) => {
        var usuario = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            usuario.email, 
            senha
        );
        usuario.reauthenticateWithCredential(credential);
        firebase.firestore().collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().id === usuario.uid){
                    firebase.firestore().collection("users")
                    .doc(doc.id)
                    .delete()
                    .then(() =>{
                        usuario.delete()
                        .then(async function() {
                            userDispatch({
                                type: 'clearState'
                            });
                            await AsyncStorage.getAllKeys((error,keys)=>AsyncStorage.multiRemove(keys));
                            alert("Conta Excluída!");
                        })
                        .catch(function(error) {
                            console.log(error.message);
                            alert("Ocorreu algum erro! Por favor tente novamente.");
                        });
                    })
                    .catch(function(error) {
                        console.log(error.message);
                        alert("Ocorreu algum erro! Por favor tente novamente.");
                    });
                }
            });
        });
    },

    carregarAvatar: async(userDispatch) => {
        const avatar = await AsyncStorage.getItem("avatar");
        if (avatar) {
            userDispatch({
                type: 'setAvatar',
                payload: {
                    avatar: avatar
                } 
            });
        }
    },

    carregarNome: async(userDispatch) => {
        const nome = await AsyncStorage.getItem("nome");
        if (nome) {
            userDispatch({
                type: 'setNome',
                payload: {
                    nome: nome
                } 
            });
        }
    },

    carregarEmail: async(userDispatch) => {
        const email = await AsyncStorage.getItem("email");
        if (email) {
            userDispatch({
                type: 'setEmail',
                payload: {
                    email: email
                } 
            });
        }
    },

    carregarSenha: async(userDispatch) => {
        const senha = await AsyncStorage.getItem("senha");
        if (senha) {
            userDispatch({
                type: 'setSenha',
                payload: {
                    senha: senha
                } 
            });
        }
    },

    atualizarAvatar: async (avatar) => {
        var user = firebase.auth().currentUser;
        if (user) {
            firebase.firestore().collection("users")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc.data().id === user.uid){
                        firebase.firestore().collection("users")
                        .doc(doc.id) // doc.data().id é diferente de doc.id   o primeiro é o id do usuario e o segundo é o id do documento em si. Não que o data() sempre vá ter id, mas vai ter alguma coisa. No nosso caso, como SABEMOS que tem um id, um avatar, uma latitude, etc., podemos requistar diretamente.
                        .update({//perceba que a função update do firestore é idêntica ao dispatch
                            avatar: avatar
                        });
                        AsyncStorage.setItem("avatar", avatar);
                    }
                });
            });                    
        }
        else {
            alert("Ocorreu algum erro! Por favor tente novamente.");
        }
    },
    
    atualizarNome: async (nome) => {
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
                            nome: nome
                        });
                        AsyncStorage.setItem("nome", nome);
                    }
                });
            });                    
        }
        else {
            alert("Ocorreu algum erro! Por favor tente novamente.");
        }        
    },

    atualizarEmail: async (email) => {
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
                            email: email
                        });
                        AsyncStorage.setItem("email", email);
                    }
                });
            });                    
        }
        else {
            alert("Ocorreu algum erro! Por favor tente novamente.");
        }        
    },

    atualizarSenha: async (senha) => {
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
                            senha: senha
                        });
                        AsyncStorage.setItem("senha", senha);
                    }
                });
            });                    
        }
        else {
            alert("Ocorreu algum erro! Por favor tente novamente.");
        }        
    },

    carregarInformacoesAdicionais: async(userDispatch) => {
        const informacoesAdicionais = await AsyncStorage.getItem("informacoesAdicionais");
        if (informacoesAdicionais) {
            userDispatch({
                type: 'setInformacoesAdicionais',
                payload: {
                    informacoesAdicionais: JSON.parse(informacoesAdicionais)
                } 
            });
        }
    },
    
    salvarInformacoesAdicionais: async(informacoesAdicionais) => {
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
                            informacoesAdicionais: informacoesAdicionais
                        });
                        AsyncStorage.setItem("informacoesAdicionais", JSON.stringify(informacoesAdicionais));
                    }
                });
            });                    
        }
        else {
            alert("Ocorreu algum erro! Por favor tente novamente.");
        }
    }
};