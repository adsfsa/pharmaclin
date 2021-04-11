import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext'

import { MaterialIcons } from '@expo/vector-icons';

const TabArea = styled.View`
    height: 50px;
    background-color: #4A989F;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    height: 70px;
    width: 70px;
    justify-content: center;
    align-items: center;
    
    border-radius: 35px;
    border: 3px solid #FFFFFF;
    margin-top: -35px;
`;
//backgound-color: #4A989F;
const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({state, navigation}) => {
    const { state:user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);

    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Configuracoes')} >
                <MaterialIcons name="settings" border="blue" size={30} color={state.index===0? "#FE7F57" : "#B2B2B2"} />
            </TabItem>

            <TabItem onPress={()=>goTo('Mapa')} >
                <MaterialIcons name="pin-drop" size={30} color={state.index===1? "#FE7F57" : "#B2B2B2"} />
            </TabItem>

            <TabItemCenter
                onPress={()=>goTo('Home')}
                style={{backgroundColor: state.index===2? "#FE7F57" : "#4A989F"}}
            >
                <MaterialIcons name="home" size={36} color={state.index===2? "#FFFFFF" : "#B2B2B2"} />
            </TabItemCenter>

            <TabItem onPress={()=>goTo('Emergencia')} >
                <MaterialIcons name="local-hospital" size={30} color={state.index===3? "#FE7F57" : "#B2B2B2"} />
            </TabItem>

            <TabItem onPress={()=>goTo('Perfil')} >
                {user.avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <MaterialIcons name="account-circle" size={30} color={state.index===4? "#FE7F57" : "#B2B2B2"} />
                }
            </TabItem>
        </TabArea>
    );
}
//< size={24} color="black" />