import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";

import Badge from "./Badge";

export default class GroupCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {avatar, badge, name, label} = this.props.item;

        return (
            <View style={[styles.container, styles.shadow]}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10
                }}>
                    <View>
                        <Badge
                            containerStyle={{marginRight: 12, position: 'relative', top: 6}}
                            color={badge}
                        />
                    </View>
                    <TouchableOpacity>
                        <Ionicons
                            name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'}
                            size={20}
                            style={{transform: [{rotate: '90deg'}]}}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={{
                        width: 158,
                        fontSize: 16,
                        lineHeight: 22,
                        fontWeight: 'bold'
                    }}>{name}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'flex-end',
                }}>
                    <View style={{
                        backgroundColor: '#F7C041',
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
                        >{label.name}</Text>
                    </View>
                    <Image
                        style={{width: 25, height: 25,}}
                        source={{uri: avatar}}
                    />
                </View>
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
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 10,
        flexDirection: 'column',
        justifyContent: 'space-between'
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


