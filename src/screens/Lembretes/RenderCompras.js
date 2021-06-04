import React from 'react';
import { FlatList, Text, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../components/Components';

export default ({compra, indice}) => {
    const RenderListaCarrinho = ({item}) => {
        return(
            <TouchableWithoutFeedback onPress={()=>{}}>
                <ItemCarinho style={{borderColor: "#000000", borderWidth: 2}}>
                    <Text style={TextStyles.ListText}>
                        {item.item.info.nome}
                    </Text>

                    <Text style={TextStyles.AlinhadoPaddingHorizontal10}>
                        {item.item.info.descricao}
                    </Text>

                    <Text style={TextStyles.ListText}>
                        {`R$ ${item.item.info.preco.toFixed(2)}`}
                    </Text>

                    <Text style={TextStyles.ListText}>
                        {`${item.comprados}x`}
                    </Text>
                </ItemCarinho>
            </TouchableWithoutFeedback>
        )                                
    };

    return(
        <TouchableWithoutFeedback onPress={()=>{}}>
            <ItemCompras>
                <Text style={TextStyles.AlinhadoMarginTop5}>
                    {`Compra ${indice > 9 ? indice : 0+indice.toString()}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Data do Pedido: ${compra.nome.replace("Nova Compra - ","")}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Horário do Pedido: ${compra.horaDoPedido}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Farmácia Selecionada:\n${compra.nomeFarmaciaSelecionada}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Total: R$ ${compra.total}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Horário Para a Entrega: ${compra.horaParaEntrega}`}
                </Text>

                <Text style={TextStyles.AlinhadoMarginTop15}>
                    {`Produtos Comprados:`}
                </Text>

                <FlatList
                    style={{flex: 1, width: '100%', paddingHorizontal: 20, marginVertical: 5}}
                    data={compra.carrinho}
                    keyExtractor={item => item.item.id}
                    showsVerticalScrollIndicator = {true}
                    renderItem={({item}) => {
                        return(
                            <RenderListaCarrinho item={item}/>
                        )
                    }}
                />
            </ItemCompras>
        </TouchableWithoutFeedback>
    );
};
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