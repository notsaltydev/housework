import React, {Component} from 'react';
import {AsyncStorage, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import HeaderRight from "../components/HeaderRight";
import Badge from "../components/Badge";
import {TASKS} from "../mocks/tasks";
import HamburgerIcon from "../components/HamburgerIcon";

export default class SettingsScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: <HamburgerIcon/>,
        headerRight: <HeaderRight title="Info"/>,
        headerStyle: {
            borderBottomWidth: 0,
            height: 50
        }
    });

    constructor(props) {
        super(props);

        this.state = {
            tasks: [...TASKS]
        }
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    renderListCards() {
        return this.state.tasks.map((task, index) => {
            return this.renderCard(task, index);
        });
    }

    renderCard(task, index) {
        return (
            <View
                key={index}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    minHeight: 37,
                    marginTop: 24,
                    marginRight: 26,
                    marginLeft: 26
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                >

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        marginRight: 22
                    }}>
                        <Badge
                            containerStyle={{marginRight: 12, position: 'relative', top: 6}}
                            color={task.badge}
                        />
                        <View style={{width: 165}}>
                            <Text style={{
                                fontSize: 16,
                                lineHeight: 22,
                                fontWeight: 'bold'
                            }}>
                                {task.name}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: '#F7C041',
                        marginRight: 9,
                        paddingRight: 8,
                        paddingLeft: 8,
                        paddingTop: 4,
                        paddingBottom: 4,
                        borderRadius: 10
                    }}>
                        <Text style={{
                            fontSize: 9,
                            lineHeight: 12,
                            fontWeight: 'bold',
                            color: 'white',
                            textTransform: 'uppercase',
                        }}
                        >{task.label.name}</Text>
                    </View>
                    <View style={{
                        marginRight: 8
                    }}>
                        <Image
                            style={{width: 25, height: 25,}}
                            source={{uri: task.avatar}}
                        />
                    </View>
                    <View>
                        <Ionicons
                            name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'}
                            size={20}
                            style={{transform: [{rotate: '90deg'}]}}
                        />
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView
                    style={[styles.container, styles.area]}
                >
                    <View style={[styles.title]}>
                        <Text style={[styles.textTitle, styles.containerOffset]}>Ended tasks</Text>
                        <View style={[styles.taskBarContainer, styles.containerOffset]}>
                            <Text style={styles.taskBarLabel}>To be confirmed</Text>
                            <Text style={styles.taskBarLabel}>Confirmed</Text>
                        </View>
                    </View>
                    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                        {this.renderListCards()}
                    </ScrollView>
                </SafeAreaView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    area: {
        // backgroundColor: 'yellow'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerOffset: {
        paddingLeft: 26,
        paddingRight: 26
    },
    title: {
        paddingBottom: 5
    },
    textTitle: {
        color: '#28165B',
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
    },
    taskBarLabel: {
        color: '#F0D4CC',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingRight: 21
    },
});
