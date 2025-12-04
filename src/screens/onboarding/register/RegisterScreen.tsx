import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useRef } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'
import { Colors } from '../../../../assets/Colors'
import { ModalSelect } from '../../../components/atoms/common/ModalSelect'
import { Separator } from '../../../components/atoms/common/Separator'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'
import { gradesUtils } from '../../../utils/eligibilityUtils'
import { CheckEligibility } from './components/CheckEligibility'
import { SignUpCode } from './components/SignUpCode'

type RegisterScreenType = NativeStackScreenProps<
  OnboardingStackParamList,
  'Register'
>
export const RegisterScreen: React.FC<RegisterScreenType> = ({
  navigation,
}) => {
  // return <View style={{ flex: 1 }}>
  //     <HighSchoolPicker/>
  // </View>

  const selectRef = useRef<ModalSelect>(null)

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={50}
      >
        <View style={{ flex: 1, padding: 20 }}>
          <SignUpCode navigation={navigation} />
          <Separator
            marginVertical={10}
            text="or"
            backgroundColor={Colors.defaultGray}
          />
          <CheckEligibility navigation={navigation} selectRef={selectRef} />
        </View>
      </KeyboardAwareScrollView>
      <ModalSelect
        title="Select your grade"
        data={gradesUtils.GRADE_OPTIONS}
        getLabel={(e) => e.label}
        ref={selectRef}
      />
    </>
  )
}
