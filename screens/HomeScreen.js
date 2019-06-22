import React, {Component} from 'react';
import {AsyncStorage, Button, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import HeaderRight from '../components/HeaderRight';

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

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container, styles.title, styles.userBoard]}>
                    <Text style={styles.textTitle}>Hello, Maggie</Text>
                    <View style={styles.taskBarContainer}>
                        <Text style={styles.taskBarLabel}>Your Tasks</Text>

                        <TouchableOpacity>
                            <Text style={styles.taskBarLink}>View all</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={[styles.container]}>
                    <View>
                        <Button title="Actually, sign me out :)" onPress={this._signOutAsync}/>
                    </View>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    title: {

    },
    textTitle: {
        color: '#F0D4CC',
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 44,
        paddingBottom: 20
    },
    userBoard: {
        paddingLeft: 26,
        paddingRight: 26,
        backgroundColor: '#28165B'
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
    taskBarLink: {
        color: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // developmentModeText: {
    //     marginBottom: 20,
    //     color: 'rgba(0,0,0,0.4)',
    //     fontSize: 14,
    //     lineHeight: 19,
    //     textAlign: 'center',
    // },
    // contentContainer: {
    //     paddingTop: 30,
    // },
    // welcomeContainer: {
    //     alignItems: 'center',
    //     marginTop: 10,
    //     marginBottom: 20,
    // },
    // welcomeImage: {
    //     width: 100,
    //     height: 80,
    //     resizeMode: 'contain',
    //     marginTop: 3,
    //     marginLeft: -10,
    // },
    // getStartedContainer: {
    //     alignItems: 'center',
    //     marginHorizontal: 50,
    // },
    // homeScreenFilename: {
    //     marginVertical: 7,
    // },
    // codeHighlightText: {
    //     color: 'rgba(96,100,109, 0.8)',
    // },
    // codeHighlightContainer: {
    //     backgroundColor: 'rgba(0,0,0,0.05)',
    //     borderRadius: 3,
    //     paddingHorizontal: 4,
    // },
    // getStartedText: {
    //     fontSize: 17,
    //     color: 'rgba(96,100,109, 1)',
    //     lineHeight: 24,
    //     textAlign: 'center',
    // },
    // tabBarInfoContainer: {
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     ...Platform.select({
    //         ios: {
    //             shadowColor: 'black',
    //             shadowOffset: {width: 0, height: -3},
    //             shadowOpacity: 0.1,
    //             shadowRadius: 3,
    //         },
    //         android: {
    //             elevation: 20,
    //         },
    //     }),
    //     alignItems: 'center',
    //     backgroundColor: '#fbfbfb',
    //     paddingVertical: 20,
    // },
    // tabBarInfoText: {
    //     fontSize: 17,
    //     color: 'rgba(96,100,109, 1)',
    //     textAlign: 'center',
    // },
    // navigationFilename: {
    //     marginTop: 5,
    // },
    // helpContainer: {
    //     marginTop: 15,
    //     alignItems: 'center',
    // },
    // helpLink: {
    //     paddingVertical: 15,
    // },
    // helpLinkText: {
    //     fontSize: 14,
    //     color: '#2e78b7',
    // }
});
