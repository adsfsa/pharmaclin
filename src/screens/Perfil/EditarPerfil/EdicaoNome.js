import React, { useState, useRef } from 'react';
import { Alert, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const EditarNome = ({nome, userDispatch}) =>{

    const inputNome = useRef(null);

    const [novoNome, setNovoNome] = useState("");    
    const [nomeEditavel, setNomeEditavel] = useState(false);

    const SalvarNome = async() => {  
        if (novoNome!=="") {
            Alert.alert(
                'Confirmar Novo Nome!', 
                'Sua alteração será salva.', 
                [
                   
                    {
                        text: 'Cancelar', 
                        onPress:()=>{
                            inputNome.current.blur();
                            setNovoNome("");
                            Alert.alert('Cancelado!', 'Seu novo nome não foi salvo.');
                            return;
                        }
                    },
                    {
                        text: 'OK',
                        onPress: ()=>{
                            userDispatch({
                                type: 'setNome',
                                payload: {
                                    nome: novoNome.toUpperCase()
                                } 
                            });
                            inputNome.current.blur();
                            setNovoNome("");
                            Alert.alert('Concluído!', 'Seu novo nome foi salvo.');
                            return;                         
                        }
                    },
                ],
                {cancelable: false}
            );
        } else {
            Alert.alert('Sem Alterações!', 'Você não alterou seu nome.');
        }

    }    
    return (
        <View
            style = {{alignSelf: 'stretch', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: nomeEditavel === true? 'white' : 'transparent', marginTop: 10}}
        >
            <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                {"Nome: "}
            </Text>
            <TextInput
                style = {{flex: 1}}
                ref = {inputNome}
                textStyle = {{fontFamily: 'Century-Gothic', color: '#000000'}}
                placeholder = {nomeEditavel? "": `${nome}`}
                placeholderTextColor = {nomeEditavel? '#000000' : "grey"}
                value = {novoNome}
                autoCapitalize = 'characters'
                maxLength = {60}
                selectTextOnFocus = {true}
                autoFocus = {nomeEditavel? true : false}
                onChangeText = {novoNome => setNovoNome(novoNome)}
                onFocus = {()=> setNomeEditavel(true)}
                onBlur = {()=> setNomeEditavel(false)}
            />
            <TouchableOpacity onPress={
                nomeEditavel? () => SalvarNome()
                : () => inputNome.current.focus()}
            >
                <Icon name={nomeEditavel? 'done': 'edit'} size={24} />
            </TouchableOpacity>
        </View>
    );
}