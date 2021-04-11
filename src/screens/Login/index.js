import React, { useState, useContext } from 'react';
import { Alert, Text } from 'react-native';
import styled from 'styled-components/native';
import {UserContext} from '../../contexts/UserContext';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, InputContainer, BtnDestaque, TextStyles, CustomCheckBox, Link, InputSenha, InputObrigatorio} from '../../components/Components'; //Componentes "repetitivos", criados em Components
import PharmaClinLogo100x100 from '../../../svgs/PharmaClinLogo100x100';

const admin = {id: 1, Nome: 'admin', Email: 'admin@admin.com', Senha: '1234'}

export default () => {
    const navigation = useNavigation();

    //#const [user, setUser] = useState ({id: 1, Nome: '', Email: '', Senha:''});    
    const [Email, setEmail] = useState ('');
    const [Senha, setSenha] = useState ('');
    //const [id, setId] = useState (1);
    var id = 1;
    
    const Redirecionar = () => {
        navigation.navigate('Cadastro');
    }
    const {dispatch: userDispatch} = useContext(UserContext);
    const verificarLogin = async() => {
        id++;
        if(Email !=='' && Senha !== ''){
            if (admin.Email === Email && admin.Senha === Senha)
            {
                var adminString = JSON.stringify(admin);
                await AsyncStorage.setItem('usuario', adminString)
                userDispatch({
                    type: 'setLogin',
                    payload: {
                        id: admin.id,
                        nome: admin.Nome,
                        email: admin.Email,
                        senha: admin.Senha
                    } 
                });
                alert('Bem Vindo Admin!')
                navigation.reset({ routes: [{name: 'MainTab'}] });
                
            } else {
                alert('Email ou Senha incorretos. Cadastre-se!');
            }/*else {
                const usuario = {id: id++, textoNome: '-', textoEmail: textoEmail, textoSenha: textoSenha};
                setUser(usuario);
                var userString = JSON.stringify(usuario);
                if(AsyncStorage.getItem('usuario') !== ''){
                    await AsyncStorage.setItem('usuario', userString);
                    userDispatch({
                        type: 'setLogin',
                        payload: {
                            id: usuario.id,
                            nome: usuario.textoNome,
                            email: usuario.textoEmail,
                            senha: usuario.textoSenha
                        } 
                    });
                    console.log('Bem Vindo!');
                    navigation.reset({ routes: [{name: 'MainTab'}] })

                } else {
                    console.log('Email ou Senha incorretos. Cadastre-se!');
                }
            }*/            
        } else{
            alert('Preencha os campos!');
        }
    }
     

    return (
        <Container>

            <PharmaClinLogo100x100 />

            <InputContainer >
                <InputObrigatorio
                    placeholder="Email*"
                    leftIcon = "person"
                    keyboardType = "email-address"
                    autoCompleteType = {'email'}
                    value = {Email}
                    onChangeText = {Email => setEmail(Email)}
                    autoCapitalize ="none"
                />
                <InputSenha
                    placeholder="Senha*"
                    leftIcon = "lock"
                    autoCompleteType = {'password'}
                    value = {Senha}
                    onChangeText = {Senha=> setSenha(Senha)}
                />

                <BtnDestaque onPress={verificarLogin} >
                    <Text style={TextStyles.BtnDestaqueText}>
                        LOGIN
                    </Text>
                </BtnDestaque>
            </InputContainer>
            
            <CustomCheckBox                
                title = "Manter conectado"
                checkedIcon = "check-box"
                uncheckedIcon = "check-box-outline-blank"
                /*onPress = {[email=> setTextoEmail(email), senha=> setTextoSenha(senha)]}*/
            />
            
            <Link onPress={Redirecionar} >
                <Text style={TextStyles.LinkText}>
                    Criar conta
                </Text>
            </Link>

        </Container>
    );
    /*
    const Token = async() => {
        const value = await AsyncStorage.getItem('token')
        if (value!==null) {
            console.log('Bem Vindo!')
            navigation.reset({
                routes: [{name: 'Home'}]
            });            
        } else {
            console.log('Faça Login!')
            
        }
    }*/

    
}