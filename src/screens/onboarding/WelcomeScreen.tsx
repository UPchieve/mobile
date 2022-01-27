import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../assets/Colors';
import { Separator } from '../../components/atoms/common/Separator';
import { CommonButton } from '../../components/common/CommonButton';
import { OnboardingStackParamList } from '../../routes/OnboardingStackNavigator';

type WelcomeScreenType = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;
export const WelcomeScreen: React.FC<WelcomeScreenType> = ({navigation}) => {
    return <SafeAreaView style={styles.container}>
        <View style={styles.content}>

        </View>
        <View style={styles.actionWrapper}>
            <CommonButton title="Log in" onPress={() => navigation.navigate('Login')}
                type='information'
            />
            <Separator backgroundColor='transparent' marginVertical={8}/>
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
        backgroundColor: Colors.selectedGreen,
        flexGrow: 1,
    },
    actionWrapper: {
        backgroundColor: Colors.white,
        height: 200,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});
