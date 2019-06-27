import React, {Component} from 'react';
import {
    AsyncStorage,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import HeaderRight from "../components/HeaderRight";
import Badge from "../components/Badge";

const TASKS = [
    {
        avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png',
        badge: '#F43D0B',
        name: 'Cleaning up the bedroom',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png',
        badge: '#F43D0B',
        name: 'Take out the thrash',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png',
        badge: '#FD9C0C',
        name: 'Do the shopping list for the next week',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png',
        badge: '#FD9C0C',
        name: 'Do the ironing',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png',
        badge: '#FD9C0C',
        name: 'Clean all the windows',
        label: {
            name: 'cleaning',
            color: '#FD9C0C'
        }
    },
    {
        avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png',
        badge: '#F8D311',
        name: 'Plan holidays',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png',
        badge: '#F8D311',
        name: 'Learn english',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
];

export default class LinksScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: () => {
            return (
                <TouchableOpacity>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                        size={26}
                        style={{marginLeft: 24, color: 'black'}}
                        color={Colors.tabIconDefault}
                    />
                </TouchableOpacity>
            );
        },
        headerRight: <HeaderRight title="Info"/>,
        headerStyle: {
            borderBottomWidth: 0,
            height: 50
        }
    });

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    renderListCards() {
        return TASKS.map((task, index) => {
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
                        <TouchableOpacity onPress={() => this._signOutAsync()}>
                            <Ionicons
                                name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'}
                                size={20}
                                style={{transform: [{rotate: '90deg'}]}}
                            />
                        </TouchableOpacity>
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
                        <Text style={[styles.textTitle, styles.containerOffset]}>Pending tasks</Text>
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
