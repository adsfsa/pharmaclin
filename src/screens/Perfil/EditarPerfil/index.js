import React, {useContext, useEffect} from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Text, View, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, TopoInterno, BtnDestaque, TextStyles} from '../../../components/Components';
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
        Api.carregarAvatar(userDispatch);
        Api.carregarNome(userDispatch);
        Api.carregarEmail(userDispatch);
        Api.carregarSenha(userDispatch);
    } ,[]);    
    
    useEffect(()=> {
        Api.atualizarAvatar(user.avatar);//sempre que o avatar do context mudar, atualize nos bancos (asyncstorage e firebase.firestore)
    } ,[user.avatar]);

    useEffect(()=> {
        Api.atualizarNome(user.nome);
    } ,[user.nome]);

    useEffect(()=> {
        Api.atualizarEmail(user.email);
    } ,[user.email]);

    useEffect(()=> {
        Api.atualizarSenha(user.senha);
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
                        <EditarAvatar/>                   
                        <EditarNome nome={user.nome} />
                        <EditarEmail email={user.email} />
                        <EditarSenha senha={user.senha} />
                    </View>
                    <SuaFoto avatar={user.avatar} />
                </View>
            </TouchableWithoutFeedback>            
        </Container>
    );
}