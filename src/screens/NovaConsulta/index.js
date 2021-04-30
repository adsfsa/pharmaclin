import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
<<<<<<< HEAD
import { FlatList, Alert, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TextComponent, Modal, Image, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno, TextStyles, TopHome } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { farmacias, servicos } from '../../database/registros.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
export default () => {
    useEffect(()=> {
        async function carregarConsultas(){
           const arrayConsultas = await AsyncStorage.getItem("consultas");
           if (arrayConsultas) {
            setArrayConsultas(JSON.parse(arrayConsultas));
           }
        }
        carregarConsultas();
    } ,[]);

    const [arrayConsultas, setArrayConsultas] = useState([])

    function dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return "Nova Consulta - "+diaF+"/"+mesF+"/"+anoF;
    };
    function formatarData(data){
        var date = data,
            day  = date.getDate().toString(),
            diaF = (day.length == 1) ? '0'+day : day,
            mes  = (date.getMonth()+1).toString(),
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = date.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }
    function formatarHora(data){
        var hour = data,
            horas  = hour.getHours().toString(),
            minutos = hour.getMinutes().toString();
        return horas+":"+minutos;
    }

    const [listaFarmacias, verListaFarmacias] = useState(false);

    const [tudo, verTudo] = useState(false);
    const [consulta, setConsulta] = useState({
        "nome": dataAtualFormatada(),
        "nomeFarmaciaSelecionada": '', 
        "servico": '',
        'dataAgendada': formatarData(new Date()),
        "horaAgendada": formatarHora(new Date()),
    });
    const [nomeFarmaciaSelecionada, selecionarNomeFarmacia] = useState('');
    const [servicosDaFarmacia, setServicosDaFarmacia] = useState([]);

    const [servicoSelecionado, selecionarServico] = useState([]);
    

    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState(new Date());
    const [dia, escolherDia] = useState(false);
    const [horario, escolherHorario] = useState(false);
    const [mudouH, mudouHorario] = useState(false);
    const [mudouD, mudouDia] = useState(false);
    

    const onChangeDia = (event, selectedDate) => {
        if (selectedDate === undefined) {
            const currentDate = selectedDate || data;
            escolherDia(Platform.OS === 'ios');
            mudouDia(false);
        }
        else{
            const currentDate = selectedDate || data;
            escolherDia(Platform.OS === 'ios');
            setData(currentDate);
            mudouDia(true);
        }
    };

    const onChangeHorario = (event, selectedDate) => {
        if (selectedDate === undefined) {
            const currentHour = selectedDate || hora;
            escolherHorario(Platform.OS === 'ios');
            mudouHorario(false);
        }
        else{
            const currentHour = selectedDate || hora;
            escolherHorario(Platform.OS === 'ios');
            setHora(currentHour);
            mudouHorario(true);
        }
    };
    const showTimepicker = () => {
        escolherHorario(true);
    };
    const showDatepicker = () => {
        escolherDia(true);
    };
=======
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
    
>>>>>>> 7e6072a5079c632cd05805a9f96565fc9755107b
    
    const navigation = useNavigation();

    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Home'}]
        });
    }
