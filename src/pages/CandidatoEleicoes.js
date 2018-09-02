import React from 'react';
import { ListItem, Card } from 'react-native-elements';

import Content from '../components/Content';

import { candidato } from '../services';
import styles from '../styles';

export default class CandidatoEleicoes extends React.Component {
    constructor(props) {
        super(props);

        props.navigation.addListener(
            'willFocus',
            payload => {
                this.props.navigation.setParams({
                    title: this.props.navigation.state.params.candidato.nomeUrna
                });
            }
        );

        this.state = {
            candidato: {
                id: props.navigation.state.params.candidato.id,
                eleicoesAnteriores: []
            },
            estado: props.navigation.state.params.estado,
            loading: true
        };
    }

    async componentDidMount(){
        let result = await candidato((this.state.estado ? this.state.estado.estadoabrev : "BR"),this.state.candidato.id);
        this.setState({candidato:result,loading:false});
    }

    render() {
        return (
            <Content loading={this.state.loading}>
                <Card containerStyle={styles.card}>
                    {
                        this.state.candidato.eleicoesAnteriores.map((l, index) => (
                            <ListItem
                                key={l.ordem+""}
                                containerStyle={index==this.state.candidato.eleicoesAnteriores.length-1 ? {borderBottomWidth: 0} : {}}
                                title={"Cargo: "+l.cargo}
                                subtitle={"Ano: "+l.nrAno}
                                rightIcon={
                                    {
                                        type:"entypo",
                                        name:l.situacaoTotalizacao!="Eleito" ? "" : "trophy"
                                    }
                                }
                                hideChevron={ l.situacaoTotalizacao!="Eleito" }
                            />
                        ))
                    }
                </Card>
            </Content>
        );
    }
}