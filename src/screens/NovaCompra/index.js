import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { FlatList, Alert, Text, TouchableWithoutFeedback, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard, TextComponent, Modal, Image,Switch } from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, TopoInterno, TextStyles, TopHome } from '../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { farmacias, produtos } from '../../database/registros.js';
import DateTimePicker from '@react-native-community/datetimepicker';

export default () => {
    useEffect(()=> {
        async function carregarCompras(){
           const arrayCompras = await AsyncStorage.getItem("compras");
           if (arrayCompras) {
            setArrayCompras(JSON.parse(arrayCompras));
           }
        }
        carregarCompras();
    } ,[]);

    function dataAtualFormatada(){
        var data = new Date(),
            dia  = data.getDate().toString(),
            diaF = (dia.length == 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return "Nova Compra - "+diaF+"/"+mesF+"/"+anoF;
    };

    function horaAtualFormatada(data){
        var date = data,
            horas  = date.getHours().toString(),
            minutos = date.getMinutes().toString();
        return horas+":"+minutos;
    }

    const [listaFarmacias, verListaFarmacias] = useState(false);

    const [listaProdutos, verListaProdutos] = useState(false);

    const [tudo, verTudo] = useState(false);
    const [compra, setCompra] = useState({
        "nome": dataAtualFormatada(),
        "nomeFarmaciaSelecionada": '', 
        "carrinho": [],
        "horaParaEntrega": horaAtualFormatada(new Date()),
    });
    const [nomeFarmaciaSelecionada, selecionarNomeFarmacia] = useState('');
    const [carrinho, adicionarAoCarrinho] = useState([])
    const [total, setTotal] = useState(0);
    const [produtosDaFarmacia, setProdutosDaFarmacia] = useState([]);
    const [copiaProdutos, setCopiaProdutos] = useState([]);

    const [arrayCompras, setArrayCompras] = useState([]);

    const [date, setDate] = useState(new Date());
    const [horario, escolherHorario] = useState(false);
    const [mudou, mudouHorario] = useState(false);

    const onChange = (event, selectedDate) => {
        if (selectedDate === undefined) {
            const currentDate = selectedDate || date;
            escolherHorario(Platform.OS === 'ios');
            mudouHorario(false);
        }
        else{
            const currentDate = selectedDate || date;
            escolherHorario(Platform.OS === 'ios');
            setDate(currentDate);
            mudouHorario(true);
        }
    };

    const showTimepicker = () => {
        escolherHorario(true);
    };
    
    const navigation = useNavigation();

    const  Voltar = () => {
        navigation.reset({
            routes: [{name: 'Home'}]
        });
    }

    const BuscarFarmacia = ()=>{
        verListaFarmacias(true);
    }

    const AbrirListaProdutos = ()=>{
        if(nomeFarmaciaSelecionada===""){
            Alert.alert("AVISO!","Escolha uma farmácia primeiro");
            return;
        }
        verListaProdutos(true);
    }

    const AbrirVerTudo = ()=>{
        const newCompra = {
            "nome": dataAtualFormatada(),
            "nomeFarmaciaSelecionada": nomeFarmaciaSelecionada,
            "carrinho": carrinho,
            "horaParaEntrega": horaAtualFormatada(date)
        };
        setCompra(newCompra);
        verTudo(true);
    }

    function add({item}){
        if(item.unidades>0){
            const index = carrinho.indexOf(carrinho.find(obj => obj.id===item.id));
            if(index === -1){
                const parcial = produtosDaFarmacia.map(
                    produto => {
                        if(produto.id===item.id){
                            if(produto.unidades>0){
                                produto.unidades = produto.unidades - 1;
                                produto.comprados = produto.comprados + 1;
                                adicionarAoCarrinho([...carrinho, produto]);
                                setTotal(total + produto.preco);
                                return produto;
                            }
                            else{                                
                                return produto;
                            }
                        }
                        return produto;
                    }
                )
                setProdutosDaFarmacia(parcial);
            }
            else{
                const parcial = produtosDaFarmacia.map(
                    produto => {
                        if(produto.id===item.id){
                            if(produto.unidades>0){
                                produto.unidades = produto.unidades - 1;
                                produto.comprados = produto.comprados + 1;
                                carrinho[index]=produto;
                                setTotal(total + produto.preco);
                                return produto;
                            }
                            else{                                
                                return produto;
                            }
                        }
                        return produto;
                    }
                )
                setProdutosDaFarmacia(parcial);
            }
        }
        else {
            Alert.alert("AVISO!", "Você não pode acidionar mais itens");
        }
    }
    function remove({item}){
        if(item.comprados>0){
            const index = carrinho.indexOf(carrinho.find(obj => obj.id===item.id));
            if(index !== -1){
                const parcial = produtosDaFarmacia.map(
                    produto => {
                        if(produto.id===item.id){
                            if(produto.comprados>0){
                                produto.unidades = produto.unidades + 1;
                                produto.comprados = produto.comprados - 1;
                                if(produto.comprados===0){
                                    adicionarAoCarrinho(carrinho.filter(produtos=> produtos.id!==item.id));
                                    setTotal(total - produto.preco);
                                    return produto;
                                }
                                else{
                                    carrinho[index]=produto;
                                    setTotal(total - produto.preco);
                                    return produto;
                                }
                            }
                            else{                                
                                return produto;
                            }
                        }
                        return produto;
                    }
                )
                setProdutosDaFarmacia(parcial);
            }
        }
        else {
            
            Alert.alert("AVISO!", "Você não pode remover mais itens");
        }
    }

    const ConfirmarFarmacia = () => {
        if (nomeFarmaciaSelecionada!=='') {
            verListaFarmacias(false)
        }
        else {
            Alert.alert(
                "AVISO!",
                "Você não escolheu uma farmácia. Deseja escolher?",
                [
                    {
                        text: "Sim",
                        onPress: ()=> {
                            return;
                        }
                    },
                    {
                        text: "Não",
                        onPress: ()=>{
                            verListaFarmacias(false);
                        },
                        style: 'cancel'
                    }
                ],
                {cancelable: false}
            );    
        }
    }
    const FinalizarCompra = () => {
        if(carrinho.length===0){
            Alert.alert("ERRO!", "Você não adicionou nenhum produto no carrinho");
            return;
        }
        else{
            if(nomeFarmaciaSelecionada!=="" && total!==0 && mudou===true){
                Alert.alert(
                    "Confirmar!",
                    "Deseja finalizar a compra agora?",
                    [
                        {
                            text: "Sim",
                            onPress: ()=> {
                                const compraFinal = {...compra, "total": total.toFixed(2)};
                                const final = [...arrayCompras, compraFinal];
                                AsyncStorage.setItem("compras", JSON.stringify(final));
                                console.log(final);//curiosidade, para ver o resultado
                                verTudo(false);
                                navigation.reset({
                                    routes: [{name: 'NovaCompra'}]
                                });
                            }
                        },
                        {
                            text: "Não",
                            onPress: ()=>{
                                return;
                            },
                            style: 'cancel'
                        }
                    ],
                    {cancelable: false}
                );
            }
            else{
                Alert.alert("ERRO!", "Preencha todas as informações");
                return;
            }
        }
    }
    const ConfirmarProdutos = () => {
        if (carrinho.length!==0) {
            verListaProdutos(false)
        }
        else {
            Alert.alert(
                "AVISO!",
                "Você não adicionou produtos. Deseja adicionar?",
                [
                    {
                        text: "Sim",
                        onPress: ()=> {
                            return;
                        }
                    },
                    {
                        text: "Não",
                        onPress: ()=>{
                            verListaProdutos(false);
                        },
                        style: 'cancel'
                    }
                ],
                {cancelable: false}
            );    
        }
    }

    const FecharProdutos = () => {
        verListaProdutos(false);
    }

    const RemoverProdutos = () => {
        if (carrinho.length!==0) {
            Alert.alert(
                "Confirmar!",
                "Deseja limpar todas as suas escolhas?",
                [
                    {
                        text: "Sim",
                        onPress: ()=> { 
                            setTotal(0);
                            carrinho.length = 0;
                            verListaProdutos(false);
                            navigation.reset({
                                routes: [{name: 'NovaCompra'}]
                            });
                        }
                    },
                    {
                        text: "Não",
                        onPress: ()=>{
                            return;
                        },
                        style: 'cancel'
                    }
                ],
                {cancelable: false}
            );            
        }
        else {
            verListaProdutos(false); 
        }
    }
    function RenderFarmacias ({disponiveis, nomeFarmacia}) {
        const produtos_Disponiveis = disponiveis.map(
            id => produtos.find(obj => obj.id === id) || {}
        );

        return(
            <TouchableOpacity onPress = {
                nomeFarmaciaSelecionada === ""
                    ?   ()=>{selecionarNomeFarmacia(nomeFarmacia);
                        setProdutosDaFarmacia(produtos_Disponiveis); setCopiaProdutos(produtos_Disponiveis);}

                    :   (nomeFarmaciaSelecionada === nomeFarmacia
                            ?   ()=> {carrinho.length!==0
                                ?   Alert.alert(
                                        "Confirmar?",
                                        "Seu carrinho será zerado",
                                        [
                                            {
                                                text: "Cancelar",
                                                onPress: ()=> {
                                                    return;
                                                },
                                                style: 'cancel'
                                            },
                                            {
                                                text: "Confirmar",
                                                onPress: ()=>{
                                                    selecionarNomeFarmacia('');
                                                    produtosDaFarmacia.length = 0;
                                                    setTotal(0);
                                                    carrinho.length = 0;
                                                }
                                            }
                                        ],
                                        {cancelable: false}
                                    )   
                                

                                :   selecionarNomeFarmacia('');
                                    setProdutosDaFarmacia([]);
                                    setTotal(0);
                                    adicionarAoCarrinho([]);
                                }
                            :   ()=>{carrinho.length!==0
                                    ?   Alert.alert(
                                            "Confirmar?",
                                            "Se mudar de farmácia seu carrinho será zerado",
                                            [
                                                {
                                                    text: "Cancelar",
                                                    onPress: ()=> {
                                                        return;
                                                    },
                                                    style: 'cancel'
                                                },
                                                {
                                                    text: "Confirmar",
                                                    onPress: ()=>{
                                                        selecionarNomeFarmacia('');
                                                        selecionarNomeFarmacia(nomeFarmacia);
                                                        setProdutosDaFarmacia(produtos_Disponiveis);
                                                        setTotal(0);
                                                        carrinho.length = 0;
                                                    }
                                                }
                                            ],
                                            {cancelable: false}
                                        )
                                    :   selecionarNomeFarmacia('');
                                        selecionarNomeFarmacia(nomeFarmacia);
                                        setProdutosDaFarmacia(produtos_Disponiveis);
                                        setTotal(0);
                                }
                        )
                }
            >
                <ItemFarmacia style={{
                        backgroundColor: nomeFarmaciaSelecionada === nomeFarmacia
                            ? '#27AE60'
                            : '#EEEEEE', 
                        marginBottom: 15
                    }}
                >
                    <Text style={TextStyles.ListText}>{nomeFarmacia}</Text>
                    {nomeFarmaciaSelecionada === nomeFarmacia
                        ?   <Icon name = 'check-box' size={24} color = "#FFFFFF"/>
                        :   <Icon name = 'check-box-outline-blank' size={24} color = "#000000"/>
                    }
                </ItemFarmacia>

            </TouchableOpacity>
        )                                
    }
    function RenderProdutos ({item}) {
        return(
            <TouchableWithoutFeedback onPress={()=>{}}>
                <ItemProdutos style={{backgroundColor: "#EEEEEE", opacity: item.disponivel? 1 : 0.3, marginBottom: 10}}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={{uri: item.imagem}} style={{width: 50, height: 50}}/>
                        <Text style={TextStyles.ListText}>{item.nome}</Text>
                    </View>
                    <View style={{width: '50%', justifyContent: 'space-around', alignItems: 'center'}}>                   
                        <Text style={TextStyles.ListText}>{item.descricao}</Text>
                        <Text style={TextStyles.PriceText}>{`R$ ${item.preco.toFixed(2)}`}</Text>
                        {item.disponivel
                            ?   <Text style={TextStyles.ListText}>
                                    {`Unidades Disponíves: ${item.unidades}`}
                                </Text>   
                            :   <Text style={TextStyles.ListText}>Produto Indisponível</Text>
                        }                    
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={TextStyles.ListText}>{item.comprados}</Text>
                        {item.disponivel
                            ?   <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity 
                                        style={{paddingHorizontal: 5}}
                                        onPress={
                                            ()=>
                                            {
                                                remove({item});
                                            }
                                        }
                                    >
                                        <Icon name = 'remove' size={24} color = "#27AE60"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{paddingHorizontal: 5}}
                                        onPress={
                                            ()=>
                                            {
                                                add({item});
                                            } 
                                        }
                                    >
                                        <Icon name = 'add' size={24} color = "#27AE60"/>
                                    </TouchableOpacity>
                                </View>
                            :   <View style={{flexDirection: 'row'}}>
                                    <Icon style={{paddingHorizontal: 5}} name = 'remove' size={24} color = "#27AE60"/>
                                    <Icon style={{paddingHorizontal: 5}} name = 'add' size={24} color = "#27AE60"/>
                                </View>

                            }
                            

                    </View>
                </ItemProdutos>
            </TouchableWithoutFeedback>
        )                                
    }
    function RenderInfoCompra ({info}) {
        return(
            <TouchableWithoutFeedback onPress={()=>{}}>
                <ItemCompras style={{borderColor: "#000000", borderWidth: 2}}>
                    <Text style={TextStyles.ListText}>{info.nome}</Text>
                    <Text style={TextStyles.ListText}>{info.descricao}</Text>
                    <Text style={TextStyles.ListText}>{`R$ ${info.preco.toFixed(2)}`}</Text>
                    <Text style={TextStyles.ListText}>{`${info.comprados}x`}</Text>
                </ItemCompras>
            </TouchableWithoutFeedback>
        )                                
    }
    return (
        <Container>
            <View style={{flex: 1, width: '100%', marginTop: 60, alignItems: 'center'}} >
                <TopHome nomeIconeEsquerdo={'shopping-cart'} setaVoltar={Voltar} nomeArea={'NOVA COMPRA'}/>

                <TouchableOpacity
                    style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                    onPress = {BuscarFarmacia}
                >
                    <Selecionar>
                        {nomeFarmaciaSelecionada !==''
                            ? <Text style={TextStyles.SearchText}>{nomeFarmaciaSelecionada}</Text>
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
                    onPress={showTimepicker}
                >
                    <Selecionar>
                        <Text style={TextStyles.SelectionText}>
                            {mudou
                                ? horaAtualFormatada(date)
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
            <View>
                <Modal
                    animationType="slide"
                    visible={listaFarmacias}
                    onRequestClose={() => {
                        verListaFarmacias(false);
                    }}
                >
                    <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                        <FlatList
                            style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}
                            data={farmacias}
                            keyExtractor = {(item)=> item.id.toString()}
                            extraData={nomeFarmaciaSelecionada}
                            showsVerticalScrollIndicator = {true}
                            renderItem={({item}) => {
                                return(
                                    <RenderFarmacias disponiveis={item.produtos} nomeFarmacia={item.nome}/>
                                )                                
                            }}
                        />
                        <View style={{paddingBottom: 40}}>

                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {ConfirmarFarmacia}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Confirmar</Text>
                                    <Icon name='check' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {()=>verListaFarmacias(false)}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Fechar</Text>
                                    <Icon name='clear' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {
                                    ()=>{
                                        Alert.alert(
                                            "Confirmar!",
                                            "Deseja remover sua escolha?",
                                            [ 
                                                {
                                                    text: "Sim",
                                                    onPress: ()=>{
                                                        navigation.reset({routes: [{name: 'NovaCompra'}]});
                                                    }
                                                },
                                                {
                                                    text: "Não",
                                                    onPress: ()=> {
                                                        return;
                                                    },
                                                    style: 'cancel'
                                                }
                                            ],
                                            {cancelable: false}
                                        )                                        
                                    }
                                }
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Limpar</Text>
                                    <Icon name='delete-forever' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            </View>            
            <View>
                <Modal
                    animationType="slide"
                    visible={listaProdutos}
                    onRequestClose={() => {
                        verListaProdutos(false);
                    }}
                >
                    <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                        <FlatList
                            style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15}}
                            data={produtosDaFarmacia}
                            keyExtractor = {(item)=> item.id.toString()}
                            showsVerticalScrollIndicator = {true}
                            renderItem={({item}) => {
                                return(
                                    <RenderProdutos item={item}/>
                                )                                
                            }}
                        />
                        <View style={{paddingBottom: 40}}>
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {ConfirmarProdutos}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Confirmar</Text>
                                    <Icon name='check' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {FecharProdutos}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Fechar</Text>
                                    <Icon name='clear' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {RemoverProdutos}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Limpar tudo</Text>
                                    <Icon name='delete-forever' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    visible={tudo}
                    onRequestClose={() => {
                        verTudo(false);
                    }}
                >
                    <View style={{flex: 1, width: '100%', backgroundColor:'#4A989F'}}>
                        <View style={{width: '100%', paddingHorizontal: 15, marginTop: 15}}>
                            <Text style={TextStyles.baseText}>
                                {compra.nome}
                            </Text>
                        </View>
                        {compra.carrinho.length === 0
                            ?   <View style={
                                    {width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15, marginVertical: 15}
                                }>
                                    <Text style={TextStyles.ListText}>
                                        Adicione produtos ao carrinho.
                                    </Text>
                                </View>
                            :   <FlatList
                                    style={{flex: 1, width: '100%', paddingHorizontal: 15, marginTop: 15, marginBottom: 15}}
                                    data={compra.carrinho}
                                    keyExtractor = {(item)=> item.id.toString()}
                                    extraData={carrinho}
                                    showsVerticalScrollIndicator = {true}
                                    renderItem={({item}) => {
                                        return(
                                            <RenderInfoCompra info={item} />
                                        )                                
                                    }}
                                />
                        }
                        <View style={{paddingBottom: 40}}>
                            <View style={{width: '100%', paddingHorizontal: 15, marginTop: 15}}>
                                <Text style={TextStyles.ListText}>
                                    {compra.nomeFarmaciaSelecionada!==""
                                        ?   `Origem: ${compra.nomeFarmaciaSelecionada}`
                                        :   "Escolha uma farmácia"
                                    }
                                    
                                </Text>

                                <Text style={TextStyles.ListText}>{`Total: R$ ${total.toFixed(2)}`}</Text>

                                <Text style={TextStyles.ListText}>
                                    {mudou
                                        ?   `Chegada solicitada: ${compra.horaParaEntrega}`
                                        :   "Esolha um horário para receber sua compra"
                                    }
                                </Text>
                            </View>

                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {FinalizarCompra}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Finalizar</Text>
                                    <Icon name='check' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {()=>verTudo(false)}
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Fechar</Text>
                                    <Icon name='clear' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style = {{width: '100%', paddingHorizontal: 40, paddingTop: 15}}
                                onPress = {
                                    ()=>{
                                        Alert.alert(
                                            "Confirmar!",
                                            "Deseja limpar todas as suas escolhas?",
                                            [ 
                                                {
                                                    text: "Sim",
                                                    onPress: ()=>{
                                                        navigation.reset({routes: [{name: 'NovaCompra'}]});
                                                    }
                                                },
                                                {
                                                    text: "Não",
                                                    onPress: ()=> {
                                                        return;
                                                    },
                                                    style: 'cancel'
                                                }
                                            ],
                                            {cancelable: false}
                                        )                                        
                                    }
                                }
                            >
                                <AcaoModal>
                                    <Text style={TextStyles.SelectionText}>Limpar tudo</Text>
                                    <Icon name='delete-forever' size={24} color = "#000000" />
                                </AcaoModal>
                            </TouchableOpacity>

                        </View>
                    </View>
                </Modal>
            </View>            
        </Container>
    );
};

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 20px;
    width: 100%;
`;
export const Produto = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    align-self: stretch
    align-items: flex-start;
    padding-horizontal: 20px;
`;
export const ItemFarmacia = styled.View`
    height: 50px;
    border-radius: 10px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
`;
export const ItemProdutos = styled.View`
    height: 150px;
    border-radius: 20px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
`;
export const ItemCompras = styled.View`
    height: 150px;
    border-radius: 20px;
    width: 100%;
    align-items: center;
    justify-content: space-around;
    padding-horizontal: 20px;
    margin-bottom: 5px;
`;
export const Compra = styled.View`
    height: 50px;
    background-color: #EEEEEE;
    border-radius: 10px;
    justify-content: space-between;
    align-self: stretch
    align-items: center;
    flex-direction: row;
    padding-horizontal: 20px;
`;
export const AcaoModal= styled.View`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    padding-horizontal: 20px;
`;
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
export const AdicionarCompra = styled.View`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: space-between;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    padding-horizontal: 20px;
`;

export const BtnLista = styled.TouchableOpacity`
    height: 40px;
    border: #000000;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: row;     
`;