<<<<<<< HEAD

    const BuscarFarmacia = ()=>{
        verListaFarmacias(true);
    }

    const AbrirVerTudo = ()=>{
        const newConsulta = {
            "nome": dataAtualFormatada(),
            "nomeFarmaciaSelecionada": nomeFarmaciaSelecionada,
            "servico": servicoSelecionado.toString(),
            'dataAgendada': formatarData(data),
            "horaAgendada": formatarHora(hora)
        };
        setConsulta(newConsulta);
        verTudo(true);
    }

    const ConfirmarFarmacia = () => {
        if (nomeFarmaciaSelecionada!=='') {
            verListaFarmacias(false)
        }
        else {
            Alert.alert(
                "AVISO!",
                "Você não escolheu uma farmácia. Deseja escolher?",
                [
                    {
                        text: "Sim",
                        onPress: ()=> {
                            return;
                        }
                    },
                    {
                        text: "Não",
                        onPress: ()=>{
                            verListaFarmacias(false);
                        },
                        style: 'cancel'
                    }
                ],
                {cancelable: false}
            );    
        }
    }
    const FinalizarConsulta = () => {
        if(consulta.servico===""){
            Alert.alert("ERRO!", "Você não seleionou nenhum serviço");
            return;
        }
        else{
            if(nomeFarmaciaSelecionada!=="" && mudouD===true && mudouH===true){
                Alert.alert(
                    "Confirmar!",
                    "Deseja finalizar o agendamento agora?",
                    [
                        {
                            text: "Sim",
                            onPress: ()=> {
                                const consultaFinal = [...arrayConsultas, consulta];
                                AsyncStorage.setItem("consultas", JSON.stringify(consultaFinal));
                                console.log(consultaFinal);//curiosidade, para ver o resultado
                                verTudo(false);
                                navigation.reset({
                                    routes: [{name: 'NovaConsulta'}]
                                });
                            }
                        },
                        {
                            text: "Não",
                            onPress: ()=>{
                                return;
                            },
                            style: 'cancel'
                        }
                    ],
                    {cancelable: false}
                );
            }
            else{
                Alert.alert("ERRO!", "Preencha todas as informações")
            }
        }
    }
    function RenderFarmacias ({disponiveis, nomeFarmacia}) {
        const servicos_Disponiveis = disponiveis.map(
            id => servicos.find(obj => obj.id === id) || {}
        );

        return(
            <TouchableOpacity onPress = {
                nomeFarmaciaSelecionada === ""
                    ?   ()=>{selecionarNomeFarmacia(nomeFarmacia);
                        setServicosDaFarmacia(servicos_Disponiveis);}

                    :   (nomeFarmaciaSelecionada === nomeFarmacia
                            ?   ()=> {
                                    selecionarNomeFarmacia('');
                                    setServicosDaFarmacia([]);
                                }
                            :   ()=>{
                                    selecionarNomeFarmacia('');
                                    selecionarNomeFarmacia(nomeFarmacia);
                                    setServicosDaFarmacia(servicos_Disponiveis);
                            }
                        )
                }
            >
                <ItemFarmacia style={{
                        backgroundColor: nomeFarmaciaSelecionada === nomeFarmacia
                            ? '#27AE60'
                            : '#EEEEEE', 
                        marginBottom: 15
                    }}
                >
                    <Text style={TextStyles.ListText}>{nomeFarmacia}</Text>
                    {nomeFarmaciaSelecionada === nomeFarmacia
                        ?   <Icon name = 'check-box' size={24} color = "#FFFFFF"/>
                        :   <Icon name = 'check-box-outline-blank' size={24} color = "#000000"/>
                    }
                </ItemFarmacia>

            </TouchableOpacity>
        )                                
    }
=======
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

>>>>>>> 7e6072a5079c632cd05805a9f96565fc9755107b
    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopHome nomeIconeEsquerdo={'biotech'} setaVoltar={Voltar} nomeArea={'NOVA CONSULTA'}/>
