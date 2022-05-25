import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FormikInput } from '../../../../components/atoms/common/Formik/FormikInput'
import { CommonButton } from '../../../../components/common/CommonButton'
import { Colors } from '../../../../../assets/Colors'
import { FontIndex } from '../../../../../assets/FontIndex'
import { Popover, usePopover } from 'react-native-modal-popover'
import * as Yup from 'yup'
import { authService } from '../../../../services/authService'
import { getErrorFromBackendResponse } from '../../../../utils/utils'
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import { OnboardingStackParamList } from '../../../../routes/OnboardingStackNavigator'

type SignUpCodeType = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Register'>
}

type formValueType = { code: string }

const validationSchema = Yup.object().shape({
  code: Yup.string().required('Required'),
})
export const SignUpCode: React.FC<SignUpCodeType> = ({ navigation }) => {
  const formik = useFormik<formValueType>({
    initialValues: { code: '' },
    validationSchema,
    validateOnMount: true,
    onSubmit: async ({ code }, { setSubmitting }) => {
      try {
        const response = await authService.validateSignInCode(code)
        const data = await authService.getStudentPartnerManifest(response)
        navigation.navigate('WelcomeSignUpCode', {
          studentPartnerManifest: data,
        })
      } catch (error) {
        const err = getErrorFromBackendResponse(error)
        if (err.startsWith('No partner key found for')) {
          formik.setFieldError('code', 'Invalid Code')
        }
      } finally {
        setSubmitting(false)
      }
    },
  })

  const {
    openPopover,
    closePopover,
    popoverVisible,
    touchableRef,
    popoverAnchorRect,
  } = usePopover()

  return (
    <FormikProvider value={formik}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>Enter your sign up code</Text>
        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
          <TouchableOpacity
            style={styles.informationIcon}
            onPress={() => openPopover()}
            ref={touchableRef}
          >
            <Text style={styles.informationIconText}>i</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginVertical: 20 }}>
        <FormikInput
          name="code"
          placeholder="Sign up Code"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <CommonButton
        title="Sign Up"
        style={{ height: 48 }}
        type="information"
        disabled={formik.isSubmitting || !formik.isValid}
        loading={formik.isSubmitting}
        onPress={formik.handleSubmit}
      />
      <Popover
        contentStyle={styles.content}
        backgroundStyle={styles.background}
        visible={popoverVisible}
        onClose={closePopover}
        fromRect={popoverAnchorRect}
        placement="bottom"
        supportedOrientations={['portrait']}
      >
        <Text style={styles.popoverText}>
          Have a sign up code from your school or organization? Enter it here!
        </Text>
      </Popover>
    </FormikProvider>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontWeight: '500',
    fontSize: 22,
  },
  informationIcon: {
    borderColor: Colors.defaultGray,
    borderWidth: 1,
    borderRadius: 100,
    height: 18,
    width: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  informationIconText: {
    color: Colors.defaultGray,
    fontSize: 12,
    fontFamily: FontIndex.WorkSans.Regular,
  },
  //popover
  content: {
    paddingBottom: 14,
    paddingTop: 14,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 8,
    width: 250,
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  popoverText: {
    color: Colors.secondaryGray,
    fontSize: 12,
    fontFamily: FontIndex.WorkSans.Regular,
  },
})
