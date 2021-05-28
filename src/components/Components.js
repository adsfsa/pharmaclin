import React, { useState } from 'react';
import styled from 'styled-components/native';
import { CheckBox, Input } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity,Text, Modal, ActivityIndicator } from 'react-native';
import PharmaClinLogo100x100 from '../../svgs/PharmaClinLogo100x100';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.SafeAreaView`
    background-color: #00BACD;
    flex: 1;    
    justify-content: center;
    align-items: center; 
`;
export const TopContainer = styled.View`
    flexDirection: row;    
    justify-content: space-around;
    align-items: center;
    width: 100%;
`;
export const TopoPadrao = ({setaVoltar, size}) =>{
    return(
        <TopContainer>
            <Icon
                name='arrow-back'
                color='#FFFFFF'
                size = {size}
                onPress = {setaVoltar}
            />
            <View >
                <PharmaClinLogo100x100 />
            </View>               
            <Icon
            //"jeito errado, mas é um jeito."
                name='arrow-back'
                color='#00BACD'                
                size = {size}
            />                
        </TopContainer>
    );
}
export const TopHome = ({nomeIconeEsquerdo, setaVoltar, nomeArea}) =>{
    return(
        <View style={{width:'100%'}}>
            <TopContainer>
                <Icon
                    name='arrow-back'
                    color='#FFFFFF'
                    onPress = {setaVoltar}
                    size = {24}
                />
                <View >
                    <PharmaClinLogo100x100 />
                </View>
                <Icon
                    name='arrow-back'
                    color='#00BACD'
                    size = {24}
                />
            </TopContainer>
            <View style={{width:'100%', paddingHorizontal: 30, marginTop: 10}}>
                <ViewArea>
                    <View style = {{paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name = {nomeIconeEsquerdo} size = {24} color= "#FE7F57"/>
                        <Text style={{fontFamily: 'Century-Gothic', color: '#000000', fontSize: 15,paddingHorizontal: 10}}>
                            {nomeArea}
                        </Text>
                     </View>
                </ViewArea>
            </View>
        </View>
    );
}
export const ViewArea = styled.View`
    height: 40px;    
    background-color: #FFFFFF;
    align-items: center;
    border-radius: 20px;
    flexDirection: row;
    justify-content: space-between;
    margin-vertical: 10px;
`;

export const TopoInterno = ({IconeCentral, setaVoltar}) =>{
    return(
        <TopContainer>
            <Icon
                name='arrow-back'
                color='#FFFFFF'
                onPress = {setaVoltar}
                size = {24}
            />
            <View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                    name= {IconeCentral}
                    color='#FFFFFF'
                    size = {50}
                />
            </View>
            <Icon
                name='arrow-back'
                color='#00BACD'
                size = {24}
            />
        </TopContainer>
    );
}
export const InputContainer = styled.View`
    padding: 40px;
    width: 100%;
`;
export const InputSenha = ({placeholder, leftIcon, value, onChangeText}) => {
    const[isVisible, SetVisibility] = useState(false);
    const[icon, SetIcon] = useState(isVisible ? 'visibility-off': 'visibility');
    return(
        <Input
            placeholder= {placeholder} secureTextEntry={!isVisible}
            leftIcon = {{name: leftIcon, color: '#4A989F', size: 24}} 
            errorStyle = {{ color: 'red' }}
            rightIcon = {{name: icon,
            onPress: ()=> {
                SetVisibility(!isVisible);
                SetIcon(!isVisible ? 'visibility-off': 'visibility')} 
            }}           
            textStyle = {{fontFamily: 'Century-Gothic'}}
            value = {value}
            onChangeText = {onChangeText}               
        /> 
    );
}
export const InputObrigatorio = ({placeholder, leftIcon, keyboardType, autoCompleteType, value, onChangeText, autoCapitalize}) => {
    return (
        <Input
            placeholder={placeholder}
            leftIcon = {{name: leftIcon, color: '#4A989F', size: 24}}
            errorStyle = {{ color: 'red' }}           
            textStyle = {{fontFamily: 'Century-Gothic'}}
            keyboardType = {keyboardType}
            autoCompleteType = {autoCompleteType}
            value = {value}
            onChangeText = {onChangeText}
            autoCapitalize = {autoCapitalize}
        />
    );
}
export const CheckBoxArea = styled.View`    
    flexDirection: row;
    margin-bottom: 20px;
`;
export const CustomCheckBox = ({title, checkedIcon, uncheckedIcon}) => {
    const[isSelected, setSelected] = useState(false);
    return (
        <CheckBoxArea>
            <CheckBox 
                title = {title}
                iconType = {Icon.name}                      
                component = "text"
                checkedIcon = {checkedIcon}
                uncheckedIcon = {uncheckedIcon}
                checkedColor= "#FFFFFF"
                uncheckedColor = "#FFFFFF"
                checked = {isSelected}
                onPress = {()=> setSelected(!isSelected)}
                containerStyle = {{backgroundColor: 'transparent', borderColor: 'transparent'}}
                textStyle = {{fontFamily: "Century-Gothic", color: "#FFFFFF",textDecorationLine: "underline"}}
            />
        </CheckBoxArea>
    );
}
export const CustomLInk = ({onPress, Texto}) => {
    return (
        <TouchableOpacity style={{Link}} onPress= {onPress} >
                <Text style={TextStyles.LinkText}>
                    {Texto}
                </Text>
        </TouchableOpacity>
    )
}

export const CampoInput = styled.TextInput`
    flex: 1;
    font-size: 15px;
    margin-left: 10px;    
`;
export const BtnDestaque = styled.TouchableOpacity`
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
`;
export const Link = styled.TouchableOpacity`
    margin-top: 50px;
    margin-bottom: 20px;
`;
export const BtnNormal = styled.TouchableOpacity`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: center;
    align-items: center;     
`;
export const TextStyles = StyleSheet.create({
    SelectionText: {
      fontFamily: "Century-Gothic",
      color: '#000000',
    },
    SearchText: {
      fontFamily: "Century-Gothic",
      color: '#000000',
      fontSize: 10,
    },
    PriceText: {
      fontFamily: "Century-Gothic",
      color: '#000000',
      fontSize: 20,
      paddingVertical: 10,
    },
    ListText: {
      fontFamily: "Century-Gothic",
      color: '#000000',
      fontSize: 12,
    },
    baseText: {
      fontFamily: "Century-Gothic",
      color: '#000000',
      fontSize: 15,
    },
    PreloadText: {
        fontFamily: "Century-Gothic",
        fontSize: 50,
        fontWeight: "bold",
        color: '#FFFFFF',
    },
    BtnDestaqueText: {
        fontFamily: 'Century-Gothic',
        color: '#000000',
        fontSize: 25,
    },
    CadastroText:{
        fontFamily: "Century-Gothic",
        color: '#FFFFFF',
        fontSize: 15,
    },
    LinkText:{
        fontFamily: "Century-Gothic",
        color: '#FFFFFF',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    CheckBoxText: {
        fontFamily: "Century-Gothic",        
        color: '#FFFFFF',
        fontSize: 15,
    }    
});
export const Loading = styled.ActivityIndicator`
    margin-top: 50px;
`;
export const ModalAguarde = ({loading}) =>{
    const Styles = StyleSheet.create({
        EstiloView: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)'
        },
        EstiloAlerta: {
            marginHorizontal: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:'#FFFFFF',
            borderRadius: 10
        }
    });
    return (
        <View >
            <Modal
                animationType="fade"
                visible={loading}
                transparent={true}
            >
                <View style={Styles.EstiloView}>
                    <View style={Styles.EstiloAlerta}>
                        <Text style={TextStyles.baseText}>Aguarde</Text>
                        <ActivityIndicator size="large" color="#00BACD" />
                    </View>
                </View>
            </Modal>                        
        </View>
    )
}