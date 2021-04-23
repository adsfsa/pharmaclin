import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FlatList, Alert, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TextComponent } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno,TextStyles, TopHome } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
  });

export default () => {
    const inputLembretes = useRef(null);

    const [lembretes, setLembretes] = useState([]);
    const [novoLembrete, setNovoLembrete] = useState("");
    const [lembreteEditavel, setLembreteEditavel] = useState(false);
    const [selecionado, setSelecionado] = useState(null);

    const Lembrete = ({item, backgroundColor, editarLembrete, removerLembrete}) => {
        const [novaAtualizacao, setNovaAtualizacao] = useState("");
        return (
            <Lembrete style={{marginBottom: 15}}>
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
                                        onPress = {()=> editarLembrete(item, novaAtualizacao)}
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
                        onPress ={()=>removerLembrete(item)}
                    >
                        <Icon name='delete-forever' size={24} color = "#000000" />
                    </TouchableOpacity>
                </View>
            </Lembrete>
        );
    }
    

    async function addLembrete(){
        if (novoLembrete === "") {
            Alert.alert("AVISO!", "Campo vazio");
            return;
            
        }
        const buscar = lembretes.filter(
            lembretes => lembretes===novoLembrete);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }

        setLembretes([...lembretes, novoLembrete]);
        setNovoLembrete("");
        Keyboard.dismiss();
    }

    async function editarLembrete(itemSelecionado, novaAtualizacao) {
        if (novaAtualizacao === "") {
            Alert.alert("AVISO!", "Nenhuma alteração");
            return;
            
        }
        const buscar = lembretes.filter(
            lembretes => lembretes===novaAtualizacao);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }
        const novos = lembretes.map(item => {
            if (item === itemSelecionado){
                item = novaAtualizacao;
                return item;
            }
            return item;
        })
        setLembretes(novos);
        setSelecionado(null);
        Keyboard.dismiss();
    }

    async function removerLembrete(item) {
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
                        setLembretes(
                            lembretes.filter(lembretes => lembretes!==item)
                        );
                    }
                }
            ],
            {cancelable: false}
        );        
    }

    useEffect(()=> {
        async function carregarLembretes(){
           const lembretes = await AsyncStorage.getItem("lembretes");
           if (lembretes) {
               setLembretes(JSON.parse(lembretes));
           }
        }
        carregarLembretes();
    } ,[]);

    useEffect(()=> {
        async function salvarLembretes(){
           AsyncStorage.setItem("lembretes", JSON.stringify(lembretes));
        }
        salvarLembretes();

    } ,[lembretes]);
    
    
    const navigation = useNavigation();

    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Home'}]
        });
    }
    const renderItem = ({item}) => {
        const backgroundColor = selecionado === item? '#FFFFFF':'transparent';
        return(
            <TouchableWithoutFeedback onPress={()=>{}}>
                <Lembrete
                    item = {item}
                    editarLembrete = {editarLembrete}
                    removerLembrete = {removerLembrete}
                    backgroundColor = {{backgroundColor}}
                />
            </TouchableWithoutFeedback>
        )                                
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopHome nomeIconeEsquerdo={'notifications-active'} setaVoltar={Voltar} nomeArea={'LEMBRETES'}/>
                <FlatList
                    style={{flex: 1, width: '100%', paddingHorizontal: 40, marginTop: 15}}
                    data={lembretes}
                    extraData={selecionado}
                    keyExtractor={item => item.toString()}
                    showsVerticalScrollIndicator = {true}
                    renderItem={renderItem}
                />
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                    <View style = {{width: '100%', paddingHorizontal: 40, paddingBottom: 40, paddingTop: 15}}>
                            <AdicionarLembrete >
                                <TextInput
                                    style = {{flex: 1}}
                                    ref = {inputLembretes}
                                    textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                    placeholder = {lembreteEditavel? "": "Adicione um lembrete"}
                                    placeholderTextColor = '#000000'
                                    value = {novoLembrete}
                                    maxLength = {60}
                                    selectTextOnFocus = {true}
                                    onChangeText = {Lembrete => setNovoLembrete(Lembrete)}
                                    onFocus = {()=> {setLembreteEditavel(true)}}
                                    onBlur = {()=> {setLembreteEditavel(false)}}
                                />
                                {lembreteEditavel &&
                                    <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress={()=>addLembrete()}
                                    >
                                        <Icon name='add-circle-outline' size={24} color = "#000000" />
                                    </TouchableOpacity>                            
                                }
                            </AdicionarLembrete>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Container>
    );
};





export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
    width: 100%;
`;
export const Lembrete = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    justify-content: space-between;
    align-self: stretch
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;
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

export const BtnLista = styled.TouchableOpacity`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: row;     
`;