import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Swiper from 'react-native-swiper'
import {FormButton} from "../components/FormButton";
import {WateringPotPrefix, WateringPotSuffix} from "../components/svg/WateringPot";
import {VacuumPrefix, VacuumSuffix} from "../components/svg/Vacuum";
import {ChecklistPrefix, ChecklistSuffix} from "../components/svg/Checklist";
import {FlowerPrefix, FlowerSuffix} from "../components/svg/Flower";
import {GamePrefix, GameSuffix} from "../components/svg/Game";
import {TicketPrefix, TicketSuffix} from "../components/svg/Ticket";

export default class OnBoardingScreen extends Component {
    static navigationOptions = {
        header: null
    };

    static getDerivedStateFromProps(props, state) {
        if (props.navigation.state.params) {
            // return {...state, screen: props.navigation.state.params.onBoardingSlideIndex}
        }
        return state;
    }

    constructor(props) {
        super(props);

        this.state = {
            screen: 0
        }
    }

    next(swiper, index) {
        swiper.scrollBy(index + 1);
    }

    skip() {
        this.next(this.swiper, 3)
    }

    navigateToJoinGroup() {
        this.props.navigation.navigate('JoinGroup');
    }

    navigateToCreateGroup() {
        this.props.navigation.navigate('CreateGroup');
    }

    render() {
        const {screen} = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <Swiper
                    style={styles.wrapper}
                    showsPagination={false}
                    loop={false}
                    ref={(swiperRef) => this.swiper = swiperRef}
                    index={screen}
                >
                    <View style={styles.slide}>
                        <TouchableOpacity
                            style={styles.skipContainer}
                            onPress={() => this.skip()}>
                            <Text style={styles.skip}>SKIP</Text>
                        </TouchableOpacity>
                        <Text style={[styles.title, styles.text]}>
                            Can you please... do me a favour?
                        </Text>
                        <Text style={[styles.message, styles.text]}>
                            Welcome in the app created to help you with organizing home duties and sharing them among
                            your family members.
                        </Text>
                        <FormButton
                            activeOpacity={0.8}
                            title={'Next'}
                            otherButtonContainer={{position: 'absolute', bottom: 40}}
                            onPress={() => this.next(this.swiper, screen)}
                        />
                        <WateringPotPrefix containerStyles={{position: 'absolute', top: 40, right: 0}}/>
                        <VacuumPrefix containerStyles={{position: 'absolute', bottom: 128, right: 0}}/>
                    </View>
                    <View style={styles.slide}>
                        <TouchableOpacity
                            style={styles.skipContainer}
                            onPress={() => this.skip()}>
                            <Text style={styles.skip}>SKIP</Text>
                        </TouchableOpacity>
                        <Text style={[styles.title, styles.text]}>Give tasks & motivate kids</Text>
                        <Text style={[styles.message, styles.text]}>
                            Create your own family board, add some tasks and motivate kids to do them by setting
                            points to each one.
                        </Text>
                        <FormButton
                            activeOpacity={0.8}
                            title={'Next'}
                            otherButtonContainer={{position: 'absolute', bottom: 40}}
                            onPress={() => this.next(this.swiper, screen)}
                        />
                        <WateringPotSuffix containerStyles={{position: 'absolute', top: 40, left: 0}}/>
                        <VacuumSuffix containerStyles={{position: 'absolute', bottom: 128, left: 0}}/>
                        <ChecklistPrefix containerStyles={{position: 'absolute', top: 70, right: 0}}/>
                        <FlowerPrefix containerStyles={{position: 'absolute', bottom: 100, right: 0}}/>
                    </View>
                    <View style={styles.slide}>
                        <TouchableOpacity
                            style={styles.skipContainer}
                            onPress={() => this.skip()}>
                            <Text style={styles.skip}>SKIP</Text>
                        </TouchableOpacity>
                        <Text style={[styles.title, styles.text]}>
                            Do the tasks & get rewards!
                        </Text>
                        <Text style={[styles.message, styles.text]}>
                            Hey kid, be neat, do the task, collect the points and exchange them for some cool rewards
                            established by your parents in the app market!
                        </Text>
                        <FormButton
                            activeOpacity={0.8}
                            title={'Next'}
                            otherButtonContainer={{position: 'absolute', bottom: 40}}
                            onPress={() => this.next(this.swiper, screen)}
                        />
                        <ChecklistSuffix containerStyles={{position: 'absolute', top: 70, left: 0}}/>
                        <FlowerSuffix containerStyles={{position: 'absolute', bottom: 100, left: 0}}/>
                        <GamePrefix containerStyles={{position: 'absolute', top: 60, right: 0}}/>
                        <TicketPrefix containerStyles={{position: 'absolute', bottom: 100, right: 0}}/>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 75
                    }}>
                        <Text style={[styles.title, styles.text]}>
                            Ready to do some favours?
                        </Text>
                        <Text style={[styles.message, styles.text, {paddingTop: 30, paddingBottom: 30}]}>
                            To join already existing board, ask its admin for a unique code...
                        </Text>
                        <FormButton
                            activeOpacity={0.8}
                            title={'Join group'}
                            onPress={() => this.navigateToJoinGroup()}
                        />
                        <Text style={[styles.message, styles.text, {paddingTop: 40, paddingBottom: 30}]}>
                            ...or as a parent, create a new one!*
                        </Text>
                        <FormButton
                            activeOpacity={0.8}
                            title={'Create a new board'}
                            onPress={() => this.navigateToCreateGroup()}
                        />

                        <Text style={[styles.text, {position: 'absolute', bottom: 40, fontSize: 12, maxWidth: 280}]}>
                            Are you a kid? We recommend to ask your parents to sign up and create the board!
                        </Text>
                        <GameSuffix containerStyles={{position: 'absolute', top: 60, left: 0}}/>
                        <TicketSuffix containerStyles={{position: 'absolute', bottom: 100, left: 0}}/>
                    </View>
                </Swiper>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#28165B',
        maxWidth: 280,
        paddingBottom: 30
    },
    message: {
        color: '#1E1B1B',
        fontSize: 16,
        fontWeight: '300',
        maxWidth: 280,
    },
    text: {
        textAlign: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    skipContainer: {
        position: 'absolute',
        top: 25,
        right: 25
    },
    skip: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#F0D4CC',
        textTransform: 'uppercase'
    }
});
