import React from 'react';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import BlueScreen from '../screens/BlueScreen';
import DefaultScreen from '../screens/DefaultScreen';
import MainTabNavigator from "./MainTabNavigator";
import DrawerContentComponent from "../components/DrawerContentComponent";

const HamburgerNavigation = createDrawerNavigator(
    {
        Tabs: MainTabNavigator,
    },
    {
        initialRouteName: 'Tabs',
        contentComponent: DrawerContentComponent
    }
);
export const Stack = createStackNavigator(
    {
        Drawer: {
            screen: HamburgerNavigation,
            navigationOptions: {
                header: null,
            },
        },
        BlueScreen: BlueScreen,
        DefaultScreen: {
            screen: DefaultScreen,
        }
    }
);
