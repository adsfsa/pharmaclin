import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../firebaseConfig';
import { Alert } from 'react-native';

//const admin = {nome: 'ADMIN', email: 'admin@admin.com', senha: '123456'};
const firebaseErrors = {
    'auth/user-not-found': 'Este email não está cadastrado',
    'auth/invalid-email': 'Insira um email válido (exemplo@exemplo.com)',
    'auth/wrong-password': 'Senha incorreta',
    'auth/email-already-in-use': 'Este email já está cadastrado',
    'auth/weak-password': 'Sua senha deve ter no mínimo 6 caracteres'
};
export default {
    autenticar: async (navigation, userDispatch) => {//lógica para o Preload
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    firebase.firestore().collection("users")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            if(doc.data().id === user.uid){
                                userDispatch({
                                    type: 'setAll',
                                    payload: doc.data() 
                                });
                                //caso tenha rodado o app antes do dia 28 de maio, descomente a linha a seguir 
                                //AsyncStorage.getAllKeys((error,keys)=>AsyncStorage.multiRemove(keys));
                                navigation.reset({ routes: [{name: 'MainTab'}] });
                                Alert.alert("Olá!", `Bem vindo, ${doc.data().nome}!`);
                            }
                        });
                    });
                }
                else {
                    navigation.reset({ routes: [{name: 'Login'}] });
                }
            }
        );
    },

    login: async (email, senha, verLoading) => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(()=>{
            verLoading(false);
        })
        .catch((error) => {
            try {
                throw firebaseErrors[error.code] || error.message;
            } catch (e) {                        
                Alert.alert("ERRO", e);
                verLoading(false);
            }
        });
    },

    cadastro: async (nome, email, senha, verLoading) => {
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
            .then(()=>{
                verLoading(false);
            })
            .catch((error) => {
                //console.error("Erro ao adicionar: ", error.code);
                Alert.alert("Erro ao adicionar: ", error.code)
                verLoading(false);
            });
        })
        .catch((error) => {
            try {
                throw firebaseErrors[error.code] || error.message;
            } catch (e) {
                Alert.alert("ERRO", e);
                verLoading(false);
            }
        });
    },

    sair: async (userDispatch, verLoading) => {
        firebase.auth().signOut()
        .then(() => {
            userDispatch({
                type: 'clearState'
            });
            Alert.alert("Desconectado!");
            verLoading(false);
        })
        .catch((error) => {
            console.log(error.message);
            Alert.alert("ERRO", "Ocorreu algum erro! Por favor tente novamente.");
            verLoading(false);
        });
    },

    excluirConta: async (senha, userDispatch, verLoading) => {
        var usuario = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            usuario.email,
            senha
        );
        usuario.reauthenticateWithCredential(credential);
        firebase.firestore().collection("users").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().id === usuario.uid){
                    firebase.firestore().collection("users")
                    .doc(doc.id)
                    .delete()
                    .then(() =>{
                        usuario.delete()
                        .then(async () => {
                            userDispatch({
                                type: 'clearState'
                            });
                            Alert.alert("Conta Excluída!");
                            verLoading(false);
                        })
                        .catch((error) => {
                            console.log(error.message);
                            Alert.alert("ERRO", "Ocorreu algum erro! Por favor tente novamente.");
                            verLoading(false);
                        });
                    })
                    .catch((error) => {
                        console.log(error.message);
                        Alert.alert("ERRO", "Ocorreu algum erro! Por favor tente novamente.");
                        verLoading(false);
                    });
                }
            });
        })
        .catch((error) => {
            console.log(error.message);
            Alert.alert("ERRO", "Ocorreu algum erro! Por favor tente novamente.");
            verLoading(false);
        });
    },

    atualizarAvatar: (avatar, id) => {
        firebase.auth().currentUser.updateProfile({
            photoURL: avatar
        })
        .catch((error) => {
            console.log(error.message);
            Alert.alert('ERRO!', 'Algo deu errado.');
        });

        firebase.firestore().collection("users")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().id === id){
                    firebase.firestore().collection("users")
                    .doc(doc.id) 
                    .update({
                        avatar: avatar
                    });
                }
            });
        })
        .catch((error) => {
            console.log(error.message);
            Alert.alert('ERRO!', 'Algo deu errado.');
        });
    },
    
    atualizarNome: (nome, id) => {
        firebase.auth().currentUser.updateProfile({
            displayName: nome
        })
        .catch((error) => {
            console.log(error.message);
            Alert.alert('ERRO!', 'Algo deu errado.');
        });

        firebase.firestore().collection("users")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().id === id){
                    firebase.firestore().collection("users")
                    .doc(doc.id)
                    .update({
                        nome: nome
                    });
                }
            });
        })
        .catch((error) => {
            console.log(error.message);
            Alert.alert('ERRO!', 'Algo deu errado.');
        });
    },

    atualizarEmail: (email, id) => {
        firebase.firestore().collection("users")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().id === id){
                    firebase.firestore().collection("users")
                    .doc(doc.id)
                    .update({
                        email: email
                    });
                }
            });
        })
        .catch((error) => {
            console.log(error.message);
            Alert.alert('ERRO!', 'Algo deu errado.');
        });
    },

    atualizarSenha: (senha, id) => {
        firebase.firestore().collection("users")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().id === id){
                    firebase.firestore().collection("users")
                    .doc(doc.id)
                    .update({
                        senha: senha
                    });
                }
            });
        })
        .catch((error) => {
            console.log(error.message);
            Alert.alert('ERRO!', 'Algo deu errado.');
        });
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
                    }
                });
            })
            .catch((error) => {
                console.log(error.message);
                Alert.alert('ERRO!', 'Algo deu errado.');
            });
        }
        else {
            Alert.alert("ERRO", "Ocorreu algum erro! Por favor tente novamente.");
        }
    }
};