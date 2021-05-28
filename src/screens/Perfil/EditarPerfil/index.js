import React, {useContext, useEffect} from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { View, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, TopoInterno } from '../../../components/Components';
import * as ImagePicker from 'expo-image-picker';
import {EditarAvatar} from './EdicaoAvatar';
import {EditarNome} from './EdicaoNome';
import {EditarEmail} from './EdicaoEmail';
import {EditarSenha} from './EdicaoSenha';
import {SuaFoto} from './VisualizacaoFoto';
import Api from '../../../Api'


export default () => {
    const navigation = useNavigation();
    const {state: user} = useContext(UserContext);
    const {dispatch: userDispatch} = useContext(UserContext);
    
    useEffect(()=> {
        async function pedirPermissao(){
            if(Platform.OS !=='web'){
                const{status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status!=='granted') {
                    alert('Permissão Negada!')
                }
            }    
        }
        pedirPermissao();
    } ,[]);    
    
    useEffect(()=> {
        Api.atualizarAvatar(user.avatar, user.id);//sempre que o avatar do context mudar, atualize no firebase.firestore
    } ,[user.avatar]);

    useEffect(()=> {
        Api.atualizarNome(user.nome, user.id);
    } ,[user.nome]);

    useEffect(()=> {
        Api.atualizarEmail(user.email, user.id);
    } ,[user.email]);

    useEffect(()=> {
        Api.atualizarSenha(user.senha, user.id);
    } ,[user.senha]);    
    
    const Voltar = () => {
        navigation.reset({
            routes: [{name: 'Perfil'}]
        });
    }

    return (
        <Container>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => Keyboard.dismiss()} accessible={false}>
                <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                    <TopoInterno IconeCentral={'person'} setaVoltar={()=>Voltar()}/>
                    <View style={{width: '100%', paddingHorizontal: 40, marginTop: 10}}>
                        <EditarAvatar userDispatch={userDispatch}/>                   
                        <EditarNome nome={user.nome} userDispatch={userDispatch} />
                        <EditarEmail email={user.email} senha={user.senha} userDispatch={userDispatch} />
                        <EditarSenha email={user.email} senha={user.senha} userDispatch={userDispatch} />
                    </View>
                    <SuaFoto avatar={user.avatar} userDispatch={userDispatch}/>
                </View>
            </TouchableWithoutFeedback>            
        </Container>
    );
}