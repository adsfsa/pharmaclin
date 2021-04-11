import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import UserContextProvider from './src/contexts/UserContext';
import MainStack from './src/stacks/MainStack';

import AppLoading from 'expo-app-loading'; //para aguardar o carregamento das fontes
import * as Font from 'expo-font';


const getFonts = () => Font.loadAsync({
  'Century-Gothic': require('./src/assets/fonts/centuryGothic.ttf')
});

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
    return (
      <UserContextProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </UserContextProvider>
    );    
  } else {
    return (
      <AppLoading 
        startAsync= {getFonts}
        onFinish={()=> setFontsLoaded(true)}
        onError={console.warn}
      />
    )
  }
}