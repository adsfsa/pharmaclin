import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, InputContainer, BtnDestaque, TextStyles, InputSenha, InputObrigatorio, ModalAguarde} from '../../components/Components';
import PharmaClinLogo100x100 from '../../../svgs/PharmaClinLogo100x100';
import Api from '../../Api'

export default () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState ('');
    const [senha, setSenha] = useState ('');
    const [loading, verLoading] = useState(false);
    
    const Redirecionar = () => {
        navigation.navigate('Cadastro');
    }

    const Login = () => {
        if(email !=='' && senha !== ''){
            Keyboard.dismiss();
            verLoading(true);
            Api.login(email, senha, verLoading);
        } else {
            Keyboard.dismiss();
            alert('Preencha todos os campos!');
        }
    }     

    return (
        <Container>
            <KeyboardAvoidingView
                style={{flex: 1, width: '100%'}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View
                        style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}}
                    >
                        <View style = {{alignSelf: 'center'}}>
                            <PharmaClinLogo100x100 />
                        </View>
                        <InputContainer >
                            <InputObrigatorio
                                placeholder = {"Email*"}
                                leftIcon = {"email"}
                                keyboardType = {"email-address"}
                                autoCompleteType = {'email'}
                                value = {email}
                                onChangeText = {email => setEmail(email)}
                                autoCapitalize = {"none"}
                            />
                            <InputSenha
                                placeholder = {"Senha*"}
                                leftIcon = {"lock"}
                                autoCompleteType = {'password'}
                                value = {senha}
                                onChangeText = {senha => setSenha(senha)}
                            />

                            <BtnDestaque onPress={Login} >
                                <Text style = {TextStyles.BtnDestaqueText}>
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
                                N??o possui uma conta?
                            </Text>
                            <TouchableOpacity onPress={Redirecionar} >
                                <Text style={TextStyles.LinkText}>
                                    Cadastre-se agora!
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <ModalAguarde loading={loading}/>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Container>
    );
}