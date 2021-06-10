import React from 'react';
import { FlatList, Alert, Text, View, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderProdutos from './RenderProdutos';

export default (
    {listaProdutos, verListaProdutos, carrinho, adicionarAoCarrinho, total, setTotal, produtosDaFarmacia, setProdutoSelecionado}
) => {    
    const navigation = useNavigation();

    const ConfirmarProdutos = () => {
        if (carrinho.length!==0) {
            verListaProdutos(false)
        }
        else {
            Alert.alert(
                "AVISO!",
                "Você não adicionou produtos. Deseja adicionar?",
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
                            verListaProdutos(false);
                        },
                        style: 'cancel'
                    }
                ],
                {cancelable: false}
            );    
        }
    }

    const FecharProdutos = () => {
        verListaProdutos(false);
    }

    const RemoverProdutos = () => {
        if (carrinho.length!==0) {
            Alert.alert(
                "Confirmar!",
                "Deseja limpar todas as suas escolhas?",
                [
                    {
                        text: "Sim",
                        onPress: ()=> { 
                            setTotal(0);
                            carrinho.length = 0;
                            verListaProdutos(false);
                            navigation.reset({
                                routes: [{name: 'NovaCompra'}]
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
        else {
            verListaProdutos(false); 
        }
    }    
    return (            
        <View>
            <Modal
                animationType="slide"
                visible={listaProdutos}
                onRequestClose={() => {
                    verListaProdutos(false);
                }}
            >
                <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                    <FlatList
                        style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}
                        data={produtosDaFarmacia}
                        keyExtractor = {(item)=> item.id}
                        showsVerticalScrollIndicator = {true}
                        renderItem={({item}) => {
                            return(
                                <RenderProdutos 
                                    item={item}
                                    carrinho = {carrinho}
                                    adicionarAoCarrinho = {adicionarAoCarrinho}
                                    total = {total}
                                    setTotal = {setTotal}
                                    setProdutoSelecionado = {setProdutoSelecionado}
                                />
                            )                                
                        }}
                    />
                    <View style={{paddingBottom: 40}}>
                        <TouchableOpacity
                            style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                            onPress = {ConfirmarProdutos}
                        >
                            <AcaoModal>
                                <Text style={TextStyles.SelectionText}>Confirmar</Text>
                                <Icon name='check' size={24} color = "#000000" />
                            </AcaoModal>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                            onPress = {FecharProdutos}
                        >
                            <AcaoModal>
                                <Text style={TextStyles.SelectionText}>Fechar</Text>
                                <Icon name='clear' size={24} color = "#000000" />
                            </AcaoModal>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                            onPress = {RemoverProdutos}
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