import React, {Component} from 'react';
import {
    Alert,
    AsyncStorage,
    Dimensions,
    KeyboardAvoidingView,
    LayoutAnimation,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Button, Input} from "react-native-elements";
import axios from "axios";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SetupGroupScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groupName: '',
            isGroupNameValid: true,
            isLoading: false
        };

        this.createGroup.bind(this);
    }

    createGroup = async () => {
        const {groupName} = this.state;
        const token = await AsyncStorage.getItem('userToken');

        LayoutAnimation.easeInEaseOut();

        this.setState({
            isGroupNameValid: groupName.length >= 5 || this.groupNameInput.shake(),
        });

        if (groupName.length >= 5) {
            this.setState({isLoading: true});

            axios.post(
                'https://housework-management.herokuapp.com/api/group',
                {
                    name: groupName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    this.setState({isLoading: false});

                    this.props.navigation.navigate('Main');
                })
                .catch(error => {
                    this.setState({isLoading: false});
                    console.log('error', error);
                    Alert.alert(`Error: ${error.code || ''} 🔥`, error.message || error);
                    return Promise.reject(error)
                });
        }
    };

    render() {
        const {groupName, isLoading, isGroupNameValid} = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <KeyboardAvoidingView
                        contentContainerStyle={styles.loginContainer}
                        behavior="position"
                    >
                        <View style={styles.titleContainer}>
                            <View>
                                <Text style={styles.titleText}>Create Group</Text>
                            </View>
                        </View>
                        <View style={styles.formContainer}>
                            <Input
                                value={groupName}
                                keyboardAppearance="light"
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                returnKeyType="done"
                                inputStyle={{marginLeft: 10}}
                                placeholder={'Name'}
                                containerStyle={{
                                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                }}
                                ref={input => (this.groupNameInput = input)}
                                onSubmitEditing={this.createGroup}
                                onChangeText={groupName => this.setState({groupName})}
                                errorMessage={
                                    isGroupNameValid ? null : 'Please enter at least 5 characters'
                                }
                            />
                            <Button
                                buttonStyle={styles.loginButton}
                                containerStyle={{marginTop: 32, flex: 0}}
                                activeOpacity={0.8}
                                title={'CREATE'}
                                onPress={this.createGroup}
                                titleStyle={styles.loginTextButton}
                                loading={isLoading}
                                disabled={isLoading}
                            />
                        </View>

                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
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
        marginBottom: 32,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    titleText: {
        color: '#28165B',
        fontSize: 32
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
    formContainer: {
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
});
