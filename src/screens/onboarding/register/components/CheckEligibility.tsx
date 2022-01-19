import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormikProvider, useFormik } from 'formik'
import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack'
import { FontIndex } from '../../../../../assets/FontIndex'
import { FormikInput } from '../../../../components/atoms/common/Formik/FormikInput'
import { Input } from '../../../../components/atoms/common/Input'
import { Separator } from '../../../../components/atoms/common/Separator'
import { HelperText } from '../../../../components/atoms/onboarding/HelperText'
import { CommonButton } from '../../../../components/common/CommonButton'
import { OnboardingStackParamList } from '../../../../routes/OnboardingStackNavigator'

type CheckEligibilityType = {
    navigation: NativeStackNavigationProp<OnboardingStackParamList, "Register">
    selectRef: any;
}
type formValueType = {
    highSchool: string,
    grade: string,
    zipCode: string,
    email: string,
}
export const CheckEligibility: React.FC<CheckEligibilityType> = ({ navigation, selectRef }) => {
    const formik = useFormik<formValueType>({
        initialValues: {} as formValueType,
        onSubmit: () => { }
    });
    const renderInput = (name: string, placeholder: string) => {
        return <View style={{ marginBottom: 20 }}>
            <FormikInput name={name} placeholder={placeholder} />
        </View>
    }
    return (
        <FormikProvider value={formik}>
            <Text style={styles.title}>Don’t have a sign up code?</Text>
            <HelperText>Let’s check if your eligible!</HelperText>
            <View style={styles.form}>
                {renderInput('highSchool', 'High School')}
                <View style={{ marginBottom: 20 }}>
                    <Input
                        editable={false}
                        value={formik.values.grade}
                        placeholder="Select your grade"
                        errorMessage={formik.errors.grade}
                        isValid={!formik.errors.grade}
                        touched={formik.touched.grade}
                        onPressIn={() => selectRef.current.open((selected: string) => {
                            formik.setFieldTouched('grade');
                            formik.setFieldValue('grade', selected);
                        })} />
                </View>
                {renderInput('zipCode', 'Zip Code')}
                {renderInput('email', 'Your email')}
            </View>
            {/* <CommonButton
                title='Check Your Eligibility'
                type='information'
                style={{ height: 48, }}
                onPress={() => navigation.navigate('EligibleResult', { eligible: true })}
            /> */}
            <CommonButton
                title='Check Your Eligibility'
                type='information'
                style={{ height: 48, }}
                onPress={() => {
                    selectRef.current.open((e: string) => { alert(e) })
                }}
            />
        </FormikProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 18,
        marginBottom: 5,
    },
    form: {
        marginTop: 16
    }
});