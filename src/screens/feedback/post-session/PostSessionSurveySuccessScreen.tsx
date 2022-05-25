import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { ImageIndex } from '../../../../assets/ImageIndex'
import { FontIndex } from '../../../../assets/FontIndex'
import { Colors } from '../../../../assets/Colors'
import { CommonButton } from '../../../components/common/CommonButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParamList } from '../../../routes/MainStackNavigator'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type PostSessionSurveySuccess = NativeStackScreenProps<
  MainStackParamList,
  'PostSessionSurveySuccess'
>
export const PostSessionSurveySuccessScreen: React.FC<
  PostSessionSurveySuccess
> = ({ navigation }) => {
  const { top } = useSafeAreaInsets()
  return (
    <View style={[styles.container, { paddingTop: 32 + top }]}>
      <View style={styles.bodyWrapper}>
        <View style={styles.background} />
        <View style={styles.padding}>
          <View style={styles.imagePosition}>
            <Image
              style={styles.image}
              source={ImageIndex.feedback.postFeedback}
            />
          </View>
          <View style={styles.textWrapperTitle}>
            <Text style={styles.title}>
              Thank you for your {'\n'} feedback!
            </Text>
          </View>
          <View style={styles.textWrapperSubtitle}>
            <Text style={styles.subtitle}>
              Your feedback is very important to us.{'\n'}Without it we wouldn’t
              know how to improve your experience on our platform.{' '}
            </Text>
          </View>
          <View style={styles.textWrapper}>
            <CommonButton
              title={'Go to my dashboard'}
              onPress={() => {
                navigation.navigate('DashboardScreen')
              }}
              type={'information'}
              style={{ alignItems: 'center' }}
              rightIcon={ImageIndex.feedback.goArrow}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    borderTopLeftRadius: 193,
    borderTopRightRadius: 193,
    height: '100%',
    width: '100%',
    backgroundColor: '#F3F7FD',
  },
  image: {
    width: 256,
    height: 294,
  },
  bodyWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  padding: {
    paddingHorizontal: 31,
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  imagePosition: {
    // marginTop: 46,
    paddingTop: 46,
  },
  title: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 22,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 14,
    color: Colors.secondaryGray,
    textAlign: 'center',
    lineHeight: 21,
  },
  button: {
    width: '100%',
  },
  textWrapper: {
    marginTop: 32,
    width: '100%',
  },
  textWrapperTitle: {
    marginTop: 9,
  },
  textWrapperSubtitle: {
    marginTop: 18,
  },
})
