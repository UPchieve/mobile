import React, {useRef, useState} from 'react';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import {FormikProvider, useFormik} from "formik";
import {H3} from "../../../components/atoms/common/H3";
import {Separator} from "../../../components/atoms/common/Separator";
import {StyleSheet, Text, View} from "react-native";
import {FontIndex} from "../../../../assets/FontIndex";
import {Colors} from "../../../../assets/Colors";
import {Stepper} from "../../../components/molecules/onboarding/Stepper";
import {Input} from "../../../components/atoms/common/Input";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {OnboardingStackParamList} from "../../../routes/OnboardingStackNavigator";
import {ModalSelect} from "../../../components/atoms/common/ModalSelect";
import {gradesUtils, schoolUtils} from "../../../utils/eligibilityUtils";
import {siteUtils} from "../../../utils/siteUtils";
import {FormikInput} from "../../../components/atoms/common/Formik/FormikInput";
import {CommonButton} from "../../../components/common/CommonButton";
import {HighSchoolPicker} from "../../../components/molecules/onboarding/HighSchoolPicker";


type RegisterSignUpCodeStep2Type = {
    navigation: NativeStackNavigationProp<OnboardingStackParamList, "RegisterSignUpCodeStep2">
    selectRef: any;
}

interface formTypeValues {
    site: SelectItem,
    firstName: string,
    lastName: string,
    grade: SelectItem,
    highSchool: School
}

export const RegisterSignUpCodeStep2Screen = () => {

    const [highSchoolModalVisible, setHighSchoolModalVisible] = useState<boolean>(false);

    const selectRefSite = useRef<any>(null);
    const selectRefGrade = useRef<any>(null);

    const validationSchema = Yup.object().shape({
        site: Yup.object().required(),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        grade: Yup.object().required(),
        highSchool: Yup.object().required()
    });

    const formik = useFormik<formTypeValues>({
        initialValues: {} as formTypeValues,
        validationSchema,
        onSubmit: async (values: formTypeValues) => {

        }
    });

    const renderInput = (name: string, placeholder: string, password: boolean = false) => {
        return <View style={{ marginBottom: 8, }}>
            <FormikInput name={name} placeholder={placeholder} password={password} />
        </View>
    }

    const renderHighSchoolInput = (grade: SelectItem) => {
        console.log('grade', grade);
        if (grade && (grade.value === '9th' || grade.value === '10th' || grade.value === '11th' || grade.value === '12th')) {
            return <Input
                editable={false}
                value={formik.values.highSchool == undefined ? '' : schoolUtils.getAsString(formik.values.highSchool)}
                placeholder="High School"
                errorMessage={formik.errors.highSchool as string}
                isValid={!formik.errors.highSchool}
                touched={formik.touched.highSchool as boolean}
                onPressIn={() => setHighSchoolModalVisible(true)} />
        }
    }

    return (
        <KeyboardAwareScrollView style={{ paddingVertical: 60, paddingHorizontal: 20}}>
            <FormikProvider value={formik}>
                <H3>Tell us more about you</H3>
                <Separator marginVertical={8} backgroundColor='transparent' />
                <Text style={styles.notWithText}>Not with ____ ?</Text>
                <Separator marginVertical={8} backgroundColor='transparent' />
                <Stepper data={[{
                    stepNumber: 1,
                    stepState: 'completed'
                }, { stepNumber: 2, stepState: 'active' }, { stepNumber: 3, stepState: 'not-started' }]} />
                <Separator marginVertical={12} backgroundColor='transparent' />
                <Input
                    editable={false}
                    value={formik.values.site?.label || ''}
                    placeholder="Which site do you belong to?"
                    errorMessage={formik.errors.site as string}
                    isValid={!formik.errors.site}
                    touched={formik.touched.site as boolean}
                    onPressIn={() => selectRefSite.current.open((selected: SelectItem) => {
                        formik.setFieldTouched('site');
                        formik.setFieldValue('site', selected);
                    })} />
                <Separator marginVertical={4} backgroundColor='transparent' />
                {renderInput('firstName', 'First Name')}
                {renderInput('lastName', 'Last Name')}
                <Input
                    editable={false}
                    value={formik.values.grade?.label || ''}
                    placeholder="What grade are you in 2021-2022?"
                    errorMessage={formik.errors.grade as string}
                    isValid={!formik.errors.grade}
                    touched={formik.touched.grade as boolean}
                    onPressIn={() => selectRefGrade.current.open((selected: SelectItem) => {
                        formik.setFieldTouched('grade');
                        formik.setFieldValue('grade', selected);
                    })} />
                <Separator marginVertical={4} backgroundColor='transparent' />
                {renderHighSchoolInput(formik.values.grade)}
                <Separator marginVertical={73} backgroundColor='transparent' />
                <CommonButton
                    title='Sign Up'
                    disabled={!formik.isValid || formik.isSubmitting}
                    loading={formik.isSubmitting}
                    type='success'
                    onPress={() => formik.handleSubmit()}
                    style={{ height: 42 }}
                />
            </FormikProvider>
            <ModalSelect title="Which site do you belong to?" data={siteUtils.SITE_OPTIONS} getLabel={e => e.label} ref={selectRefSite} />
            <ModalSelect title="What grade are you in 2021-2022?" data={gradesUtils.GRADE_OPTIONS} getLabel={e => e.label} ref={selectRefGrade} />
            <HighSchoolPicker visible={highSchoolModalVisible}
                              onSelect={(value) => {
                                  formik.setFieldTouched('highSchool');
                                  formik.setFieldValue('highSchool', value);
                              }}
                              onCancel={() => setHighSchoolModalVisible(false)} />
        </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    notWithText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 16,
        color: Colors.information
    },
})
