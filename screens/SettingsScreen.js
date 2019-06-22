import React, {Component} from 'react';
import {View} from 'react-native';

export default class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'app.json',
    };

    /**
     * Go ahead and delete ExpoConfigView and replace it with your content;
     * we just wanted to give you a quick view of your config.
     */
    render() {
        return <View/>;
    }
}
