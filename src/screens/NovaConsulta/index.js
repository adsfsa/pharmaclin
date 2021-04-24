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
    const inputConsulta = useRef(null);

    const [consultas, setConsultas] = useState([]);
    const [novaConsulta, setNovaConsulta] = useState("");
    const [compraEditavel, setConsultaEditavel] = useState(false);
    const [selecionado, setSelecionado] = useState(null);

    const Consulta = ({item, backgroundColor, editarConsulta, removerConsulta}) => {
        const [novaAtualizacao, setNovaAtualizacao] = useState("");
        return (
            <Consulta style={{marginBottom: 15}}>
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
                                        onPress = {()=> editarConsulta(item, novaAtualizacao)}
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
                        onPress ={()=>removerConsulta(item)}
                    >
                        <Icon name='delete-forever' size={24} color = "#000000" />
                    </TouchableOpacity>
                </View>
            </Consulta>
        );
    }
    

    async function addConsulta(){
        if (novaConsulta === "") {
            Alert.alert("AVISO!", "Campo vazio");
            return;
            
        }
        const buscar = consultas.filter(
            consultas => consultas===novaConsulta);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }

        setConsultas([...consultas, novaConsulta]);
        setNovaConsulta("");
        Keyboard.dismiss();
    }

    async function editarConsulta(itemSelecionado, novaAtualizacao) {
        if (novaAtualizacao === "") {
            Alert.alert("AVISO!", "Nenhuma alteração");
            return;
            
        }
        const buscar = consultas.filter(
            consultas => consultas===novaAtualizacao);
        if (buscar.length !== 0) {
            Alert.alert("AVISO!", "Esta informação já existe");
            return;
            
        }
        const novos = consultas.map(item => {
            if (item === itemSelecionado){
                item = novaAtualizacao;
                return item;
            }
            return item;
        })
        setConsultas(novos);
        setSelecionado(null);
        Keyboard.dismiss();
    }

    async function removerConsulta(item) {
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
                            consultas.filter(consultas => consultas!==item)
                        );
                    }
                }
            ],
            {cancelable: false}
        );        
    }

    useEffect(()=> {
        async function carregarConsultas(){
           const consultas = await AsyncStorage.getItem("consultas");
           if (consultas) {
               setConsultas(JSON.parse(consultas));
           }
        }
        carregarConsultas();
    } ,[]);

    useEffect(()=> {
        async function salvarConsultas(){
           AsyncStorage.setItem("consultas", JSON.stringify(consultas));
        }
        salvarConsultas();

    } ,[consultas]);
    
    
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
                <Consulta
                    item = {item}
                    editarConsulta = {editarConsulta}
                    removerConsulta = {removerConsulta}
                    backgroundColor = {{backgroundColor}}
                />
            </TouchableWithoutFeedback>
        )                                
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopHome nomeIconeEsquerdo={'biotech'} setaVoltar={Voltar} nomeArea={'NOVA CONSULTA'}/>
                <FlatList
                    style={{flex: 1, width: '100%', paddingHorizontal: 40, marginTop: 15}}
                    data={consultas}
                    extraData={selecionado}
                    keyExtractor={item => item.toString()}
                    showsVerticalScrollIndicator = {true}
                    renderItem={renderItem}
                />
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                    <View style = {{width: '100%', paddingHorizontal: 40, paddingBottom: 40, paddingTop: 15}}>
                            <AdicionarConsulta >
                                <TextInput
                                    style = {{flex: 1}}
                                    ref = {inputConsulta}
                                    textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                                    placeholder = {compraEditavel? "": "Adicione uma consulta"}
                                    placeholderTextColor = '#000000'
                                    value = {novaConsulta}
                                    maxLength = {60}
                                    selectTextOnFocus = {true}
                                    onChangeText = {Consulta => setNovaConsulta(Consulta)}
                                    onFocus = {()=> {setConsultaEditavel(true)}}
                                    onBlur = {()=> {setConsultaEditavel(false)}}
                                />
                                {compraEditavel &&
                                    <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress={()=>addConsulta()}
                                    >
                                        <Icon name='add-circle-outline' size={24} color = "#000000" />
                                    </TouchableOpacity>                            
                                }
                            </AdicionarConsulta>
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
export const Consulta = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    justify-content: space-between;
    align-self: stretch
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;
`;
export const AdicionarConsulta = styled.View`
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