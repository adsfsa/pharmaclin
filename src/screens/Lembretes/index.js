import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {ScrollView, LogBox, FlatList, Alert, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TextComponent, Modal, Image, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno, TextStyles, TopHome } from '../../components/Components';
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

    const [arrayCompras, setArrayCompras] = useState([]);
    const [arrayConsultas, setArrayConsultas] = useState([]);    

    const [listaCompras, verListaCompras] = useState(false);
    const [listaConsultas, verListaConsultas] = useState(false);    

    const Lembrete = ({item, backgroundColor, editarLembrete, removerLembrete}) => {
        const [novaAtualizacao, setNovaAtualizacao] = useState("");
        return (
            <LembreteItem style={{marginBottom: 15}}>
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
            </LembreteItem>
        );
    }

    const AbrirListaCompras = ()=>{
        if(arrayCompras.length !==0){
            verListaCompras(true);
        }
        else{
            Alert.alert("AVISO!","Você ainda não fez nenhuma compra");
            return;
        }        
    };

    const AbrirListaConsultas = ()=>{
        if(arrayConsultas.length !==0){
            verListaConsultas(true);
        }
        else{
            Alert.alert("AVISO!","Você ainda não agendou nenhuma consulta");
            return;
        }  
    };    

    async function addLembrete(){
        if (novoLembrete === "") {
            Alert.alert("AVISO!", "Campo vazio");
            return;
            
        }
        const buscar = lembretes.filter(
            lembrete => lembrete===novoLembrete);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Este lembrete já existe");
            return;
            
        }

        setLembretes([...lembretes, novoLembrete]);
        console.log(lembretes)
        setNovoLembrete("");
        Keyboard.dismiss();
    }

    async function editarLembrete(itemSelecionado, novaAtualizacao) {
        if (novaAtualizacao === "") {
            Alert.alert("AVISO!", "Nenhuma alteração");
            return;
            
        }
        const buscar = lembretes.filter(
            lembrete => lembrete===novaAtualizacao);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Este lembrete já existe");
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
            "Deseja remover este lembrete?",
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
        async function carregarCompras(){
            const arrayCompras = await AsyncStorage.getItem("compras");
            if (arrayCompras) {
                setArrayCompras(JSON.parse(arrayCompras));
            }
        }
        async function carregarConsultas(){
            const arrayConsultas = await AsyncStorage.getItem("consultas");
            if (arrayConsultas) {
                setArrayConsultas(JSON.parse(arrayConsultas));
            }
        }
        carregarLembretes();
        carregarCompras();
        carregarConsultas();
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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
    function RenderListaCarrinho ({item}) {
        return(
            <TouchableWithoutFeedback onPress={()=>{}}>
                <ItemCarinho style={{borderColor: "#000000", borderWidth: 2}}>
                    <Text style={TextStyles.ListText}>{item.nome}</Text>
                    <Text style={TextStyles.ListText}>{item.descricao}</Text>
                    <Text style={TextStyles.ListText}>{`R$ ${item.preco.toFixed(2)}`}</Text>
                    <Text style={TextStyles.ListText}>{`${item.comprados}x`}</Text>
                </ItemCarinho>
            </TouchableWithoutFeedback>
        )                                
    }
    function RenderCompras ({info}) {
        return(
            <TouchableWithoutFeedback onPress={()=>{}}>
                <ItemCompras>
                    <Text style={TextStyles.ListText}>{info.nome}</Text>

                    <Text style={TextStyles.ListText}>
                        {`Farmácia Selecionada: ${info.nomeFarmaciaSelecionada}`}
                    </Text>

                    <Text style={TextStyles.ListText}>{`Total: R$ ${info.total}`}</Text>

                    <Text style={TextStyles.ListText}>
                        {`Horário Para a Entrega: ${info.horaParaEntrega}`}
                    </Text>

                    <Text style={TextStyles.ListText}>{`Produtos Comprados:`}</Text>

                    <FlatList
                        style={{flex: 1, width: '100%', paddingHorizontal: 40, marginTop: 15}}
                        data={info.carrinho}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator = {true}
                        renderItem={({item}) => {
                            return(
                                <RenderListaCarrinho item={item}/>
                            )                                
                        }}
                    />
                </ItemCompras>
            </TouchableWithoutFeedback>
        )                                
    }
    function RenderConsultas ({info}) {
        return(
            <TouchableWithoutFeedback onPress={()=>{}}>
                <ItemConsultas>
                    <Text style={TextStyles.ListText}>
                        {info.nome}
                    </Text>

                    <Text style={TextStyles.ListText}>
                        {`Farmácia Selecionada: ${info.nomeFarmaciaSelecionada}`}
                    </Text>

                    <Text style={TextStyles.ListText}>
                        {`Serviço Selecionado: ${info.servico}`}
                    </Text>

                    <Text style={TextStyles.ListText}>
                        {`Data Selecionada: ${info.dataAgendada}`}
                    </Text>

                    <Text style={TextStyles.ListText}>
                        {`Horário Selecionado: ${info.horaAgendada}`}
                    </Text>                    
                </ItemConsultas>
            </TouchableWithoutFeedback>
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
                <ScrollView style={{width: '100%'}}>
                    <FlatList
                        style={{width: '100%', paddingHorizontal: 20, marginTop: 15}}
                        data={lembretes}
                        extraData={selecionado}
                        keyExtractor={(item) => item.toString()}
                        showsVerticalScrollIndicator = {true}
                        renderItem={renderItem}
                    />

                    <View style = {{width: '100%', paddingHorizontal: 40}}>
                        <View style = {{width: '100%', paddingTop: 15}}>
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
                                    <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress={()=>addLembrete()}
                                    >
                                        <Icon name='add-circle-outline' size={24} color = "#000000" />
                                    </TouchableOpacity>
                                </AdicionarLembrete>
                        </View>
                    
                        <View style={{width: '100%', paddingTop: 15}}>
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

                        <View style={{width: '100%', paddingBottom: 40, paddingTop: 15}}>
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
                </ScrollView>                                                    
            </View>
            
            <View>
                <Modal
                    animationType="slide"
                    visible={listaCompras}
                    onRequestClose={() => {
                        verListaCompras(false);
                    }}
                >
                    <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                        <FlatList
                            style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}
                            data={arrayCompras}
                            keyExtractor = {(item)=> item.total}
                            showsVerticalScrollIndicator = {true}
                            renderItem={({item}) => {
                                return(
                                    <RenderCompras info={item}/>
                                )                                
                            }}
                        />
                        <View style={{paddingBottom: 40}}>                            
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {()=>verListaCompras(false)}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Fechar</Text>
                                    <Icon name='clear' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>                            
                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal
                    animationType="slide"
                    visible={listaConsultas}
                    onRequestClose={() => {
                        verListaConsultas(false);
                    }}
                >
                    <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                        <FlatList
                            style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}
                            data={arrayConsultas}
                            keyExtractor = {(item)=> item.toString()}
                            showsVerticalScrollIndicator = {true}
                            renderItem={({item}) => {
                                return(
                                    <RenderConsultas info={item}/>
                                )                                
                            }}
                        />
                        <View style={{paddingBottom: 40}}>                            
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {()=>verListaConsultas(false)}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Fechar</Text>
                                    <Icon name='clear' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>                            
                        </View>
                    </View>
                </Modal>
            </View>
        </Container>
    );
};
export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
    width: 100%;
`;
export const LembreteItem = styled.View`
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
export const AcaoModal= styled.View`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    padding-horizontal: 20px;
`;
export const ItemConsultas = styled.View`
    background-color: #EEEEEE
    border-radius: 20px;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
    margin-bottom: 5px;
`;
export const ItemCompras = styled.View`
    background-color: #EEEEEE
    border-radius: 20px;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
    margin-bottom: 5px;
`;
export const ItemCarinho = styled.View`
    height: 150px;
    border-radius: 20px;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 5px;
`;