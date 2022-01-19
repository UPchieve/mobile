import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useRef } from 'react'
import { View } from "react-native"
import { Colors } from '../../../../assets/Colors'
import { ModalSelect } from '../../../components/atoms/common/ModalSelect'
import { Separator } from '../../../components/atoms/common/Separator'
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator'
import { CheckEligibility } from './components/CheckEligibility'
import { SignUpCode } from './components/SignUpCode'


const options = ['8th grade', '9th grade', '10th grade', '11th grade', '12th grade', 'College', 'Other'];
type RegisterScreenType = NativeStackScreenProps<OnboardingStackParamList, 'Register'>;
export const RegisterScreen: React.FC<RegisterScreenType> = ({ navigation }) => {

    const selectRef = useRef<any>(null);
    return <><View style={{ padding: 20, }}>
        <SignUpCode />
        <Separator marginVertical={10} text='or' backgroundColor={Colors.defaultGray} />
        <CheckEligibility navigation={navigation} selectRef={selectRef} />
    </View>
        <ModalSelect title="Select your grade" data={options} getLabel={e => e} ref={selectRef} />
    </>
}