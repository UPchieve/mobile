import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontIndex } from '../../../../assets/FontIndex'
import { H3 } from '../../../components/atoms/common/H3'
import { HelperText } from '../../../components/atoms/onboarding/HelperText'
import { CommonButton } from '../../../components/common/CommonButton'
import { Stepper } from '../../../components/molecules/onboarding/Stepper'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'
import { authService } from '../../../services/authService'

type VerifyAccountScreenType = NativeStackScreenProps<
  OnboardingStackParamList,
  'VerifyAccount'
>
export const VerifyAccountStep1Screen: React.FC<VerifyAccountScreenType> = ({
  route,
  navigation,
}) => {
  const { firstName, email, userId } = route.params

  const onEmailVerifyPress = async () => {
    await authService.createAccountSendValidation({
      _id: userId,
      firstName,
      sendTo: email,
      verificationMethod: 'email',
    })
    navigation.navigate('VerifyAccountStep2', {
      verificationType: 'email',
      firstName,
      userId,
      sendTo: email,
      email,
    })
  }

  return (
    <View style={{ padding: 20 }}>
      <H3>Verify your email</H3>
      <View style={{ marginTop: 16, marginBottom: 24 }}>
        <Stepper
          data={[
            { stepNumber: 1, stepState: 'completed' },
            { stepNumber: 2, stepState: 'active' },
          ]}
        />
      </View>
      <HelperText mb={29}>
        Confirm you’re not a robot by verifying your account email.
      </HelperText>
      <View style={styles.bottomTextWrapper}></View>
      <CommonButton
        title="Send email"
        type="information"
        onPress={onEmailVerifyPress}
        style={{ height: 48 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bottomTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 14,
    marginTop: 16,
    marginBottom: 25,
    textAlign: 'center',
  },
})
