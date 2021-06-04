import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Container, TextStyles, TopHome } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import ModalFarmacias from './Farmacias/ModalFarmacias';
import ModalConsultas from './Consulta/ModalConsultas'
import ApiConsulta from './ApiConsulta';

export default () => {
    const {state: user} = useContext(UserContext);
    const {dispatch: userDispatch} = useContext(UserContext);

    useEffect(()=> {
        async function carregarFarmacias() {
            const arrayIds = await ApiConsulta.carregarFarmacias();
            if (arrayIds) {
                setFarmacias(arrayIds);
            }
        }
        carregarFarmacias();
    } ,[]);    

    const [farmacias, setFarmacias] = useState(null);
    const [servicosDaFarmacia, setServicosDaFarmacia] = useState([]);
    const [farmaciaSelecionada, selecionarFarmacia] = useState( {id: "", info: {}} );
    const [listaFarmacias, verListaFarmacias] = useState(false);
    const [tudo, verTudo] = useState(false);

    const [consulta, setConsulta] = useState({
        id: Date.now().toString(),
        nome: nomeConsulta(),
        nomeFarmaciaSelecionada: "", 
        servico: "",
        dataAgendada: formatarData(new Date()),
        horaAgendada: formatarHora(new Date()),
    });

    const [servicoSelecionado, selecionarServico] = useState("");
    const [data, setData] = useState(new Date());
    const [hora, setHora] = useState(new Date());
    const [dia, escolherDia] = useState(false);
    const [horario, escolherHorario] = useState(false);
    const [mudouH, mudouHorario] = useState(false);
    const [mudouD, mudouDia] = useState(false);

    const navigation = useNavigation();

    function nomeConsulta(){
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
    };

    function formatarHora(data){
        var hour = data,
            horas = hour.getHours(),
            minutos = hour.getMinutes();
        if(horas < 10){
            horas = "0"+horas;
        }
        if(minutos < 10){
            minutos = "0"+minutos;
        }
        return horas+":"+minutos;
    }

    const onChangeDia = (event, selectedDate) => {
        if (selectedDate === undefined) {
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

    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Home'}]
        });
    }

    const BuscarFarmacia = ()=>{
        verListaFarmacias(true);
    }

    const AbrirVerTudo = ()=>{
        const newConsulta = {
            id: Date.now().toString(),
            nome: nomeConsulta(),
            nomeFarmaciaSelecionada: farmaciaSelecionada.id === "" ? "" : farmaciaSelecionada.info.nome,
            servico: servicoSelecionado,
            dataAgendada: formatarData(data),
            horaAgendada: formatarHora(hora)
        };
        setConsulta(newConsulta);
        verTudo(true);
    }
    
    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopHome nomeIconeEsquerdo={'biotech'} setaVoltar={Voltar} nomeArea={'NOVA CONSULTA'}/>

                <TouchableOpacity
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress = {BuscarFarmacia}
                >
                    <Selecionar>
                        {farmaciaSelecionada.id !==''
                            ? <Text style={TextStyles.SearchText}>{farmaciaSelecionada.info.nome}</Text>
                            : <Text style={TextStyles.SelectionText}>Escolha uma farmácia...</Text>

                        }
                        <Icon name='search' size={24} color = "#000000" />
                    </Selecionar>
                </TouchableOpacity>                
                
                {farmaciaSelecionada.id !== "" &&
                    <View style={{width: '100%', paddingHorizontal: 40, paddingTop: 15}}>
                        <View style={{ borderWidth: 1, borderColor: '#000000', borderRadius: 20 }}>
                            <Picker
                                selectedValue={servicoSelecionado}
                                style={{ height: 40, transform: [{scaleX: 0.9}, {scaleY: 0.9}]} }
                                onValueChange={(itemValue, itemIndex) =>
                                    selecionarServico(itemValue)
                                }
                            >
                                {
                                    servicosDaFarmacia.map(servico=>{
                                        return <Picker.Item 
                                        label={servico.info.nome}
                                        value={servico.info.nome}
                                        key = {servico.id}/>
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
            <ModalFarmacias
                farmacias = {farmacias}
                listaFarmacias = {listaFarmacias}
                verListaFarmacias = {verListaFarmacias}
                farmaciaSelecionada = {farmaciaSelecionada}
                selecionarFarmacia = {selecionarFarmacia}
                setServicosDaFarmacia = {setServicosDaFarmacia}
                servicosDaFarmacia = {servicosDaFarmacia}
                selecionarServico = {selecionarServico}
            />
            <ModalConsultas
                tudo = {tudo}
                verTudo = {verTudo}
                consulta = {consulta}
                farmaciaSelecionada = {farmaciaSelecionada}
                mudouD = {mudouD}
                mudouH = {mudouH}
                user = {user}
                userDispatch = {userDispatch}
                formatarHora = {formatarHora}
            />       
        </Container>
    );
};
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