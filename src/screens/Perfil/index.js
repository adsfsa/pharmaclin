import React, { useState, useEffect, useContext } from 'react';
import { Alert, Text, View, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container,BtnDestaque, TextStyles, BtnNormal, CustomLInk } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../contexts/UserContext'


export default () => {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState({});

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [avatar, setAvatar] = useState('null');


    const { state:user } = useContext(UserContext);
    const {dispatch: userDispatch} = useContext(UserContext);
    
    useEffect(()=> {
        async function carregarAvatar(){
           const nome = await AsyncStorage.getItem("nome");
           if (nome) {
                setNome(nome);
           }
        }
        carregarAvatar();
    } ,[]);

    useEffect(()=> {
        async function carregarAvatar(){
           const email = await AsyncStorage.getItem("email");
           if (email) {
                setEmail(email);
           }
        }
        carregarAvatar();
    } ,[]);

    useEffect(()=> {
        async function carregarAvatar(){
           const senha = await AsyncStorage.getItem("senha");
           if (senha) {
                setSenha(senha);
           }
        }
        carregarAvatar();
    } ,[]);

    useEffect(()=> {
        async function carregarAvatar(){
           const avatar = await AsyncStorage.getItem("avatar");
           if (avatar) {
                setAvatar(avatar);
           }
        }
        carregarAvatar();
    } ,[]);

    useEffect(()=> {
        async function atualizarAvatar(){
            if (avatar) {
                await AsyncStorage.setItem('avatar', avatar)
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: avatar
                    } 
                });                
            }
        }
        atualizarAvatar();

    } ,[avatar]);

    useEffect(()=> {
        async function atualizarNome(){
            if (nome) {
                await AsyncStorage.setItem('nome', nome)
                userDispatch({
                    type: 'setNome',
                    payload: {
                        nome: nome
                    } 
                });   
            }
        }
        atualizarNome();
    } ,[nome]);

    useEffect(()=> {
        async function atualizarEmail(){
            if (email) {
                await AsyncStorage.setItem('email', email)
                userDispatch({
                    type: 'setEmail',
                    payload: {
                        email: email
                    } 
                });   
            }
        }
        atualizarEmail();
    } ,[email]);

    useEffect(()=> {
        async function atualizarSenha(){
            if (senha) {
                await AsyncStorage.setItem('senha', senha)
                userDispatch({
                    type: 'setSenha',
                    payload: {
                        senha: senha
                    } 
                });   
            }
        }
        atualizarSenha();
    } ,[senha]);


    const ExcluirConta = async() =>{//apaga todas os dados salvos na async
        await AsyncStorage.getAllKeys((error,keys)=>AsyncStorage.multiRemove(keys));
        navigation.reset({ routes: [{name: 'Login'}] })
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <View style={{marginBottom: 15, alignItems: 'center', width: '100%', justifyContent: 'center'}}>
                    {avatar != null && avatar != 'null'?
                    <Image source={{uri: avatar}} style={{width: 50, height: 50, borderRadius: 25}}/>
                    :
                    <Icon name='account-circle' size={50} color = "#FFFFFF" />
                    }
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <Text style={TextosPerfil.NomeDestaque} >{`${nome}`}</Text>
                    <Text style={TextStyles.baseText} >{`${email}`}</Text>
                </View>
                <View style={{flex: 1, width:'100%', padding: 40, paddingBottom: 40 , alignSelf:'center',justifyContent: 'space-around'}}>
                    <BtnDestaque onPress={() => navigation.navigate('EditarPerfil')} >
                        <Text style={TextStyles.baseText}>
                            Editar Perfil
                        </Text>
                    </BtnDestaque>

                    <BtnNormal
                        style = {{flexDirection: 'row', justifyContent: 'space-between'}}
                        onPress={() => navigation.navigate('MaisInformacoes')}
                    >
                        <View style = {{paddingHorizontal: 20, alignItems: 'center'}} >
                            <Text style={TextStyles.baseText}>
                                Mais informações
                            </Text>                        
                        </View>

                        <View style = {{paddingHorizontal: 20}}>
                            <Icon name='chevron-right' color='#000000' size={24} />
                        </View>                    
                    </BtnNormal>

                    <BtnNormal
                        style = {{flexDirection: 'row', justifyContent: 'space-between'}}
                        onPress={() => navigation.navigate('FichaMedica')}
                    >
                        <View style = {{paddingHorizontal: 20, alignItems: 'center'}} >
                            <Text style={TextStyles.baseText}>
                                Ficha médica
                            </Text>                        
                        </View>

                        <View style = {{paddingHorizontal: 20}}>
                            <Icon name='chevron-right' color='#000000' size={24} />
                        </View>                    
                    </BtnNormal>

                </View>

                <View style = {{flex: 1, width: '100%', padding: 20, justifyContent: 'space-around', alignItems: 'center'}} >
                    <CustomLInk
                        Texto="Sair"
                        onPress={() => navigation.reset({ routes: [{name: 'Login'}] })} 
                    />
                    <CustomLInk
                        Texto="Excluir Conta"
                        onPress={() => ExcluirConta()}
                    />
                </View>
            </View>

        </Container>
    );
}
const AvatarIcon = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const TextosPerfil = StyleSheet.create({
    NomeDestaque: {
        fontFamily: "Century-Gothic",
        fontWeight: "bold",
        color: '#FFFFFF',
        fontSize: 20,
    },
});