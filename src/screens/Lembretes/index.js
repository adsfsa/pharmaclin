import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {ScrollView, Alert, Text, TouchableWithoutFeedback, View, TouchableOpacity, TextInput, Keyboard, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Container, TextStyles, TopHome } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalCompras from './ModalCompras';
import ModalConsultas from './ModalConsultas';
import Lembrete from './Lembrete';
import ApiLembretes from './ApiLembretes';

export default () => {

    const inputLembretes = useRef(null);
    const [tecladoAberto, abrirTeclado] = useState(false);

    const navigation = useNavigation();

    const {state: user} = useContext(UserContext);
    const {dispatch: userDispatch} = useContext(UserContext);

    const [novoLembrete, setNovoLembrete] = useState("");
    const [editando, setEditando] = useState(false);
    const [selecionado, setSelecionado] = useState(null);

    const [listaCompras, verListaCompras] = useState(false);
    const [listaConsultas, verListaConsultas] = useState(false);
    
    const addLembrete = async() => {
        if (novoLembrete === "") {
            Alert.alert("AVISO!", "Campo vazio");
            return;
            
        }
        const buscar = user.registrosPessoais.filter(
            lembrete => lembrete===novoLembrete);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Este lembrete já existe");
            return;
            
        }
        await ApiLembretes.salvarLembretes([...user.registrosPessoais, novoLembrete]);
        userDispatch({
            type: 'setLembretes',
            payload: {
                registrosPessoais: [...user.registrosPessoais, novoLembrete]
            } 
        });
        setNovoLembrete("");
        abrirTeclado(false);
        Keyboard.dismiss();
    }

    const editarLembrete = async(itemSelecionado, novaAtualizacao) => {
        const buscar = user.registrosPessoais.filter(
            lembrete => lembrete===novaAtualizacao
        );
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Este lembrete já existe");
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
                        const novos = user.registrosPessoais.map(item => {
                            if (item === itemSelecionado){
                                item = novaAtualizacao;
                                return item;
                            }
                            return item;
                        });
                        await ApiLembretes.salvarLembretes(novos);
                        userDispatch({
                            type: 'setLembretes',
                            payload: {
                                registrosPessoais: novos
                            } 
                        });
                        setSelecionado(null);
                        abrirTeclado(false);
                        Keyboard.dismiss();
                    }
                }
            ],
            {cancelable: false}
        );
    }

    const removerLembrete = async(item) => {
        Alert.alert(
            "Confirmar!",
            "Deseja remover este lembrete?",
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
                        const filter = user.registrosPessoais.filter(
                            lembrete => lembrete !== item
                        )
                        await ApiLembretes.salvarLembretes(filter);
                        userDispatch({
                            type: 'setLembretes',
                            payload: {
                                registrosPessoais: filter
                            } 
                        });
                        setSelecionado(null);
                        abrirTeclado(false);
                        Keyboard.dismiss();
                    }
                }
            ],
            {cancelable: false}
        );        
    }

    const AbrirListaCompras = ()=>{
        if(user.registrosCompra.length !==0){
            verListaCompras(true);
        }
        else{
            Alert.alert("AVISO!","Você ainda não fez nenhuma compra");
            return;
        }        
    };

    const AbrirListaConsultas = ()=>{
        if(user.registrosConsulta.length !==0){
            verListaConsultas(true);
        }
        else{
            Alert.alert("AVISO!","Você ainda não agendou nenhuma consulta");
            return;
        }  
    }; 
    
    const Voltar = () => {
        navigation.reset({
            routes: [{name: 'Home'}]
        });
    }
    const RenderItem = ({item, abrirTeclado}) => {
        return(
            <Lembrete
                item = {item}
                editarLembrete = {editarLembrete}
                removerLembrete = {removerLembrete}
                setSelecionado = {setSelecionado}
                selecionado = {selecionado}
                abrirTeclado = {abrirTeclado}
                tecladoAberto = {tecladoAberto}
            />
        )                                
    }

    return ( 
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopHome
                    nomeIconeEsquerdo={'notifications-active'}
                    setaVoltar={Voltar}
                    nomeArea={'LEMBRETES'}
                />
                {user.registrosPessoais.length === 0
                    ?   <NenhumLembrete>
                            <Text style={TextStyles.baseText}>
                                Nenhum Lembrete
                            </Text>
                        </NenhumLembrete> 
                    :   <ScrollView style={{width: '100%'}}>
                            {user.registrosPessoais.map(item => {
                                return(
                                    <View 
                                        style={{flex: 1, width: '100%', paddingHorizontal: 20, marginTop: 10}}
                                        key = {item}
                                    >
                                        <RenderItem item={item} abrirTeclado={abrirTeclado}/>
                                    </View>
                                )
                            })}
                        </ScrollView>
                }
                {tecladoAberto === false &&
                    <View style = {{width: '100%', paddingHorizontal: 40}}>
                        <View style={{width: '100%'}}>
                            <Selecionar>
                                <Text style={TextStyles.SelectionText}>Exibir suas compras</Text>

                                <Switch
                                    trackColor={{ false: "#767577", true: "#27AE60" }}
                                    thumbColor={listaCompras ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={AbrirListaCompras}
                                    value={listaCompras}
                                />
                            </Selecionar>
                        </View>

                        <View style={{width: '100%', paddingTop: 15}}>
                            <Selecionar>
                                <Text style={TextStyles.SelectionText}>Exibir suas consultas</Text>

                                <Switch
                                    trackColor={{ false: "#767577", true: "#27AE60" }}
                                    thumbColor={listaConsultas ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={AbrirListaConsultas}
                                    value={listaConsultas}
                                />
                            </Selecionar>
                        </View>
                    </View>
                }
                <View style = {{width: '100%', paddingBottom: 40, paddingTop: 15, paddingHorizontal: 40}}>
                    <AdicionarLembrete >
                        <TextInput
                            style = {{flex: 1}}
                            ref = {inputLembretes}
                            textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                            placeholder = {editando? "": "Adicione um lembrete"}
                            placeholderTextColor = '#000000'
                            value = {novoLembrete}
                            maxLength = {60}
                            selectTextOnFocus = {true}
                            onChangeText = {lembrete => setNovoLembrete(lembrete)}
                            onSubmitEditing={() => {Keyboard.dismiss; abrirTeclado(false)}}
                            onFocus = {()=> {setEditando(true); abrirTeclado(true)}}
                            onBlur = {()=> {setEditando(false); abrirTeclado(false)}}
                        />
                        {editando &&
                            (novoLembrete !== ""
                                ?   <View
                                        style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}
                                    >
                                        <TouchableOpacity
                                            style = {{marginHorizontal: 5}}
                                            onPress={() => setNovoLembrete("")}
                                        >
                                            <Icon name='backspace' size={24} color = "#000000" />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style = {{marginHorizontal: 5}}
                                            onPress={addLembrete}
                                        >
                                            <Icon name='add' size={24} color = "#000000" />
                                        </TouchableOpacity>

                                    </View>   

                                :   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress={()=> inputLembretes.current.blur()}
                                    >
                                        <Icon name='clear' size={24} color = "#000000" />
                                    </TouchableOpacity>
                            )                         
                        }
                    </AdicionarLembrete>
                </View>                         
            </View>
            
            <ModalCompras
                listaCompras = {listaCompras}
                verListaCompras = {verListaCompras}
                arrayCompras = {user.registrosCompra}
            />
            <ModalConsultas
                listaConsultas = {listaConsultas}
                verListaConsultas = {verListaConsultas}
                arrayConsultas = {user.registrosConsulta}
            />

        </Container>
    );
};
export const NenhumLembrete = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    padding-horizontal: 20px;
    margin-top: 10px;    
`;
export const AdicionarLembrete = styled.View`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    padding-horizontal: 20px;
`;
export const Selecionar= styled.View`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    padding-horizontal: 20px;
`;