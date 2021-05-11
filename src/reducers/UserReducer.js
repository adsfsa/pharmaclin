export const initialState = {//confira o firestore do firebase. Lá também está nessa mesma ordem (alfabética)
    avatar: '',
    buscasRecentes: [],
    cartaoFidelidade: [],
    email: '',
    farmaciasSalvas: [],
    id: '',
    informacoesAdicionais: [],
    latitude: '',
    locaisSalvos: [],
    longitude: '',
    nome:'',
    registrosCompra: [],
    registrosConsulta: [],
    registrosPessoais: [],
    senha: '',
    telefone:''
};
// ... significa: tudo relacionado a isso.
//{...algo, algumacoisa: novacoisa} significa: pegue tudo de algo, e modifique apenas algumacoisa pela nova
export const UserReducer = (state, action) => {
    switch(action.type) {//o sistema identifica a opção escolhida e modifica o estado acima
        case 'setAll':
            //setar tudo de uma vez só, pegando informações de outro lugar (no nosso caso, do firebase)
            return { ...action.payload };
            break;
        case 'clearState':
            //resetar para o estado inicial, só por precaução
            return { ...initialState };
            break;
        case 'setAvatar':
            //recuperar o estado atual, e mudar apenas o avatar
            return {...state, avatar: action.payload.avatar}
            break;
        case 'setNome':
            return { ...state, nome: action.payload.nome };
            break;
        case 'setEmail':
            return { ...state, email: action.payload.email };
            break;
        case 'setSenha':
            return { ...state, senha: action.payload.senha };
            break;
        case 'setLogin':
            return { ...state, nome: action.payload.nome, email: action.payload.email, senha: action.payload.senha};
            break;
        case 'setInformacoesAdicionais':
            return {...state, informacoesAdicionais: action.payload.informacoesAdicionais}
            break;        
        default:
            return state;
    }
}
//