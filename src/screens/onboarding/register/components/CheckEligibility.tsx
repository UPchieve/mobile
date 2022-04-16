import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { FormikProvider, useFormik } from 'formik'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontIndex } from '../../../../../assets/FontIndex'
import { FormikInput } from '../../../../components/atoms/common/Formik/FormikInput'
import { Input } from '../../../../components/atoms/common/Input'
import { HelperText } from '../../../../components/atoms/onboarding/HelperText'
import { CommonButton } from '../../../../components/common/CommonButton'
import { HighSchoolPicker } from '../../../../components/molecules/onboarding/HighSchoolPicker'
import { OnboardingStackParamList } from '../../../../routes/OnboardingStackNavigator'
import { schoolUtils } from '../../../../utils/eligibilityUtils'
import * as Yup from 'yup';
import { eligibilityService } from '../../../../services/eligibilityService'
import { ModalSelect } from '../../../../components/atoms/common/ModalSelect'
import { InputWithCustomErrorMessage, InputWithCustomErrorMessageStyles } from '../../../../components/atoms/common/InputWithCustomErrorMessage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { authService } from '../../../../services/authService'
import { getErrorFromBackendResponse } from '../../../../utils/utils'
import { EVENTS } from '../../../../types/services/analyticsServiceTypes'
import { captureEvent } from '../../../../services/analyticsService'

type CheckEligibilityType = {
    navigation: NativeStackNavigationProp<OnboardingStackParamList, "Register">
    selectRef: React.RefObject<ModalSelect>;
}
type formValueType = {
    highSchool?: School,
    grade?: SelectItem,
    zipCode?: string,
    email?: string,
}
const validationSchema = Yup.object().shape({
    highSchool: Yup.object().required(),
    grade: Yup.object().required(),
    zipCode: Yup.string().required().min(5).max(5).label('Zip Code'),
    email: Yup.string().email('Invalid email').required('Required'),
    //TODO missing password length definition.
});
export const CheckEligibility: React.FC<CheckEligibilityType> = ({ navigation, selectRef }) => {
    const [highSchoolModalVisible, setHighSchoolModalVisible] = useState<boolean>(false);
    const formik = useFormik<formValueType>({
        initialValues: {
            email: undefined,
            grade: undefined,
            highSchool: undefined,
            zipCode: undefined,
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: async ({ email, highSchool, zipCode, grade }: formValueType, { setFieldError }) => {
            try {
                await authService.checkCredentials({
                    email: email!, password: 'abcDEFG123123'
                })
            } catch (err: any) {
                const response = getErrorFromBackendResponse(err);
                if (response === 'The email address you entered is already in use') {
                    setFieldError('email', 'email_already_exists');
                    return;
                }
            }
            const response = await eligibilityService.check({
                email: email!,
                schoolUpchieveId: highSchool!.id,
                zipCode: zipCode!,
                currentGrade: grade!.value,
            });

            response ? captureEvent(EVENTS.ELIGIBILITY_ELIGIBLE) : captureEvent(EVENTS.ELIGIBILITY_INELIGIBLE)

            navigation.navigate('EligibleResult', {
                eligible: response,
                grade: grade!.value,
                zipCode: zipCode!,
                highSchoolId: highSchool!.id,
                email: email!,
            });
        }
    });
    const renderInput = (name: string, placeholder: string) => {
        return <View style={{ marginBottom: 20 }}>
            <FormikInput name={name} placeholder={placeholder} keyboardType={name === 'zipCode' ? 'numeric' : 'default'} />
        </View>
    }


    return (
        <FormikProvider value={formik}>
            <Text style={styles.title}>Don’t have a sign up code?</Text>
            <HelperText>Let’s check if your eligible!</HelperText>
            <View style={styles.form}>
                <View style={{ marginBottom: 20 }}>
                    <Input
                        editable={false}
                        value={formik.values.highSchool == undefined ? '' : schoolUtils.getAsString(formik.values.highSchool)}
                        placeholder="High School"
                        errorMessage={formik.errors.highSchool as string}
                        isValid={!formik.errors.highSchool}
                        touched={formik.touched.highSchool as boolean}
                        onPressIn={() => setHighSchoolModalVisible(true)} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Input
                        editable={false}
                        value={formik.values.grade?.label || ''}
                        placeholder="Select your grade"
                        errorMessage={formik.errors.grade as string}
                        isValid={!formik.errors.grade}
                        touched={formik.touched.grade as boolean}
                        onPressIn={() => selectRef.current?.open({
                            onSelect: (selected: SelectItem) => {
                                formik.setFieldTouched('grade');
                                formik.setFieldValue('grade', selected);
                            }
                        })} />
                </View>

                {renderInput('zipCode', 'Zip Code')}
                <View style={{ marginBottom: 20, }}>
                    <InputWithCustomErrorMessage
                        placeholder='Email'
                        value={formik.values.email}
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        isValid={formik.errors.email === undefined}
                        touched={formik.touched.email}
                        errorMessage={formik.errors.email}
                        setClearValue={() => {
                            formik.setFieldValue('email', undefined, false);
                            formik.setFieldTouched('email', false, false);
                        }}
                        errors={[
                            {
                                key: 'email_already_exists', Error: () => <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Text style={InputWithCustomErrorMessageStyles.errorText}>An account with this email already exists. </Text>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Login')}
                                    ><Text style={InputWithCustomErrorMessageStyles.errorLinkText}>logging In </Text></TouchableOpacity>
                                    <Text style={InputWithCustomErrorMessageStyles.errorText}>Try instead.</Text>
                                </View>
                            }
                        ]} />
                </View>
            </View>
            <CommonButton
                title='Check Your Eligibility'
                type='information'
                style={{ height: 48, }}
                disabled={!formik.isValid || formik.isSubmitting}
                loading={formik.isSubmitting}
                onPress={formik.handleSubmit}
            />
            <HighSchoolPicker visible={highSchoolModalVisible}
                onSelect={(value) => {
                    formik.setFieldTouched('highSchool');
                    formik.setFieldValue('highSchool', value);
                }}
                onCancel={() => setHighSchoolModalVisible(false)} />
        </FormikProvider>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 18,
        marginBottom: 5,
    },
    form: {
        marginTop: 16
    }
});
