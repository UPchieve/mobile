import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react'
import { Text, View, StyleSheet, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { FormikInput } from '../../../components/atoms/common/Formik/FormikInput';
import { H3 } from '../../../components/atoms/common/H3';
import { InputCheckBox } from '../../../components/atoms/common/InputCheckBox';
import { Separator } from '../../../components/atoms/common/Separator';
import { CommonButton } from '../../../components/common/CommonButton';
import { Stepper, } from '../../../components/molecules/onboarding/Stepper';
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator';
import { FormikPicker } from '../../../components/atoms/common/Formik/FormikPicker';
import * as Yup from 'yup';
import { PasswordInput } from '../../../components/atoms/onboarding/PasswordInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { formatValueType } from 'react-native-cn-quill/lib/typescript/constants/formats';
import { authService } from '../../../services/authService';
import { Routes } from '../../../routes/Routes';


interface formTypeValues {
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    howDidYouHearAboutUs?: string,
    olderThan13: boolean,
}
const initialValues: formTypeValues = {
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    howDidYouHearAboutUs: undefined,
    olderThan13: false,
}
const options = ['Web search', 'Social media', 'Friend / Classmate', 'School / Teacher', 'Parent / Relative', 'Other'];
type CreateAccountScreenType = NativeStackScreenProps<OnboardingStackParamList, 'CreateAccount'>;
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    //TODO missing password length definition.
    password: Yup.string().required('Required').matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/
        , "Password must contain at least one uppercase, one lower case, and 1 number."),
    confirmPassword: Yup.string().required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    olderThan13: Yup.boolean().isTrue()
});
export const CreateAccountScreen: React.FC<CreateAccountScreenType> = ({route}) => {
    const formik = useFormik<formTypeValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values: formTypeValues) => {
            try {
                await authService.createAccount({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password,
                    highSchoolId: route.params.highSchoolId,
                    zipCode: route.params.zipCode,
                    currentGrade: route.params.grade,
                    email: route.params.email
                });
            } catch (error: any) {
                const { err } = error?.response?.data ?? 'Error';
                alert(err);
            }
        }
    });

    const renderInput = (name: string, placeholder: string, password: boolean = false) => {
        return <View style={{ marginBottom: 8, }}>
            <FormikInput name={name} placeholder={placeholder} password={password} />
        </View>
    }

    return <KeyboardAwareScrollView style={{ paddingVertical: 60, paddingHorizontal: 20, }}>
        <FormikProvider value={formik}>
            <H3>Create Your Account</H3>
            <Separator marginVertical={8} backgroundColor='transparent' />
            <Stepper data={[{
                stepNumber: 1,
                stepState: 'active'
            }, { stepNumber: 2, stepState: 'not-started' }]} />
            <Separator marginVertical={12} backgroundColor='transparent' />
            {renderInput('firstName', 'First Name')}
            {renderInput('lastName', 'Last Name')}
            <View style={{ marginBottom: 8 }}>
                <PasswordInput value={formik.values.password}
                    onChangeText={(value: string) => {
                        formik.setFieldTouched('password');
                        formik.handleChange('password')(value);
                    }
                    }
                    touched={formik.touched.password}
                    onBlur={formik.handleBlur('password')}
                    isValid={!formik.errors.password}
                    allwaysShowMessage={true}
                    placeholder="Password"
                    message='Password must contain at least one uppercase, one lower case, and 1 number'
                />
            </View>
            {renderInput('confirmPassword', 'Confirm Password', true)}
            <FormikPicker
                title='how did you hear about us?'
                placeholder='how did you hear about us?'
                name='howDidYouHearAboutUs'
                options={options}
            />
            <InputCheckBox mt={15} mb={24} label="I am at least 13 years old" value={formik.values.olderThan13}
                onChange={(value) => formik.setFieldValue('olderThan13', value)}
                touched={formik.touched.olderThan13}
                isValid={false}
                errorMessage={formik.errors.olderThan13}
            />
            <CommonButton
                title='Sign Up'
                disabled={!formik.isValid || formik.isSubmitting}
                loading={formik.isSubmitting}
                type='success'
                onPress={() => formik.handleSubmit()}
                style={{ height: 42 }}
            />

            <Separator marginVertical={10} backgroundColor='transparent' />

            <View style={{ alignSelf: 'center' }}>
                <Text style={styles.bottomText}>By signing up, you agree to our</Text>
                <View style={{ flexDirection: 'row', marginVertical: 3, }}>
                    <TouchableOpacity><Text style={[styles.bottomText, styles.linkText]}>Terms of use</Text></TouchableOpacity>
                    <Text style={styles.bottomText}> and </Text>
                    <TouchableOpacity><Text style={[styles.bottomText, styles.linkText]}>Privacy Policy</Text></TouchableOpacity>
                </View>
            </View>
        </FormikProvider>
    </KeyboardAwareScrollView>
}


const styles = StyleSheet.create({
    bottomText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        textAlign: 'center'
    },
    linkText: {
        color: Colors.information,
        textAlignVertical: 'bottom'
    }
});