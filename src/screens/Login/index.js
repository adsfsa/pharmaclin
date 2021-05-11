import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, InputContainer, BtnDestaque, TextStyles, Link, InputSenha, InputObrigatorio} from '../../components/Components';
import PharmaClinLogo100x100 from '../../../svgs/PharmaClinLogo100x100';
import Api from '../../Api'

export default () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState ('');
    const [senha, setSenha] = useState ('');
    
    const Redirecionar = () => {
        navigation.navigate('Cadastro');
    }

    const Login = () => {
        if(email !=='' && senha !== ''){
            Api.login(email, senha);
        } else {
            alert('Preencha todos os campos!');
        }
    }     

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <View style = {{alignSelf: 'center'}}>
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
                        onChangeText = {senha => setSenha(senha)}
                    />

                    <BtnDestaque onPress={Login} >
                        <Text style={TextStyles.BtnDestaqueText}>
                            LOGIN
                        </Text>
                    </BtnDestaque>
                </InputContainer>

                <View
                    style={{
                        marginTop: 50, justifyContent: 'center', alignItems: 'center'
                    }}
                >
                    <Text style={TextStyles.CadastroText}>
                        Não possui uma conta?
                    </Text>
                    <TouchableOpacity onPress={Redirecionar} >
                        <Text style={TextStyles.LinkText}>
                            Cadastre-se agora!
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Container>
    );
}