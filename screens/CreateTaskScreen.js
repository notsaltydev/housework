import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class CreateTaskScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.text}>CREATE TASK</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonLabel}>Confirm it's done</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonLabel}>Confirm it's done</Text>
                    </TouchableOpacity>
                </View>
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
    }
});
