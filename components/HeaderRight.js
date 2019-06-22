import React, {Component} from 'react';
import {Image, StyleSheet, View} from "react-native";

export default class HeaderRight extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://virginrealtymexico.com/wp-content/uploads/2017/08/avatar-demo@2x.png'}}
                />
                <Image
                    style={styles.image}
                    source={{uri: 'https://ya-webdesign.com/transparent450_/girl-avatar-png-2.png'}}
                />
                <Image
                    style={styles.image}
                    source={{uri: 'http://bibimungu.co.tz/uploads/user.jpg'}}
                />
                <Image
                    style={styles.image}
                    source={{uri: 'http://comebiencr.com/wp-content/uploads/2018/09/doctora.png'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginRight: 24
    },
    image: {
        width: 19,
        height: 19
    }
});
