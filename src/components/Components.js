import React, { useState } from 'react';
import styled from 'styled-components/native';
import { CheckBox, Input } from 'react-native-elements';
import { StyleSheet, View, TouchableOpacity,Text } from 'react-native';
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
export const TopoInterno = ({IconeCentral}) =>{
    return(
        <TopContainer>
            <Icon
                name='arrow-back'
                color='#FFFFFF'
            />
            <Icon
                name= {IconeCentral}
                color='#FFFFFF'
            />
            <Icon
                name='arrow-back'
                color='#00BACD'
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
        <TouchableOpacity style={Link} onPress= {onPress} >
                <Text style={TextStyles.LinkText}>
                    "Texto"
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
    baseText: {
      fontFamily: "Century-Gothic",
      color: '#000000',
      fontSize: 12,
    },
    preloadText: {
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