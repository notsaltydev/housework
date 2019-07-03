import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen.js';
import SetupGroupScreen from "../screens/SetupGroupScreen";
import {Stack} from "./DrawerNavigator";

export default createAppContainer(
    createSwitchNavigator({
            // You could add another route here for authentication.
            // Read more at https://reactnavigation.org/docs/en/auth-flow.html
            AuthLoading: AuthLoadingScreen,
            Auth: AuthNavigator,
            SetupGroup: SetupGroupScreen,
            Main: Stack
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);
