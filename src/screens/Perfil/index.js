import React, { useEffect, useContext } from 'react';
import { Alert, Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container,BtnDestaque, TextStyles, BtnNormal, CustomLInk } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api'


export default () => {
    const navigation = useNavigation();

    const {state: user} = useContext(UserContext);
    const {dispatch: userDispatch} = useContext(UserContext);

    useEffect(()=> {
        Api.carregarAvatar(userDispatch);
        Api.carregarNome(userDispatch);
        Api.carregarEmail(userDispatch);       
    } ,[]);    

    useEffect(()=> {
        Api.atualizarAvatar(user.avatar);
    } ,[user.avatar]);

    useEffect(()=> {
        Api.atualizarNome(user.nome);        
    } ,[user.nome]);

    useEffect(()=> {
        Api.atualizarEmail(user.email);
    } ,[user.email]);

    const Sair = () =>{
        Api.sair(userDispatch);  
    }

    const ExcluirConta = async () =>{
        Api.excluirConta(user.senha, userDispatch);               
    }

    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <View style={{marginBottom: 15, alignItems: 'center', width: '100%', justifyContent: 'center'}}>
                    {user.avatar !== ''
                        ?
                            <Image source={{uri: user.avatar}} style={{width: 100, height: 100, borderRadius: 50}}/>
                        :
                            <View style={{width: 100, height: 100, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name='account-circle' size={50} color = "#FFFFFF" />
                            </View>
                    }
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                    <Text style={TextosPerfil.NomeDestaque} >{`${user.nome}`}</Text>
                    <Text style={TextStyles.baseText} >{`${user.email}`}</Text>
                </View>
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
                        onPress={Sair} 
                    />
                    <CustomLInk
                        Texto="Excluir Conta"
                        onPress={ExcluirConta}
                    />
                </View>
            </View>

        </Container>
    );
}
export const TextosPerfil = StyleSheet.create({
    NomeDestaque: {
        fontFamily: "Century-Gothic",
        fontWeight: "bold",
        color: '#FFFFFF',
        fontSize: 20,
    },
});