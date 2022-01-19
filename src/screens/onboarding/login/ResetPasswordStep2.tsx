import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Linking, Text, View } from 'react-native'
import { H3 } from '../../../components/atoms/common/H3'
import { HelperText } from '../../../components/atoms/onboarding/HelperText'
import { CommonButton } from '../../../components/common/CommonButton'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'

type ResetPasswordStep2ScreenType = NativeStackScreenProps<OnboardingStackParamList, 'ResetPasswordStep2'>;
export const ResetPasswordStep2Screen: React.FC<ResetPasswordStep2ScreenType> = ({ route }) => {
    const {email} = route.params;
    return (
        <View style={{
            paddingTop: 150,
            alignItems: 'center',
        }}>
            <H3>Check your email!</H3>
            <View style={{ marginTop: 8, marginBottom: 30, }}>
                <HelperText>We’ve sent reset password recover {"\n"} instructions to 
                    <HelperText bold={true}> {email}!</HelperText>
                </HelperText>
            </View>
            <CommonButton
                title='Open email app'
                type='information'
                style={{ paddingHorizontal: 40, height: 48, }}
                onPress={() => {
                    Linking.openURL("mailto:");
                }}
            />
        </View>
    )
}
