import React, {Component} from 'react';
import {
    Alert,
    AsyncStorage,
    Dimensions,
    LayoutAnimation,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {Button, Input} from 'react-native-elements';

import {LoginService} from '../services/LoginService';
import {SignupService} from '../services/SignupService';
import {HttpClientService} from "../services/HttpClientService";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: '',
            selectedCategory: 0,
            isLoading: false,
            isEmailValid: true,
            isUsernameValid: true,
            isPasswordValid: true,
        };

        this.selectCategory = this.selectCategory.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    selectCategory(selectedCategory) {
        LayoutAnimation.easeInEaseOut();
        this.setState({
            selectedCategory,
            isLoading: false,
        });
    }

    validateEmail(email) {
        const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return emailRegExp.test(email);
    }

    navigateToScreen = async () => {
        const groups = await HttpClientService.getUserGroups();

        if (groups.data && groups.data.length) {
            await AsyncStorage.setItem('defaultGroupId', groups.data[0].id);
            console.log('---MainStack---');
            return this.props.navigation.navigate('MainStack');
        }
        console.log('---SetupGroupStack---');
        this.props.navigation.navigate('SetupGroupStack');
    };

    login() {
        const {email, password} = this.state;

        LayoutAnimation.easeInEaseOut();

        this.setState({
            isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
            isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        });

        if (this.validateEmail(email) && password.length >= 8) {
            this.setState({isLoading: true});

            LoginService(email, password)
                .then(() => this.setState({isLoading: false}))
                .then(() => this.navigateToScreen())
                .catch((error) => {
                    this.setState({isLoading: false});
                    console.log('error', error);
                    Alert.alert(`Error: ${error.code || ''} 🔥`, error.message || error);
                });
        }
    }

    signUp() {
        const {email, password, username} = this.state;

        LayoutAnimation.easeInEaseOut();

        this.setState({
            isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
            isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
            isUsernameValid: username.length >= 5 || this.usernameInput.shake(),
        });

        if (this.validateEmail(email) && password.length >= 8 && username.length >= 5) {
            this.setState({isLoading: true});

            SignupService(username, email, password)
                .then(() => LoginService(email, password))
                .then(() => this.setState({isLoading: false}))
                .then(() => this.navigateToScreen())
                .catch((error) => {
                    this.setState({isLoading: false});
                    console.log('error', error);
                    Alert.alert(`Error: ${error.code || ''} 🔥`, error.message || error);
                });
        }
    }

    render() {
        const {
            selectedCategory,
            isLoading,
            isEmailValid,
            isPasswordValid,
            isUsernameValid,
            email,
            password,
            username,
        } = this.state;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;

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
                    <View style={{flexDirection: 'row'}}>
                        <Button
                            disabled={isLoading}
                            type='clear'
                            activeOpacity={0.7}
                            onPress={() => this.selectCategory(0)}
                            containerStyle={{marginRight: 5}}
                            titleStyle={[
                                styles.categoryText,
                                isLoginPage && styles.selectedCategoryText,
                            ]}
                            title={'Sign in'}
                        />
                        <Button
                            disabled={isLoading}
                            type='clear'
                            activeOpacity={0.7}
                            onPress={() => this.selectCategory(1)}
                            containerStyle={{marginLeft: 5}}
                            titleStyle={[
                                styles.categoryText,
                                isSignUpPage && styles.selectedCategoryText,
                            ]}
                            title={'Sign up'}
                        />
                    </View>
                    <View style={styles.formContainer}>
                        {isSignUpPage && (
                            <FormInput
                                value={username}
                                refInput={input => (this.usernameInput = input)}
                                onChangeText={username => this.setState({username})}
                                placeholder='Name'
                                keyboardType='default'
                                returnKeyType='next'
                                errorMessage={
                                    isUsernameValid ? null : 'Please enter at least 5 characters'
                                }
                                onSubmitEditing={() => this.emailInput.focus()}
                            />
                        )}
                        <FormInput
                            refInput={input => (this.emailInput = input)}
                            value={email}
                            otherContainerStyle={!isSignUpPage || ({marginTop: 20})}
                            onChangeText={email => this.setState({email})}
                            placeholder='Email'
                            keyboardType='email-address'
                            returnKeyType='next'
                            errorMessage={
                                isEmailValid ? null : 'Please enter a valid email address'
                            }
                            onSubmitEditing={() => {
                                this.validateEmail();
                                this.passwordInput.focus();
                            }}
                        />
                        <FormInput
                            refInput={input => (this.passwordInput = input)}
                            value={password}
                            otherContainerStyle={{marginTop: 20}}
                            onChangeText={password => this.setState({password})}
                            placeholder='Password'
                            secureTextEntry={true}
                            returnKeyType={'done'}
                            errorMessage={
                                isPasswordValid
                                    ? null
                                    : 'Please enter at least 8 characters'
                            }
                            onSubmitEditing={() =>
                                isSignUpPage
                                    ? this.signUp()
                                    : this.login()
                            }
                        />
                        <FormButton
                            activeOpacity={0.8}
                            title={isLoginPage ? 'Sign in' : 'Sign up'}
                            otherButtonContainer={{marginTop: 40}}
                            onPress={isLoginPage ? this.login : this.signUp}
                            loading={isLoading}
                            disabled={isLoading}
                        />
                    </View>
                    {
                        isSignUpPage || (
                            <View style={styles.helpContainer}>
                                <Text style={{fontSize: 12, fontFamily: 'open-sans'}}>Troubles with sign in? </Text>
                                <TouchableOpacity>
                                    <Text
                                        style={{fontSize: 12, textDecorationLine: 'underline', fontFamily: 'open-sans'}}
                                    >
                                        Reset your password.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </View>
            </SafeAreaView>
        );
    }
}

