import React from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../components/Components';

export default ({consulta, indice}) => {
    return(
        <TouchableWithoutFeedback onPress={()=>{}}>
            <ItemConsultas>
                <Text style={TextStyles.AlinhadoMarginTop5}>
                    {`Consulta ${indice > 9 ? indice : 0+indice.toString()}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Data da Solicitação: ${consulta.nome.replace("Nova Consulta - ", "")}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Horário da Solicitação: ${consulta.horaDaSolicitacao}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Farmácia Selecionada:\n${consulta.nomeFarmaciaSelecionada}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Serviço Selecionado:\n${consulta.servico}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Data Agendada: ${consulta.dataAgendada}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginT15MarginB5}>
                    {`Horário Agendado: ${consulta.horaAgendada}`}
                </Text>                    
            </ItemConsultas>
        </TouchableWithoutFeedback>
    );
};
export const ItemConsultas = styled.View`
    background-color: #EEEEEE
    border-radius: 20px;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
    margin-bottom: 5px;
`;