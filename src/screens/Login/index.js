import React, { useState, useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import {UserContext} from '../../contexts/UserContext';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, InputContainer, BtnDestaque, TextStyles, CustomCheckBox, Link, InputSenha, InputObrigatorio} from '../../components/Components'; //Componentes "repetitivos", criados em Components
import PharmaClinLogo100x100 from '../../../svgs/PharmaClinLogo100x100';

const admin = {id: 1, Nome: 'ADMIN', Email: 'admin@admin.com', Senha: '1234', Avatar: ''}

export default () => {
    const navigation = useNavigation();
 
    const [Email, setEmail] = useState ('');
    const [Senha, setSenha] = useState ('');
    var id = 1;
    
    const Redirecionar = () => {
        navigation.navigate('Cadastro');
    }
    const {dispatch: userDispatch} = useContext(UserContext);

    const verificarLogin = async() => {
        id++;
        if(Email !=='' && Senha !== ''){
            const verificar = await AsyncStorage.getItem('usuario');
            if (verificar !== null) {
                const usuario = JSON.parse(verificar);
                if (usuario.Email === Email && usuario.Senha ===Senha) {
                    alert(`Bem Vindo ${usuario.Nome}!`)
                    navigation.reset({ routes: [{name: 'MainTab'}] });
                } else{
                    alert('Conta não encontrada. Cadastre-se!');
                }
            } else {
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
                            senha: admin.Senha,
                            avatar: admin.Avatar
                        } 
                    });
                    alert('Bem Vindo ADMIN!')
                    navigation.reset({ routes: [{name: 'MainTab'}] });
                    
                } else {
                    alert('Conta não encontrada. Cadastre-se!');
                    
                }
            }
        } else{
            alert('Preencha os campos!');
        }
    }
     

    return (
        <Container>

            <View style = {{alignSelf: 'center', marginTop: 60}}>
                <PharmaClinLogo100x100 />
            </View>
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
                /*onPress = ?*/
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