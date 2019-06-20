import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native';

import {AppStyles} from "../constants/Colors";

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

export default createStackNavigator(
    {
        Login: {screen: LoginScreen},
        Signup: {screen: SignupScreen},
        Welcome: {screen: WelcomeScreen}
    },
    {
        initialRouteName: "Welcome",
        headerMode: "float",
        navigationOptions: ({navigation}) => ({
            headerTintColor: "red",
            headerTitleStyle: styles.headerTitleStyle
        }),
        cardStyle: {backgroundColor: "#FFFFFF"}
    }
);

const styles = StyleSheet.create({
    headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        color: "black",
        flex: 1,
        fontFamily: AppStyles.fontName.main
    }
});
