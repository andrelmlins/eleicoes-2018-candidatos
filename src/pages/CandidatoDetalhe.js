import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Col, Row } from "react-native-easy-grid";
import Image from 'react-native-image-progress';
import Circle from 'react-native-progress/Circle';

import Content from '../components/Content';
import NumeroUrna from '../components/NumeroUrna';
import RedesSociais from '../components/RedesSociais';
import ItemCandidato from '../components/ItemCandidato';
import FavoritoCandidato from '../components/FavoritoCandidato';

import { candidato } from '../services';
import styles from '../styles';
import colors from '../colors';

export default class CandidatoDetalhe extends React.Component {
    constructor(props) {
        super(props);

        // props.navigation.addListener(
        //     'willFocus',
        //     payload => {
        //         this.props.navigation.setParams({
        //             title: this.props.navigation.state.params.candidato.nomeUrna,
        //             headerRight: <FavoritoCandidato candidato={props.navigation.state.params.candidato} />
        //         });
        //     }
        // );

        this.state = {
            candidato: {
                id: props.navigation.state.params.candidato.id,
                sites: [],
                partido: {},
                numero:"",
                dataDeNascimento:"",
                vices: []
            },
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    async componentDidMount(){
        let result = await candidato((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.id);
        if(result.vices==null) result.vices = [];
        this.setState({candidato:result,loading:false});

        this.willFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.props.navigation.setParams({
                    title: this.state.candidato.nomeUrna,
                    headerRight: <FavoritoCandidato candidato={this.state.candidato} />
                });
            }
        );
    }

    componentWillUnmount() {
        this.willFocusSubscription.remove();
    }

    render() {
        return (
            <Content loading={this.state.loading}>
                    <Card containerStyle={styles.card}>
                        <Row>
                            <Col size={35}>
                                <Image
                                    indicator={Circle} 
                                    style={styles.imageCandidato}
                                    source={{uri:this.state.candidato.fotoUrl}}
                                    indicatorProps={{
                                        size: 40,
                                        borderWidth: 0,
                                        color: colors.accent,
                                      }} />
                            </Col>
                            <Col size={65}>
                                <Text style={styles.title}>{this.state.candidato.nomeUrna}</Text>
                                <Text style={styles.subtitle}>{this.state.candidato.partido.sigla}</Text>
                                <NumeroUrna style={{paddingTop: 30}} numero={this.state.candidato.numero+""} />
                            </Col>
                        </Row>
                    </Card>
                    <Card containerStyle={styles.card}>
                        <Row>
                            <Col>
                                <Text style={styles.titleSection}>Redes Sociais</Text>
                                <RedesSociais redes={this.state.candidato.sites} />
                            </Col>
                        </Row>
                    </Card>
                    <Card containerStyle={styles.card}>
                        <Row>
                            <Col>
                                <Text style={styles.titleSection}>Dados do Candidato</Text>
                                <ItemCandidato title="Nome Completo:" value={this.state.candidato.nomeCompleto} />
                                <ItemCandidato title="Ocupação:" value={this.state.candidato.ocupacao} />
                                <ItemCandidato title="Sexo:" value={this.state.candidato.descricaoSexo  } />
                                <ItemCandidato title="Nascimento:" value={this.state.candidato.dataDeNascimento.split('-').reverse().join('/')} />
                                <ItemCandidato title="Coligação:" value={this.state.candidato.nomeColigacao} />
                                <ItemCandidato title="Partidos:" value={this.state.candidato.composicaoColigacao} />
                            </Col>
                        </Row>
                    </Card>
                    {
                        this.state.candidato.vices.length>0 && (
                            <Card containerStyle={styles.card}>
                                <Row>
                                    <Col>
                                        <Text style={styles.titleSection}>Vice</Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size={30}>
                                        <Image style={styles.imageViceCandidato} source={{uri:this.state.candidato.vices[0].urlFoto}} />
                                    </Col>
                                    <Col size={70}>
                                        <Text style={styles.titleVice}>{this.state.candidato.vices[0].nm_URNA}</Text>
                                        <Text style={styles.subtitle}>{this.state.candidato.vices[0].sg_PARTIDO}</Text>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    }
            </Content>
        );
    }
}