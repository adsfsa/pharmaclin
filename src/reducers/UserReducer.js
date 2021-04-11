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
            return { ...state, id: action.payload.id, nome: action.payload.nome, email: action.payload.email, senha: action.payload.senha};
            break;
        default:
            return state;
    }
}
//