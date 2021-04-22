import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { FlatList, Alert, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TextComponent } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno,TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default () => {
    const navigation = useNavigation();
    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Perfil'}]
        });
    }
    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopoInterno IconeCentral ={'content-paste'} setaVoltar = {Voltar}/>
            </View>
        </Container>
    );
}