import React, { useState } from 'react';
import { Alert, Text, TouchableWithoutFeedback, View, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default (
    {item, carrinho, adicionarAoCarrinho, total, setTotal, setProdutoSelecionado}
) => {
    const Add = () => {
        setProdutoSelecionado(item.id);
        if(unidades>0){
            var u = unidades - 1;
            item.info.unidades = u;
            var c = comprados + 1;                
            const index = carrinho.indexOf(carrinho.find(obj => obj.item.id===item.id));
            index === -1
                ?   adicionarAoCarrinho([...carrinho, {item: item, comprados: c}]) 
                :   carrinho[index].comprados = c
            setTotal(total + item.info.preco);
            setUnidades(u);
            setComprados(c);
            setProdutoSelecionado(null);
        }
        else {
            Alert.alert("AVISO!", "Você não pode adicionar mais itens");
            setProdutoSelecionado(null);
        }       
    }
    
    const Remove = () => {
        setProdutoSelecionado(item.id);
        if(comprados>0){
            var u = unidades + 1;
            item.info.unidades = u;
            var c = comprados - 1;
            const index = carrinho.indexOf(carrinho.find(obj => obj.item.id===item.id));
            if(index !== -1){
                setUnidades(u);
                setComprados(c);
                c === 0
                    ?   adicionarAoCarrinho(carrinho.filter(produtos=> produtos.item.id !== item.id))
                    :   carrinho[index].comprados = c                    
                setTotal(total - item.info.preco);
                setProdutoSelecionado(null);
            }
        }
        else {                
            Alert.alert("AVISO!", "Você não pode remover mais itens");
            setProdutoSelecionado(null);
        }
    }
    const index = carrinho.indexOf(carrinho.find(obj => obj.item.id===item.id));
    const [unidades, setUnidades] = useState(item.info.unidades);
    const [comprados, setComprados] = useState(index !== -1 ? carrinho[index].comprados : 0);
    return(
        <TouchableWithoutFeedback onPress={()=>{}}>
            <ItemProdutos style={{backgroundColor: "#EEEEEE", opacity: item.info.disponivel? 1 : 0.3, marginBottom: 10}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{uri: item.info.imagem}} style={{width: 50, height: 50}}/>
                    <Text style={TextStyles.ListText}>{item.info.nome}</Text>
                </View>
                <View style={{width: '50%', justifyContent: 'space-around', alignItems: 'center'}}>                   
                    <Text style={TextStyles.ListText}>{item.info.descricao}</Text>
                    <Text style={TextStyles.PriceText}>{`R$ ${item.info.preco.toFixed(2)}`}</Text>
                    {item.info.disponivel
                        ?   <Text style={TextStyles.ListText}>
                                {`Unidades Disponíves: ${unidades}`}
                            </Text>   
                        :   <Text style={TextStyles.ListText}>Produto Indisponível</Text>
                    }                    
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={TextStyles.ListText}>{comprados}</Text>
                    {item.info.disponivel
                        ?   <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity 
                                    style={{paddingHorizontal: 5}}
                                    onPress={Remove}
                                >
                                    <Icon name = 'remove' size={24} color = "#27AE60"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{paddingHorizontal: 5}}
                                    onPress={Add}
                                >
                                    <Icon name = 'add' size={24} color = "#27AE60"/>
                                </TouchableOpacity>
                            </View>
                        :   <View style={{flexDirection: 'row'}}>
                                <Icon style={{paddingHorizontal: 5}} name = 'remove' size={24} color = "#27AE60"/>
                                <Icon style={{paddingHorizontal: 5}} name = 'add' size={24} color = "#27AE60"/>
                            </View>

                        }
                </View>
            </ItemProdutos>
        </TouchableWithoutFeedback>
    )  
};
export const ItemProdutos = styled.View`
    height: 150px;
    border-radius: 20px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
`;