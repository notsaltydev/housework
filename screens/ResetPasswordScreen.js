import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FormButton} from "../components/FormButton";
import {FormInput} from "../components/FormInput";

export default class ResetPasswordScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isLoading: false,
            isEmailValid: true
        };

        this.resetPassword = this.resetPassword.bind(this);
    }

    resetPassword() {
        console.log('resetPassword');
    }

    goBackToLogin() {
        this.props.navigation.pop();
    }

    validateEmail(email) {
        const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegExp.test(email);
    }

    render() {
        const {isLoading, email, isEmailValid} = this.state;
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
                <View style={styles.container}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            height: 60,
                            width: 60,
                            backgroundColor: '#F5F5F5',
                            borderRadius: 50,
                            marginBottom: 60,
                            marginTop: 40,
                        }}>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 24,
                        fontFamily: 'open-sans-bold',
                        color: '#28165B'
                    }}>Troubles with sign in?</Text>
                    <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <FormInput
                            refInput={input => (this.emailInput = input)}
                            value={email}
                            otherContainerStyle={{marginTop: 40}}
                            onChangeText={email => this.setState({email})}
                            placeholder='Email'
                            keyboardType='email-address'
                            returnKeyType='next'
                            errorMessage={
                                isEmailValid ? null : 'Please enter a valid email address'
                            }
                            onSubmitEditing={() => {
                                this.validateEmail();
                                this.resetPassword();
                            }}
                        />
                        <FormButton
                            activeOpacity={0.8}
                            title={'Reset Password'}
                            otherButtonContainer={{marginTop: 40}}
                            onPress={this.resetPassword()}
                            loading={isLoading}
                            disabled={isLoading}
                        />
                    </View>
                    <View style={styles.helpContainer}>
                        <Text style={{fontSize: 12, fontFamily: 'open-sans'}}>Go back to </Text>
                        <TouchableOpacity
                            onPress={() => this.goBackToLogin()}>
                            <Text
                                style={{fontSize: 12, textDecorationLine: 'underline', fontFamily: 'open-sans'}}>
                                Sign in & Sign up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#FFFFFF',
    },
    helpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        height: 64,
    }
});

