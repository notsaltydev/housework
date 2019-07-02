import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text} from "react-native";

export default class DrawerContentComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <Text
                        onPress={() => {
                            props.navigation.navigate('BlueScreen');
                            props.navigation.closeDrawer();
                        }}
                    >
                        BlueScreen
                    </Text>
                    <Text
                        onPress={() => {
                            props.navigation.navigate('DefaultScreen');
                            props.navigation.closeDrawer();
                        }}
                    >
                        DefaultScreen
                    </Text>
                </SafeAreaView>
            </ScrollView>
        )
    }
}
