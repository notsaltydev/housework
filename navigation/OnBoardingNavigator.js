import React from 'react';
import {createStackNavigator} from 'react-navigation';
import SetupGroupScreen from "../screens/SetupGroupScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";

export const OnBoardingStack = createStackNavigator({
        OnBoarding: OnBoardingScreen,
        SetupGroup: SetupGroupScreen
    },
    {
        initialRouteName: 'OnBoarding',
    }
);
