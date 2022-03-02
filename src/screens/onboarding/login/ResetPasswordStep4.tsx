import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Image, View } from "react-native"
import { ImageIndex } from '../../../../assets/ImageIndex'
import { H3 } from "../../../components/atoms/common/H3"
import { Separator } from '../../../components/atoms/common/Separator'
import { CommonButton } from '../../../components/common/CommonButton'
import { MainStackParamList } from '../../../routes/MainStackNavigator'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'

type ResetPassword4Type = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>
export const ResetPasswordStep4Screen: React.FC = () => {
    return <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 150,
    }}>
    <H3>You’re all set!</H3>
    <Image source={ImageIndex.onboarding.allSet} style={{
        marginVertical: 60,
        marginBottom: 20,
    }}/>
    {/* TODO Where should it redirects.  */}
    <CommonButton
        title='Go to my Dashboard'
        type='information'
        onPress={() => {}}
        style={{width: '80%', height: 48}}
    />
    </View>
}
