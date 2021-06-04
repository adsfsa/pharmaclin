import React from 'react';
import { Alert, Text, View, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ApiConsulta from '../ApiConsulta';

export default (
    {tudo, verTudo, consulta, farmaciaSelecionada, mudouD, mudouH, user, userDispatch, formatarHora}
) => {
    const navigation = useNavigation();
    
    const FinalizarConsulta = () => {
        if(consulta.servico === ""){
            Alert.alert("ERRO!", "Você não selecionou nenhum serviço");
            return;
        }
        else{
            if(farmaciaSelecionada.id!=="" && mudouD===true && mudouH===true){
                Alert.alert(
                    "Confirmar!",
                    "Deseja finalizar o agendamento agora?",
                    [
                        {
                            text: "Sim",
                            onPress: ()=> {
                                ApiConsulta.salvarConsulta(
                                    {...consulta, horaDaSolicitacao: formatarHora(new Date())},
                                    user,
                                    userDispatch
                                );
                                verTudo(false);
                                Alert.alert('Concluído!', 'Sua consulta foi agendada.');
                                //console.log(registroCompra);//curiosidade, para ver o resultado
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
    return (
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
                    <View style={{flex: 1, paddingBottom: 40}}>
                        <View style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}>

                            <Text style={TextStyles.ListText}>
                                {consulta.servico !== ""
                                    ?   `Serviço: ${consulta.servico}`
                                    :   "Selecione um serviço"
                                }
                            </Text>

                            <Text style={TextStyles.ListText}>
                                {consulta.nomeFarmaciaSelecionada !== ""
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
    );
};
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