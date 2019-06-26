import React, {Component} from 'react';
import {
    AsyncStorage,
    Button,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import HeaderRight from "../components/HeaderRight";

const TASKS = [
    {
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        badge: 'high',
        name: 'Cleaning up the bedroom',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        badge: 'high',
        name: 'Take out the thrash',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        badge: 'high',
        name: 'Do the shopping list for the next week',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        badge: 'high',
        name: 'Do the ironing',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        badge: 'high',
        name: 'Clean all the windows',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        badge: 'high',
        name: 'Plan holidays',
        label: {
            name: 'cleaning',
            color: 'primary'
        }
    },
    {
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
        badge: 'high',
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
                    height: 60,
                    marginHorizontal: 10,
                    marginTop: 24,
                    backgroundColor: '#ececec',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginRight: 26,
                    marginLeft: 26,
                }}
            >
                <View>
                    <Button title="Logout" onPress={this._signOutAsync}/>
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
    title: {},
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
