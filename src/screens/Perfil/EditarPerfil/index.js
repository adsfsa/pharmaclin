import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { FlatList, Alert, Text, View, TouchableOpacity, TextInput,TouchableWithoutFeedback, Keyboard, Platform, Image  } from 'react-native';
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

    const inputNome = useRef(null);
    const inputEmail = useRef(null);
    const inputSenha = useRef(null);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [avatar, setAvatar] = useState('null');

    const [novoNome, setNovoNome] = useState("");
    const [novoEmail, setNovoEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [novoAvatar, setNovoAvatar] = useState('null');
    
    const [nomeEditavel, setNomeEditavel] = useState(false);
    const [emailEditavel, setEmailEditavel] = useState(false);
    const [senhaEditavel, setSenhaEditavel] = useState(false);

    const[isVisible, SetVisibility] = useState(false);
    const[icon, SetIcon] = useState(isVisible ? 'visibility-off': 'visibility');

    useEffect(()=> {
        async function pedirPermissao(){
            if(Platform.OS !=='web'){
                const{status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status!=='granted') {
                    alert('Permissão Negada!')
                }
            }    
        }
        pedirPermissao();
    } ,[]);

    /*useEffect(()=> {
        async function carregarUsuario(){
            let buscar = ['nome', 'email', 'senha', 'avatar'];
            await AsyncStorage.multiGet(buscar, function(err, stores) {
                const dados = stores.map(entry => entry[1]);
                const dadosUsuario = JSON.parse(JSON.stringify(dados));
                const usuarioCarregado = {
                    nome: dadosUsuario[0], 
                    email: dadosUsuario[1], 
                    senha: dadosUsuario[2], 
                    avatar: dadosUsuario[3]
                }
                setNome(dadosUsuario[0]);
                setEmail(dadosUsuario[1]);
                setSenha(dadosUsuario[2]);
                setAvatar(dadosUsuario[3]);
                console.log(usuarioCarregado);
            });            
        }
        carregarUsuario();
    } ,[]);*/
    
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

    const RemoverAvatar = ()=>{
        Alert.alert(
            'Confirmar!',
            'Deseja remover sua foto?',
            [
                {
                    text: 'Sim', 
                    onPress: async()=>{
                        setAvatar('null');
                        setNovoAvatar('null');
                        await AsyncStorage.setItem('avatar', 'null');
                        Alert.alert(
                            'Foto Removida!', 
                            'Seu aplicativo será reinicializado',
                            [
                                {
                                    text: 'OK',
                                    onPress: async()=>{
                                        await Updates.reloadAsync();
                                    }
                                }
                            ]
                        )
                    }
                },
                {
                    text: 'Não', 
                    onPress:()=>{
                        Alert.alert('Cancelado!', 'Sua foto não foi removida.');
                        return;
                    }
                }
                
            ],
            {cancelable: false}
        )
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
                'Sua foto será salva.',
                [
                    {
                        text: 'Cancelar', 
                        onPress:()=>{
                            setNovoAvatar('null');
                            Alert.alert('Cancelado!', 'Sua foto não foi salva.')
                        }
                    },
                    {
                        text: 'Ok', 
                        onPress: async()=>{
                            await AsyncStorage.setItem('avatar', result.uri);
                            userDispatch({
                                type: 'setNewAvatar',
                                payload: {
                                    avatar: result.uri
                                } 
                            });
                            Alert.alert(
                                'Sua foto foi salva!', 
                                'Deseja atualizar o aplicativo para finalizar alterações adicionais?',
                                [
                                    {
                                        text: 'Não', 
                                        onPress:()=>{
                                            return;
                                        }
                                    },
                                    {
                                        text: 'Sim', 
                                        onPress: async ()=>{
                                            await Updates.reloadAsync();
                                        }
                                    }
                                ]
                            )
                        }
                    }
                ],
                {cancelable: false}
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
                'Suas alterações serão salvas.', 
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
                            Alert.alert('Cancelado!', 'As alterações não foram salvas.')
                        }
                    },
                    {
                        text: 'OK',
                        onPress: async()=>{
                            if (novoNome!=="" && novoEmail==="" && novaSenha==="") {//só o nome
                                await AsyncStorage.setItem('nome', novoNome.toUpperCase());
                                userDispatch({
                                    type: 'setNewNome',
                                    payload: {
                                        nome: novoNome
                                    } 
                                });
                            }
                            if (novoNome!=="" && novoEmail!=="" && novaSenha==="") {//nome e email
                                let novosDados = [['nome', novoNome.toUpperCase()], ['email', novoEmail], ['senha', novaSenha]];
                                await AsyncStorage.multiSet(novosDados);
                                userDispatch({
                                    type: 'setNewNomeEmail',
                                    payload: {
                                        nome: novoNome,
                                        email: novoEmail
                                    } 
                                });
                            }
                            if (novoNome!=="" && novoEmail==="" && novaSenha!=="") {//nome e senha
                                let novosDados = [['nome', novoNome.toUpperCase()], ['senha', novaSenha]];
                                await AsyncStorage.multiSet(novosDados);
                                userDispatch({
                                    type: 'setNewNomeSenha',
                                    payload: {
                                        nome: novoNome,
                                        senha: novaSenha
                                    } 
                                });
                            }
                            if (novoNome!=="" && novoEmail!=="" && novaSenha!=="") {//todos
                                let novosDados = [['nome', novoNome.toUpperCase()], ['email', novoEmail], ['senha', novaSenha]];
                                await AsyncStorage.multiSet(novosDados);
                                userDispatch({
                                    type: 'setNewPerfil',
                                    payload: {
                                        nome: novoNome,
                                        email: novoEmail,
                                        senha: novaSenha
                                    } 
                                });
                            }
                            if (novoNome==="" && novoEmail!=="" && novaSenha==="") {//só o email
                                await AsyncStorage.setItem('email', novoEmail);
                                userDispatch({
                                    type: 'setNewEmail',
                                    payload: {
                                        email: novoEmail
                                    } 
                                });
                            }
                            if (novoNome==="" && novoEmail!=="" && novaSenha!=="") {//email e senha
                                let novosDados = [['email', novoEmail], ['senha', novaSenha]];
                                await AsyncStorage.multiSet(novosDados);
                                userDispatch({
                                    type: 'setNewEmailSenha',
                                    payload: {
                                        email: novoEmail,
                                        senha: novaSenha
                                    } 
                                });
                            }
                            if (novoNome==="" && novoEmail==="" && novaSenha!=="") {//só a senha
                                await AsyncStorage.setItem('senha', novaSenha);
                                userDispatch({
                                    type: 'setNewSenha',
                                    payload: {
                                        senha: novaSenha
                                    } 
                                });
                            }
                            setNovoNome("");
                            setNovoEmail("");
                            setNovaSenha("");
                            setNomeEditavel(false);
                            setEmailEditavel(false);
                            setSenhaEditavel(false);
                            Alert.alert('Concluído!', 'As alterações foram salvas.') 
                        }
                    },
                ],
                {cancelable: false}
            );
        } else {//consequencia: nenhum foi modificado            
            Alert.alert('Sem Alterações!', 'Você não alterou nenhum campo');
        }

    }    
    return (
        <Container>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => Keyboard.dismiss()} accessible={false}>
                <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                    <TopoInterno IconeCentral ={'person'} setaVoltar = {()=>Voltar()}/>
                    <View style={{width: '100%', paddingHorizontal: 40, marginTop: 10}}>
                        <AdicionarFoto onPress = {()=>EscolherAvatar()} >
                            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                                {"Adicionar foto"}
                            </Text>
                            <Icon name ="image-search" size={24} />
                        </AdicionarFoto>                    
                        <View
                            style = {{alignSelf: 'stretch', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                            backgroundColor: nomeEditavel === true? 'white' : 'transparent', marginTop: 10}}
                        >
                            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                                {"Nome: "}
                            </Text>
                            <TextInput
                                style = {{flex: 1}}
                                ref = {inputNome}
                                textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                placeholder = {nomeEditavel? "": `${nome}`}
                                placeholderTextColor = {nomeEditavel? '#000000' : "grey"}
                                value = {novoNome}
                                autoCapitalize = 'characters'
                                maxLength = {60}
                                selectTextOnFocus = {true}
                                onChangeText = {novoNome => setNovoNome(novoNome)}
                                onFocus = {()=> setNomeEditavel(true)}
                                onBlur = {()=> setNomeEditavel(false)}
                            />
                            <TouchableOpacity onPress={
                                nomeEditavel? () => inputNome.current.blur()
                                : () => inputNome.current.focus()}
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
                                placeholder = {emailEditavel? "": `${email}`}
                                placeholderTextColor = {emailEditavel? '#000000' : "grey"}
                                value = {novoEmail}
                                autoCapitalize = 'none'
                                maxLength = {60}
                                selectTextOnFocus = {true}
                                onChangeText = {email => setNovoEmail(email)}
                                onFocus = {()=> setEmailEditavel(true)}
                                onBlur = {()=> setEmailEditavel(false)}
                                keyboardType = "email-address"
                            />
                            <TouchableOpacity onPress={
                                    emailEditavel? () => inputEmail.current.blur()
                                    : () => inputEmail.current.focus()}
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
                                placeholder = {senhaEditavel? "": (isVisible? `${senha}`: "*Senha Protegida!*")}
                                placeholderTextColor = {senhaEditavel? '#000000' : "grey"}
                                value = {novaSenha}
                                autoCapitalize = 'none'
                                maxLength = {60}
                                selectTextOnFocus = {true}
                                onChangeText = {senha => setNovaSenha(senha)}
                                onFocus = {()=> setSenhaEditavel(true)}
                                onBlur = {()=> setSenhaEditavel(false)}
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
                                senhaEditavel? () => inputSenha.current.blur()
                                : () => inputSenha.current.focus()
                                }
                            >
                                <Icon name={senhaEditavel? 'done' : 'edit'} size={24} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <Scroller>
                        <View style = {{alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', marginBottom: 30}}>
                            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                                {novoAvatar!==null && novoAvatar!=='null'? "Sua nova foto:"
                                : (avatar!==null && avatar!=='null'? "Sua foto atual:"
                                    : "Adicione uma foto e ela aparecerá aqui.")
                                }
                            </Text>
                            {((avatar!==null && avatar!=='null')||(novoAvatar!==null && novoAvatar!=='null'))
                                ?
                                    <Image source={{uri: novoAvatar!==null && novoAvatar!=='null' ? novoAvatar 
                                            : (avatar!==null && avatar!=='null' ? avatar : null)}
                                        }
                                        style={{width: 100, height: 100, borderRadius: 50, margin: 10}} 
                                    />
                                :
                                    <Icon name='face' size={100} color = "#4A989F" />
                            }
                            {(avatar!==null && avatar!=='null') &&
                                <TouchableOpacity onPress={()=>RemoverAvatar()}>
                                    <Text style={{fontFamily: 'Century-Gothic', color: '#000000', fontSize: 12}}>
                                        Remover foto
                                    </Text>
                                </TouchableOpacity>
                            }
                        </View> 
                    </Scroller>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                <View 
                    style = {{width: '100%', paddingHorizontal: 40, paddingBottom: 40}} 
                >
                    <BtnDestaque onPress={ () => Salvar() }>
                        <Text style={TextStyles.baseText} >
                            Salvar
                        </Text>
                    </BtnDestaque>
                </View>
            </TouchableWithoutFeedback>
        </Container>
    );
}
export const Scroller = styled.ScrollView`
    flex: 1;
    margin-top: 40px;
    width: 100%;
`;

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