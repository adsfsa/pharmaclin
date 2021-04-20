import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Alert, Text, View, TouchableOpacity, TextInput,TouchableWithoutFeedback, Keyboard, Platform, Image  } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno, BtnDestaque, TextStyles} from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Updates from "expo-updates";
import * as ImagePicker from 'expo-image-picker';


export default () => {
    const navigation = useNavigation();
    const {dispatch: userDispatch} = useContext(UserContext);
    const [usuario, setUsuario] = useState({});
    useEffect(()=> {findUsusario();} ,[]);

    const inputNome = useRef(null);
    const inputEmail = useRef(null);
    const inputSenha = useRef(null);

    const [novoNome, setNovoNome] = useState("");
    const [novoEmail, setNovoEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [novoAvatar, setNovoAvatar] = useState(null);
    
    const [nomeEditavel, setNomeEditavel] = useState(false);
    const [emailEditavel, setEmailEditavel] = useState(false);
    const [senhaEditavel, setSenhaEditavel] = useState(false);

    const[isVisible, SetVisibility] = useState(false);
    const[icon, SetIcon] = useState(isVisible ? 'visibility-off': 'visibility');
    
    const findUsusario = async() => {
        const string = await AsyncStorage.getItem('usuario');
        const object = JSON.parse(string);
        setUsuario(object);

        if(Platform.OS !=='web'){
            const{status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status!=='granted') {
                alert('Permissão Negada!')
            }
        }

    }

    const EscolherAvatar = async() =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,4],
            quality: 1
        })
        if (!result.cancelled) {
            setNovoAvatar(result.uri)
            Alert.alert(
                'Adicionar Nova Foto!',
                'Sua foto será salva e o aplicativo será reinicializado',
                [
                    {
                        text: 'Cancelar', 
                        onPress:()=>{
                            setNovoAvatar(null);
                            navigation.reset({ routes: [{name: 'Perfil'}] });
                            Alert.alert('Cancelado!', 'As alterações não foram salvas')
                        }
                    },
                    {
                        text: 'Ok', 
                        onPress: async()=>{
                            let novosDados = {Avatar: result.uri};
                            await AsyncStorage.setItem('usuario', JSON.stringify(usuario), ()=>{AsyncStorage.mergeItem('usuario', JSON.stringify(novosDados), ()=>{AsyncStorage.getItem('usuario')})});
                            userDispatch({
                                type: 'setNewAvatar',
                                payload: {
                                    avatar: usuario.Avatar
                                } 
                            });
                            setNovoAvatar(null);
                            await Updates.reloadAsync();
                        }
                    }
                ]
            )
        }
    }
    
    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Perfil'}]
        });
    }

    const Salvar = async() => {  
        if (novoNome!=="" || novoEmail!=="" || novaSenha!=="") {//pergunta: algum foi modificado?
            Alert.alert(
                'Confirmar Novos Dados!', 
                'Suas alterações serão salvas e o aplicativo será reinicializado', 
                [
                   
                    {
                        text: 'Cancelar', 
                        onPress:()=>{
                            setNovoNome("");
                            setNovoEmail("");
                            setNovaSenha("");
                            setNomeEditavel(false);
                            setEmailEditavel(false);
                            setSenhaEditavel(false);
                            navigation.reset({ routes: [{name: 'Perfil'}] });
                            Alert.alert('Cancelado!', 'As alterações não foram salvas')
                        }
                    },
                    {
                        text: 'OK',
                        onPress: async()=>{
                            if (novoNome!=="" && novoEmail==="" && novaSenha==="") {//só o nome
                                let novosDados = {Nome: novoNome.toUpperCase()};
                                await AsyncStorage.setItem('usuario', JSON.stringify(usuario), ()=>{AsyncStorage.mergeItem('usuario', JSON.stringify(novosDados), ()=>{AsyncStorage.getItem('usuario')})});
                                userDispatch({
                                    type: 'setNewNome',
                                    payload: {
                                        nome: usuario.Nome
                                    } 
                                });
                            }
                            if (novoNome!=="" && novoEmail!=="" && novaSenha==="") {//nome e email
                                let novosDados = {Nome: novoNome.toUpperCase(), Email: novoEmail};
                                await AsyncStorage.setItem('usuario', JSON.stringify(usuario), ()=>{AsyncStorage.mergeItem('usuario', JSON.stringify(novosDados), ()=>{AsyncStorage.getItem('usuario', (err, result)=>{console.log(result)})})});
                                userDispatch({
                                    type: 'setNewNomeEmail',
                                    payload: {
                                        nome: usuario.Nome,
                                        email: usuario.Email
                                    } 
                                });
                            }
                            if (novoNome!=="" && novoEmail==="" && novaSenha!=="") {//nome e senha
                                let novosDados = {Nome: novoNome.toUpperCase(), Senha: novaSenha};
                                await AsyncStorage.setItem('usuario', JSON.stringify(usuario), ()=>{AsyncStorage.mergeItem('usuario', JSON.stringify(novosDados), ()=>{AsyncStorage.getItem('usuario')})});
                                userDispatch({
                                    type: 'setNewNomeSenha',
                                    payload: {
                                        nome: usuario.Nome,
                                        senha: usuario.Senha
                                    } 
                                });
                            }
                            if (novoNome!=="" && novoEmail!=="" && novaSenha!=="") {//todos
                                let novosDados = {Nome: novoNome.toUpperCase(), Email: novoEmail, Senha: novaSenha};
                                await AsyncStorage.setItem('usuario', JSON.stringify(usuario), ()=>{AsyncStorage.mergeItem('usuario', JSON.stringify(novosDados), ()=>{AsyncStorage.getItem('usuario')})});
                                userDispatch({
                                    type: 'setNewInfo',
                                    payload: {
                                        nome: usuario.Nome,
                                        email: usuario.Email,
                                        senha: usuario.Senha
                                    } 
                                });
                            }
                            if (novoNome==="" && novoEmail!=="" && novaSenha==="") {//só o email
                                let novosDados = {Email: novoEmail};
                                await AsyncStorage.setItem('usuario', JSON.stringify(usuario), ()=>{AsyncStorage.mergeItem('usuario', JSON.stringify(novosDados), ()=>{AsyncStorage.getItem('usuario')})});
                                userDispatch({
                                    type: 'setNewEmail',
                                    payload: {
                                        email: usuario.Email
                                    } 
                                });
                            }
                            if (novoNome==="" && novoEmail!=="" && novaSenha!=="") {//email e senha
                                let novosDados = {Email: novoEmail, Senha: novaSenha};
                                await AsyncStorage.setItem('usuario', JSON.stringify(usuario), ()=>{AsyncStorage.mergeItem('usuario', JSON.stringify(novosDados), ()=>{AsyncStorage.getItem('usuario')})});
                                userDispatch({
                                    type: 'setNewEmailSenha',
                                    payload: {
                                        email: usuario.Email,
                                        senha: usuario.Senha
                                    } 
                                });
                            }
                            if (novoNome==="" && novoEmail==="" && novaSenha!=="") {//só a senha
                                let novosDados = {Senha: novaSenha};
                                await AsyncStorage.setItem('usuario', JSON.stringify(usuario), ()=>{AsyncStorage.mergeItem('usuario', JSON.stringify(novosDados), ()=>{AsyncStorage.getItem('usuario')})});
                                userDispatch({
                                    type: 'setNewSenha',
                                    payload: {
                                        senha: usuario.Senha
                                    } 
                                });
                            }       
                            setNovoNome("");
                            setNovoEmail("");
                            setNovaSenha("");
                            setNomeEditavel(false);
                            setEmailEditavel(false);
                            setSenhaEditavel(false);
                            await Updates.reloadAsync();
                        }
                    },
                ]
            );
        } else {//consequencia: nenhum foi modificado
            setNovoNome("");//reseta tudo, por precaução
            setNovoEmail("");
            setNovaSenha("");
            setNomeEditavel(false);
            setEmailEditavel(false);
            setSenhaEditavel(false);
            alert('Nenhuma alteração!');
        }

    }    
    return (
        <Container>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss} accessible={false}>
                <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                    <TopoInterno IconeCentral ={'person'} setaVoltar = {Voltar}/>
                    <View style={{width: '100%', paddingHorizontal: 40}}>
                        <AdicionarFoto onPress = {EscolherAvatar} >
                            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                                {"Adicionar foto"}
                            </Text>
                            <Icon name ="add-circle" size={24} />
                        </AdicionarFoto>                    
                        <View
                            style = {{alignSelf: 'stretch', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                            backgroundColor: nomeEditavel === true? 'white' : 'transparent'}}
                        >
                            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                                {"Nome: "}
                            </Text>
                            <TextInput
                                style = {{flex: 1}}
                                ref = {inputNome}
                                textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                placeholder = {nomeEditavel? "": `${usuario.Nome}`}
                                placeholderTextColor = {nomeEditavel? '#000000' : "grey"}
                                value = {novoNome}
                                autoCapitalize = 'characters'
                                maxLength = {60}
                                selectTextOnFocus = {true}
                                onChangeText = {novoNome => setNovoNome(novoNome)}
                                onFocus = {()=> {setNomeEditavel(true)}}
                                onBlur = {()=> {setNomeEditavel(false)}}
                            />
                            <TouchableOpacity onPress={
                                nomeEditavel? () => {inputNome.current.blur()}
                                : () => {inputNome.current.focus()}}
                            >
                                <Icon name={nomeEditavel? 'done': 'edit'} size={24} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style = {{alignSelf: 'stretch', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                            backgroundColor: emailEditavel === true? 'white' : 'transparent'}}
                        >
                            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                                {"Email: "}
                            </Text>
                            <TextInput
                                style = {{flex: 1}}
                                ref = {inputEmail}
                                textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                placeholder = {emailEditavel? "": `${usuario.Email}`}
                                placeholderTextColor = {emailEditavel? '#000000' : "grey"}
                                value = {novoEmail}
                                autoCapitalize = 'none'
                                maxLength = {60}
                                selectTextOnFocus = {true}
                                onChangeText = {email => setNovoEmail(email)}
                                onFocus = {()=> {setEmailEditavel(true)}}
                                onBlur = {()=> {setEmailEditavel(false)}}
                                keyboardType = "email-address"
                            />
                            <TouchableOpacity onPress={
                                    emailEditavel? () => {inputEmail.current.blur()}
                                    : () => {inputEmail.current.focus()}}
                            >
                                <Icon name={emailEditavel? 'done': 'edit'} size={24} />
                            </TouchableOpacity>
                        </View>  
                        <View
                            style = {{alignSelf: 'stretch', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                            backgroundColor: senhaEditavel === true? 'white' : 'transparent'}}
                        >
                            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                                {"Senha: "}
                            </Text>
                            <TextInput
                                style = {{flex: 1}}
                                ref = {inputSenha}
                                textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                placeholder = {senhaEditavel? "": (isVisible? `${usuario.Senha}`: "*Senha Protegida!*")}
                                placeholderTextColor = {senhaEditavel? '#000000' : "grey"}
                                value = {novaSenha}
                                autoCapitalize = 'none'
                                maxLength = {60}
                                selectTextOnFocus = {true}
                                onChangeText = {senha => setNovaSenha(senha)}
                                onFocus = {()=> {setSenhaEditavel(true)}}
                                onBlur = {()=> {setSenhaEditavel(false)}}
                                secureTextEntry={!isVisible}
                            />
                            <TouchableOpacity style={{paddingRight:5}} onPress={()=> {
                                SetVisibility(!isVisible);
                                SetIcon(!isVisible ? 'visibility-off': 'visibility')
                                } 
                            }
                            >
                                <Icon name={icon} size={24} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={
                                senhaEditavel? () => {inputSenha.current.blur()}
                                : () => {inputSenha.current.focus()}
                                }
                            >
                                <Icon name={senhaEditavel? 'done': 'edit'} size={24} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </TouchableWithoutFeedback>
            {novoAvatar && 
                <View style = {{alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>{"Sua Imagem"}</Text>
                    <Image source ={{uri: novoAvatar}} style={{width: 50, height: 50, borderRadius: 25}} />
                </View>
            }

            
            <View 
                style = {{width: '100%', padding: 40}} 
            >
                <BtnDestaque onPress={ () => Salvar() }>
                    <Text style={TextStyles.baseText} >
                        Salvar
                    </Text>
                </BtnDestaque>
            </View>
        </Container>
    );
}
export const AdicionarFoto = styled.TouchableOpacity`
    height: 30px;
    border: #000000;
    border-radius: 15px;
    justify-content: space-between;
    align-self: stretch
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;    
`;