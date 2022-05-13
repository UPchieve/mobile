import React, { useState } from 'react';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import { H3 } from "../../../components/atoms/common/H3";
import { Separator } from "../../../components/atoms/common/Separator";
import { View } from "react-native";
import { Stepper } from "../../../components/molecules/onboarding/Stepper";
import { Input } from "../../../components/atoms/common/Input";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../../routes/OnboardingStackNavigator";
import { gradesUtils, schoolUtils } from "../../../utils/eligibilityUtils";
import { FormikInput } from "../../../components/atoms/common/Formik/FormikInput";
import { CommonButton } from "../../../components/common/CommonButton";
import { HighSchoolPicker } from "../../../components/molecules/onboarding/HighSchoolPicker";
import { FormikPicker } from "../../../components/atoms/common/Formik/FormikPicker";
import { authService } from "../../../services/authService";

interface formTypeValues {
    site: string,
    firstName: string,
    lastName: string,
    grade: SelectItem,
    highSchool: School
}
type RegisterSignUpCodeStep2Type = NativeStackScreenProps<OnboardingStackParamList, 'RegisterSignUpCodeStep2'>;
export const RegisterSignUpCodeStep2Screen: React.FC<RegisterSignUpCodeStep2Type> = ({ navigation, route }) => {

    const [highSchoolModalVisible, setHighSchoolModalVisible] = useState<boolean>(false);

    const options = route.params.studentPartnerManifest.sites!;

    const highSchoolSignupRequired = route.params.studentPartnerManifest.schoolSignupRequired;

    let validationShape;

    if (highSchoolSignupRequired) {
        validationShape = {
            site: Yup.string(),
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            grade: Yup.object().required(),
            highSchool: Yup.object().required()
        }
    } else {
        validationShape = {
            site: Yup.string(),
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            grade: Yup.object().required(),
            highSchool: Yup.object()
        }
    }

    // @ts-ignore
    const validationSchema = Yup.object().shape(validationShape)

    const formik = useFormik<formTypeValues>({
        initialValues: {} as formTypeValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: async (values: formTypeValues, { setSubmitting }) => {
            try {
                const newAccount = await authService.createAccountWithPartner({
                    email: route.params.email,
                    password: route.params.password,
                    studentPartnerOrg: route.params.studentPartnerManifest.studentPartnerOrg,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    college: values.grade.value,
                    highSchoolId: values.highSchool?.id,
                    terms: true,
                    currentGrade: values.grade.value,
                    signupSourceId: route.params.signupSourceId
                });

                navigation.navigate('VerifyAccount', {
                    email: route.params.email,
                    firstName: values.firstName,
                    userId: newAccount._id,
                });
            } catch (error: any) {
                const { err } = error?.response?.data ?? 'Error';
                alert(err);
            } finally {
                setSubmitting(false);
            }
            //navigation.navigate('VerifyAccount', {})
        }
    });

    const renderInput = (name: string, placeholder: string, password: boolean = false) => {
        return <View style={{ marginBottom: 8, }}>
            <FormikInput name={name} placeholder={placeholder} password={password} showCheck/>
        </View>
    }

    const renderHighSchoolInput = (grade: SelectItem) => {
        if (grade && (grade.value === '9th' || grade.value === '10th' ||
            grade.value === '11th' || grade.value === '12th')) {
            return <Input
                editable={false}
                value={formik.values.highSchool == undefined ? '' : schoolUtils.getAsString(formik.values.highSchool)}
                placeholder={highSchoolSignupRequired ? "High School" : "High School (Optional)"}
                errorMessage={formik.errors.highSchool as string}
                isValid={!formik.errors.highSchool}
                touched={formik.touched.highSchool as boolean}
                onPressIn={() => setHighSchoolModalVisible(true)} />
        }
    }

    return (
        <KeyboardAwareScrollView style={{ paddingVertical: 60, paddingHorizontal: 20 }}>
            <FormikProvider value={formik}>
                <H3>Tell us more about you</H3>
                <Separator marginVertical={8} backgroundColor='transparent' />
                <Stepper data={[{
                    stepNumber: 1,
                    stepState: 'completed'
                }, { stepNumber: 2, stepState: 'active' }, { stepNumber: 3, stepState: 'not-started' }]} />
                <Separator marginVertical={12} backgroundColor='transparent' />
                {options && <FormikPicker
                    title='Which site do you belong to?'
                    placeholder='Which site do you belong to?'
                    name='site'
                    options={options}
                />
                }
                <Separator marginVertical={4} backgroundColor='transparent' />
                {renderInput('firstName', 'First Name')}
                {renderInput('lastName', 'Last Name')}
                <FormikPicker
                    title='Select your grade'
                    placeholder='What grade are you in 2021-2022?'
                    name='grade'
                    getLabel={(grade) => grade.label}
                    options={gradesUtils.GRADE_OPTIONS}
                />
                <Separator marginVertical={4} backgroundColor='transparent' />
                {renderHighSchoolInput(formik.values.grade)}
                <Separator marginVertical={73} backgroundColor='transparent' />
                <CommonButton
                    title='Sign Up'
                    disabled={!formik.isValid || formik.isSubmitting}
                    loading={formik.isSubmitting}
                    type='information'
                    onPress={() => formik.handleSubmit()}
                    style={{ height: 42 }}
                />
            </FormikProvider>
            <HighSchoolPicker visible={highSchoolModalVisible}
                onSelect={(value) => {
                    formik.setFieldTouched('highSchool');
                    formik.setFieldValue('highSchool', value);
                }}
                onCancel={() => setHighSchoolModalVisible(false)} />
        </KeyboardAwareScrollView>

    )
}

