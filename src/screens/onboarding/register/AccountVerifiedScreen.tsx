import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Image, View } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { ImageIndex } from '../../../../assets/ImageIndex'
import { SvgIcons } from '../../../../assets/IndexIcons'
import { H3 } from '../../../components/atoms/common/H3'
import { HelperText } from '../../../components/atoms/onboarding/HelperText'
import { CommonButton } from '../../../components/common/CommonButton'
import { AuthContext } from '../../../providers/AuthProvider'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'

type AccountVerifiedScreenType = NativeStackScreenProps<
  OnboardingStackParamList,
  'AccountVerified'
>
export const AccountVerifiedScreen: React.FC<AccountVerifiedScreenType> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { refreshUser } = useContext(AuthContext)

  return (
    <View>
      <View style={{ justifyContent: 'space-between', paddingBottom: 45 }}>
        <View>
          <Image
            source={{ uri: ImageIndex.onboarding.accountVerified }}
            style={{
              width: '100%',
              height: 600,
            }}
          />
          <View
            style={{
              paddingHorizontal: 25,
              marginTop: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <H3 fontFamily={FontIndex.WorkSans.Medium}>Welcome to UPchieve!</H3>
            <HelperText color={Colors.secondaryGray} mt={8}>
              You’re almost ready to get started!
            </HelperText>
            <HelperText color={Colors.secondaryGray}>
              We just need to lay down some ground rules.
            </HelperText>
          </View>
        </View>
        <View style={{ paddingHorizontal: 25, paddingTop: 50 }}>
          <CommonButton
            type="information"
            title="I'm listening"
            loading={loading}
            onPress={() => {
              navigation.navigate('Rules')
            }}
            SvgIcon={SvgIcons.GoArrow}
          />
        </View>
      </View>
    </View>
  )
}
