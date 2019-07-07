import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';

export default class FabButton extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={[styles.container, styles.shadow]}
                    onPress={() => this.props.onPress()}
                >
                    <FontAwesome5
                        name={'plus'}
                        style={{color: 'white', fontSize: 24, lineHeight: 24, paddingTop: 4}}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 60,
        borderRadius: 200,
        position: 'absolute',
        bottom: 9,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F43D0B',
    },
    text: {
        fontSize: 30,
        color: 'white'
    },
    shadow: {
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: {
            width: 2,
            height: 2,
        }
    }
});
