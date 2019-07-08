import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper'

export default class OnBoardingScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            screen: 0
        }
    }

    next(swiper, index) {
        swiper.scrollBy(index + 1);
    }

    render() {
        const {screen} = this.state;

        return (
            <View style={styles.container}>
                <Swiper
                    style={styles.wrapper}
                    showsPagination={false}
                    loop={false}
                    ref={(swiperRef) => this.swiper = swiperRef}
                    index={screen}
                >
                    <View style={styles.slide1}>
                        <Text style={styles.text}>Hello Swiper</Text>
                        <TouchableOpacity onPress={() => this.next(this.swiper, screen)}>
                            <Text style={styles.text}>next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                        <TouchableOpacity onPress={() => this.next(this.swiper, screen)}>
                            <Text style={styles.text}>next</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                        <TouchableOpacity onPress={() => this.next(this.swiper, screen)}>
                            <Text style={styles.text}>next</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});
