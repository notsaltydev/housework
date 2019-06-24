import React, {Component} from 'react';
import {AsyncStorage, Button, ScrollView, StyleSheet, View} from 'react-native';
import {ExpoLinksView} from '@expo/samples';

export default class LinksScreen extends Component {
    static navigationOptions = {
        title: 'Links'
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/**
                 * Go ahead and delete ExpoLinksView and replace it with your content;
                 * we just wanted to provide you with some helpful links.
                 */}
                <ExpoLinksView/>
                <View>
                    <Button title="Actually, sign me out :)" onPress={this._signOutAsync}/>
                </View>
            </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
