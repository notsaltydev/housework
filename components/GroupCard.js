import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class GroupCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {image, icon, name} = this.props.item;

        return (
            <View style={[styles.container, styles.shadow]}>
                <Text>Clean up the bedroom</Text>
            </View>
        );
    }

};
const rgba = (color, opacity) => colors.opacity(color, opacity);
const shadow = ({color, opacity, radius, offsetWidth, offsetHeight, elevation}) => {
    return Platform.select({
        ios: {
            shadowColor: color,
            shadowOpacity: opacity,
            shadowRadius: radius,
            shadowOffset: {
                width: offsetWidth,
                height: offsetHeight,
            }
        },
        android: {
            elevation
        },
        web: {
            boxShadow: `${offsetWidth}px ${offsetHeight}px ${radius}px ${rgba}`
        }
    });
};

const styles = StyleSheet.create({
    container: {
        width: 188,
        height: 135,
        borderRadius: 5,
        backgroundColor: '#ececec',
        margin: 10,
        flexDirection: 'column',
    },
    shadow: {
        ...shadow({
            elevation: 3,
            color: 'rgba(2,0,0,1)',
            opacity: 0.2,
            radius: 10,
            offsetWidth: 0,
            offsetHeight: 1
        })
    }
});


