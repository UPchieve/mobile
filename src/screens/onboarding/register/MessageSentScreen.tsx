import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ImageIndex } from '../../../../assets/ImageIndex'
import { CommonButton } from '../../../components/common/CommonButton'
import { FontIndex } from '../../../../assets/FontIndex'
import { Separator } from '../../../components/atoms/common/Separator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ContactUsParamList } from '../../../routes/ContactUsStackNavigator'
import { CommonActions } from '@react-navigation/native'

type MessageSentScreenType = NativeStackScreenProps<
  ContactUsParamList,
  'MessageSent'
>
export const MessageSentScreen: React.FC<MessageSentScreenType> = ({
  route,
  navigation,
}) => {
  useEffect(() => {
    // console.log(navigation.getState().history);
  }, [])

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 150,
      }}
    >
      <Text style={styles.title}>Your message has </Text>
      <Text style={styles.title}> been sent!</Text>
      <Separator marginVertical={8} backgroundColor="transparent" />
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FontIndex.WorkSans.Regular,
            textAlign: 'center',
          }}
        >
          We will usually respond in{' '}
          {route?.params?.nextRoute === 'Dashboard'
            ? 'about 1-3'
            : 'less than 2'}{' '}
          business days. Make sure to check your email!
        </Text>
      </View>
      <Image
        source={ImageIndex.onboarding.messageSent}
        style={{
          marginVertical: 60,
          marginBottom: 20,
          width: 195,
          height: 183,
        }}
      />
      <CommonButton
        title={
          route?.params?.nextRoute === 'Dashboard'
            ? 'Back to Dashboard'
            : 'Continue'
        }
        type="information"
        onPress={() => {
          if (!!route?.params?.nextRoute) {
            //@ts-ignore
            navigation.navigate(route.params.nextRoute)
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  {
                    name: 'MessageSent',
                    params: { nextRoute: route.params?.nextRoute },
                  },
                  { name: 'DrawerContactUs' },
                ],
              })
            )
          } else {
            //@ts-ignore
            navigation.navigate(navigation.getState().routeNames[0])
          }
        }}
        style={{ width: '80%', height: 48 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontWeight: '500',
    fontSize: 24,
  },
})
