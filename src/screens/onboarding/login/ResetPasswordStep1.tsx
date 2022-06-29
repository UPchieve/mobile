import React, { useEffect } from 'react'
import { FormikProvider, useFormik } from 'formik'
import { View } from 'react-native'
import { FormikInput } from '../../../components/atoms/common/Formik/FormikInput'
import { H3 } from '../../../components/atoms/common/H3'
import { Separator } from '../../../components/atoms/common/Separator'
import { HelperText } from '../../../components/atoms/onboarding/HelperText'
import { CommonButton } from '../../../components/common/CommonButton'
import * as Yup from 'yup'
import { authService } from '../../../services/authService'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
})

type ResetPasswordStep1ScreenType = NativeStackScreenProps<
  OnboardingStackParamList,
  'ResetPasswordStep1'
>
export const ResetPasswordStep1Screen: React.FC<
  ResetPasswordStep1ScreenType
> = ({ navigation, route }) => {
  const formik = useFormik<{ email: string }>({
    initialValues: {} as { email: string },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values: { email: string }) => {
      try {
        await authService.sendResetPasswordEmail(values.email)
        navigation.navigate('ResetPasswordStep2', { email: values.email })
      } catch (error) {
        alert('Impossible to send the reset password email.')
      }
    },
  })
  //TODO Review
  useEffect(() => {
    if (!!route.params?.resetForm) {
      formik.setFieldValue('email', '', false)
      formik.setFieldTouched('email', false, true)
    }
  }, [route.params?.resetForm])

  return (
    <FormikProvider value={formik}>
      <View style={{ padding: 20, flex: 1 }}>
        <H3>Reset your password</H3>
        <HelperText mt={8} mb={25}>
          Enter the email associated with you account and we’ll email
          instructions to reset your password.
        </HelperText>
        <FormikInput name="email" placeholder="Enter your email" />
        <Separator backgroundColor="transparent" marginVertical={35} />
        <CommonButton
          title="Send Instructions"
          type="information"
          disabled={!formik.isValid || formik.isSubmitting}
          onPress={formik.handleSubmit}
          style={{ height: 48 }}
        />
      </View>
    </FormikProvider>
  )
}
