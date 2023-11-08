import React, { useContext, useState } from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { ImageIndex } from '../../../../assets/ImageIndex'
import { SvgIcons } from '../../../../assets/IndexIcons'
import { CommonButton } from '../../../components/common/CommonButton'
import { AuthContext } from '../../../providers/AuthProvider'

const rules = [
  {
    image: ImageIndex.onboarding.rules.rule1,
    title: 'Play Nice with Your Coach',
    text: 'All UPchieve coaches are unpaid volunteers who want to help you succeed. Make sure to be friendly and respectful, and don’t forget to say thank you and goodbye before ending your session!',
    buttonText: 'Manners, check!',
  },
  {
    image: ImageIndex.onboarding.rules.rule2,
    title: 'Engage in Learning',
    text: 'You’re on UPchieve to learn! Our coaches are only there to guide you, so be sure to actively participate in your session. Coaches are not allowed to give you the answers or do the work for you.',
    buttonText: 'Makes sense.',
  },
  {
    image: ImageIndex.onboarding.rules.rule3,
    title: 'Stay Safe Out There',
    text: 'You came to UPchieve for homework help, not the tea. Keep conversations on-topic and don’t share personal information like your phone number, IG handle, or email. Never connect with a coach offline.',
    buttonText: 'Got it. I’m ready!',
  },
]

const Dots: React.FC<{ currentRule: number }> = ({ currentRule }) => {
  return (
    <View style={styles.dots}>
      <View style={[styles.dot, styles.fillDot]} />
      <View
        style={[
          styles.dot,
          currentRule > 0 && styles.fillDot,
          { marginHorizontal: 20 },
        ]}
      />
      <View style={[styles.dot, currentRule > 1 && styles.fillDot]} />
    </View>
  )
}

export const RulesScreen = () => {
  const { refreshUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0)
  const currentRule = rules[currentRuleIndex]
  return (
    <View style={styles.container}>
      <Image source={{ uri: currentRule.image }} style={styles.image} />
      <View
        style={{
          alignItems: 'center',
          marginTop: 15,
          flex: 1,
        }}
      >
        <Dots currentRule={currentRuleIndex} />
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.title}>
              Rule #{currentRuleIndex + 1}:{'\n'}
              {currentRule.title}
            </Text>
            <Text style={styles.ruleText}>{currentRule.text}</Text>
          </View>
          <CommonButton
            onPress={() => {
              const nextRuleIndex = currentRuleIndex + 1
              if (nextRuleIndex < rules.length) {
                setCurrentRuleIndex(nextRuleIndex)
              } else {
                setLoading(true)
                refreshUser()
              }
            }}
            type="information"
            title={currentRule.buttonText}
            loading={loading}
            SvgIcon={SvgIcons.GoArrow}
            style={{
              height: 40,
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 483,
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: Colors.borderGray,
    height: 8,
    width: 8,
    borderRadius: 100,
  },
  fillDot: {
    backgroundColor: Colors.success,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60,
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    marginTop: 10,
    fontFamily: FontIndex.WorkSans.Medium,
    fontSize: 22,
    textAlign: 'center',
  },
  ruleText: {
    marginTop: 8,
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 14,
    lineHeight: 21,
    color: Colors.secondaryGray,
    textAlign: 'center',
  },
})
