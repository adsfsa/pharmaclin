import React,{ useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Text } from 'react-native';
import { Container, Loading, TextStyles} from '../../components/Components';
import PharmaClinLogo200x200 from '../../../svgs/PharmaClinLogo200x200';
import Api from '../../Api'
import { useNavigation } from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();
    const {dispatch: userDispatch} = useContext(UserContext);

    useEffect(()=>{
        Api.autenticar(navigation, userDispatch);
    }, []);

    return (
        <Container>
            <PharmaClinLogo200x200  />
            <Text style={TextStyles.PreloadText} >PharmaClin</Text>
            <Loading size="large" color="#FFFFFF" />
        </Container>
    );
}
