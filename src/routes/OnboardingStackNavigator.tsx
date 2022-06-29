import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen'
import { LoginScreen } from '../screens/onboarding/login/LoginScreen'
import { Colors } from '../../assets/Colors'
import { ResetPasswordStep1Screen } from '../screens/onboarding/login/ResetPasswordStep1'
import { ResetPasswordStep2Screen } from '../screens/onboarding/login/ResetPasswordStep2'
import { ResetPasswordStep3Screen } from '../screens/onboarding/login/ResetPasswordStep3'
import { ResetPasswordStep4Screen } from '../screens/onboarding/login/ResetPasswordStep4'
import { RegisterScreen } from '../screens/onboarding/register/RegisterScreen'
import { EligibleResultScreen } from '../screens/onboarding/register/EligibleResultScreen'
import { CreateAccountScreen } from '../screens/onboarding/register/CreateAccountScreen'
import { VerifyAccountStep1Screen } from '../screens/onboarding/register/VerifyAccountStep1Screen'
import { VerifyAccountStep2Screen } from '../screens/onboarding/register/VerifyAccountStep2Screen'
import { RegisterSignUpCodeStep1Screen } from '../screens/onboarding/register/RegisterSignUpCodeStep1Screen'
import { RegisterSignUpCodeStep2Screen } from '../screens/onboarding/register/RegisterSignUpCodeStep2Screen'
import { VerificationMethod } from '../types/services/authServiceTypes'
import { AccountVerifiedScreen } from '../screens/onboarding/register/AccountVerifiedScreen'
import { WrongEmailScreen } from '../screens/onboarding/register/WrongEmailScreen'
import { ContactUsScreen } from '../screens/contact/ContactUsScreen'
import { MessageSentScreen } from '../screens/onboarding/register/MessageSentScreen'
import { WelcomeSignUpCodeScreen } from '../screens/onboarding/register/WelcomeSignUpCodeScreen'
import { Image } from 'react-native'
import { ImageIndex } from '../../assets/ImageIndex'
import { SvgIcons } from '../../assets/IndexIcons'
import { RulesScreen } from '../screens/onboarding/register/RulesScreen'

export type OnboardingStackParamList = {
  Welcome: undefined
  Login: undefined
  ResetPasswordStep1: undefined | { resetForm: boolean }
  ResetPasswordStep2: { email: string }
  ResetPasswordStep3: { token: string }
  ResetPasswordStep4: undefined
  Register: undefined
  VerifyAccount: {
    userId: string
    firstName: string
    email: string
  }
  VerifyAccountStep2: {
    verificationType: VerificationMethod
    sendTo: string
    firstName: string
    userId: string
    email: string
  }
  AccountVerified: undefined
  EligibleResult: {
    eligible: boolean
    highSchoolId: string
    grade: string
    zipCode: string
    email: string
  }
  CreateAccount: {
    highSchoolId: string
    grade: string
    zipCode: string
    email: string
  }
  RegisterSignUpCodeStep1: {
    studentPartnerManifest: StudentPartnerManifest
  }
  RegisterSignUpCodeStep2: {
    email: string
    password: string
    studentPartnerManifest: StudentPartnerManifest
    signupSourceId: number | undefined
  }
  ContactUs: {
    screen: string
  }
  MessageSent: undefined
  WrongEmail: {
    userId: string
    email: string
  }
  WelcomeSignUpCode: {
    studentPartnerManifest: StudentPartnerManifest
  }
  Rules: undefined
}

export const OnboardingStackNavigator = () => {
  const Stack = createNativeStackNavigator<OnboardingStackParamList>()
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerBackTitleVisible: false,
        headerBackImageSource: ImageIndex.icons.goBack,
        contentStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.black,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        options={{ headerTitle: '' }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ResetPasswordStep1"
        options={{ headerTitle: '' }}
        component={ResetPasswordStep1Screen}
      />
      <Stack.Screen
        name="ResetPasswordStep2"
        options={{ headerTitle: '' }}
        component={ResetPasswordStep2Screen}
      />
      <Stack.Screen
        name="ResetPasswordStep3"
        options={{ headerTitle: '' }}
        component={ResetPasswordStep3Screen}
      />
      <Stack.Screen
        name="ResetPasswordStep4"
        options={{ headerShown: false }}
        component={ResetPasswordStep4Screen}
      />
      <Stack.Screen
        name="Register"
        options={{ headerTitle: '' }}
        component={RegisterScreen}
      />
      <Stack.Screen
        name="EligibleResult"
        options={({ route }) => ({
          headerTitle: '',
          headerShown: !route.params.eligible,
        })}
        component={EligibleResultScreen}
      />
      <Stack.Screen
        name="CreateAccount"
        options={{ headerShown: false }}
        component={CreateAccountScreen}
      />
      <Stack.Screen
        name="VerifyAccount"
        component={VerifyAccountStep1Screen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="VerifyAccountStep2"
        component={VerifyAccountStep2Screen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="RegisterSignUpCodeStep1"
        options={{ headerShown: false }}
        component={RegisterSignUpCodeStep1Screen}
      />
      <Stack.Screen
        name={'RegisterSignUpCodeStep2'}
        component={RegisterSignUpCodeStep2Screen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="AccountVerified"
        component={AccountVerifiedScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{
          headerTitle: '',
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="MessageSent"
        component={MessageSentScreen}
        options={{
          headerShown: false,
          animation: 'none',
        }}
      />
      <Stack.Screen
        name="WrongEmail"
        component={WrongEmailScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="WelcomeSignUpCode"
        component={WelcomeSignUpCodeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rules"
        component={RulesScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
