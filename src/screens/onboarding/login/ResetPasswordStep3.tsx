import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'
import { View } from 'react-native'
import { H3 } from '../../../components/atoms/common/H3'
import { HelperText } from '../../../components/atoms/onboarding/HelperText'
import { FormikInput } from '../../../components/atoms/common/Formik/FormikInput'
import { FormikProvider, useFormik } from 'formik'
import { CommonButton } from '../../../components/common/CommonButton'
import { Separator } from '../../../components/atoms/common/Separator'
import * as Yup from 'yup'
import { authService } from '../../../services/authService'

type formValueType = {
  email: string
  password: string
  passwordConfirmation: string
}
//DEEPLINKING EXAMPLE => npx uri-scheme open exp://127.0.0.1:19000/--/setpassword/6e60b866da3c50f54bfd8e0e01121bfe --ios
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  //TODO missing password length definition.
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
      'Password must contain at least one uppercase, one lower case, and 1 number.'
    ),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})
type ResetPasswordStep3ScreenType = NativeStackScreenProps<
  OnboardingStackParamList,
  'ResetPasswordStep3'
>
export const ResetPasswordStep3Screen: React.FC<
  ResetPasswordStep3ScreenType
> = ({ route, navigation }) => {
  const { token } = route.params
  const formik = useFormik<formValueType>({
    initialValues: {} as formValueType,
    validationSchema,
    validateOnMount: true,
    onSubmit: async ({ email, password }: formValueType) => {
      try {
        await authService.changePassword(email, password, token)
        navigation.navigate('ResetPasswordStep4')
      } catch (error: any) {
        const { err } = error.response.data
        alert(err)
      }
    },
  })
  return (
    <FormikProvider value={formik}>
      <View style={{ padding: 20 }}>
        <H3>Create New Password</H3>
        <View style={{ marginTop: 8, marginBottom: 25 }}>
          <HelperText>
            Your new password must be different from previous used passwords.
          </HelperText>
        </View>
        <View style={{ marginBottom: 35 }}>
          <FormikInput name="email" placeholder="Email" />
          <Separator backgroundColor="transparent" marginVertical={8} />
          {/*TODO Change password component*/}
          <FormikInput name="password" password placeholder="New Password" />
          <Separator backgroundColor="transparent" marginVertical={8} />
          <FormikInput
            name="passwordConfirmation"
            password
            placeholder="Confirm New Password"
          />
        </View>
        <CommonButton
          title="Reset Password"
          type="information"
          style={{ height: 48 }}
          onPress={formik.handleSubmit}
          disabled={!formik.isValid || formik.isSubmitting}
        />
      </View>
    </FormikProvider>
  )
}
