import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { Alert, View, TouchableOpacity, TextInput, Keyboard, ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Container, TopoInterno, TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Api from '../../../Api';
import {InformacaoAdicional} from './EdicaoInformacoes'

export default () => {

    const navigation = useNavigation();

    const inputInformacaoAdicional = useRef(null);

    const {state: user} = useContext(UserContext);
    const {dispatch: userDispatch} = useContext(UserContext);

    const [novaInformacaoAdicional, setNovaInformacaoAdicional] = useState("");
    const [editando, setEditando] = useState(false);
    const [selecionado, setSelecionado] = useState(null);   
    

    const addInformacaoAdicional = async() => {
        if (novaInformacaoAdicional === "") {
            Alert.alert("AVISO!", "Campo vazio");
            return;
            
        }
        const buscar = user.informacoesAdicionais.filter(
            informacoesAdicionais => informacoesAdicionais===novaInformacaoAdicional);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }
        await Api.salvarInformacoesAdicionais([...user.informacoesAdicionais, novaInformacaoAdicional]);
        userDispatch({
            type: 'setInformacoesAdicionais',
            payload: {
                informacoesAdicionais: [...user.informacoesAdicionais, novaInformacaoAdicional]
            } 
        });
        setNovaInformacaoAdicional("");
        Keyboard.dismiss();
    }

    const editarInformacaoAdicional = async(itemSelecionado, novaAtualizacao) => {
        const buscar = user.informacoesAdicionais.filter(
            informacoesAdicionais => informacoesAdicionais===novaAtualizacao
        );
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        };
        Alert.alert(
            "Confirmar!",
            "Deseja salvar alterações?",
            [
                {
                    text: "Não",
                    onPress: ()=> {
                        return;
                    },
                    style: 'cancel'
                },
                {
                    text: "Sim",
                    onPress: async ()=>{
                        const novas = user.informacoesAdicionais.map(item => {
                            if (item === itemSelecionado){
                                item = novaAtualizacao;
                                return item;
                            }
                            return item;
                        });
                        await Api.salvarInformacoesAdicionais(novas);
                        userDispatch({
                            type: 'setInformacoesAdicionais',
                            payload: {
                                informacoesAdicionais: novas
                            } 
                        });
                        setSelecionado(null);
                        Keyboard.dismiss();
                    }
                }
            ],
            {cancelable: false}
        );
    }

    const removerInformacaoAdicional = (item) => {
        Alert.alert(
            "Confirmar!",
            "Deseja remover esta informação?",
            [
                {
                    text: "Não",
                    onPress: ()=> {
                        return;
                    },
                    style: 'cancel'
                },
                {
                    text: "Sim",
                    onPress: async ()=>{
                        const filter = user.informacoesAdicionais.filter(
                            informacoesAdicionais => informacoesAdicionais !== item
                        )
                        await Api.salvarInformacoesAdicionais(filter);
                        userDispatch({
                            type: 'setInformacoesAdicionais',
                            payload: {
                                informacoesAdicionais: filter
                            } 
                        });
                    }
                }
            ],
            {cancelable: false}
        );        
    }

    const Voltar = () => {
        navigation.reset({
            routes: [{name: 'Perfil'}]
        });
    }
    
    const RenderItem = ({item}) => {
        return(
            <InformacaoAdicional
                item = {item}
                editarInformacaoAdicional = {editarInformacaoAdicional}
                removerInformacaoAdicional = {removerInformacaoAdicional}
                setSelecionado = {setSelecionado}
                selecionado = {selecionado}
            />
        )                                
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >

                <TopoInterno IconeCentral = {'format-list-bulleted'} setaVoltar = {Voltar}/>

                {user.informacoesAdicionais.length === 0
                    ?   <NenhumaInformacao>
                            <Text style={TextStyles.baseText}>
                                Nenhuma informação
                            </Text>
                        </NenhumaInformacao> 
                    :   <ScrollView style={{width: '100%'}}>
                            {user.informacoesAdicionais.map(item => {
                                return(
                                    <View 
                                        style={{flex: 1, width: '100%', paddingHorizontal: 20, marginTop: 10}}
                                        key = {item}
                                    >
                                        <RenderItem item = {item}/>
                                    </View>
                                )
                            })}
                        </ScrollView>
                }

                <View style = {{width: '100%', paddingHorizontal: 40, paddingBottom: 40, paddingTop: 10}}>
                    <AdicionarInformacao >
                        <TextInput
                            style = {{flex: 1}}
                            ref = {inputInformacaoAdicional}
                            textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                            placeholder = {editando? "": "Toque para adicionar"}
                            placeholderTextColor = '#000000'
                            value = {novaInformacaoAdicional}
                            maxLength = {60}
                            selectTextOnFocus = {true}
                            onChangeText = {informacaoAdicional => setNovaInformacaoAdicional(informacaoAdicional)}
                            onFocus = {()=> setEditando(true)}
                            onBlur = {()=> setEditando(false)}
                        />
                        {editando &&
                            (novaInformacaoAdicional !== ""
                                ?   <View
                                        style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}
                                    >
                                        <TouchableOpacity
                                            style = {{marginHorizontal: 5}}
                                            onPress={() => setNovaInformacaoAdicional("")}
                                        >
                                            <Icon name='backspace' size={24} color = "#000000" />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style = {{marginHorizontal: 5}}
                                            onPress={addInformacaoAdicional}
                                        >
                                            <Icon name='add' size={24} color = "#000000" />
                                        </TouchableOpacity>

                                    </View>   

                                :   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress={()=> inputInformacaoAdicional.current.blur()}
                                    >
                                        <Icon name='clear' size={24} color = "#000000" />
                                    </TouchableOpacity>
                            )                         
                        }
                        
                    </AdicionarInformacao>
                </View>
            </View>
        </Container>
    );
};
export const NenhumaInformacao = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding-horizontal: 20px;
    margin-top: 10px;    
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