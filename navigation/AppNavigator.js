import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen.js';
import {Stack} from "./DrawerNavigator";
import {OnBoardingStack} from "./OnBoardingNavigator";

export default createAppContainer(
    createSwitchNavigator({
            // You could add another route here for authentication.
            // Read more at https://reactnavigation.org/docs/en/auth-flow.html
            AuthLoading: AuthLoadingScreen,
            AuthStack: AuthNavigator,
            OnBoardingStack: OnBoardingStack,
            MainStack: Stack
        },
        {
            initialRouteName: 'AuthLoading',
        }
    )
);
