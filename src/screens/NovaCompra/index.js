import React, { useState, useContext, useEffect} from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Alert, Text, View, TouchableOpacity, Platform, Switch } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Container, TextStyles, TopHome } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalFarmacias from './Farmacias/ModalFarmacias';
import ModalProdutos from './Produtos/ModalProdutos';
import ModalCompras from './Compra/ModalCompras';
import ApiCompra from './ApiCompra';


export default () => {
    const {state: user} = useContext(UserContext);
    const {dispatch: userDispatch} = useContext(UserContext);

    const [farmacias, setFarmacias] = useState(null);
    const [produtosDaFarmacia, setProdutosDaFarmacia] = useState(null);

    const [listaFarmacias, verListaFarmacias] = useState(false);
    const [listaProdutos, verListaProdutos] = useState(false);
    const [tudo, verTudo] = useState(false);

    const [farmaciaSelecionada, selecionarFarmacia] = useState( {id: "", info: {}} );
    const [carrinho, adicionarAoCarrinho] = useState([]);
    const [total, setTotal] = useState(0);    
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const [date, setDate] = useState(new Date());
    const [horario, escolherHorario] = useState(false);
    const [mudou, mudouHorario] = useState(false);

    const navigation = useNavigation();

    const [compra, setCompra] = useState({
        id: Date.now().toString(),
        nome: nomeCompra(),
        nomeFarmaciaSelecionada: '', 
        carrinho: [],
        horaParaEntrega: formatarHora(new Date()),
    });

    useEffect(()=> {
        async function carregarFarmacias() {
            const arrayIds = await ApiCompra.carregarFarmacias();
            if (arrayIds) {
                //console.log(arrayIds);
                setFarmacias(arrayIds);
            }
        }
        carregarFarmacias();
    } ,[]);

    function nomeCompra(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return "Nova Compra - "+diaF+"/"+mesF+"/"+anoF;
    };

    function formatarHora(data){
        var hour = data,
            horas = hour.getHours(),
            minutos = hour.getMinutes();
        if(horas < 10){
            horas = "0"+horas;
        }
        if(minutos < 10){
            minutos = "0"+minutos;
        }
        return horas+":"+minutos;
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (selectedDate === undefined) {
            escolherHorario(Platform.OS === 'ios');
            mudouHorario(false);
        }
        else{
            escolherHorario(Platform.OS === 'ios');
            setDate(currentDate);
            mudouHorario(true);
        }
    };

    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Home'}]
        });
    }

    const AbrirListaProdutos = async ()=>{
        if(farmaciaSelecionada.id === ""){
            Alert.alert("AVISO!","Escolha uma farmácia primeiro");
            return;
        }
        
        verListaProdutos(true);
        //console.log(produtosDaFarmacia);
    }

    const AbrirVerTudo = ()=>{
        const newCompra = {
            id: Date.now().toString(),
            nome: nomeCompra(),
            nomeFarmaciaSelecionada: farmaciaSelecionada.id === "" ? "" : farmaciaSelecionada.info.nome,
            carrinho: carrinho,
            horaParaEntrega: formatarHora(date)
        };
        setCompra(newCompra);
        verTudo(true);
        //console.log(produtosDaFarmacia);
    }
    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopHome nomeIconeEsquerdo={'shopping-cart'} setaVoltar={Voltar} nomeArea={'NOVA COMPRA'}/>

                <TouchableOpacity
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress = {()=>verListaFarmacias(true)}
                >
                    <Selecionar>
                        {farmaciaSelecionada.id !== ""
                            ? <Text style={TextStyles.SearchText}>{farmaciaSelecionada.info.nome}</Text>
                            : <Text style={TextStyles.SelectionText}>Escolha uma farmácia...</Text>

                        }
                        <Icon name='search' size={24} color = "#000000" />
                    </Selecionar>
                </TouchableOpacity>
                
                <View style={{width: '100%', paddingHorizontal: 40, paddingTop: 15}}>
                    <Selecionar>
                        <Text style={TextStyles.SelectionText}>Exibir lista de produtos</Text>

                        <Switch
                            trackColor={{ false: "#767577", true: "#27AE60" }}
                            thumbColor={listaProdutos ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={AbrirListaProdutos}
                            value={listaProdutos}
                        />
                    </Selecionar>
                </View>

                <TouchableOpacity 
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress={()=> escolherHorario(true)}
                >
                    <Selecionar>
                        <Text style={TextStyles.SelectionText}>
                            {mudou
                                ? formatarHora(date)
                                : "Selecione um horário..."

                            }
                        </Text>                     
                        <Icon name='schedule' size={24} color = "#000000" />
                    </Selecionar>
                </TouchableOpacity>

                {horario && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}

                <TouchableOpacity
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress = {AbrirVerTudo}
                >
                    <Selecionar>
                        <Text style={TextStyles.SelectionText}>Verificar compra</Text>
                        <Icon name='shopping-basket' size={24} color = "#000000" />
                    </Selecionar>
                </TouchableOpacity>

            </View>
            <ModalFarmacias
                farmacias = {farmacias}
                setTotal = {setTotal}
                listaFarmacias = {listaFarmacias}
                verListaFarmacias = {verListaFarmacias}
                farmaciaSelecionada = {farmaciaSelecionada}
                selecionarFarmacia = {selecionarFarmacia}
                carrinho = {carrinho}
                produtosDaFarmacia = {produtosDaFarmacia}
                setProdutosDaFarmacia = {setProdutosDaFarmacia}
            />
            <ModalProdutos
                listaProdutos = {listaProdutos}
                verListaProdutos =  {verListaProdutos}
                carrinho = {carrinho}
                adicionarAoCarrinho = {adicionarAoCarrinho}
                total = {total}
                setTotal = {setTotal}
                produtosDaFarmacia = {produtosDaFarmacia}
                produtoSelecionado = {produtoSelecionado}
                setProdutoSelecionado = {setProdutoSelecionado}
            />
            <ModalCompras
                tudo = {tudo}
                verTudo = {verTudo}
                compra = {compra}
                farmaciaSelecionada = {farmaciaSelecionada}
                carrinho = {carrinho}
                total = {total}
                mudou = {mudou}
                user = {user}
                userDispatch = {userDispatch}
                formatarHora = {formatarHora}
            />  
        </Container>
    );
};
export const Selecionar= styled.View`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    padding-horizontal: 20px;
`;