export const FormInput = props => {
    const {refInput, otherContainerStyle, ...otherProps} = props;

    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={[inputStyles.inputContainer, otherContainerStyle]}
            inputStyle={inputStyles.inputStyle}
            autoFocus={false}
            autoCapitalize='none'
            keyboardAppearance='light'
            errorStyle={inputStyles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor='#A6A6A6'
        />
    );
};

export const FormButton = props => {
    const {refInput, otherTitleStyle, otherButtonStyles, otherButtonContainer, ...otherProps} = props;

    return (
        <Button
            titleStyle={[buttonStyles.titleStyle, otherTitleStyle]}
            buttonStyle={[buttonStyles.buttonStyle, otherButtonStyles]}
            containerStyle={[buttonStyles.buttonContainer, otherButtonContainer]}
            {...otherProps}
        />
    );
};

const inputStyles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 40,
        borderWidth: 0,
        borderColor: 'rgb(255,255,255)',
        height: 60,
        paddingLeft: 27,
        paddingRight: 27,
        paddingBottom: 5,
        width: SCREEN_WIDTH - 97
    },
    inputStyle: {
        fontSize: 14,
        fontFamily: 'open-sans',
        color: '#1E1B1B'
    },
    errorInputStyle: {
        textAlign: 'center',
        color: '#F44336',
    },
});

const buttonStyles = StyleSheet.create({
    buttonContainer: {},
    buttonStyle: {
        backgroundColor: '#28165B',
        borderRadius: 40,
        height: 60,
        width: SCREEN_WIDTH - 97,
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold'
    }
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#FFFFFF',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        color: '#28165B',
        fontSize: 32
    },
    categoryText: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        color: '#1E1B1B',
        opacity: 0.2,
        fontFamily: 'open-sans-bold'
    },
    selectedCategoryText: {
        color: '#28165B',
        opacity: 1
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        alignItems: 'center',
        marginTop: 32
    },
    selected: {
        position: 'absolute',
        height: 0,
        width: 0,
        top: 0,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: '#28165B',
        backgroundColor: 'orange',
    },
    loading: {
        borderColor: '#000000',
        opacity: 0.5
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
