import React from 'react';
import { FlatList, Alert, Text, View, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderCarrinho from './RenderCarrinho';
import ApiCompra from '../ApiCompra';

export default (
    {tudo, verTudo, compra, farmaciaSelecionada, carrinho, total, mudou, user, userDispatch, formatarHora}
) => {
    const navigation = useNavigation();
           
    const FinalizarCompra = () => {
        if(compra.carrinho.length===0){
            Alert.alert("ERRO!", "Você não adicionou nenhum produto no carrinho");
            return;
        }
        else{
            if(farmaciaSelecionada.id !== "" && total!==0 && mudou===true){
                Alert.alert(
                    "Confirmar!",
                    "Deseja finalizar a compra agora?",
                    [
                        {
                            text: "Sim",
                            onPress: ()=> {
                                const registroCompra = {
                                    ...compra, total: total.toFixed(2), horaDoPedido: formatarHora(new Date())
                                };
                                ApiCompra.salvarCompra(registroCompra, user, userDispatch);
                                verTudo(false);
                                Alert.alert('Concluído!', 'Sua compra foi finalizada.');
                                //console.log(registroCompra);//curiosidade, para ver o resultado
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
            else{
                Alert.alert("ERRO!", "Preencha todas as informações");
                return;
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
                            {compra.nome}
                        </Text>
                    </View>
                    {compra.carrinho.length === 0
                        ?   <View style={
                                {flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, marginVertical: 15}
                            }>
                                <Text style={TextStyles.BaseAlinhado}>
                                    {`Carrinho Vazio!\nAdicione produtos ao carrinho.`}
                                </Text>
                            </View>
                        :   <FlatList
                                style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15, marginBottom: 15}}
                                data={compra.carrinho}
                                keyExtractor = {(item)=> item.item.id}
                                extraData={carrinho}
                                showsVerticalScrollIndicator = {true}
                                renderItem={({item}) => {
                                    return(
                                        <RenderCarrinho produto={item} />
                                    )                                
                                }}
                            />
                    }
                    <View style={{paddingBottom: 40}}>
                        <View style={{width: '100%', paddingHorizontal: 15, marginTop: 15}}>
                            <Text style={TextStyles.ListText}>
                                {compra.nomeFarmaciaSelecionada !== ""
                                    ?   `Origem: ${compra.nomeFarmaciaSelecionada}`
                                    :   "Escolha uma farmácia"
                                }
                                
                            </Text>

                            <Text style={TextStyles.ListText}>{`Total: R$ ${total.toFixed(2)}`}</Text>

                            <Text style={TextStyles.ListText}>
                                {mudou
                                    ?   `Chegada solicitada: ${compra.horaParaEntrega}`
                                    :   "Esolha um horário para receber sua compra"
                                }
                            </Text>
                        </View>

                        <TouchableOpacity
                            style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                            onPress = {FinalizarCompra}
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