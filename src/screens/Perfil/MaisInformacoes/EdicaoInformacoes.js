import React, { useState } from 'react';
import { Alert, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    item: {
        flex: 1,
    },
});

export const InformacaoAdicional = (
    {item, backgroundColor, editarInformacaoAdicional, removerInformacaoAdicional, setSelecionado, selecionado}
) => {
    const [novaAtualizacao, setNovaAtualizacao] = useState("");
    return (
        <TouchableWithoutFeedback onPress={()=>{}}>
            <Informacao style={{marginBottom: 15}}>
                {selecionado === item
                    ?   <TextInput
                            style = {[styles.item, backgroundColor]}
                            textStyle = {TextStyles.baseText}
                            placeholder = {item}
                            placeholderTextColor = '#000000'
                            value = {novaAtualizacao}
                            autoFocus = {selecionado === item? true : false}
                            autoCapitalize = 'none'
                            maxLength = {60}
                            selectTextOnFocus = {true}
                            onChangeText = {
                                novaAtualizacao => setNovaAtualizacao(novaAtualizacao)
                            }
                        />
                    :   <Text style={TextStyles.baseText}>
                            {novaAtualizacao!=='' ? novaAtualizacao : item}
                        </Text>
    
                }                                    
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                    {selecionado === item
                        ?   (
                            novaAtualizacao!==""
                                ?   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress = {()=> editarInformacaoAdicional(item, novaAtualizacao)}
                                    >
                                        <Icon 
                                            name = 'done'
                                            size={24} color = "#000000"
                                        />
                                    </TouchableOpacity>
                                :   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress = {()=> setSelecionado(null)}
                                    >
                                        <Icon 
                                            name = 'clear'
                                            size={24} color = "#000000"
                                        />
                                    </TouchableOpacity>
                        )
                        :   <TouchableOpacity
                                style = {{marginHorizontal: 5}}
                                onPress = {()=> setSelecionado(item)}
                            >
                                <Icon 
                                    name = 'edit'
                                    size={24} color = "#000000"
                                />
                            </TouchableOpacity>
                    }                                        
                    <TouchableOpacity
                        style = {{marginHorizontal: 5}}
                        onPress ={()=> removerInformacaoAdicional(item)}
                    >
                        <Icon name='delete-forever' size={24} color = "#000000" />
                    </TouchableOpacity>
                </View>
            </Informacao>
        </TouchableWithoutFeedback>
    );
}
export const Informacao = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;
`;