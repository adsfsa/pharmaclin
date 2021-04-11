import AsyncStorage from '@react-native-async-storage/async-storage';
import dados from './database/teste'
import  BASE_API from './database/registros.json';

export default {
    
    checkToken: async () =>{
        const req = await fetch( BASE_API, {
            method: 'POST',
            header:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({textoEmail, textoSenha})
        });
        const json = await req.json();
        return json;
    },
    checkLogin: async(textoEmail, textoSenha) => {
        user = {id: id, textoNome: '', textoEmail: textoEmail, textoSenha: textoSenha};
            setUser(user)
            await AsyncStorage.setItem('usuario', JSON.stringify(user));
            navigation.navigate('MainTab');


        const usuario = AsyncStorage.getItem('usuario');
        const string= JSON.stringify({textoEmail, textoSenha});
        const json = await string.json();
        return json
    },

    NovoCadastro: async(textoNome, textoEmail, textoSenha) => {
        const req = await fetch( BASE_API, {
            method: 'POST',
            header:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({textoNome, textoEmail, textoSenha})
        });
        const json = await req.json();
        return json;
    },

};

/** fetch('../database/database.json', {
            method: 'POST',
            header:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
await AsyncStorage.getItem('usuario');
        });*/