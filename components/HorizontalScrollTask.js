import React, {Component} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';

export default class HorizontalScrollTask extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FlatList
                        style={styles.innerScroll}
                        horizontal
                        data={this.props.data}
                        renderItem={this.props.renderItem}
                        keyExtractor={this.props.keyExtractor}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerScroll: {
        paddingTop: 10,
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 10,
        flexDirection: 'row',
    },
});
