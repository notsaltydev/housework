import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CreateGroupScreen from "../screens/CreateGroupScreen";
import OnBoardingScreen from "../screens/OnBoardingScreen";
import JoinGroupScreen from "../screens/JoinGroupScreen";

export const OnBoardingStack = createStackNavigator({
        OnBoarding: OnBoardingScreen,
        JoinGroup: JoinGroupScreen,
        CreateGroup: CreateGroupScreen
    },
    {
        initialRouteName: 'OnBoarding',
    }
);
