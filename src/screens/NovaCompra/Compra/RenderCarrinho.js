import React from 'react';
import { TouchableWithoutFeedback, Text } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../../components/Components';

export default ({produto}) => {    
    return(
        <TouchableWithoutFeedback onPress={()=>{}}>
            <ItemCompras style={{borderColor: "#000000", borderWidth: 2}}>
                <Text style={TextStyles.ListText}>
                    {produto.item.info.nome}
                </Text>
                
                <Text style={TextStyles.AlinhadoPaddingHorizontal10}>
                    {produto.item.info.descricao}
                </Text>
                
                <Text style={TextStyles.ListText}>
                    {`R$ ${produto.item.info.preco.toFixed(2)}`}
                </Text>
                
                <Text style={TextStyles.ListText}>
                    {`${produto.comprados}x`}
                </Text>
            </ItemCompras>
        </TouchableWithoutFeedback>
    )                                
    
};

export const ItemCompras = styled.View`
    height: 150px;
    border-radius: 20px;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
    margin-bottom: 5px;
`;