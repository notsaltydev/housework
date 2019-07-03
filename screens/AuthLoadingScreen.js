import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {HttpClientService} from "../services/HttpClientService";

export default class AuthLoadingScreen extends Component {

    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
            const userGroups = await HttpClientService.getUserGroups();

            if (userGroups.length) {
                return this.props.navigation.navigate('Main');
            } else {
                this.props.navigation.navigate('SetupGroup');
            }
        } else {
            return this.props.navigation.navigate('Auth');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </SafeAreaView>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
