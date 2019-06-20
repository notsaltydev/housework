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

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'LoginScreen',
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            email: "",
            password: ""
        };
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <Text style={[styles.title, styles.leftTitle]}>Sign In</Text>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            placeholder="E-mail or phone number"
                            onChangeText={text => this.setState({email: text})}
                            value={this.state.email}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.InputContainer}>
                        <TextInput
                            style={styles.body}
                            secureTextEntry={true}
                            placeholder="Password"
                            onChangeText={text => this.setState({password: text})}
                            value={this.state.password}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={this._signInAsync}>
                            <Text style={styles.button}>Sign in!</Text>
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
    },
});
