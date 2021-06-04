import firebase from '../../../firebaseConfig';
import { Alert } from 'react-native';

export default {    
    salvarLembretes: async(registrosPessoais) => {
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
                            registrosPessoais: registrosPessoais
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
            alert("Ocorreu algum erro! Por favor tente novamente.");
        }
    }
};