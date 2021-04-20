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
        case 'setNome':
            return { ...state, nome: action.payload.nome };
            break;
        case 'setLogin':
            return { ...state, id: action.payload.id, nome: action.payload.nome, email: action.payload.email, senha: action.payload.senha, avatar: action.payload.avatar};
            break;
        case 'setNewInfo':
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
        case 'setNewNomeAvatar':
            return {...state, nome: action.payload.nome, avatar: action.payload.avatar}
            break;
        case 'setNewNomeEmailSenha':
            return {...state, nome: action.payload.nome, email:action.payload.email, senha: action.payload.senha}
            break;
        case 'setNewNomeEmailAvatar':
            return {...state, nome: action.payload.nome, email:action.payload.email, avatar: action.payload.avatar}
            break;
        case 'setNewNomeSenhaAvatar':
            return {...state, nome: action.payload.nome, senha: action.payload.senha, avatar: action.payload.avatar}
            break;
        case 'setNewEmail':
            return {...state, email:action.payload.email}
            break;
        case 'setNewEmailSenha':
            return {...state, email:action.payload.email, senha: action.payload.senha}
            break;
        case 'setNewEmailAvatar':
            return {...state, email:action.payload.email, avatar: action.payload.avatar}
            break;
        case 'setNewEmailSenhaAvatar':
            return {...state, email:action.payload.email, senha: action.payload.senha, avatar: action.payload.avatar}
            break;
        case 'setNewSenha':
            return {...state, senha: action.payload.senha}
            break;
        case 'setNewAvatar':
            return {...state, avatar: action.payload.avatar}
            break;
        default:
            return state;
    }
}
//