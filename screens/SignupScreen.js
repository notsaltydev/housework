import React, {Component} from 'react';
import {
    AsyncStorage,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import {AppStyles} from "../constants/Colors";

export default class SignupScreen extends Component {
    static navigationOptions = {
        title: 'SignupScreen',
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            fullname: "",
            phone: "",
            email: "",
            password: ""
        };
    }

    _signUpAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={[styles.title, styles.leftTitle]}>Create new account</Text>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="Full Name"
                            onChangeText={text => this.setState({ fullname: text })}
                            value={this.state.fullname}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="Phone Number"
                            onChangeText={text => this.setState({ phone: text })}
                            value={this.state.phone}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="E-mail Address"
                            onChangeText={text => this.setState({ email: text })}
                            value={this.state.email}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                            value={this.state.password}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={this._signUpAsync}>
                            <Text style={styles.button}>Sign up!</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: "bold",
        color: AppStyles.color.tint,
        marginTop: 20,
        marginBottom: 20
    },
    leftTitle: {
        alignSelf: "stretch",
        textAlign: "left",
        marginLeft: 20
    },
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: 30,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: AppStyles.color.grey,
        borderRadius: AppStyles.borderRadius.small
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text
    },
    buttonContainer: {
        marginTop: 30,
    },
    button: {
        backgroundColor: AppStyles.color.tint,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
        padding: 12,
        textAlign: 'center',
    }
});
