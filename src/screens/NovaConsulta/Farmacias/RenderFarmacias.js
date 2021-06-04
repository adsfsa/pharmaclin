import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextStyles } from '../../../components/Components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ApiConsulta from '../ApiConsulta';

export default (
    {item, selecionarFarmacia, setServicosDaFarmacia, farmaciaSelecionada, servicosDaFarmacia,selecionarServico}
) => {
    return(
        <TouchableOpacity onPress = {
            farmaciaSelecionada.id === ""
                ?   async ()=>{
                        selecionarFarmacia(item);
                        const array = await ApiConsulta.carregarServicos(item.info.servicos);
                        if (array) {
                            //console.log(array);
                            setServicosDaFarmacia(array);
                        }
                        //console.log(item.info.servicos);
                    }

                :   farmaciaSelecionada.id === item.id
                        ?   ()=>{
                                selecionarFarmacia({id: "", info: {}});
                                servicosDaFarmacia.length = 0;
                                selecionarServico("");
                            }
                        :   async ()=>{
                                selecionarFarmacia({id: "", info: {}});
                                selecionarFarmacia(item);
                                const array = await ApiConsulta.carregarServicos(item.info.servicos);
                                if (array) {
                                    setServicosDaFarmacia(array);
                                }
                            }
                    
            }
        >
            <ItemFarmacia style={{
                    backgroundColor: farmaciaSelecionada.id === item.id
                        ? '#27AE60'
                        : '#EEEEEE', 
                    marginBottom: 15
                }}
            >
                <Text style={TextStyles.ListText}>{item.info.nome}</Text>
                {farmaciaSelecionada.id === item.id
                    ?   <Icon name = 'check-box' size={24} color = "#FFFFFF"/>
                    :   <Icon name = 'check-box-outline-blank' size={24} color = "#000000"/>
                }
            </ItemFarmacia>

        </TouchableOpacity>
    )
};

export const ItemFarmacia = styled.View`
    height: 50px;
    border-radius: 10px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
`;