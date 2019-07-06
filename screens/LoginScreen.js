import React, {Component} from 'react';
import PropTypes from 'prop-types';
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

import {LoginService} from '../services/LoginService';
import {SignupService} from '../services/SignupService';
import {HttpClientService} from "../services/HttpClientService";

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
            username: '',
            selectedCategory: 0,
            isLoading: false,
            isEmailValid: true,
            isUsernameValid: true,
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
        const {email, password, passwordConfirmation, username} = this.state;

        LayoutAnimation.easeInEaseOut();

        this.setState({
            isEmailValid: this.validateEmail(email) || this.emailInput.shake(),
            isPasswordValid: password.length >= 8 || this.passwordInput.shake(),
            isUsernameValid: username.length >= 5 || this.usernameInput.shake(),
            isConfirmationValid:
                password === passwordConfirmation || this.confirmationInput.shake(),
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
            isConfirmationValid,
            isUsernameValid,
            email,
            password,
            passwordConfirmation,
            username,
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
                                {isSignUpPage && (
                                    <Input
                                        value={username}
                                        keyboardAppearance="light"
                                        autoFocus={false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        keyboardType="default"
                                        returnKeyType="next"
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Name'}
                                        containerStyle={{
                                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',

                                        }}
                                        ref={input => (this.usernameInput = input)}
                                        onSubmitEditing={() => this.emailInput.focus()}
                                        onChangeText={username => this.setState({username})}
                                        errorMessage={
                                            isUsernameValid ? null : 'Please enter at least 5 characters'
                                        }
                                    />
                                )}
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
                                        marginTop: 16,
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
