import React, {Component} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';

class HamburgerIcon extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{marginLeft: 24}}
                onPress={() => {
                    this.props.navigation.openDrawer();
                }}>
                <Ionicons
                    name={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
                    size={26}
                    color={this.props.navigation.state.routeName === 'Home' ? 'white' : 'black'}/>
            </TouchableOpacity>
        )
    };
}

export default withNavigation(HamburgerIcon);
