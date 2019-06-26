import React, {Component} from 'react';
import {LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import HeaderRight from '../components/HeaderRight';
import HorizontalScrollTask from '../components/HorizontalScrollTask';
import GroupCard from '../components/GroupCard';

import {HttpClientService} from "../services/HttpClientService";

export default class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => {
            return (
                <TouchableOpacity>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                        size={26}
                        style={{marginLeft: 24}}
                        color={Colors.tabIconDefault}
                    />
                </TouchableOpacity>
            );
        },
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
            taskList: [
                {
                    id: 1234,
                    name: 'Beer',
                    image:
                        'https://cdn.britannica.com/700x450/72/186972-049-26ACDCBE.jpg',
                    icon: '',
                },
                {
                    id: 2345,
                    name: 'Arcade',
                    image: 'http://www.thebasementarcade.com/gameroom/0516/1.jpg',
                    icon: '',
                },
                {
                    id: 3456,
                    name: 'Nature',
                    image:
                        'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
                    icon: '',
                },
                {id: 4567, image: '', icon: ''},
                {id: 6789, image: '', icon: ''},
                {id: 7890, image: '', icon: ''},
                {id: 8909, image: '', icon: ''},
            ],
            name: ''
        }
    }

    componentDidMount() {
        HttpClientService.getUserMe()
            .then((response) => {
                LayoutAnimation.easeInEaseOut();

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
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerOffset: {
        paddingLeft: 26,
        paddingRight: 26
    }
});
