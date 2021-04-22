import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from '../screens/Perfil';
import EditarPerfil from '../screens/Perfil/EditarPerfil'
import MaisInformacoes from '../screens/Perfil/MaisInformacoes'
import FichaMedica from '../screens/Perfil/FichaMedica'
import EnderecosSalvos from '../screens/Perfil/EnderecosSalvos'

const Stack = createStackNavigator();
export default () => (
    <Stack.Navigator
        initialRouteName="Perfil"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        <Stack.Screen name="MaisInformacoes" component={MaisInformacoes} />
        <Stack.Screen name="FichaMedica" component={FichaMedica} />
        <Stack.Screen name="EnderecosSalvos" component={EnderecosSalvos} />
    </Stack.Navigator>
);