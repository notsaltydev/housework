import React, {Component} from 'react';
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
                                    containerStyle={{marginRight: 5}}
                                    titleStyle={[
                                        styles.categoryText,
                                        isLoginPage && styles.selectedCategoryText,
                                    ]}
                                    title={'Sign in'}
                                />
                                <Button
                                    disabled={isLoading}
                                    type="clear"
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
                                        placeholder="Name"
                                        keyboardType="default"
                                        returnKeyType="next"
                                        errorMessage={
                                            isUsernameValid ? null : 'Please enter at least 5 characters'
                                        }
                                        onSubmitEditing={() => this.emailInput.focus()}
                                    />
                                )}
                                <FormInput
                                    refInput={input => (this.emailInput = input)}
                                    value={email}
                                    onChangeText={email => this.setState({email})}
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    returnKeyType="next"
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
                                    otherContainerStyle={{marginBottom: 40}}
                                    onChangeText={password => this.setState({password})}
                                    placeholder="Password"
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
                                    onPress={isLoginPage ? this.login : this.signUp}
                                    loading={isLoading}
                                    disabled={isLoading}
                                />
                            </View>
                        </KeyboardAvoidingView>
                        <View style={styles.helpContainer}>
                            <Button
                                title={'Need help ?'}
                                titleStyle={{color: 'black'}}
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

export const FormInput = props => {
    const {refInput, otherContainerStyle, ...otherProps} = props;

    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={[inputStyles.inputContainer, otherContainerStyle]}
            inputStyle={inputStyles.inputStyle}
            autoFocus={false}
            autoCapitalize="none"
            keyboardAppearance="light"
            errorStyle={inputStyles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor="#A6A6A6"
        />
    );
};

export const FormButton = props => {
    const {refInput, ...otherProps} = props;

    return (
        <Button
            {...otherProps}
            titleStyle={buttonStyles.titleStyle}
            buttonStyle={buttonStyles.buttonStyle}
            containerStyle={buttonStyles.buttonContainer}
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
        marginBottom: 20,
        width: SCREEN_WIDTH - 94,
    },
    inputStyle: {
        fontSize: 14,
        color: '#1E1B1B'
    },
    errorInputStyle: {
        marginTop: 0,
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
        width: SCREEN_WIDTH - 94,
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
    }
});


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
        backgroundColor: 'transparent',
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
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
