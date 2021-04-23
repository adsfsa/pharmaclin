import React, { useState, useContext } from 'react';
import { Alert, Text, View } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Container, InputContainer, BtnDestaque, TextStyles, InputSenha, InputObrigatorio, TopoPadrao} from '../../components/Components'; //Componentes "repetitivos", criados em Components

export default () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState ('');
    const [email, setEmail] = useState ('');
    const [senha, setSenha] = useState ('');
    
    const {dispatch: userDispatch} = useContext(UserContext);
    
    const Cadastrar = async() => {
        var id = '2';
        if(nome!=='' && email !=='' && senha !== ''){ 
            const getEmail = await AsyncStorage.getItem('email');
            if (getEmail !== email) {                
                let userChaves= [['id', id], ['nome', nome.toUpperCase()], ['email', email], ['senha', senha]];
                await AsyncStorage.multiSet(userChaves);
                userDispatch({
                    type: 'setLogin',
                    payload: {
                        id: id,
                        nome: nome.toUpperCase(),
                        email: email,
                        senha: senha
                    } 
                });
                alert(`Bem Vindo ${nome.toUpperCase()}!`);
                console.log(getEmail);
                navigation.reset({ routes: [{name: 'MainTab'}] });
            } else {
                alert('O email informado já está cadastrado.')
            }
            
        } else {
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
                        value = {nome}
                        onChangeText = {nome => setNome(nome)}
                    />
                    <InputObrigatorio
                        placeholder="Digite seu email*"
                        leftIcon = "email"
                        keyboardType = "email-address"
                        autoCompleteType = {'email'}
                        value = {email}
                        onChangeText = {email => setEmail(email)}
                    />
                    <InputSenha
                        placeholder="Crie uma senha*"
                        leftIcon = "lock"
                        autoCompleteType = {'password'}
                        value = {senha}
                        onChangeText = {senha => setSenha(senha)}
                    />

                    <BtnDestaque onPress= {()=>Cadastrar()} >
                        <Text style={TextStyles.BtnDestaqueText}>
                            CADASTRAR
                        </Text>
                    </BtnDestaque>
                </InputContainer>
            </View>
        </Container>
    );
}