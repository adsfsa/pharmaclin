import React, { useState, useRef } from 'react';
import { Text, TouchableWithoutFeedback, View, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default (
    {item, tecladoAberto, editarLembrete, removerLembrete, setSelecionado, selecionado, abrirTeclado}
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
                            autoFocus = {tecladoAberto}
                            autoCapitalize = 'none'
                            maxLength = {60}
                            selectTextOnFocus = {true}
                            onChangeText = {
                                novaAtualizacao => setNovaAtualizacao(novaAtualizacao)
                            }
                            onFocus = {()=> abrirTeclado(true)}
                            onBlur = {()=> abrirTeclado(false)}
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
                                                onPress = {()=> editarLembrete(item, novaAtualizacao)}
                                            >
                                                <Icon 
                                                    name = 'done'
                                                    size={24} color = "#000000"
                                                />
                                            </TouchableOpacity>
                                        :   <TouchableOpacity
                                                style = {{marginHorizontal: 5}}
                                                onPress = {()=> {setSelecionado(null); abrirTeclado(false);}}
                                            >
                                                <Icon 
                                                    name = 'clear'
                                                    size={24} color = "#000000"
                                                />
                                            </TouchableOpacity>
                                )
                                :   <TouchableOpacity
                                        style = {{marginHorizontal: 5}}
                                        onPress = {()=> {setSelecionado(item); abrirTeclado(true);}}
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
                                    onPress = {()=> {setSelecionado(null); abrirTeclado(false);}}
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
                                        onPress ={()=> removerLembrete(item)}
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