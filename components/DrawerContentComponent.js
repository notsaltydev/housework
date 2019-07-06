import React, {Component} from 'react';
import {AsyncStorage, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Button} from "react-native-elements";

export default class DrawerContentComponent extends Component {

    constructor(props) {
        super(props);
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();

        this.props.navigation.navigate('AuthStack');
    };

    render() {
        return (
            <ScrollView style={{flex: 1}}>
                <SafeAreaView
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <View style={styles.container}>
                        <Text style={{
                            color: '#28165B',
                            fontSize: 32,
                            fontWeight: 'bold'
                        }}>Housework</Text>
                        <Button
                            buttonStyle={[styles.logoutButton, {backgroundColor: '#6639e7'}]}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title='BlueScreen'
                            onPress={() => {
                                this.props.navigation.navigate('BlueScreen');
                                this.props.navigation.closeDrawer();
                            }}
                            titleStyle={styles.loginTextButton}
                        />
                        <Button
                            buttonStyle={[styles.logoutButton, {backgroundColor: '#6639e7'}]}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title='DefaultScreen'
                            onPress={() => {
                                this.props.navigation.navigate('DefaultScreen');
                                this.props.navigation.closeDrawer();
                            }}
                            titleStyle={styles.loginTextButton}
                        />
                        <Button
                            buttonStyle={styles.logoutButton}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title='Logout'
                            onPress={() => this._signOutAsync()}
                            titleStyle={styles.loginTextButton}
                        />

                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        height: '100%',
        alignItems: 'center'
    },
    logoutButton: {
        backgroundColor: '#4d2aa5',
        borderRadius: 10,
        height: 50,
        width: 200,
    },
})