<<<<<<< HEAD

                <TouchableOpacity
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress = {BuscarFarmacia}
                >
                    <Selecionar>
                        {nomeFarmaciaSelecionada !==''
                            ? <Text style={TextStyles.SearchText}>{nomeFarmaciaSelecionada}</Text>
                            : <Text style={TextStyles.SelectionText}>Escolha uma farmácia...</Text>

                        }
                        <Icon name='search' size={24} color = "#000000" />
                    </Selecionar>
                </TouchableOpacity>                
                
                {nomeFarmaciaSelecionada !== "" &&
                    <View style={{width: '100%', paddingHorizontal: 40, paddingTop: 15}}>
                        <View style={{ borderWidth: 1, borderColor: '#000000', borderRadius: 20 }}>
                            <Picker
                                selectedValue={servicoSelecionado}
                                style={{ height: 40, transform: [{scaleX: 0.9}, {scaleY: 0.9}]} }
                                onValueChange={(itemValue) =>
                                    selecionarServico(itemValue)
                                }>
                                    {
                                        servicosDaFarmacia.map(servico=>{
                                            return <Picker.Item label={servico.nome} value={servico.nome}/>
                                        })
                                    }
                            </Picker>
                        </View>
                    </View>
                }

                <TouchableOpacity 
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress={showDatepicker}
                >
                    <Selecionar>
                        <Text style={TextStyles.SelectionText}>
                            {mudouD
                                ? formatarData(data)
                                : "Selecione uma data..."

                            }
                        </Text>                     
                        <Icon name='today' size={24} color = "#000000" />
                    </Selecionar>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress={showTimepicker}
                >
                    <Selecionar>
                        <Text style={TextStyles.SelectionText}>
                            {mudouH
                                ? formatarHora(hora)
                                : "Selecione um horário..."

                            }
                        </Text>                     
                        <Icon name='schedule' size={24} color = "#000000" />
                    </Selecionar>
                </TouchableOpacity>

                {dia && (
                    <DateTimePicker
                        testID="datePicker"
                        value={data}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDia}
                    />
                )}
                {horario && (
                    <DateTimePicker
                        testID="timePicker"
                        value={hora}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeHorario}
                    />
                )}

                <TouchableOpacity
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress = {AbrirVerTudo}
                >
                    <Selecionar>
                        <Text style={TextStyles.SelectionText}>Verificar informações</Text>
                        <Icon name='format-list-bulleted' size={24} color = "#000000" />
                    </Selecionar>
                </TouchableOpacity>

            </View>
            <View>
                <Modal
                    animationType="slide"
                    visible={listaFarmacias}
                    onRequestClose={() => {
                        verListaFarmacias(false);
                    }}
                >
                    <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                        <FlatList
                            style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}
                            data={farmacias}
                            keyExtractor = {(item)=> item.id.toString()}
                            extraData={nomeFarmaciaSelecionada}
                            showsVerticalScrollIndicator = {true}
                            renderItem={({item}) => {
                                return(
                                    <RenderFarmacias disponiveis={item.servicos} nomeFarmacia={item.nome}/>
                                )                                
                            }}
                        />
                        <View style={{paddingBottom: 40}}>

                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {ConfirmarFarmacia}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Confirmar</Text>
                                    <Icon name='check' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {()=>verListaFarmacias(false)}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Fechar</Text>
                                    <Icon name='clear' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {
                                    ()=>{
                                        Alert.alert(
                                            "Confirmar!",
                                            "Deseja remover sua escolha?",
                                            [ 
                                                {
                                                    text: "Sim",
                                                    onPress: ()=>{
                                                        navigation.reset({routes: [{name: 'NovaCompra'}]});
                                                    }
                                                },
                                                {
                                                    text: "Não",
                                                    onPress: ()=> {
                                                        return;
                                                    },
                                                    style: 'cancel'
                                                }
                                            ],
                                            {cancelable: false}
                                        )                                        
                                    }
                                }
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Limpar</Text>
                                    <Icon name='delete-forever' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            </View>            
            <View>                
                <Modal
                    animationType="slide"
                    visible={tudo}
                    onRequestClose={() => {
                        verTudo(false);
                    }}
                >
                    <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                        <View style={{width: '100%', paddingHorizontal: 15, marginTop: 15}}>
                            <Text style={TextStyles.baseText}>
                                {consulta.nome}
                            </Text>
                        </View>
                        <View style={{paddingBottom: 40}}>
                            <View style={{width: '100%', paddingHorizontal: 15, marginTop: 15}}>

                                <Text style={TextStyles.ListText}>
                                    {consulta.servico!==""
                                        ?   `Serviço: ${consulta.servico}`
                                        :   "Selecione um serviço"
                                    }
                                </Text>

                                <Text style={TextStyles.ListText}>
                                    {consulta.nomeFarmaciaSelecionada!==""
                                        ?   `Local: ${consulta.nomeFarmaciaSelecionada}`
                                        :   "Escolha uma farmácia"
                                    }
                                </Text>

                                <Text style={TextStyles.ListText}>
                                    {mudouD
                                        ?   `Data selecionada: ${consulta.dataAgendada}`
                                        :   "Esolha uma data para sua consulta"
                                    }
                                </Text>

                                <Text style={TextStyles.ListText}>
                                    {mudouH
                                        ?   `Horário selecionado: ${consulta.horaAgendada}`
                                        :   "Esolha um horário para sua consulta"
                                    }
                                </Text>
                            </View>

                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {FinalizarConsulta}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Finalizar</Text>
                                    <Icon name='check' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {()=>verTudo(false)}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Fechar</Text>
                                    <Icon name='clear' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {
                                    ()=>{
                                        Alert.alert(
                                            "Confirmar!",
                                            "Deseja limpar todas as suas escolhas?",
                                            [ 
                                                {
                                                    text: "Sim",
                                                    onPress: ()=>{
                                                        navigation.reset({routes: [{name: 'NovaConsulta'}]});
                                                    }
                                                },
                                                {
                                                    text: "Não",
                                                    onPress: ()=> {
                                                        return;
                                                    },
                                                    style: 'cancel'
                                                }
                                            ],
                                            {cancelable: false}
                                        )                                        
                                    }
                                }
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Limpar tudo</Text>
                                    <Icon name='delete-forever' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            </View>            
=======
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
>>>>>>> 7e6072a5079c632cd05805a9f96565fc9755107b
        </Container>
    );
};

<<<<<<< HEAD
=======




>>>>>>> 7e6072a5079c632cd05805a9f96565fc9755107b
export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
    width: 100%;
`;
<<<<<<< HEAD
export const Produto = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    align-self: stretch
    align-items: flex-start;
    padding-horizontal: 20px;
`;
export const ItemFarmacia = styled.View`
    height: 50px;
    border-radius: 10px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
`;
export const ItemProdutos = styled.View`
    height: 150px;
    border-radius: 20px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
`;
export const ItemCompras = styled.View`
    height: 150px;
    border-radius: 20px;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
    margin-bottom: 5px;
`;
export const Compra = styled.View`
=======
export const Consulta = styled.View`
>>>>>>> 7e6072a5079c632cd05805a9f96565fc9755107b
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    justify-content: space-between;
    align-self: stretch
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;
`;
<<<<<<< HEAD
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
export const AdicionarCompra = styled.View`
=======
export const AdicionarConsulta = styled.View`
>>>>>>> 7e6072a5079c632cd05805a9f96565fc9755107b
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