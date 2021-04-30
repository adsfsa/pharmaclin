import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { FlatList, Alert, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TextComponent, LogBox, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno,TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
  });

export default () => {
    const inputInformacaoAdicional = useRef(null);

    const [informacoesAdicionais, setInformacoesAdicionais] = useState([]);
    const [novaInformacaoAdicional, setNovaInformacaoAdicional] = useState("");
    const [informacaoEditavel, setInformacaoEditavel] = useState(false);
    const [selecionado, setSelecionado] = useState(null);

    const InformacaoAdicional = ({item, backgroundColor, editarInformacaoAdicional, removerInformacaoAdicional}) => {
        const [novaAtualizacao, setNovaAtualizacao] = useState("");
        return (
            <Informacao style={{marginBottom: 15}}>
                {selecionado === item
                    ?   <TextInput
                            style = {[styles.item, backgroundColor]}
                            textStyle = {TextStyles.baseText}
                            placeholder = {item}
                            placeholderTextColor = '#000000'
                            value = {novaAtualizacao}
                            autoFocus = {selecionado === item? true : false}
                            autoCapitalize = 'none'
                            maxLength = {60}
                            selectTextOnFocus = {true}
                            onChangeText = {
                                novaAtualizacao => setNovaAtualizacao(novaAtualizacao)
                            }
                        />
                    :   <Text style={TextStyles.baseText}>{novaAtualizacao!=='' ? novaAtualizacao : item}</Text>
    
                }                                    
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                    {selecionado === item
                        ?   (
                            novaAtualizacao!==""
                                ?   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress = {()=> editarInformacaoAdicional(item, novaAtualizacao)}
                                    >
                                        <Icon 
                                            name = 'done'
                                            size={24} color = "#000000"
                                        />
                                    </TouchableOpacity>
                                :   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress = {()=> {setSelecionado(null)}}
                                    >
                                        <Icon 
                                            name = 'clear'
                                            size={24} color = "#000000"
                                        />
                                    </TouchableOpacity>
                        )
                        :   <TouchableOpacity
                                style = {{marginHorizontal: 5}}
                                onPress = {()=> {setSelecionado(item)}}
                            >
                                <Icon 
                                    name = 'edit'
                                    size={24} color = "#000000"
                                />
                            </TouchableOpacity>
                    }                                        
                    <TouchableOpacity
                        style = {{marginHorizontal: 5}}
                        onPress ={()=>removerInformacaoAdicional(item)}
                    >
                        <Icon name='delete-forever' size={24} color = "#000000" />
                    </TouchableOpacity>
                </View>
            </Informacao>
        );
    }
    

    async function addInformacaoAdicional(){
        if (novaInformacaoAdicional === "") {
            Alert.alert("AVISO!", "Campo vazio");
            return;
            
        }
        const buscar = informacoesAdicionais.filter(
            informacoesAdicionais => informacoesAdicionais===novaInformacaoAdicional);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }

        setInformacoesAdicionais([...informacoesAdicionais, novaInformacaoAdicional]);
        setNovaInformacaoAdicional("");
        Keyboard.dismiss();
    }

    async function editarInformacaoAdicional(itemSelecionado, novaAtualizacao) {
        if (novaAtualizacao === "") {
            Alert.alert("AVISO!", "Nenhuma alteração");
            return;
            
        }
        const buscar = informacoesAdicionais.filter(
            informacoesAdicionais => informacoesAdicionais===novaAtualizacao);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }
        const novas = informacoesAdicionais.map(item => {
            if (item === itemSelecionado){
                item = novaAtualizacao;
                return item;
            }
            return item;
        })
        setInformacoesAdicionais(novas);
        setSelecionado(null);
        Keyboard.dismiss();
    }

    async function removerInformacaoAdicional(item) {
        Alert.alert(
            "Confirmar!",
            "Deseja remover esta informação?",
            [
                {
                    text: "Cancelar",
                    onPress: ()=> {
                        return;
                    },
                    style: 'cancel'
                },
                {
                    text: "Confirmar",
                    onPress: ()=>{
                        setInformacoesAdicionais(
                            informacoesAdicionais.filter(informacoesAdicionais => informacoesAdicionais!==item)
                        );
                    }
                }
            ],
            {cancelable: false}
        );        
    }

    useEffect(()=> {
        async function carregarInformacoesAdicionais(){
           const informacoesAdicionais = await AsyncStorage.getItem("informacoesAdicionais");
           if (informacoesAdicionais) {
               setInformacoesAdicionais(JSON.parse(informacoesAdicionais));
           }
        }
        carregarInformacoesAdicionais();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    } ,[]);

    useEffect(()=> {
        async function salvarInformacoesAdicionais(){
           AsyncStorage.setItem("informacoesAdicionais", JSON.stringify(informacoesAdicionais));
        }
        salvarInformacoesAdicionais();

    } ,[informacoesAdicionais]);
    
    
    const navigation = useNavigation();

    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Perfil'}]
        });
    }
    const renderItem = ({item}) => {
        const backgroundColor = selecionado === item? '#FFFFFF':'transparent';
        return(
            <TouchableWithoutFeedback onPress={()=>{}}>
                <InformacaoAdicional
                    item = {item}
                    editarInformacaoAdicional = {editarInformacaoAdicional}
                    removerInformacaoAdicional = {removerInformacaoAdicional}
                    backgroundColor = {{backgroundColor}}
                />
            </TouchableWithoutFeedback>
        )                                
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >

                <TopoInterno IconeCentral ={'format-list-bulleted'} setaVoltar = {Voltar}/>

                <ScrollView style={{width: '100%'}}>

                    <FlatList
                        style={{flex: 1, width: '100%', paddingHorizontal: 20, marginTop: 10}}
                        data={informacoesAdicionais}
                        extraData={selecionado}
                        keyExtractor={item => item.toString()}
                        showsVerticalScrollIndicator = {true}
                        renderItem={renderItem}
                    />

                    <View style = {{width: '100%', paddingHorizontal: 40, paddingBottom: 40, paddingTop: 10}}>

                        <AdicionarInformacao >
                            <TextInput
                                style = {{flex: 1}}
                                ref = {inputInformacaoAdicional}
                                textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                placeholder = {informacaoEditavel? "": "Toque para adicionar"}
                                placeholderTextColor = '#000000'
                                value = {novaInformacaoAdicional}
                                maxLength = {60}
                                selectTextOnFocus = {true}
                                onChangeText = {informacaoAdicional => setNovaInformacaoAdicional(informacaoAdicional)}
                                onFocus = {()=> {setInformacaoEditavel(true)}}
                                onBlur = {()=> {setInformacaoEditavel(false)}}
                            />
                            
                            <TouchableOpacity
                                style = {{marginHorizontal: 5}}
                                onPress={()=>addInformacaoAdicional()}
                            >
                                <Icon name='add' size={24} color = "#000000" />
                            </TouchableOpacity>                            
                            
                        </AdicionarInformacao>
                    </View>  

                </ScrollView>
            </View>
        </Container>
    );
};
export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
    width: 100%;
`;
export const Informacao = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;
`;
export const AdicionarInformacao = styled.View`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    padding-horizontal: 20px;
`;

export const BtnLista = styled.TouchableOpacity`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: row;     
`;