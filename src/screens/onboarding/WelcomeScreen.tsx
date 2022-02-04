import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../assets/Colors';
import { Separator } from '../../components/atoms/common/Separator';
import { CommonButton } from '../../components/common/CommonButton';
import { OnboardingStackParamList } from '../../routes/OnboardingStackNavigator';
import {ImageIndex} from "../../../assets/ImageIndex";
import {H3} from "../../components/atoms/common/H3";
import {HelperText} from "../../components/atoms/onboarding/HelperText";

type WelcomeScreenType = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;
export const WelcomeScreen: React.FC<WelcomeScreenType> = ({ navigation }) => {
    return <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <Image source={ImageIndex.welcome} style={{
                marginTop: 40,
                marginBottom: 20,
                marginHorizontal: 17,
            }}/>
        <H3>School just got easier</H3>
            <HelperText color={Colors.secondaryGray} mt={20}>Connect one-on-one with online tutors. {'\n'}
            Completely free. Available 24/7.</HelperText>

        </View>
        <View style={styles.actionWrapper}>
            <CommonButton title="Log in" onPress={() => navigation.navigate('Login')}
                type='information'
            />
            <Separator backgroundColor='transparent' marginVertical={8} />
            <CommonButton title="Sign Up" onPress={() => navigation.navigate('Register')}
            />
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        flex: 1,
        alignItems: 'center'
    },
    actionWrapper: {
        backgroundColor: Colors.white,
        height: 200,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});
