import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Button} from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get('window').width;

export const FormButton = props => {
    const {refInput, otherTitleStyle, otherButtonStyles, otherButtonContainer, ...otherProps} = props;

    return (
        <Button
            titleStyle={[buttonStyles.titleStyle, otherTitleStyle]}
            buttonStyle={[buttonStyles.buttonStyle, otherButtonStyles]}
            containerStyle={[buttonStyles.buttonContainer, otherButtonContainer]}
            {...otherProps}
        />
    );
};

const buttonStyles = StyleSheet.create({
    buttonContainer: {},
    buttonStyle: {
        backgroundColor: '#28165B',
        borderRadius: 40,
        height: 60,
        width: SCREEN_WIDTH - 97,
    },
    titleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold'
    }
});
