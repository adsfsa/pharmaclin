import React,{ useEffect } from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Loading, TextStyles} from '../../components/Components';
import PharmaClinLogo200x200 from '../../../svgs/PharmaClinLogo200x200';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {

    const navigation = useNavigation();
    const verificarLogin = async () => {
        const usuario = await AsyncStorage.getItem('usuario');
        navigation.reset({ routes: [{name: usuario !== null? 'MainTab': 'Login'}] })
    }

    //navigation.navigate('Login');
    useEffect(()=>{
        verificarLogin();
    }, []);

    return (
        <Container>
            <PharmaClinLogo200x200  />
            <Text style={TextStyles.preloadText} >PharmaClin</Text>
            <Loading size="large" color="#FFFFFF" />
        </Container>
    );
}
