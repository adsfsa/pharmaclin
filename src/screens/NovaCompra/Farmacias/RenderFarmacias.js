import React from 'react';
import { Alert, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ApiCompra from '../ApiCompra';

export default (
    {item, selecionarFarmacia, setProdutosDaFarmacia, farmaciaSelecionada, carrinho, produtosDaFarmacia, setTotal}
) => {
    return(
        <TouchableOpacity onPress = {
            farmaciaSelecionada.id === ""
                ?   async ()=>{
                        selecionarFarmacia(item);
                        const array = await ApiCompra.carregarProdutos(item.info.produtos);
                        if (array) {
                            //console.log(array);
                            setProdutosDaFarmacia(array);
                        }
                        //console.log(item.info.produtos);
                    }

                :   (farmaciaSelecionada.id === item.id
                        ?   ()=>{
                                carrinho.length !== 0
                                    ?   Alert.alert(
                                            "Confirmar?",
                                            "Seu carrinho será zerado",
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
                                                        selecionarFarmacia({id: "", info: {}});
                                                        produtosDaFarmacia.length = 0;
                                                        setTotal(0);
                                                        carrinho.length = 0;
                                                    }
                                                }
                                            ],
                                            {cancelable: false}
                                        )   
                                    

                                    :   selecionarFarmacia({id: "", info: {}});
                                        produtosDaFarmacia.length = 0;
                                        setTotal(0);
                            }
                        :   async ()=>{
                                carrinho.length !== 0
                                    ?   Alert.alert(
                                            "Confirmar?",
                                            "Se mudar de farmácia seu carrinho será zerado",
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
                                                    onPress: async ()=>{
                                                        selecionarFarmacia({id: "", info: {}});
                                                        selecionarFarmacia(item);
                                                        const array = await ApiCompra.carregarProdutos(item.info.produtos);
                                                        if (array) {
                                                            //console.log(array);
                                                            setProdutosDaFarmacia(array);
                                                        }
                                                        setTotal(0);
                                                        carrinho.length = 0;
                                                    }
                                                }
                                            ],
                                            {cancelable: false}
                                        )
                                    :   selecionarFarmacia({id: "", info: {}});
                                        selecionarFarmacia(item);
                                        const array = await ApiCompra.carregarProdutos(item.info.produtos);
                                        if (array) {
                                            //console.log(array);
                                            setProdutosDaFarmacia(array);
                                        }
                                        setTotal(0);
                            }
                    )
            }
        >
            <ItemFarmacia style={{
                    backgroundColor: farmaciaSelecionada.id === item.id
                        ? '#27AE60'
                        : '#EEEEEE', 
                    marginBottom: 15
                }}
            >
                <Text style={TextStyles.ListText}>{item.info.nome}</Text>
                {farmaciaSelecionada.id === item.id
                    ?   <Icon name = 'check-box' size={24} color = "#FFFFFF"/>
                    :   <Icon name = 'check-box-outline-blank' size={24} color = "#000000"/>
                }
            </ItemFarmacia>

        </TouchableOpacity>
    )
};

export const ItemFarmacia = styled.View`
    height: 50px;
    border-radius: 10px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
`;