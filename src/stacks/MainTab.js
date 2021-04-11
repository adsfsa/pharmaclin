import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Configuracoes from '../screens/Configuracoes';
import Mapa from '../screens/Mapa';
import Home from '../screens/Home';
import Emergencia from '../screens/Emergencia';
import Perfil from '../screens/Perfil';

import Lembretes from '../screens/Lembretes';
import NovaCompra from '../screens/NovaCompra';
import NovaConsulta from '../screens/NovaConsulta';
import Historico from '../screens/Historico';
import BuscarFarmacias from '../screens/BuscarFarmacias';
import CartaoFidelidade from '../screens/CartaoFidelidade';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator initialRouteName="Home" tabBar={props=><CustomTabBar {...props} />} >
        <Tab.Screen name="Configuracoes" component={Configuracoes} />
        <Tab.Screen name="Mapa" component={Mapa} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Emergencia" component={Emergencia} />
        <Tab.Screen name="Perfil" component={Perfil} />

        <Tab.Screen name="Lembretes" component={Lembretes} />
        <Tab.Screen name="NovaCompra" component={NovaCompra} />
        <Tab.Screen name="NovaConsulta" component={NovaConsulta} />
        <Tab.Screen name="Historico" component={Historico} />
        <Tab.Screen name="BuscarFarmacias" component={BuscarFarmacias} />
        <Tab.Screen name="CartaoFidelidade" component={CartaoFidelidade} />
    </Tab.Navigator>
);
//