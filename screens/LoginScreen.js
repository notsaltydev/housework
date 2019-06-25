import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
    Alert,
    AsyncStorage,
    Dimensions,
    KeyboardAvoidingView,
    LayoutAnimation,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Button, Input} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const TabSelector = ({selected, isLoading}) => {
    return (
        <View style={styles.selectorContainer}>
            <View style={[selected && styles.selected, isLoading && styles.loading]}/>
        </View>
    );
};

TabSelector.propTypes = {
    selected: PropTypes.bool.isRequired,
};

export default class LoginScreen extends Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.setState({componentLoaded: true});
    }

    componentWillUnmount() {
    }

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            selectedCategory: 0,
            isLoading: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
            componentLoaded: false
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
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(email);
    }

    navigateToMainScreen = () => {
        this.props.navigation.navigate('Main');
    };

    login() {
        const {email, password, isEmailValid, isPasswordValid} = this.state;

        LayoutAnimation.easeInEaseOut();

        this.setState({
            isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
            isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
        });

        if (this.validateEmail(email) && password.length >= 8) {
            this.setState({isLoading: true});

            axios.post(
                'https://housework-management.herokuapp.com/api/auth', {
                    email: email,
                    password: password
                })
                .then((response) => {
                    this.setState({isLoading: false});

                    return AsyncStorage.setItem('userToken', response.data.token);
                })
                .then(() => this.navigateToMainScreen())
                .catch((error) => {
                    this.setState({isLoading: false});
                    console.log('error', error);
                    Alert.alert(`Error: ${error.code || ''} 🔥`, error.message || error);
                });
        }
    }

    signUp() {
        const {email, password, passwordConfirmation} = this.state;
        this.setState({isLoading: true});

        // Simulate an API call
        const fakeApiCall = new Promise((resolve) => {
            setTimeout(() => {
                LayoutAnimation.easeInEaseOut();
                this.setState({
                    isLoading: false,
                    isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
                    isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
                    isConfirmationValid:
                        password === passwordConfirmation || this.confirmationInput.shake(),
                });

                resolve();
            }, 1500);
        }).then(() => {
            this.navigateToMainScreen();
        });
    }

    render() {
        const {
            selectedCategory,
            isLoading,
            isEmailValid,
            isPasswordValid,
            isConfirmationValid,
            email,
            password,
            passwordConfirmation,
        } = this.state;
        const isLoginPage = selectedCategory === 0;
        const isSignUpPage = selectedCategory === 1;

        return (
            <View style={styles.container}>
                {this.state.componentLoaded ? (
                    <View>
                        <KeyboardAvoidingView
                            contentContainerStyle={styles.loginContainer}
                            behavior="position"
                        >
                            <View style={styles.titleContainer}>
                                <View>
                                    <Text style={styles.titleText}>Housework</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Button
                                    disabled={isLoading}
                                    type="clear"
                                    activeOpacity={0.7}
                                    onPress={() => this.selectCategory(0)}
                                    containerStyle={{flex: 1}}
                                    titleStyle={[
                                        styles.categoryText,
                                        isLoginPage && styles.selectedCategoryText,
                                    ]}
                                    title={'Login'}
                                />
                                <Button
                                    disabled={isLoading}
                                    type="clear"
                                    activeOpacity={0.7}
                                    onPress={() => this.selectCategory(1)}
                                    containerStyle={{flex: 1}}
                                    titleStyle={[
                                        styles.categoryText,
                                        isSignUpPage && styles.selectedCategoryText,
                                    ]}
                                    title={'Sign up'}
                                />
                            </View>
                            <View style={styles.rowSelector}>
                                <TabSelector selected={isLoginPage} isLoading={isLoading}/>
                                <TabSelector selected={isSignUpPage} isLoading={isLoading}/>
                            </View>
                            <View style={styles.formContainer}>
                                <Input
                                    value={email}
                                    keyboardAppearance="light"
                                    autoFocus={false}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Email'}
                                    containerStyle={{
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    ref={input => (this.emailInput = input)}
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    onChangeText={email => this.setState({email})}
                                    errorMessage={
                                        isEmailValid ? null : 'Please enter a valid email address'
                                    }
                                />
                                <Input
                                    value={password}
                                    keyboardAppearance="light"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    returnKeyType={isSignUpPage ? 'next' : 'done'}
                                    blurOnSubmit={true}
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Password'}
                                    ref={input => (this.passwordInput = input)}
                                    onSubmitEditing={() =>
                                        isSignUpPage
                                            ? this.confirmationInput.focus()
                                            : this.login()
                                    }
                                    onChangeText={password => this.setState({password})}
                                    errorMessage={
                                        isPasswordValid
                                            ? null
                                            : 'Please enter at least 8 characters'
                                    }
                                />
                                {isSignUpPage && (
                                    <Input
                                        value={passwordConfirmation}
                                        secureTextEntry={true}
                                        keyboardAppearance="light"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="default"
                                        returnKeyType={'done'}
                                        blurOnSubmit={true}
                                        containerStyle={{
                                            marginTop: 16,
                                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                        }}
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Confirm password'}
                                        ref={input => (this.confirmationInput = input)}
                                        onSubmitEditing={this.signUp}
                                        onChangeText={passwordConfirmation =>
                                            this.setState({passwordConfirmation})
                                        }
                                        errorMessage={
                                            isConfirmationValid
                                                ? null
                                                : 'Please enter the same password'
                                        }
                                    />
                                )}
                                <Button
                                    buttonStyle={styles.loginButton}
                                    containerStyle={{marginTop: 32, flex: 0}}
                                    activeOpacity={0.8}
                                    title={isLoginPage ? 'LOGIN' : 'SIGN UP'}
                                    onPress={isLoginPage ? this.login : this.signUp}
                                    titleStyle={styles.loginTextButton}
                                    loading={isLoading}
                                    disabled={isLoading}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <View style={styles.helpContainer}>
                            <Button
                                title={'Need help ?'}
                                titleStyle={{color: 'white'}}
                                buttonStyle={{backgroundColor: 'transparent'}}
                                underlayColor="transparent"
                                onPress={() => console.log('Account created')}
                            />
                        </View>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    titleText: {
        color: '#28165B',
        fontSize: 32
    },
    categoryText: {
        textAlign: 'center',
        color: '#28165B',
        fontSize: 24,
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#4d2aa5',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    rowSelector: {
        height: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
