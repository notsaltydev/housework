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
    View
} from 'react-native';
import {FontAwesome5} from "@expo/vector-icons";
import {FormInput} from "../components/FormInput";
import {FormButton} from "../components/FormButton";

const SCREEN_WIDTH = Dimensions.get('window').width;

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default class CreateGroupScreen extends Component {
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

    componentDidUpdate() {
        console.log(this.props.navigation);
    }

    joinToGroup = async () => {
        const {groupName} = this.state;
        const token = await AsyncStorage.getItem('userToken');

        LayoutAnimation.easeInEaseOut();

        this.setState({
            isGroupNameValid: groupName.length >= 5 || this.groupNameInput.shake(),
        });

        if (groupName.length >= 5) {
            this.setState({isLoading: true});

            // axios.post(
            //     'https://housework-management.herokuapp.com/api/group',
            //     {
            //         name: groupName,
            //     },
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Authorization': `Bearer ${token}`
            //         }
            //     })
            //     .then(async (response) => {
            //         this.setState({isLoading: false});
            //         await AsyncStorage.setItem('defaultGroupId', response.data.id);
            //
            //         this.props.navigation.navigate('MainStack');
            //     })
            //     .catch(error => {
            //         this.setState({isLoading: false});
            //         console.log('error', error);
            //         Alert.alert(`Error: ${error.code || ''} 🔥`, error.message || error);
            //         return Promise.reject(error)
            //     });
        }
    };

    navigateToJoinGroup() {
        this.props.navigation.navigate('JoinGroup');
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
                                Let’s create a new board
                            </Text>
                            <Text style={[styles.message, styles.text]}>
                                Type your new board name and click the button below.
                            </Text>
                            <FormInput
                                refInput={input => (this.groupNameInput = input)}
                                value={groupName}
                                otherContainerStyle={{marginTop: 30}}
                                onChangeText={groupName => this.setState({groupName})}
                                placeholder='Board name...'
                                secureTextEntry={true}
                                returnKeyType={'next'}
                                errorMessage={
                                    isGroupNameValid
                                        ? null
                                        : 'Please enter at least 8 characters'
                                }
                                onSubmitEditing={() => this.joinToGroup()}
                            />
                            <FormButton
                                activeOpacity={0.8}
                                title={'Create the board'}
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
                                    Have you changed your mind?
                                </Text>
                                <TouchableOpacity onPress={() => this.navigateToJoinGroup()}>
                                    <Text style={[
                                        styles.text,
                                        {
                                            fontSize: 12,
                                            textDecorationLine: 'underline'
                                        }
                                    ]}>
                                        Join existing board
                                    </Text>
                                </TouchableOpacity>
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
