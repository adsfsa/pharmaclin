import React from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RemoverAvatar} from './EdicaoAvatar';

export const SuaFoto = ({avatar}) => {
    return (
        <Scroller>
            <View style = {{alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', marginBottom: 30}}>
                <Text style={{fontFamily: 'Century-Gothic', color: '#000000'}}>
                    {avatar !==''
                        ? "Sua foto atual:"
                        : "Adicione uma foto e ela aparecerá aqui."
                    }
                </Text>

                {avatar !==''
                    ?
                        <Image
                            source={{uri: avatar}}
                            style={{width: 100, height: 100, borderRadius: 50, margin: 10}} 
                        />
                    :
                        <Icon name='face' size={100} color = "#4A989F" />
                }
                
                {avatar !== '' &&
                    <RemoverAvatar/>
                }
            </View> 
        </Scroller>
    );
}
export const Scroller = styled.ScrollView`
    flex: 1;
    margin-top: 40px;
    width: 100%;
`;