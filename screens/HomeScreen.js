import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeaderRight from '../components/HeaderRight';
import HorizontalScrollTask from '../components/HorizontalScrollTask';
import GroupCard from '../components/GroupCard';
import {TASKS} from "../mocks/tasks";
import {HttpClientService} from "../services/HttpClientService";
import HamburgerIcon from "../components/HamburgerIcon";

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
            taskList: [...TASKS],
            name: ''
        }
    }

    componentDidMount() {
        HttpClientService.getUserMe()
            .then((response) => {
                this.setState({
                    name: response.data.name
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        const {name} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <View style={[styles.container, styles.title, styles.userBoard]}>
                    <Text style={[styles.textTitle, styles.containerOffset]}> {!!name ? 'Hello, ' + name : ''}</Text>
                    <View style={[styles.taskBarContainer, styles.containerOffset]}>
                        <Text style={styles.taskBarLabel}>Your Tasks</Text>

                        <TouchableOpacity>
                            <Text style={styles.taskBarLink}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <HorizontalScrollTask
                            data={this.state.taskList}
                            renderItem={({item}) => (
                                <View style={{marginRight: 6}}>
                                    <GroupCard item={item}/>
                                </View>
                            )}
                            keyExtractor={(item) => `item-${item.id}`}
                        />
                    </View>
                </View>
                <View style={[styles.container]}>
                    <View style={[styles.taskBarContainer, styles.containerOffset, styles.otherTaskBarContainer]}>
                        <Text style={[styles.taskBarLabel, styles.otherTaskBarLabel]}>Task in your group</Text>

                        <TouchableOpacity>
                            <Text style={styles.otherTaskBarLink}>View all</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <HorizontalScrollTask
                            data={this.state.taskList}
                            renderItem={({item}) => (
                                <View style={{marginRight: 6}}>
                                    <GroupCard item={item}/>
                                </View>
                            )}
                            keyExtractor={(item) => `item-${item.id}`}
                        />
                    </View>
                </View>
            </View>
        );
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
