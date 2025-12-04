import React, { useEffect, useState } from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { H3 } from '../../../components/atoms/common/H3'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { FormikProvider, useFormik } from 'formik'
import { authService } from '../../../services/authService'
import * as Yup from 'yup'
import { FontIndex } from '../../../../assets/FontIndex'
import { Colors } from '../../../../assets/Colors'
import { Separator } from '../../../components/atoms/common/Separator'
import { Stepper } from '../../../components/molecules/onboarding/Stepper'
import { FormikInput } from '../../../components/atoms/common/Formik/FormikInput'
import { PasswordInput } from '../../../components/atoms/onboarding/PasswordInput'
import { InputCheckBox } from '../../../components/atoms/common/InputCheckBox'
import { CommonButton } from '../../../components/common/CommonButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'
import {
  InputWithCustomErrorMessage,
  InputWithCustomErrorMessageStyles,
} from '../../../components/atoms/common/InputWithCustomErrorMessage'
import { getErrorFromBackendResponse } from '../../../utils/utils'
import { config } from '../../../../config'
import { FormikPicker } from '../../../components/atoms/common/Formik/FormikPicker'
import { eligibilityService } from '../../../services/eligibilityService'

interface formTypeValues {
  email: string
  password: string
  confirmPassword: string
  signupSource: StudentSignupSource | undefined
  olderThan13: boolean
}
const initialValues: formTypeValues = {
  email: '',
  password: '',
  confirmPassword: '',
  signupSource: undefined,
  olderThan13: false,
}
type RegisterSignUpCodeStep1Type = NativeStackScreenProps<
  OnboardingStackParamList,
  'RegisterSignUpCodeStep1'
>
export const RegisterSignUpCodeStep1Screen: React.FC<
  RegisterSignUpCodeStep1Type
> = ({ navigation, route }) => {
  const studentPartner = route.params.studentPartnerManifest
  const [signupSourceOptions, setSignupSourceOptions] = useState<
    StudentSignupSource[]
  >([])

  useEffect(() => {
    const getStudentSignupSources = async () => {
      const signupSources = await eligibilityService.getStudentSignupSources()
      if (signupSources) setSignupSourceOptions(signupSources)
    }

    // we only need to get the signup sources for partners who are manually approved
    if (studentPartner.isManuallyApproved) getStudentSignupSources()
  }, [])

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(),
    //TODO missing password length definition.
    password: Yup.string()
      .required('Required')
      .matches(
        /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
        'Password must contain at least one uppercase, one lower case, and 1 number.'
      ),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    olderThan13: Yup.boolean().isTrue(),
  })

  const formik = useFormik<formTypeValues>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values: formTypeValues, { setFieldError }) => {
      try {
        await authService.checkCredentials({
          email: values.email!,
          password: 'abcDEFG123123',
        })
      } catch (err: any) {
        const response = getErrorFromBackendResponse(err)
        if (response === 'The email address you entered is already in use') {
          setFieldError('email', 'email_already_exists')
          return
        }
      }
      navigation.navigate('RegisterSignUpCodeStep2', {
        email: values.email,
        password: values.password,
        studentPartnerManifest: route.params.studentPartnerManifest,
        signupSourceId: values.signupSource
          ? values.signupSource.id
          : undefined,
      })
    },
  })

  const renderInput = (
    name: string,
    placeholder: string,
    password: boolean = false
  ) => {
    return (
      <View style={{ marginBottom: 8 }}>
        <FormikInput
          name={name}
          placeholder={placeholder}
          password={password}
        />
      </View>
    )
  }

  const setClearValue = (clean: boolean, value: string) => {
    if (value) {
      formik.setFieldValue(value, '', true)
      formik.setFieldTouched(value, false, true)
    }
  }

  const openLegalUrl = async () => {
    await Linking.openURL(`${config.baseUrl}/legal`)
  }

  return (
    <KeyboardAwareScrollView style={{ paddingHorizontal: 20 }}>
      <FormikProvider value={formik}>
        <Separator marginVertical={45} backgroundColor="transparent" />
        <H3>Choose your log-in details</H3>
        <Separator marginVertical={8} backgroundColor="transparent" />
        <Stepper
          data={[
            {
              stepNumber: 1,
              stepState: 'active',
            },
            { stepNumber: 2, stepState: 'not-started' },
            { stepNumber: 3, stepState: 'not-started' },
          ]}
        />
        <Separator marginVertical={12} backgroundColor="transparent" />
        <InputWithCustomErrorMessage
          placeholder="Email"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          isValid={formik.errors.email === undefined}
          touched={formik.touched.email}
          errorMessage={formik.errors.email}
          setClearValue={() => {
            formik.setFieldValue('email', undefined, false)
            formik.setFieldTouched('email', false, false)
          }}
          errors={[
            {
              key: 'email_already_exists',
              Error: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Text style={InputWithCustomErrorMessageStyles.errorText}>
                    An account with this email already exists.{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text
                      style={InputWithCustomErrorMessageStyles.errorLinkText}
                    >
                      logging In{' '}
                    </Text>
                  </TouchableOpacity>
                  <Text style={InputWithCustomErrorMessageStyles.errorText}>
                    Try instead.
                  </Text>
                </View>
              ),
            },
          ]}
        />
        <Separator marginVertical={6} backgroundColor="transparent" />
        <PasswordInput
          value={formik.values.password}
          onChangeText={(value: string) => {
            formik.setFieldTouched('password')
            formik.handleChange('password')(value)
          }}
          touched={formik.touched.password}
          onBlur={formik.handleBlur('password')}
          isValid={!formik.errors.password}
          allwaysShowMessage={true}
          placeholder="Create Password"
          setClearValue={(v) => setClearValue(v, 'password')}
          message="Password must contain at least one uppercase, one lower case, and number"
        />
        <Separator marginVertical={6} backgroundColor="transparent" />
        {renderInput('confirmPassword', 'Confirm Password', true)}
        {studentPartner.isManuallyApproved && (
          <FormikPicker
            title="How did you hear about us?"
            placeholder="How did you hear about us?"
            name="signupSource"
            options={signupSourceOptions}
            getLabel={(option) => option.name}
          />
        )}
        <InputCheckBox
          mt={15}
          mb={24}
          label="I am at least 13 years old"
          value={formik.values.olderThan13}
          onChange={(value) => formik.setFieldValue('olderThan13', value)}
          touched={formik.touched.olderThan13}
          isValid={false}
          errorMessage={formik.errors.olderThan13}
        />
        <CommonButton
          title="Continue"
          disabled={!formik.isValid || formik.isSubmitting}
          loading={formik.isSubmitting}
          type="information"
          onPress={formik.handleSubmit}
          style={{ height: 42 }}
        />
        <Separator marginVertical={16} backgroundColor="transparent" />
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.bottomText}>By signing up, you agree to our</Text>
          <View style={{ flexDirection: 'row', marginVertical: 3 }}>
            <TouchableOpacity onPress={openLegalUrl}>
              <Text style={[styles.bottomText, styles.linkText]}>
                Terms of Use
              </Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}> and </Text>
            <TouchableOpacity onPress={openLegalUrl}>
              <Text style={[styles.bottomText, styles.linkText]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </FormikProvider>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  notWithText: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 16,
    color: Colors.information,
  },
  bottomText: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 14,
    // textAlign: 'center'
  },
  linkText: {
    color: Colors.information,
    textAlignVertical: 'bottom',
  },
  questionText: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
