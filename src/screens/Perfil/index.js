import React, { useState, useEffect, useContext } from 'react';
import { Alert, Text, View, StyleSheet, Image } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container,BtnDestaque, TextStyles, BtnNormal, CustomLInk } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../contexts/UserContext'


export default () => {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState({});
    const { state:user } = useContext(UserContext);
    
    const findUsusario = async() => {
        const result = await AsyncStorage.getItem('usuario');
        const object = JSON.parse(result);
        setUsuario(object);
    }
    useEffect(()=> {findUsusario();} ,[]);

    const ExcluirConta = async() =>{//apaga todas os dados salvos na async
        await AsyncStorage.getAllKeys((error,keys)=>AsyncStorage.multiRemove(keys));
        navigation.reset({ routes: [{name: 'Login'}] })
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                
                {usuario.Avatar != '' ?
                <Image source={{uri: usuario.Avatar}} style={{width: 50, height: 50, borderRadius: 25}}/>
                :
                <Icon name='account-circle' size={50} color = "#FFFFFF" />
                }
                
                <Text style={TextosPerfil.NomeDestaque} >{`${usuario.Nome}`}</Text>
                <Text style={TextStyles.baseText} >{`${usuario.Email}`}</Text>

                <View style={{flex: 1, width:'100%', padding: 40, paddingBottom: 40 , alignSelf:'center',justifyContent: 'space-around'}}>
                    <BtnDestaque onPress={() => navigation.navigate('EditarPerfil')} >
                        <Text style={TextStyles.baseText}>
                            Editar Perfil
                        </Text>
                    </BtnDestaque>

                    <BtnNormal
                        style = {{flexDirection: 'row', justifyContent: 'space-between'}}
                        onPress={() => navigation.navigate('MaisInformacoes')}
                    >
                        <View style = {{paddingHorizontal: 20, alignItems: 'center'}} >
                            <Text style={TextStyles.baseText}>
                                Mais informações
                            </Text>                        
                        </View>

                        <View style = {{paddingHorizontal: 20}}>
                            <Icon name='chevron-right' color='#000000' size={24} />
                        </View>                    
                    </BtnNormal>

                    <BtnNormal
                        style = {{flexDirection: 'row', justifyContent: 'space-between'}}
                        onPress={() => navigation.navigate('FichaMedica')}
                    >
                        <View style = {{paddingHorizontal: 20, alignItems: 'center'}} >
                            <Text style={TextStyles.baseText}>
                                Ficha médica
                            </Text>                        
                        </View>

                        <View style = {{paddingHorizontal: 20}}>
                            <Icon name='chevron-right' color='#000000' size={24} />
                        </View>                    
                    </BtnNormal>

                </View>

                <View style = {{flex: 1, width: '100%', padding: 20, justifyContent: 'space-around', alignItems: 'center'}} >
                    <CustomLInk
                        Texto="Sair"
                        onPress={() => navigation.reset({ routes: [{name: 'Login'}] })} 
                    />
                    <CustomLInk
                        Texto="Excluir Conta"
                        onPress={() => ExcluirConta()}
                    />
                </View>
            </View>

        </Container>
    );
}
const AvatarIcon = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`;

export const TextosPerfil = StyleSheet.create({
    NomeDestaque: {
        fontFamily: "Century-Gothic",
        fontWeight: "bold",
        color: '#FFFFFF',
        fontSize: 20,
    },
});
//#<Button onPress={findUsusario} title="Seus Dados" />
