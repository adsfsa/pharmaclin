export const initialState = {
    id: null,
    nome:'',
    email: '',
    senha: '',
    telefone:'',
    latitude: '',
    longitude: '',
    avatar: '',
    informacoesAdicionais: [],
    farmaciasSalvas: [],
    locaisSalvos: [],
    buscasRecentes: [],
    registrosPessoais: [],
    registrosCompra: [],
    registrosConsulta: [],
    cartaoFidelidade: []
};

export const UserReducer = (state, action) => {
    switch(action.type) {
        case 'setAll':
            return { ...state, id: action.payload.id, nome: action.payload.nome, email: action.payload.email, senha: action.payload.senha, telefone: action.payload.telefone, latitude: action.payload.latitude, longitude: action.payload.longitude, avatar: action.payload.avatar, informacoesAdicionais: action.payload.informacoesAdicionais, farmaciasSalvas: action.payload.farmaciasSalvas, locaisSalvos: action.payload.locaisSalvos, buscasRecentes: action.payload.buscasRecentes, registrosPessoais: action.payload.registrosPessoais, registrosCompra: action.payload.registrosCompra, registrosConsulta: action.payload.registrosConsulta, cartaoFidelidade: action.payload.cartaoFidelidade};
            break;
        case 'setNome':
            return { ...state, nome: action.payload.nome };
            break;
        case 'setLogin':
            return { ...state, id: action.payload.id, nome: action.payload.nome, email: action.payload.email, senha: action.payload.senha};
            break;
        case 'setNewAdicionais':
            return {...state, informacoesAdicionais: action.payload.informacoesAdicionais}
            break;
        case 'setNewPerfil':
            return {...state, nome: action.payload.nome, email:action.payload.email, senha: action.payload.senha}
            break;
        case 'setNewNome':
            return {...state, nome: action.payload.nome}
            break;
        case 'setNewNomeEmail':
            return {...state, nome: action.payload.nome, email:action.payload.email}
            break;
        case 'setNewNomeSenha':
            return {...state, nome: action.payload.nome, senha: action.payload.senha}
            break;
        case 'setNewEmail':
            return {...state, email:action.payload.email}
            break;
        case 'setNewEmailSenha':
            return {...state, email:action.payload.email, senha: action.payload.senha}
            break;
        case 'setNewSenha':
            return {...state, senha: action.payload.senha}
            break;
        case 'setAvatar':
            return {...state, avatar: action.payload.avatar}
            break;
        default:
            return state;
    }
}
//