import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {AppStyles} from '../constants/Colors';

export default class WelcomeScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };

        this._init();
    }

    _init() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000);
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator
                    style={styles.spinner}
                    size="large"
                    color={AppStyles.color.tint}
                />
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Say hello to your new app</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.button}>Log in!</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
                        <Text style={styles.button}>Sign Up!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 150
    },
    logo: {
        width: 200,
        height: 200
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: "bold",
        color: AppStyles.color.tint,
        marginTop: 20,
        textAlign: "center",
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20
    },
    loginContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30
    },
    loginText: {
        color: AppStyles.color.white
    },
    signupContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
        padding: 8,
        borderWidth: 1,
        borderColor: AppStyles.color.tint,
        marginTop: 15
    },
    signupText: {
        color: AppStyles.color.tint
    },
    spinner: {
        marginTop: 200
    },
    buttonContainer: {
        marginTop: 30,
    },
    button: {
        backgroundColor: AppStyles.color.tint,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign: 'center',
    }
});
