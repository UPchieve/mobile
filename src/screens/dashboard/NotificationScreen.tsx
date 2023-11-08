import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { MainStackParamList } from '../../routes/MainStackNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Colors } from '../../../assets/Colors'
import { ImageIndex } from '../../../assets/ImageIndex'
import { FontIndex } from '../../../assets/FontIndex'
import { CommonButton } from '../../components/common/CommonButton'
import { SvgIcons } from '../../../assets/IndexIcons'
import messaging from '@react-native-firebase/messaging'

type NotificationScreenType = NativeStackScreenProps<
  MainStackParamList,
  'NotificationScreen'
>
export const NotificationScreen: React.FC<NotificationScreenType> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets()

  const navigateToSession = () =>
    navigation.navigate('Session', { sessionId: route.params.sessionId })

  const onNotifyPress = async () => {
    try {
      const authorizationStatus = await messaging().requestPermission()
      navigateToSession()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <View style={[styles.container, { paddingTop: 36 + insets.top }]}>
      <View style={styles.background}>
        <View style={styles.dogWrapper}>
          <Image
            source={{ uri: ImageIndex.dashboard.notificationDog }}
            resizeMode="contain"
            style={styles.dog}
          />
        </View>
        <View style={styles.padding}>
          <View style={{ marginTop: 45 }} />
          <Text style={styles.title}>
            Do you want to turn on notifications?
          </Text>
          <View style={{ marginTop: 12 }} />
          <Text style={styles.text}>
            Turning on notifications will help you get support faster by making
            sure you don’t miss when your coach joins the session. We’ll also
            notify you during the session if they send you a message while
            you’re not looking.
          </Text>
          <View style={{ marginTop: 17 }} />
          <CommonButton
            type="information"
            title="Yes, notify me!"
            SvgIcon={SvgIcons.GoArrow}
            style={{ height: 40 }}
            onPress={onNotifyPress}
          />
          <View style={{ marginTop: 26 }} />
          <TouchableOpacity
            style={styles.maybeLaterButtonContainer}
            onPress={navigateToSession}
          >
            <Text style={styles.maybeLaterButton}>Maybe later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'red'
  },
  background: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 173,
    borderTopRightRadius: 173,
    paddingTop: 46,
    alignItems: 'center',
    backgroundColor: Colors.selectedGreen,
  },
  dogWrapper: {
    height: 263,
    width: 247,
  },
  dog: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  padding: {
    width: '100%',
    paddingHorizontal: 22,
  },
  title: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 27.5,
  },
  text: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.secondaryGray,
    lineHeight: 21,
  },
  maybeLaterButtonContainer: {
    alignItems: 'center',
  },
  maybeLaterButton: {
    color: Colors.secondaryGray,
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 16,
  },
})
