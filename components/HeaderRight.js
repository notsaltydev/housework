import React, {Component} from 'react';
import {Image, StyleSheet, View} from "react-native";

const USERS = [
    {avatar: 'https://virginrealtymexico.com/wp-content/uploads/2017/08/avatar-demo@2x.png'},
    {avatar: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png'},
    {avatar: 'http://bibimungu.co.tz/uploads/user.jpg'},
    {avatar: 'http://comebiencr.com/wp-content/uploads/2018/09/doctora.png'},
];

export default class HeaderRight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [...USERS]
        }
    }

    renderListAvatars() {
        return this.state.users.map((user, index, arr) => {
            return (
                <Image
                    key={index.toString()}
                    style={[styles.image, arr.length > 1 && index !== 0 ? styles.nested : '', {zIndex: arr.length - index}]}
                    source={{uri: user.avatar}}
                />);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderListAvatars()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: 24,
        position: 'relative',
    },
    image: {
        width: 19,
        height: 19,

    },
    nested: {
        marginLeft: -7
    }
});
