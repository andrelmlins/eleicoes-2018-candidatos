import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import ImageProgress from 'react-native-image-progress';
import Circle from 'react-native-progress/Circle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import colors from '../colors';

class CandidatoItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.candidato.descricaoSituacao!=="Indeferido") {
            return (
                <TouchableNativeFeedback onPress={() => this.props.onPress(this.props.candidato)}>
                    <View style={[
                                !this.props.last ? {borderBottomColor:colors.greyNew,borderBottomWidth:1,backgroundColor:colors.white} : {backgroundColor:colors.white, borderBottomLeftRadius:15, borderBottomRightRadius: 15},
                                this.props.index==0 ? {borderTopLeftRadius:15, borderTopRightRadius:15} : {}
                                ]}>
                        <ImageProgress
                            indicator={Circle} 
                            style={{
                                position:'absolute',
                                top:0,
                                left:0,
                                zIndex:100,
                                width:40,
                                height:40,
                                marginTop:9,
                                marginLeft:9
                            }}
                            imageStyle={{
                                resizeMode: 'cover',
                                borderRadius:100,
                            }}
                            source={{uri:"http://brunohpmarques.000webhostapp.com/eleicoes/getFoto.php?id_tse="+this.props.candidato.id}}
                            indicatorProps={{
                                size: 20,
                                borderWidth: 0,
                                color: colors.accent
                            }} />
                        <View style={{flexDirection: 'column', padding: 10, marginLeft:50, zIndex:0}}>
                            <Text numberOfLines={1} style={{textAlign:'left', color:colors.black, fontSize: 15, width:"90%"}}>{this.props.candidato.nomeUrna}</Text>
                            <Text numberOfLines={1} style={{textAlign:'left', color:colors.gray, fontSize: 12, fontWeight:'bold', width:"90%"}}>{this.props.candidato.partido.sigla+" - "+this.props.candidato.nomeColigacao}</Text>
                            <SimpleLineIcons style={{position:'absolute', right:15, top:22}} name="arrow-right" size={15} color={colors.gray} />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        } else {
            return <View />;
        }
    }
}

CandidatoItem.propTypes = {
    candidato: PropTypes.object,
    last: PropTypes.bool,
    onPress: PropTypes.func,
    index: PropTypes.number
}

CandidatoItem.defaultProps = {
    candidato: {},
    last: false
}

export default CandidatoItem;