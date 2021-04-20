import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { FlatList, Alert, Text, Button, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno, InputContainer, BtnDestaque, TextStyles, BtnNormal, CustomCheckBox, Link, InputSenha, InputObrigatorio} from '../../../components/Components'; //Componentes "repetitivos", criados em Components
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextosPerfil} from './styles';

export default () => {
    const teste = AsyncStorage.getItem('usuario');

    const [usuario, setUsuario] = useState({});
    const findUsusario = async() => {
        const result = await AsyncStorage.getItem('usuario');
        const string = JSON.parse(result);
        setUsuario(string);
        setDados([{id: 'Nome', Informacao: `${string.Nome}`}, {id: 'Email', Informacao:`${string.Email}`}]);
    }
    useEffect(()=> {findUsusario();} ,[]);



    const testar = async() =>{
        const json = await AsyncStorage.getItem('usuario');
        const usuario = JSON.parse(json);
        console.log(usuario); //mude para json ou objeto e veja a diferença no console (inspecionar, cmd ou localhost->device)
        alert(usuario.Nome);
    }

    const [dados, setDados] = useState();
    const [novosdados, setnovosdados] = useState("");

    const [novoEmail, setNovoEmail] = useState("");
    const [novoNome, setNovoNome] = useState("");

    const [nomeEditavel, setNomeEditavel] = useState(false);
    const [emailEditavel, setEmailEditavel] = useState(false);


    const [selectedItem, setSelectedItem] = useState(null);
    const newdados = usuario.Nome;

    function editar(){
        setEditavel(true)
    }

    async function addDados(){
        setDados([novosdados])
    }

    const navigation = useNavigation();
    const  Voltar = () => {
        navigation.navigate('Perfil')
    }

    const Item = ({item, editable, onPress, onChangeText}) => {
        <View style={{flexDirection:'row'}} >
            <TouchableOpacity onPress={onPress}>
                <TextInput
                    textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                    placeholder = {item.Informacao}
                    editable = {editable}
                    onChangeText = {onChangeText}
                />
                <Icon name='edit' color='#000000' size = {24} />
            </TouchableOpacity>
        </View>
    }
    const renderItem = ({ item }) => {
        const editable = item.id === selectedItem ? true: false;
    
        return (
          <Item
            item={{item}}
            onPress={() => setSelectedItem(item.id)}
            editable={{ editable }}
            onChangeText = {texto => setnovosdados(texto)}
          />
        );
    };






    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopoInterno IconeCentral ={'person'} setaVoltar = {Voltar}/>

                <TouchableOpacity
                    onPress={() => setNomeEditavel(true)}
                    style={{flexDirection:'row',alignItems: 'center',
                    backgroundColor: nomeEditavel === true? 'white' : 'tranparent',
                    border: '#000000'}}
                >
                    <TextInput
                        textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                        placeholder = {`${usuario.Nome}`}
                        style ={{borderBottomColor: 'black'}}
                        editable = {nomeEditavel === true? true : false}
                        value = {novoNome}
                        onChangeText = {nome => setNovoNome(nome)}
                    />
                    <TouchableOpacity onPress={
                        nomeEditavel === true? () => setNomeEditavel(false)
                        : (novoNome!==""? () => setNovoNome("") : () => setNomeEditavel(false) )
                        }>
                        <Icon name={nomeEditavel === true? 'done': (novoNome===""? 'edit': 'backspace')} size={24} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setEmailEditavel(true)}
                    style={{flexDirection:'row',alignItems: 'center',
                    backgroundColor: emailEditavel === true? 'white' : 'tranparent',
                    border: '#000000'}}
                >
                    <TextInput
                        textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                        placeholder = {`${usuario.Email}`}
                        style ={{borderBottomColor: 'black'}}
                        editable = {emailEditavel === true? true : false}
                        value = {novoEmail}
                        onChangeText = {email => setNovoEmail(email)}
                    />
                    <TouchableOpacity onPress={
                        emailEditavel === true? () => setEmailEditavel(false)
                        : (novoEmail!==""? () => setNovoEmail("") : () => setEmailEditavel(false) )
                        }>
                        <Icon name={emailEditavel === true? 'done': (novoEmail===""? 'edit': 'backspace')} size={24} />
                    </TouchableOpacity>
                </TouchableOpacity>                
                <FlatList
                    data={dados}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator = {false}
                    extraData={selectedItem}
                    renderItem={ ({item}) => 
                        <View>
                            <TouchableOpacity
                                onPress={() => setSelectedItem(item.id)}
                                style={{flexDirection:'row',alignItems: 'center',
                                backgroundColor: item.id === selectedItem? 'white' : 'tranparent',
                                border: '#000000'}}
                            >
                                <TextInput
                                    textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                    placeholder = {item.Informacao}
                                    style ={{borderBottomColor: 'black'}}
                                    editable = {item.id === selectedItem? true : false}
                                    onChangeText = {
                                        selectedItem === 'Nome'? texto => setNovoNome(texto)
                                        : texto => setNovoEmail(texto)
                                    }
                                />
                                <TouchableOpacity onPress={() => setSelectedItem(false)}>
                                    <Icon
                                    name={
                                        item.id === selectedItem? 'done'
                                        : (novoNome===""? 'edit': 'backspace') 
                                    }
                                    color='#000000' size = {24} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    }
                />

            </View>

            <View 
                style = {{width: '100%', padding: 40}} 
            >
                <BtnDestaque onPress={() => setSelectedId()}>
                    <Text style={TextStyles.baseText} >
                        Salvar
                    </Text>
                </BtnDestaque>
            </View>
        </Container>
    );
}

export const BtnLista = styled.TouchableOpacity`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: row;     
`;