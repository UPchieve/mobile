import React, { useContext } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormikProvider, useFormik } from 'formik'
import { H3 } from '../../components/atoms/common/H3'
import * as Yup from 'yup'
import { Separator } from '../../components/atoms/common/Separator'
import { CommonTextArea } from '../../components/common/CommonTextArea'
import { Colors } from '../../../assets/Colors'
import { CommonButton } from '../../components/common/CommonButton'
import { FormikPicker } from '../../components/atoms/common/Formik/FormikPicker'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { OnboardingStackParamList } from '../../routes/OnboardingStackNavigator'
import { View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { ImageIndex } from '../../../assets/ImageIndex'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ContactUsParamList } from '../../routes/ContactUsStackNavigator'
import { sessionService } from '../../services/sessionService'
import { AuthContext } from '../../providers/AuthProvider'
import { SendContactFormTopic } from '../../types/services/sessionServiceTypes'
import { AxiosError } from 'axios'

interface formTypeValues {
  topic: SendContactFormTopic
  message: string
}

const options = [
  'General question',
  'General feedback',
  'Technical issue',
  'Feature request',
  'Subject suggestion',
  'Other',
]

type contactUsScreenType = NativeStackScreenProps<
  OnboardingStackParamList | ContactUsParamList
>
export const ContactUsScreen: React.FC<contactUsScreenType> = ({
  navigation,
  route,
}) => {
  const user = useContext(AuthContext).user!

  const countWords = (str: string | undefined) => {
    let matches = str?.match(/[\w\d\’\'-]+/gi)
    return matches ? matches.length > 4 : false
  }

  const validationSchema = Yup.object().shape({
    topic: Yup.string().required(),
    message: Yup.string()
      .required()
      .test('len', 'You must write at least 5 words', (val) => countWords(val)),
  })

  const insets = useSafeAreaInsets()

  const formik = useFormik<formTypeValues>({
    initialValues: { message: '' } as formTypeValues,
    validateOnMount: true,
    validationSchema,
    onSubmit: async ({ topic, message }: formTypeValues, { setSubmitting }) => {
      try {
        //TODO review this logic fran
        // const payload: any = {};
        // for (const key of Object.keys(values)) {
        //     //@ts-ignore
        //     payload[key] =  values[key];
        // }
        // payload['userEmail'] = user?.email;
        // payload['userId'] = user?._id;
        // sessionService.sendContactForm(payload);
        try {
          await sessionService.sendContactForm({
            userId: user._id,
            userEmail: user.email,
            topic: topic,
            message: message,
          })
          console.log('contact submitted.')
        } catch (err) {
          const response = (err as AxiosError)?.response
          console.log('Error info', response?.data)
        } finally {
          setSubmitting(false)
        }
        navigation.navigate('MessageSent', {
          nextRoute: route.name === 'DrawerContactUs' ? 'Dashboard' : '',
        })
      } catch (error) {
        console.log(error)

        alert(error)
      }

      // navigation.navigate('MessageSent', { buttonAction: () => {
      //     if(route.name === 'DrawerContactUs')
      // }})
    },
  })

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('window').height + insets.top,
      }}
    >
      <KeyboardAwareScrollView
        style={{ paddingHorizontal: 20, paddingTop: 24 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <FormikProvider value={formik}>
          {/* <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
                    <Image
                        style={{width: 20, height: 20}}
                        source={ImageIndex.icons.goBack} />
                </TouchableOpacity> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <H3>Contact Us</H3>
            {route.name === 'DrawerContactUs' ? (
              <TouchableOpacity
                onPress={() => (navigation.getParent() as any)?.openDrawer()}
              >
                <Image
                  source={ImageIndex.dashboard.openMenuButton}
                  style={{ width: 28, height: 28 }}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <Separator marginVertical={15} backgroundColor="transparent" />

          <FormikPicker
            title="What is your reason?"
            placeholder="What is your reason?"
            name="topic"
            options={options}
            initialColor={Colors.information}
          />
          <Separator marginVertical={15} backgroundColor="transparent" />
          <CommonTextArea
            borderColorSelected={Colors.information}
            placeholder={'Tell us more. (min 5 words)'}
            onChangeText={formik.handleChange('message')}
            value={formik.values.message}
          />
          <Separator marginVertical={15} backgroundColor="transparent" />
          <CommonButton
            title={'Send'}
            onPress={formik.handleSubmit}
            type={'information'}
            disabled={!formik.isValid}
            loading={formik.isSubmitting}
          />
        </FormikProvider>
      </KeyboardAwareScrollView>
    </View>
  )
}
