import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FlatList, Alert, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TextComponent } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno,TextStyles } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default () => {
    const navigation = useNavigation();
    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='pin-drop' size={50} color = "#FFFFFF" />
                </View>
            </View>
        </Container>
    );
}