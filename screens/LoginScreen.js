import React, {Component} from 'react';
import {AsyncStorage, Button, View} from 'react-native';

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'LoginScreen',
    };

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    };

    render() {
        return (
            <View>
                <Button title="Sign in!" onPress={this._signInAsync}/>
            </View>
        );
    }
}
