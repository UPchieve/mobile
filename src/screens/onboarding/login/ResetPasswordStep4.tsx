import React from 'react'
import { Image, View } from 'react-native'
import { ImageIndex } from '../../../../assets/ImageIndex'
import { H3 } from '../../../components/atoms/common/H3'
import { CommonButton } from '../../../components/common/CommonButton'

export const ResetPasswordStep4Screen: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 150,
      }}
    >
      <H3>You’re all set!</H3>
      <Image
        source={{ uri: ImageIndex.onboarding.allSet }}
        style={{
          marginVertical: 60,
          marginBottom: 20,
        }}
      />
      {/* TODO Where should it redirects.  */}
      <CommonButton
        title="Go to my Dashboard"
        type="information"
        onPress={() => {}}
        style={{ width: '80%', height: 48 }}
      />
    </View>
  )
}
