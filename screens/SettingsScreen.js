import React, {Component} from 'react';
import {AsyncStorage, Button, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import HeaderRight from "../components/HeaderRight";

export default class SettingsScreen extends Component {
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

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.title]}>
                    <Text style={[styles.textTitle, styles.containerOffset]}>Ended tasks</Text>
                    <View style={[styles.taskBarContainer, styles.containerOffset]}>
                        <Text style={styles.taskBarLabel}>To be confirmed</Text>
                        <Text style={styles.taskBarLabel}>Confirmed</Text>
                    </View>
                </View>
                <ScrollView style={styles.container}>
                    <View>
                        <Button title="Actually, sign me out :)" onPress={this._signOutAsync}/>
                    </View>
                </ScrollView>
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
