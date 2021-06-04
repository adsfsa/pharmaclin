import React from 'react';
import { FlatList, Text, View, TouchableOpacity, Modal } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderCompras from './RenderCompras';

export default ({listaCompras, verListaCompras, arrayCompras}) => { 
    return (
        <View>
            <Modal
                animationType="slide"
                visible={listaCompras}
                onRequestClose={() => {
                    verListaCompras(false);
                }}
            >
                <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                    <FlatList
                        style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}
                        data={arrayCompras}
                        keyExtractor = {(item)=> item.total}
                        showsVerticalScrollIndicator = {true}
                        renderItem={({item, index}) => {
                            return(
                                <RenderCompras compra={item} indice={index+1}/>
                            )                                
                        }}
                    />
                    <View style={{paddingVertical: 15, justifyContent: 'center'}}>                            
                        <TouchableOpacity
                            style = {{width: '100%', paddingHorizontal: 40}}
                            onPress = {()=>verListaCompras(false)}
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