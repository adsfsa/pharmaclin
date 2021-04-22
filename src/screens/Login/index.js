import React, { useState, useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import {UserContext} from '../../contexts/UserContext';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, InputContainer, BtnDestaque, TextStyles, CustomCheckBox, Link, InputSenha, InputObrigatorio} from '../../components/Components'; //Componentes "repetitivos", criados em Components
import PharmaClinLogo100x100 from '../../../svgs/PharmaClinLogo100x100';

const admin = {id: '1', nome: 'ADMIN', email: 'admin@admin.com', senha: '1234'}

export default () => {
    const navigation = useNavigation();
 
    const [email, setEmail] = useState ('');
    const [senha, setSenha] = useState ('');
    var id = 1;
    
    const Redirecionar = () => {
        navigation.navigate('Cadastro');
    }
    const {dispatch: userDispatch} = useContext(UserContext);

    const verificarLogin = async() => {
        id++;
        if(email !=='' && senha !== ''){
            let chaves = ['id', 'nome', 'email', 'senha'];
            const Get = await AsyncStorage.multiGet(chaves);
            const usuario = JSON.parse(JSON.stringify(Get));
            if (usuario.email === email && usuario.senha ===senha) {                
                let userChaves = [['id', usuario.id], ['nome', usuario.nome.toUpperCase()], ['email', usuario.email], ['senha', usuario.senha]];
                await AsyncStorage.multiSet(userChaves);
                userDispatch({
                    type: 'setLogin',
                    payload: {
                        id: usuario.id,
                        nome: usuario.nome,
                        email: usuario.email,
                        senha: usuario.senha
                    } 
                });
                alert(`Bem Vindo ${usuario.nome}!`);
                console.log(usuario);
                navigation.reset({ routes: [{name: 'MainTab'}] });
            } else {
                if (admin.email === email && admin.senha === senha)
                {
                    let adminChaves = [['id', admin.id], ['nome', admin.nome], ['email', admin.email], ['senha', admin.senha]];
                    await AsyncStorage.multiSet(adminChaves);
                    userDispatch({
                        type: 'setLogin',
                        payload: {
                            id: admin.id,
                            nome: admin.nome,
                            email: admin.email,
                            senha: admin.senha
                        } 
                    });
                    console.log(adminChaves);
                    alert(`Bem Vindo ${admin.nome}!`);
                    navigation.reset({ routes: [{name: 'MainTab'}] });
                    
                } else {
                    alert('Conta não encontrada. Verifique os dados informados ou crie uma nova conta');
                    
                }
            }
        } else {
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
                    value = {email}
                    onChangeText = {email => setEmail(email)}
                    autoCapitalize ="none"
                />
                <InputSenha
                    placeholder="Senha*"
                    leftIcon = "lock"
                    autoCompleteType = {'password'}
                    value = {senha}
                    onChangeText = {senha=> setSenha(senha)}
                />

                <BtnDestaque onPress={()=>verificarLogin()} >
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
            
            <Link onPress={()=>Redirecionar()} >
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