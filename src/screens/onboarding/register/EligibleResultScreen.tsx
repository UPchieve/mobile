import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import {
  Image,
  Linking,
  StyleSheet,
  ImageBackground,
  Text,
  View,
} from 'react-native'
import { FontIndex } from '../../../../assets/FontIndex'
import { ImageIndex } from '../../../../assets/ImageIndex'
import { CommonButton } from '../../../components/common/CommonButton'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'
import { config } from '../../../../config'
import { GRADES } from '../../../constants'
import { Colors } from '../../../../assets/Colors'

type EligibleResultScreenType = NativeStackScreenProps<
  OnboardingStackParamList,
  'EligibleResult'
>
export const EligibleResultScreen: React.FC<EligibleResultScreenType> = ({
  route,
  navigation,
}) => {
  const { eligible, grade, highSchoolId, zipCode, email } = route.params

  const renderEligible = () => {
    return (
      <>
        <ImageBackground
          source={{ uri: ImageIndex.onboarding.confetti }}
          style={[styles.wrapper, { paddingTop: 85 }]}
        >
          <Text style={styles.title}>You’re Eligible!</Text>
          <Image
            style={{ width: 193, height: 192 }}
            source={{ uri: ImageIndex.onboarding.eligible }}
          />
        </ImageBackground>
        <Image
          style={{ marginTop: 15, width: 44, height: 44, alignSelf: 'center' }}
          source={{ uri: ImageIndex.icons.check }}
        />
      </>
    )
  }

  const renderNotEligible = () => {
    return (
      <View style={[styles.wrapper, styles.wrapperNotEligible]}>
        <Text style={styles.title}>
          Sorry, we can’t verify {'\n'} your eligibility yet.
        </Text>
        <Image
          source={{ uri: ImageIndex.onboarding.notEligible }}
          style={{
            marginBottom: 30,
            resizeMode: 'contain',
            height: '40%',
            width: 312,
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontFamily: FontIndex.WorkSans.Regular,
            textAlign: 'center',
          }}
        >
          <Text style={{ fontFamily: FontIndex.WorkSans.Bold }}>
            Don’t worry: you may still be eligible!{'\n'}
          </Text>
          We just need your parent/guardian to answer some more questions first!
        </Text>
      </View>
    )
  }

  if (grade === GRADES.COLLEGE)
    return (
      <View style={[styles.wrapper, styles.wrapperNotEligible, styles.spacing]}>
        <Text style={[styles.title, { marginBottom: 30 }]}>
          Oops, looks like you're not a high school student!
        </Text>
        <Image
          source={{ uri: ImageIndex.onboarding.notEligible }}
          style={{
            resizeMode: 'contain',
            height: '50%',
          }}
        />
        <Text style={styles.description}>
          We don't have the capacity to help college students right now, but did
          you know that many UPchieve students dream of going to college just
          like you? Give back by becoming an Academic Coach.
        </Text>
        <CommonButton
          title="Become an Academic Coach"
          onPress={() => Linking.openURL('https://upchieve.org/volunteer')}
          type="information"
          style={{ height: 48, width: '100%' }}
        />
        <Text style={{ fontSize: 12, paddingTop: 20, paddingBottom: 5 }}>
          Still need help?
        </Text>
        <Text
          style={{ color: Colors.linkBlue, fontWeight: '500' }}
          onPress={() =>
            Linking.openURL(
              'https://upchieve.org/resources-for-college-students'
            )
          }
        >
          {' '}
          Find college resources here
        </Text>
      </View>
    )

  return (
    <View>
      {eligible ? renderEligible() : renderNotEligible()}
      <View style={{ paddingHorizontal: 20 }}>
        <CommonButton
          title="Continue"
          type="information"
          style={{ height: 48, marginTop: 17 }}
          onPress={() => {
            if (eligible) {
              navigation.navigate('CreateAccount', {
                grade,
                highSchoolId,
                zipCode,
                email,
              })
            } else {
              Linking.openURL(`${config.baseUrl}/request-access`)
            }
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 462,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wrapperNotEligible: {
    height: undefined,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 68,
  },
  spacing: {
    marginTop: 200,
  },
  description: {
    fontSize: 16,
    marginTop: 16,
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
})
