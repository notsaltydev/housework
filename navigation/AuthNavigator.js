import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native';

import {AppStyles} from "../constants/Colors";

import LoginScreen from '../screens/LoginScreen';

export default createStackNavigator(
    {
        Login: {screen: LoginScreen}
    },
    {
        initialRouteName: "Login",
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
