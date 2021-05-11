import React, {useContext} from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Alert, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import firebase from '../../../../firebaseConfig';


export const RemoverAvatar = () =>{
    const {dispatch: userDispatch} = useContext(UserContext);
    const RemoverFoto = ()=> {
        Alert.alert(
            'Confirmar!',
            'Deseja remover sua foto?',
            [
                {
                    text: 'Sim', 
                    onPress: ()=>{
                        firebase.auth().currentUser.updateProfile({
                            photoURL: ""
                        })
                        .then(function() {
                            userDispatch({
                                type: 'setAvatar',
                                payload: {
                                    avatar: ''
                                } 
                            });
                            Alert.alert('Concluído!', 'Sua foto foi removida.');
                            return;
                        })
                        .catch(function(error) {
                            console.log(error.message);
                            Alert.alert('ERRO!', 'Algo deu errado.');
                            return;
                        });
                        
                    }
                },
                {
                    text: 'Não', 
                    onPress:()=>{
                        Alert.alert('Cancelado!', 'Sua foto não foi removida.');
                        return;
                    }
                }
                
            ],
            {cancelable: false}
        )
    }
    
    return (        
        <TouchableOpacity onPress={()=>RemoverFoto()}>
            <Text style={{fontFamily: 'Century-Gothic', color: '#000000', fontSize: 12}}>
                Remover foto
            </Text>
        </TouchableOpacity>        
    );
};

export const EditarAvatar = () => {
    const {dispatch: userDispatch} = useContext(UserContext);
    const EscolherAvatar = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,4],
            quality: 1
        })
        if (!result.cancelled) {
            Alert.alert(
                'Adicionar Nova Foto!',
                'Sua foto será salva.',
                [
                    {
                        text: 'Cancelar', 
                        onPress:()=>{
                            Alert.alert('Cancelado!', 'Sua foto não foi salva.');
                            return;
                        }
                    },
                    {
                        text: 'Ok', 
                        onPress: ()=>{                            
                            var user = firebase.auth().currentUser;
                            user.updateProfile({
                                photoURL: result.uri
                            })
                            .then(function() {
                                userDispatch({
                                    type: 'setAvatar',
                                    payload: {
                                        avatar: result.uri
                                    } 
                                });
                                Alert.alert('Concluído!', 'Sua foto foi salva!');
                                return;
                            })
                            .catch(function(error) {
                                console.log(error.message);
                                Alert.alert('ERRO!', 'Algo deu errado.');
                                return;
                            });                            
                        }
                    }
                ],
                {cancelable: false}
            )
        }
    }     
    return (
        <AdicionarFoto onPress = {()=>EscolherAvatar()} >
            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                {"Adicionar foto"}
            </Text>
            <Icon name ="image-search" size={24} />
        </AdicionarFoto>  
    );
}
export const AdicionarFoto = styled.TouchableOpacity`
    height: 30px;
    border: #000000;
    border-radius: 15px;
    justify-content: space-between;
    align-self: stretch
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;    
`;