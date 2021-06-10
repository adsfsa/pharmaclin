import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Alert, Text, View, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderFarmacias from './RenderFarmacias';

export default (
    {farmacias, setTotal, listaFarmacias, verListaFarmacias, farmaciaSelecionada, selecionarFarmacia, carrinho, produtosDaFarmacia, setProdutosDaFarmacia}
) => {  
    const navigation = useNavigation();  
    const ConfirmarFarmacia = () => {
        if (farmaciaSelecionada.id !== '') {
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

    return (
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
                        keyExtractor = {(item)=> item.id}
                        extraData = {farmaciaSelecionada.id}
                        showsVerticalScrollIndicator = {true}
                        renderItem={({item}) => {
                            return(
                                <RenderFarmacias
                                    item = {item}
                                    selecionarFarmacia = {selecionarFarmacia}
                                    setProdutosDaFarmacia = {setProdutosDaFarmacia}
                                    farmaciaSelecionada = {farmaciaSelecionada}
                                    carrinho = {carrinho}
                                    produtosDaFarmacia = {produtosDaFarmacia}
                                    setTotal = {setTotal}
                                />
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