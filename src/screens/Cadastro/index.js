import React, { useState, useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Container, InputContainer, BtnDestaque, TextStyles, InputSenha, InputObrigatorio, TopoPadrao} from '../../components/Components'; //Componentes "repetitivos", criados em Components

export default () => {
    const navigation = useNavigation();
    const [user, setUser] = useState ({id: 1, Nome: '', Email: '', Senha:'', Avatar: ''});
    const [Nome, setNome] = useState ('');
    const [Email, setEmail] = useState ('');
    const [Senha, setSenha] = useState ('');
    var id = 1;
    
    const {dispatch: userDispatch} = useContext(UserContext);
    
    const Cadastrar = async() => {
        if(Nome!=='' && Email !=='' && Senha !== ''){    
            const usuario = {id: id++, Nome: Nome.toUpperCase(), Email: Email, Senha: Senha, Avatar:''};
            setUser(usuario);
            var userString = JSON.stringify(usuario);
            const verificar = await AsyncStorage.getItem('usuario');
            if(verificar === null){
                await AsyncStorage.setItem('usuario', userString);
                userDispatch({
                    type: 'setLogin',
                    payload: {
                        id: usuario.id,
                        nome: usuario.Nome,
                        email: usuario.Email,
                        senha: usuario.Senha,
                        avatar: usuario.Avatar
                    } 
                });
                alert(`Bem Vindo ${usuario.Nome}!`);
                navigation.reset({ routes: [{name: 'MainTab'}] })
            } else{
                alert('Você já possui uma conta ativa! Reinicie o app para entrar.')
            }
                      
        } else{
            alert('Preencha os campos!');
        }

    }

    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Login'}]
        });
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopoPadrao setaVoltar={Voltar} size={24} />
                <InputContainer >
                    <InputObrigatorio
                        placeholder="Digite seu nome*"
                        leftIcon = "person"
                        keyboardType = "default"
                        autoCompleteType = {'username'}
                        value = {Nome}
                        onChangeText = {Nome => setNome(Nome)}
                    />
                    <InputObrigatorio
                        placeholder="Digite seu email*"
                        leftIcon = "email"
                        keyboardType = "email-address"
                        autoCompleteType = {'email'}
                        value = {Email}
                        onChangeText = {Email => setEmail(Email)}
                    />
                    <InputSenha
                        placeholder="Crie uma senha*"
                        leftIcon = "lock"
                        autoCompleteType = {'password'}
                        value = {Senha}
                        onChangeText = {Senha => setSenha(Senha)}
                    />

                    <BtnDestaque onPress= {Cadastrar} >
                        <Text style={TextStyles.BtnDestaqueText}>
                            CADASTRAR
                        </Text>
                    </BtnDestaque>
                </InputContainer>
            </View>
        </Container>
    );
}