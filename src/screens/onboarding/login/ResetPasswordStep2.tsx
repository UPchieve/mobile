import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {Linking, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import { H3 } from '../../../components/atoms/common/H3'
import { HelperText } from '../../../components/atoms/onboarding/HelperText'
import { CommonButton } from '../../../components/common/CommonButton'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'
import {FontIndex} from "../../../../assets/FontIndex";
import {Colors} from "../../../../assets/Colors";

type ResetPasswordStep2ScreenType = NativeStackScreenProps<OnboardingStackParamList, 'ResetPasswordStep2'>;
export const ResetPasswordStep2Screen: React.FC<ResetPasswordStep2ScreenType> = ({ route, navigation }) => {
    const {email} = route.params;
    return (
        <View style={{
            paddingTop: 161,
            alignItems: 'center',
            flex: 1
        }}>
            <H3>Check your email!</H3>
            <View style={{ marginTop: 8, marginBottom: 30}}>
                <HelperText textAlign={'center'}>We’ve sent reset password instructions {"\n"}
                    <HelperText textAlign={'center'}>to</HelperText>
                    <HelperText bold={true} textAlign={'center'}> {email}!</HelperText>
                </HelperText>
            </View>
            <CommonButton
                title='Open email app'
                type='information'
                style={{ paddingHorizontal: 70, height: 48, }}
                onPress={() => {
                    Linking.openURL("mailto:");
                }}
            />
            <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 59}}>
                <HelperText textAlign={'center'}> Didn´t receive an email? Check your spam {"\n"} filter or
                    <Text style={[styles.anotherEmail, { color: Colors.information }]} onPress={() => navigation.navigate('ResetPasswordStep1', {resetForm: true})}> try another email address</Text>
                </HelperText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    anotherEmail: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 14,
        marginTop: 2,
    }
})
