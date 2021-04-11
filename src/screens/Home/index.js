import React from 'react';
import { Alert, Text, Button, View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container } from '../../components/Components'; //Componentes "repetitivos", criados em Components
import PharmaClinLogo100x100 from '../../../svgs/PharmaClinLogo100x100';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default () => {  
    const navigation = useNavigation();

    const logout = async() =>{
        await AsyncStorage.removeItem('usuario')
        navigation.reset({ routes: [{name: 'Login'}] })
    }
    const testar = async() =>{
        const json = await AsyncStorage.getItem('usuario')
        const objeto = JSON.parse(json);
        console.log(objeto); //mude para json ou objeto e veja a diferença no console (inspecionar, cmd ou localhost->device)
        alert(json);
    }
    return (
        <Container>            
            <Scroller>
                <View style = {{alignSelf: 'center'}}>
                    <PharmaClinLogo100x100 />
                </View>
                <View style={{width:'100%', padding: 10}}>
                    <ButtonsView nomeIconeEsquerdo = "notifications-active" texto = "LEMBRETES"
                        onPress={() => navigation.navigate('Lembretes')}/>

                    <ButtonsView nomeIconeEsquerdo = "shopping-cart" texto = "NOVA COMPRA" 
                        onPress={() => navigation.navigate('NovaCompra')}/>

                    <ButtonsView nomeIconeEsquerdo = "biotech" texto = "NOVA CONSULTA"
                        onPress={() => navigation.navigate('NovaConsulta')}/>

                    <ButtonsView nomeIconeEsquerdo = "history" texto = "HISTÓRICO"
                        onPress={() => navigation.navigate('Historico')}/>

                    <ButtonsView nomeIconeEsquerdo = "local-pharmacy" texto = "BUSCAR FARMÁCIAS"
                        onPress={() => navigation.navigate('BuscarFarmacias')}/>
                    
                    <ButtonsView nomeIconeEsquerdo = "card-membership" texto = "CARTÃO FIDELIDADE"
                        onPress={() => navigation.navigate('CartaoFidelidade')}/>
                </View>
                <Button onPress={logout} title="Logout" />
                <Button onPress={testar} title="Seus Dados" />
            </Scroller>

            <View style = {{alignSelf: 'center', flexDirection: 'row', justifyContent:'space-around', width: '100%'}} >
                <BotaoInferiorEsquerdo>
                    <Text style = {Textos.TextoInferior}>Mapa</Text>
                    <Icon name = 'pin-drop' size = {30} color= "#000000"/>
                </BotaoInferiorEsquerdo>
                <BotaoInferiorDireito>
                    <Text style = {Textos.TextoInferior}>190</Text>
                    <Icon name = 'local-hospital' size = {30} color= "#000000"/>
                </BotaoInferiorDireito>
            </View>
            
        </Container>
    );
    
}
export const ButtonsView = ({nomeIconeEsquerdo, texto, onPress}) => {
    return(
        <HomeButtons onPress ={onPress}>
            <View style = {{paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center'}}>
                <Icon name = {nomeIconeEsquerdo} size = {24} color= "#B2B2B2"/>
                <Text style={Textos.MainText}>
                    {texto}
                </Text>
            </View>
            <View style = {{paddingHorizontal: 20}}>
                <Icon name = "chevron-right" size = {24} color= "#000000"/>
            </View>
        </HomeButtons>
    )
}

export const BotaoInferiorDireito = styled.TouchableOpacity`
    height: 60px;
    width: 70px;
    background-color: #FFFFFF;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;
export const BotaoInferiorEsquerdo = styled.TouchableOpacity`
    height: 60px;
    width: 70px;
    background-color: #FFFFFF;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
    width: 100%;
`;

export const HomeButtons = styled.TouchableOpacity`
    height: 40px;    
    background-color: #FFFFFF;
    align-items: center;
    border-radius: 20px;
    flexDirection: row;
    justify-content: space-between;
    margin-vertical: 10px;
`;
export const Textos = StyleSheet.create({
    MainText: {
        fontFamily: 'Century-Gothic', 
        color: '#000000',
        fontSize: 15, 
        paddingHorizontal: 10
    },
    TextoInferior: {
        fontFamily: 'Century-Gothic', 
        color: '#000000',
        fontSize: 15, 
        paddingHorizontal: 10
    }
});

