import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator,} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'home'}
        />
    ),
};

const LinksStack = createStackNavigator({
    Links: LinksScreen,
});

LinksStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'tasks'}
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: <View/>,
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'history'}
        />
    ),
};

export default createBottomTabNavigator({
        HomeStack,
        LinksStack,
        SettingsStack,
    },
    {
        initialRouteName: 'HomeStack',
        tabBarOptions: {
            style: {
                height: 65
            }
        }
    }
);
