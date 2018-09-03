import React from 'react';
import { TextInput, Text, AsyncStorage, ToastAndroid, Picker, View } from 'react-native';
import { Button } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import { estados } from '../constants';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';

import Content from '../components/Content';
import colors from '../colors';

export default class Login extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            estado: ""
        };
    }

    componentDidMount(){
        alert(DeviceInfo.getDeviceId());
        SplashScreen.hide();
    }

    async entrar(){
        if(this.state.email!="" && this.state.nome!="" && this.state.estados!=""){
            await AsyncStorage.setItem('@Eleicoes2018:estado', this.state.estado);

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Main' })],
            });
            this.props.navigation.dispatch(resetAction);
        } else {
            ToastAndroid.show('Campos Obrigatórios', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <Content style={{padding:20}}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:30, textAlign:"center", padding:10, marginBottom:40, marginTop:40}}>Bem Vindo ao aplicativo Eleições 2018 !!!</Text>
                <View style={{height: 50, borderColor: 'white', borderWidth: 1, borderRadius:5, marginTop:20}}>
                    <Picker
                        selectedValue={this.state.estado}
                        style={{ color:"white"}}
                        itemStyle={{ fontSize:40 }}
                        onValueChange={(itemValue) => this.setState({estado: itemValue})}>
                        <Picker.Item enabled={false} label="Escolha o Estado" value="" />
                        {
                            estados.map((estado) =>{
                                return <Picker.Item key={estado.estadoabrev} label={estado.estado} value={estado.estadoabrev} />
                            })
                        }
                    </Picker>
                </View>
                <Button
                    containerViewStyle={{marginLeft:0, paddingLeft: 0, marginTop:20, width:"100%"}}
                    raised
                    backgroundColor={colors.white}
                    color={colors.black}
                    onPress={() => this.entrar()}
                    title='Entrar' />
            </Content>
        );
    }
}