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
    const inputCompra = useRef(null);

    const [compras, setCompras] = useState([]);
    const [novaCompra, setNovaCompra] = useState("");
    const [compraEditavel, setCompraEditavel] = useState(false);
    const [selecionado, setSelecionado] = useState(null);

    const Compra = ({item, backgroundColor, editarCompra, removerCompra}) => {
        const [novaAtualizacao, setNovaAtualizacao] = useState("");
        return (
            <Compra style={{marginBottom: 15}}>
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
                                        onPress = {()=> editarCompra(item, novaAtualizacao)}
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
                        onPress ={()=>removerCompra(item)}
                    >
                        <Icon name='delete-forever' size={24} color = "#000000" />
                    </TouchableOpacity>
                </View>
            </Compra>
        );
    }
    

    async function addCompra(){
        if (novaCompra === "") {
            Alert.alert("AVISO!", "Campo vazio");
            return;
            
        }
        const buscar = compras.filter(
            compras => compras===novaCompra);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }

        setCompras([...compras, novaCompra]);
        setNovaCompra("");
        Keyboard.dismiss();
    }

    async function editarCompra(itemSelecionado, novaAtualizacao) {
        if (novaAtualizacao === "") {
            Alert.alert("AVISO!", "Nenhuma alteração");
            return;
            
        }
        const buscar = compras.filter(
            compras => compras===novaAtualizacao);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }
        const novos = compras.map(item => {
            if (item === itemSelecionado){
                item = novaAtualizacao;
                return item;
            }
            return item;
        })
        setCompras(novos);
        setSelecionado(null);
        Keyboard.dismiss();
    }

    async function removerCompra(item) {
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
                            compras.filter(compras => compras!==item)
                        );
                    }
                }
            ],
            {cancelable: false}
        );        
    }

    useEffect(()=> {
        async function carregarCompras(){
           const compras = await AsyncStorage.getItem("compras");
           if (compras) {
               setCompras(JSON.parse(compras));
           }
        }
        carregarCompras();
    } ,[]);

    useEffect(()=> {
        async function salvarCompras(){
           AsyncStorage.setItem("compras", JSON.stringify(compras));
        }
        salvarCompras();

    } ,[compras]);
    
    
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
                <Compra
                    item = {item}
                    editarCompra = {editarCompra}
                    removerCompra = {removerCompra}
                    backgroundColor = {{backgroundColor}}
                />
            </TouchableWithoutFeedback>
        )                                
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopHome nomeIconeEsquerdo={'shopping-cart'} setaVoltar={Voltar} nomeArea={'NOVA COMPRA'}/>
                <FlatList
                    style={{flex: 1, width: '100%', paddingHorizontal: 40, marginTop: 15}}
                    data={compras}
                    extraData={selecionado}
                    keyExtractor={item => item.toString()}
                    showsVerticalScrollIndicator = {true}
                    renderItem={renderItem}
                />
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                    <View style = {{width: '100%', paddingHorizontal: 40, paddingBottom: 40, paddingTop: 15}}>
                            <AdicionarCompra >
                                <TextInput
                                    style = {{flex: 1}}
                                    ref = {inputCompra}
                                    textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                    placeholder = {compraEditavel? "": "Adicione uma compra"}
                                    placeholderTextColor = '#000000'
                                    value = {novaCompra}
                                    maxLength = {60}
                                    selectTextOnFocus = {true}
                                    onChangeText = {Compra => setNovaCompra(Compra)}
                                    onFocus = {()=> {setCompraEditavel(true)}}
                                    onBlur = {()=> {setCompraEditavel(false)}}
                                />
                                {compraEditavel &&
                                    <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress={()=>addCompra()}
                                    >
                                        <Icon name='add-circle-outline' size={24} color = "#000000" />
                                    </TouchableOpacity>                            
                                }
                            </AdicionarCompra>
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
export const Compra = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    justify-content: space-between;
    align-self: stretch
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;
`;
export const AdicionarCompra = styled.View`
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