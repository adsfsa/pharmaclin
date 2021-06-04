import React, { useState } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, ModalAguarde, InputContainer, BtnDestaque, TextStyles, InputSenha, InputObrigatorio, TopoPadrao} from '../../components/Components';
import Api from '../../Api'


export default () => {
    const navigation = useNavigation();
    const [nome, setNome] = useState ('');
    const [email, setEmail] = useState ('');
    const [senha, setSenha] = useState ('');
    const [loading, verLoading] = useState(false);

    const Cadastrar = () => {
        if(nome!=='' && email !=='' && senha !== ''){
            Keyboard.dismiss();
            verLoading(true);
            Api.cadastro(nome, email, senha, verLoading);
        } else {
            Keyboard.dismiss();
            alert('Preencha todos os campos!');
        }

    }

    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Login'}]
        });
    }

    return (
        <Container>
            <KeyboardAvoidingView
                style={{flex: 1, width: '100%'}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >

                        <TopoPadrao setaVoltar={Voltar} size={24} />
                        
                        <InputContainer >
                            <InputObrigatorio
                                placeholder = {"Digite seu nome*"}
                                leftIcon = {"person"}
                                keyboardType = {"default"}
                                autoCompleteType = {'username'}
                                value = {nome}
                                onChangeText = {nome => setNome(nome)}
                                autoCapitalize = {"characters"}
                            />
                            <InputObrigatorio
                                placeholder = {"Digite seu email*"}
                                leftIcon = {"email"}
                                keyboardType = {"email-address"}
                                autoCompleteType = {'email'}
                                value = {email}
                                onChangeText = {email => setEmail(email)}
                                autoCapitalize = {"none"}
                            />
                            <InputSenha
                                placeholder = {"Crie uma senha*"}
                                leftIcon = {"lock"}
                                autoCompleteType = {'password'}
                                value = {senha}
                                onChangeText = {senha => setSenha(senha)}
                            />

                            <BtnDestaque onPress= {Cadastrar} >
                                <Text style={TextStyles.BtnDestaqueText}>
                                    CADASTRAR
                                </Text>
                            </BtnDestaque>
                        </InputContainer>
                        
                        <ModalAguarde loading={loading}/>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Container>
    );
}