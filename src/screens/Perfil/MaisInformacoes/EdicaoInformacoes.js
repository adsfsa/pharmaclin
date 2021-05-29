import React, { useState, useRef } from 'react';
import { Text, TouchableWithoutFeedback, View, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const InformacaoAdicional = (
    {item, editarInformacaoAdicional, removerInformacaoAdicional, setSelecionado, selecionado}
) => {
    const input = useRef(null);
    const [novaAtualizacao, setNovaAtualizacao] = useState("vazio");
    const atualizou = novaAtualizacao !== "vazio" && novaAtualizacao !== ""
    const digitou = atualizou && novaAtualizacao !== item
    return (
        <TouchableWithoutFeedback>
            <Informacao style={{marginBottom: 15}}>
                {selecionado === item
                    ?   <TextInput
                            style = {{flex: 1, backgroundColor: '#FFFFFF'}}
                            textStyle = {TextStyles.baseText}
                            ref = {input}
                            placeholderTextColor = '#000000'
                            value = {novaAtualizacao !== "vazio" ? novaAtualizacao : item}
                            autoFocus = {selecionado === item? true : false}
                            autoCapitalize = 'none'
                            maxLength = {60}
                            selectTextOnFocus = {true}
                            onChangeText = {
                                novaAtualizacao => setNovaAtualizacao(novaAtualizacao)
                            }
                            /*onBlur = {()=>{
                                if(novaAtualizacao === "vazio" || novaAtualizacao === ""){
                                    setSelecionado(null);
                                }
                            }}*/
                        />
                    :   <Text style={TextStyles.baseText}>
                            {atualizou ? novaAtualizacao : item}
                        </Text>
    
                }
                {novaAtualizacao !== ""
                    ?   <View
                            style={{alignItems: 'center',
                            justifyContent: digitou ? 'space-between' : 'space-around',
                            flexDirection: 'row'}}
                        >
                            {selecionado === item
                                ?   (digitou
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
                            {digitou &&
                                <TouchableOpacity
                                    style = {{marginHorizontal: 5}}
                                    onPress = {()=> setSelecionado(null)}
                                >
                                    <Icon 
                                        name = 'clear'
                                        size={24} color = "#000000"
                                    />
                                </TouchableOpacity>
                            }
                            {selecionado === item
                                ?   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress = {()=> {
                                            setNovaAtualizacao("");
                                            input.current.focus();
                                        }}
                                    >
                                        <Icon name='backspace' size={24} color = "#000000" />
                                    </TouchableOpacity>

                                :   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress ={()=> removerInformacaoAdicional(item)}
                                    >
                                        <Icon name='delete-forever' size={24} color = "#000000" />
                                    </TouchableOpacity>

                            }
                        </View>
                    :   <View
                            style={{alignItems: 'center', justifyContent: 'center'}}
                        >
                            <TouchableOpacity
                                style = {{marginHorizontal: 5}}
                                onPress = {()=> setSelecionado(null)}
                            >
                                <Icon 
                                    name = 'clear'
                                    size={24} color = "#000000"
                                />
                            </TouchableOpacity>
                        </View>
                } 
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