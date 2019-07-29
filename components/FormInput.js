import React from 'react';
import {Input} from "react-native-elements";
import {Dimensions, StyleSheet} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;

export const FormInput = props => {
    const {refInput, otherContainerStyle, ...otherProps} = props;

    return (
        <Input
            {...otherProps}
            ref={refInput}
            inputContainerStyle={[inputStyles.inputContainer, otherContainerStyle]}
            inputStyle={inputStyles.inputStyle}
            autoFocus={false}
            autoCapitalize='none'
            keyboardAppearance='light'
            errorStyle={inputStyles.errorInputStyle}
            autoCorrect={false}
            blurOnSubmit={false}
            placeholderTextColor='#A6A6A6'
        />
    );
};

const inputStyles = StyleSheet.create({
    inputContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 40,
        borderWidth: 0,
        borderColor: 'rgb(255,255,255)',
        height: 60,
        paddingLeft: 27,
        paddingRight: 27,
        paddingBottom: 5,
        width: SCREEN_WIDTH - 97
    },
    inputStyle: {
        fontSize: 14,
        fontFamily: 'open-sans',
        color: '#1E1B1B'
    },
    errorInputStyle: {
        textAlign: 'center',
        color: '#F44336',
    },
});
