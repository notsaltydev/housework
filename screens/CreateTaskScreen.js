import React, {Component} from 'react';
import {
    AsyncStorage,
    DatePickerIOS,
    Dimensions,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {FormInput} from "../components/FormInput";
import {DismissKeyboard} from "../components/DismissKeyboard";
import {TaskService} from "../services/TaskService";
import {HttpClientService} from "../services/HttpClientService";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class CreateTaskScreen extends Component {


    constructor(props) {
        super(props);

        this.state = {
            taskName: '',
            taskDescription: '',
            expirationDate: new Date(),
            labelId: '',
            assignTo: '',
            isTaskNameValid: true,
            isTaskDescriptionValid: true,
            isLoading: false
        };

        this.setDate = this.setDate.bind(this);
    }

    setDate(newDate) {
        this.setState({expirationDate: newDate});
    }


    async createTask() {
        const user = await HttpClientService.getUserMe();
        const defaultGroupId = await AsyncStorage.getItem('defaultGroupId');
        const {taskName, taskDescription, expirationDate} = this.state;
        console.log('create task state: ', this.state);
        console.log('defaultGroupId: ', defaultGroupId);
        console.log('user: ', user);

        if (defaultGroupId) {
            TaskService.createTask({
                "group_id": defaultGroupId,
                "name": taskName,
                "description": taskDescription,
                "expiration_date": expirationDate.toISOString().split('T')[0],
                "label_id": null,
                "assign_to": user.data.id
            }).then((response) => {
                console.log(response, 'response');
            });
        }
    }

    render() {
        const {taskName, taskDescription, isTaskNameValid, isTaskDescriptionValid} = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <DismissKeyboard>
                    <View>
                        <FormInput
                            value={taskName}
                            refInput={input => (this.taskName = input)}
                            multiline={true}
                            otherContainerStyle={[styles.textareaContainerStyle, {marginTop: 20}]}
                            otherInputStyle={styles.textareaStyle}
                            onChangeText={taskName => this.setState({taskName})}
                            placeholder='Type task name...'
                            keyboardType='default'
                            returnKeyType='next'
                            errorMessage={
                                isTaskDescriptionValid ? null : 'Please enter at least 5 characters'
                            }
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                        <FormInput
                            refInput={input => (this.taskDescription = input)}
                            value={taskDescription}
                            multiline={true}
                            otherContainerStyle={[styles.textareaContainerStyle, {marginTop: 20}]}
                            otherInputStyle={styles.textareaStyle}
                            onChangeText={taskDescription => this.setState({taskDescription})}
                            placeholder='Type task description...'
                            keyboardType='default'
                            returnKeyType={'next'}
                            errorMessage={
                                isTaskNameValid
                                    ? null
                                    : 'Please enter at least 5 characters'
                            }
                            onSubmitEditing={() => Keyboard.dismiss()}
                        />
                        <DatePickerIOS
                            initialDate={new Date()}
                            minimumDate={new Date()}
                            mode={'date'}
                            date={this.state.expirationDate}
                            onDateChange={this.setDate}
                        />
                        <View>
                            <TouchableOpacity style={styles.button} onPress={() => this.createTask()}>
                                <Text style={styles.buttonLabel}>Confirm</Text>
                            </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#28165B',
        paddingLeft: 26,
        paddingRight: 26,
        paddingTop: 18,
        paddingBottom: 18,
        borderRadius: 50
    },
    buttonLabel: {
        fontSize: 18,
        lineHeight: 25,
        color: '#FFFFFF',
        fontWeight: 'bold',
        paddingLeft: 32,
        paddingRight: 32,
    },
    textareaContainerStyle: {
        height: 100,
        width: SCREEN_WIDTH - 97,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
        borderRadius: 0,
    },
    textareaStyle: {
        height: '100%',
        width: '100%'
    }
});
