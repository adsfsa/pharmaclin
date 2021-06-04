import React from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderConsultas from './RenderConsultas'

export default ({listaConsultas, verListaConsultas, arrayConsultas}) => {
    return (
        <View>
            <Modal
                animationType="slide"
                visible={listaConsultas}
                onRequestClose={() => {
                    verListaConsultas(false);
                }}
            >
                <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                    <FlatList
                        style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}
                        data={arrayConsultas}
                        keyExtractor = {(item)=> item.id}
                        showsVerticalScrollIndicator = {true}
                        renderItem={({item, index}) => {
                            return(
                                <RenderConsultas consulta={item} indice={index+1}/>
                            )                                
                        }}
                    />
                    <View style={{paddingVertical: 15, justifyContent: 'center'}}>                            
                        <TouchableOpacity
                            style = {{width: '100%', paddingHorizontal: 40}}
                            onPress = {()=>verListaConsultas(false)}
                        >
                            <AcaoModal>
                                <Text style={TextStyles.SelectionText}>Fechar</Text>
                                <Icon name='clear' size={24} color = "#000000" />
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