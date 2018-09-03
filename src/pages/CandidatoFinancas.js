import React from 'react';
import { Text, View } from 'react-native';
import { PricingCard } from 'react-native-elements';
import { Row, Grid  } from "react-native-easy-grid";

import ContentCandidato from '../components/ContentCandidato';

import { candidatoGasto, candidato } from '../services';
import { numeroParaReal, coresPartidos } from '../constants';
import styles from '../styles';

export default class CandidatoFinancas extends React.Component {
    constructor(props) {
        super(props);
        
        let backgroundColor = coresPartidos[this.props.navigation.state.params.candidato.partido.sigla.toLowerCase().replace(/\s+/g, "")];
        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({
                    title: this.props.navigation.state.params.candidato.nomeUrna,
                    headerColor: backgroundColor
                });
            }
        );

        this.state = {
            candidato: props.navigation.state.params.candidato,
            gasto:{dadosConsolidados:{},despesas:{}},
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    async componentDidMount(){
        let result = await candidatoGasto((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.cargo.codigo,(this.state.candidato.numero+"").substr(0, 2),this.state.candidato.numero,this.state.candidato.id);
        let result1 = await candidato((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.id);
        this.setState({gasto:result,candidato:result1,loading:false});
    }

    render() {
        return (
            <ContentCandidato loading={this.state.loading} candidato={this.state.candidato}>
                <Grid>
                    <Row>
                        {
                            this.state.gasto.dadosConsolidados && (
                                <View style={{flex:1,flexDirection:'column'}}>
                                    <Text style={[styles.titleSection,{fontSize:22,paddingBottom:0,marginTop:10}]}>Receitas</Text>
                                    <Text style={[styles.title,{fontSize:30,color:'#43a047'}]}>{numeroParaReal(this.state.gasto.dadosConsolidados.totalRecebido)}</Text>
                                    <Text style={[styles.titleSection,{paddingBottom:0}]}>{'Pessoas Físicas: '+numeroParaReal(this.state.gasto.dadosConsolidados.totalReceitaPF)}</Text>
                                    <Text style={[styles.titleSection]}>{'Partido: '+numeroParaReal(this.state.gasto.dadosConsolidados.totalPartidos)}</Text>
                                </View>
                            )
                        }
                        {
                            !this.state.gasto.dadosConsolidados && (
                                <View style={{flex:1,flexDirection:'column'}}>
                                    <Text style={[styles.titleSection,{fontSize:22,paddingBottom:0,marginTop:10}]}>Receitas</Text>
                                    <Text style={[styles.title,{fontSize:30,color:'#43a047'}]}>Não Declarado</Text>
                                </View>
                            )
                        }
                    </Row>
                    <Row>
                        {
                            this.state.gasto.despesas && (
                                <View style={{flex:1,flexDirection:'column', paddingBottom:15}}>
                                    <View style={styles.line}></View>
                                    <Text style={[styles.titleSection,{fontSize:22,paddingBottom:0,marginTop:10}]}>Despesas</Text>
                                    <Text style={[styles.title,{fontSize:30,color:'#f44336'}]}>{numeroParaReal(this.state.gasto.despesas.totalDespesasContratadas)}</Text>
                                    <Text style={[styles.titleSection,{paddingBottom:0}]}>{'Limite: '+numeroParaReal(this.state.gasto.despesas.valorLimiteDeGastos)}</Text>
                                    <Text style={[styles.titleSection]}>{'Pagas: '+numeroParaReal(this.state.gasto.despesas.totalDespesasPagas)}</Text>
                                </View>
                            )
                        }
                        {
                            !this.state.gasto.despesas && (
                                <View style={{flex:1,flexDirection:'column', paddingBottom:15}}>
                                    <View style={styles.line}></View>
                                    <Text style={[styles.titleSection,{fontSize:22,paddingBottom:0,marginTop:10}]}>Despesas</Text>
                                    <Text style={[styles.title,{fontSize:30,color:'#f44336'}]}>Não Declarada</Text>
                                </View>
                            )
                        }
                    </Row>
                </Grid>
            </ContentCandidato>
        );
    }
}