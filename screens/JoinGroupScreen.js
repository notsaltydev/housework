import React, {Component} from 'react';
import {
    AsyncStorage,
    Dimensions,
    Keyboard,
    LayoutAnimation,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Alert
} from 'react-native';
import {FontAwesome5} from "@expo/vector-icons";
import {FormInput} from "../components/FormInput";
import {FormButton} from "../components/FormButton";
import {GroupService} from "../services/GroupService";

const SCREEN_WIDTH = Dimensions.get('window').width;

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class JoinGroupScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            groupName: '',
            isGroupNameValid: true,
            isLoading: false
        };

        this.joinToGroup.bind(this);
    }

    joinToGroup = async () => {
        const {groupName} = this.state;

        LayoutAnimation.easeInEaseOut();
        Keyboard.dismiss();

        this.setState({
            isGroupNameValid: groupName.length >= 5 || this.groupNameInput.shake(),
        });

        if (groupName.length >= 5) {
            this.setState({isLoading: true});

            GroupService.joinToGroup({
                "accessCode": groupName
            }).then(async (response) => {
                this.setState({isLoading: false});
                await AsyncStorage.setItem('defaultGroupId', response.data.id);
                this.props.navigation.navigate('MainStack');
            }).catch(error => {
                this.setState({isLoading: false});
                console.log('error', error);
                Alert.alert(`Error: ${error.code || ''} 🔥`, error.message || error);
                return Promise.reject(error)
            });
        }
    };

    navigateToCreateGroup() {
        this.props.navigation.navigate('CreateGroup');
    }

    render() {
        const {groupName, isLoading, isGroupNameValid} = this.state;

        return (
            <SafeAreaView style={{flex: 1}}>
                <DismissKeyboard>
                    <View style={[styles.container, {paddingTop: 75}]}>
                        <TouchableOpacity
                            style={{position: 'absolute', top: 25, right: 25}}
                            onPress={() => this.props.navigation.navigate('OnBoarding', {
                                onBoardingSlideIndex: 3
                            })}
                        >
                            <FontAwesome5
                                name={'times'}
                                style={{color: 'black', fontSize: 24, lineHeight: 24, paddingTop: 4}}
                            />
                        </TouchableOpacity>
                        <View style={styles.container}>
                            <Text style={[styles.text, styles.title]}>
                                Wanna join one’s board?
                            </Text>
                            <Text style={[styles.message, styles.text]}>
                                Type the unique code of the board you want to join below.
                            </Text>
                            <FormInput
                                refInput={input => (this.groupNameInput = input)}
                                value={groupName}
                                otherContainerStyle={{marginTop: 30}}
                                onChangeText={groupName => this.setState({groupName: groupName.toUpperCase()})}
                                placeholder='Type code...'
                                returnKeyType={'next'}
                                errorMessage={
                                    isGroupNameValid
                                        ? null
                                        : 'Please enter at least 5 characters'
                                }
                                onSubmitEditing={() => this.joinToGroup()}
                            />
                            <FormButton
                                activeOpacity={0.8}
                                title={'Join group'}
                                otherButtonContainer={{marginTop: 30}}
                                onPress={() => this.joinToGroup()}
                                loading={isLoading}
                                disabled={isLoading}
                            />

                            <View style={[{
                                position: 'absolute',
                                bottom: 40,
                                fontSize: 12,
                                maxWidth: 280,

                            }]}>
                                <Text style={[styles.text, {fontSize: 12}]}>
                                    Don’t know the code? Ask the board admin!
                                </Text>
                                <View style={[
                                    styles.text,
                                    {
                                        fontSize: 12,
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }
                                ]}>
                                    <Text style={[
                                        styles.text,
                                        {
                                            fontSize: 12,
                                        }]
                                    }>Still, you can also </Text>
                                    <TouchableOpacity onPress={() => this.navigateToCreateGroup()}>
                                        <Text style={[
                                            styles.text,
                                            {
                                                fontSize: 12,
                                                textDecorationLine: 'underline'
                                            }
                                        ]}>
                                            Create a new board
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </DismissKeyboard>
            </SafeAreaView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#28165B',
        maxWidth: 280,
        paddingBottom: 30,
        fontFamily: 'open-sans-bold',
    },
    message: {
        color: '#1E1B1B',
        fontSize: 16,
        fontWeight: '300',
        maxWidth: 280,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'open-sans'
    },
});
