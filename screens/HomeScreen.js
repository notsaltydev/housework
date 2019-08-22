import React, {Component} from 'react';
import {ActivityIndicator, Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeaderRight from '../components/HeaderRight';
import HorizontalScrollTask from '../components/HorizontalScrollTask';
import GroupCard from '../components/GroupCard';
import {HttpClientService} from "../services/HttpClientService";
import HamburgerIcon from "../components/HamburgerIcon";
import FabButton from "../components/FabButton";

export default class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: <HamburgerIcon/>,
        headerRight: <HeaderRight title="Info"/>,
        headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: '#28165B',
            height: 50
        }
    });

    constructor(props) {
        super(props);

        this.state = {
            taskList: [],
            name: '',
            tasksLoading: true
        };

        this.getUser();

        console.log('constructor');
    }

    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', async () => {
                await this.getUser();
            }),
        ];
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.remove());
    }

    async getUser() {
        const user = await HttpClientService.getUserMe();
        const groupId = await this.getUserGroupId();

        HttpClientService.getTasksForGroup(groupId)
            .then((response) => {
                return response.data.map((task) => {
                    return {
                        id: task.id,
                        avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png',
                        badge: '#F43D0B',
                        name: task.name,
                        label: {
                            name: 'cleaning',
                            color: 'primary'
                        }

                    };
                });
            })
            .then((tasks) => {
                this.setState({
                    tasksLoading: false,
                    taskList: tasks
                });
            })
            .catch((error) => {
                this.setState({tasksLoading: false});
                console.log('error', error);
                Alert.alert(`Error: ${error.code || ''} 🔥`, error.message || error);
            });

        if (user) {
            this.setState({
                name: user.data.name
            });
        }
    }

    async getUserGroupId() {
        const defaultUserGroupId = await AsyncStorage.getItem('defaultGroupId');

        if (!defaultUserGroupId) {
            const groups = await HttpClientService.getUserGroups();
            // todo: handle default group
            return groups.data[0].id;
        }

        return defaultUserGroupId;
    }

    render() {
        const {name, tasksLoading, taskList} = this.state;

        return (
            <View style={styles.container}>
                <View style={[styles.container, styles.title, styles.userBoard]}>
                    <Text ellipsizeMode='tail' numberOfLines={1}
                          style={[styles.textTitle, styles.containerOffset]}> {!!name ? 'Hello, ' + name : ''}</Text>
                    <View style={[styles.taskBarContainer, styles.containerOffset]}>
                        <Text style={styles.taskBarLabel}>Your Tasks</Text>

                        <TouchableOpacity>
                            <Text style={styles.taskBarLink}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {
                            tasksLoading || taskList.length === 0 ? (
                                <ActivityIndicator/>
                            ) : (
                                <HorizontalScrollTask
                                    data={taskList}
                                    renderItem={({item}) => (
                                        <View style={{marginRight: 6}}>
                                            <GroupCard item={item}/>
                                        </View>
                                    )}
                                    keyExtractor={(item) => `item-${item.id}`}
                                />
                            )
                        }
                    </View>
                </View>
                <View style={[styles.container]}>
                    <View style={[styles.taskBarContainer, styles.containerOffset, styles.otherTaskBarContainer]}>
                        <Text style={[styles.taskBarLabel, styles.otherTaskBarLabel]}>Task in your group</Text>

                        <TouchableOpacity>
                            <Text style={styles.otherTaskBarLink}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        {
                            tasksLoading || taskList.length === 0 ? (
                                <ActivityIndicator/>
                            ) : (
                                <HorizontalScrollTask
                                    data={taskList}
                                    renderItem={({item}) => (
                                        <View style={{marginRight: 6}}>
                                            <GroupCard item={item}/>
                                        </View>
                                    )}
                                    keyExtractor={(item) => `item-${item.id}`}
                                />
                            )
                        }
                    </View>
                </View>
                <FabButton
                    onPress={() => this.addTask()}
                />
            </View>
        );
    }

    addTask() {
        console.log('add task');
        this.props.navigation.navigate('CreateTaskScreen');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerOffset: {
        paddingLeft: 26,
        paddingRight: 26
    },
    title: {},
    textTitle: {
        color: '#F0D4CC',
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 44,
        paddingBottom: 20
    },
    userBoard: {
        backgroundColor: '#28165B',
        flex: 1.1,
    },
    taskBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    taskBarLabel: {
        color: '#F0D4CC',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    otherTaskBarContainer: {
        paddingTop: 33,
    },
    otherTaskBarLabel: {
        color: '#28165B',
    },
    taskBarLink: {
        color: '#FFFFFF',
    },
    otherTaskBarLink: {
        color: '#1E1B1B',
    }
});
