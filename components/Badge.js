import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";

export default class Badge extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <View style={[styles.badge, {backgroundColor: this.props.color || 'black'}]}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    badge: {
        height: 10,
        width: 10,
        backgroundColor: 'black',
        borderRadius: 50
    }
});
