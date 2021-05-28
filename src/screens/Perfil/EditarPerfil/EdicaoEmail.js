import React, { useState, useRef } from 'react';
import { Alert, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../../../../firebaseConfig';

export const EditarEmail = ({email, senha, userDispatch}) =>{

    const inputEmail = useRef(null);

    const [novoEmail, setNovoEmail] = useState("");
    const [emailEditavel, setEmailEditavel] = useState(false);
    
    const SalvarEmail = async() => {  
        if (novoEmail!=="") {
            Alert.alert(
                'Confirmar Novo Email!', 
                'Sua alteração será salva.', 
                [
                   
                    {
                        text: 'Cancelar', 
                        onPress:()=>{
                            inputEmail.current.blur();
                            setNovoEmail("");
                            Alert.alert('Cancelado!', 'Seu novo email não foi salvo.');
                            return;
                        }
                    },
                    {
                        text: 'OK',
                        onPress: ()=>{
                            var usuario = firebase.auth().currentUser;
                            const credential = firebase.auth.EmailAuthProvider.credential(
                                email, 
                                senha
                            );
                            usuario.reauthenticateWithCredential(credential);
                            usuario.updateEmail(novoEmail)
                            .then(() => {
                                userDispatch({
                                    type: 'setEmail',
                                    payload: {
                                        email: novoEmail
                                    } 
                                });
                                inputEmail.current.blur();
                                setNovoEmail("");
                                Alert.alert('Concluído!', 'Seu novo email foi salvo.');
                                return; 
                            })
                            .catch((error) => {
                                console.log(error.message);
                                Alert.alert('ERRO!', 'Algo deu errado.');
                                return;
                            });
                            
                        }
                    },
                ],
                {cancelable: false}
            );
        } else {            
            Alert.alert('Sem Alterações!', 'Você não alterou seu email.');
        }

    }    
    return (
        <View
            style = {{alignSelf: 'stretch', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: emailEditavel === true? 'white' : 'transparent'}}
        >
            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                {"Email: "}
            </Text>
            <TextInput
                style = {{flex: 1}}
                ref = {inputEmail}
                textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                placeholder = {emailEditavel? "": `${email}`}
                placeholderTextColor = {emailEditavel? '#000000' : "grey"}
                value = {novoEmail}
                autoCapitalize = 'none'
                maxLength = {60}
                selectTextOnFocus = {true}
                autoFocus = {emailEditavel? true : false}
                onChangeText = {email => setNovoEmail(email)}
                onFocus = {()=> setEmailEditavel(true)}
                onBlur = {()=> setEmailEditavel(false)}
                keyboardType = "email-address"
            />
            <TouchableOpacity onPress={
                    emailEditavel? () => SalvarEmail()
                    : () => inputEmail.current.focus()}
            >
                <Icon name={emailEditavel? 'done': 'edit'} size={24} />
            </TouchableOpacity>
        </View>
    );
}