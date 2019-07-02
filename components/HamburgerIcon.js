import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import {FontAwesome5} from '@expo/vector-icons';

class HamburgerIcon extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{marginLeft: 24}}
                onPress={() => {
                    this.props.navigation.openDrawer();
                }}>
                <FontAwesome5
                    name={'stream'}
                    size={26}
                    color={this.props.navigation.state.routeName === 'Home' ? 'white' : 'black'}/>
            </TouchableOpacity>
        )
    };
}

export default withNavigation(HamburgerIcon);
