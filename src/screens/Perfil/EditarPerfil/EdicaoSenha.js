import React, { useState, useContext, useRef } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Alert, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from '../../../../firebaseConfig';

export const EditarSenha = ({senha}) =>{    
    const {dispatch: userDispatch} = useContext(UserContext);
    const { state:user } = useContext(UserContext);

    const inputSenha = useRef(null);

    const [novaSenha, setNovaSenha] = useState("");    
    const [senhaEditavel, setSenhaEditavel] = useState(false);

    const[isVisible, SetVisibility] = useState(false);
    const[icon, SetIcon] = useState(isVisible ? 'visibility-off': 'visibility');

     
    const SalvarSenha = async() => {  
        if (novaSenha!=="") {
            Alert.alert(
                'Confirmar Nova Senha!', 
                'Suas senha será salva.', 
                [
                   
                    {
                        text: 'Cancelar', 
                        onPress:()=>{
                            inputSenha.current.blur();
                            setNovaSenha("");
                            Alert.alert('Cancelado!', 'Sua nova senha não foi salva.');
                            return;
                        }
                    },
                    {
                        text: 'OK',
                        onPress: ()=>{
                            var usuario = firebase.auth().currentUser;
                            const credential = firebase.auth.EmailAuthProvider.credential(
                                usuario.email, 
                                user.senha
                            );
                            usuario.reauthenticateWithCredential(credential);
                            usuario.updatePassword(novaSenha)
                            .then(function() {
                                userDispatch({
                                    type: 'setSenha',
                                    payload: {
                                        senha: novaSenha
                                    } 
                                });
                                inputSenha.current.blur();
                                setNovaSenha("");
                                Alert.alert('Concluído!', 'Sua nova senha foi salva.');
                                return;
                            })
                            .catch(function(error) {
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
            Alert.alert('Sem Alterações!', 'Você não alterou sua senha.');
        }

    }    
    return (
        <View
            style = {{alignSelf: 'stretch', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: senhaEditavel === true? 'white' : 'transparent'}}
        >
            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                {"Senha: "}
            </Text>
            <TextInput
                style = {{flex: 1}}
                ref = {inputSenha}
                textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                placeholder = {senhaEditavel? "": (isVisible? `${senha}`: "*Senha Protegida!*")}
                placeholderTextColor = {senhaEditavel? '#000000' : "grey"}
                value = {novaSenha}
                autoCapitalize = 'none'
                maxLength = {60}
                selectTextOnFocus = {true}
                onChangeText = {senha => setNovaSenha(senha)}
                autoFocus = {senhaEditavel? true : false}
                onFocus = {()=> setSenhaEditavel(true)}
                onBlur = {()=> setSenhaEditavel(false)}
                secureTextEntry={!isVisible}
            />
            <TouchableOpacity style={{paddingRight:5}} onPress={()=> {
                SetVisibility(!isVisible);
                SetIcon(!isVisible ? 'visibility-off': 'visibility')
                } 
            }
            >
                <Icon name={icon} size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={
                senhaEditavel? () => SalvarSenha()
                : () => inputSenha.current.focus()
                }
            >
                <Icon name={senhaEditavel? 'done' : 'edit'} size={24} />
            </TouchableOpacity>
        </View>
    );
}