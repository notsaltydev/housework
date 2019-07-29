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
            const groups = await HttpClientService.getUserGroups();

            if (groups.data.length !== 0) {
                console.log('defaultGroupId', groups.data)
                await AsyncStorage.setItem('defaultGroupId', groups.data[0].id);

                return this.props.navigation.navigate('MainStack');
            }
            return this.props.navigation.navigate('OnBoardingStack');
        } else {
            return this.props.navigation.navigate('AuthStack');
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large"/>
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
