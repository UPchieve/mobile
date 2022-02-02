import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Question } from '../../../components/atoms/session-experience/Question';
import { SessionFeedbackHeader } from '../../../components/atoms/session-experience/SessionFeedbackHeader';
import { RateNumbers } from '../../../components/molecules/session-experience/RateNumbers';
import { RateStars } from "../../../components/molecules/session-experience/RateStars";
import { Colors } from "../../../../assets/Colors";
import { CommonButton } from "../../../components/common/CommonButton";
import { RadioGroup } from '../../../components/molecules/common/RadioGroup';
import { CommonTextArea } from "../../../components/common/CommonTextArea";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../routes/MainStackNavigator';

const pickerOptions = [
    'I am very comfortable with this topic.',
    'I don’t know how to do this at all.',
    'I think I know how to do it, but I need help.',
    'I can do this on my own, but I don’t fully understand it.'
];

interface formType {
    didWeHelp?: number,
    understandingAfterSession?: string,
    rateAcademicCoach?: number,
    whatCanDoBetter?: string,
    textInput?: string
}
const initialValues: formType = {
    didWeHelp: undefined,
    understandingAfterSession: undefined,
    whatCanDoBetter: undefined,
    rateAcademicCoach: undefined,
    textInput: undefined,
}
type PostSessionSurveyType = NativeStackScreenProps<MainStackParamList, 'PostSessionSurvey'>;
export const PostSessionSurveyScreen: React.FC<PostSessionSurveyType> = ({ navigation }) => {
    const formik = useFormik({
        initialValues,
        validateOnMount: true,
        validate: (values) => {
            if (values.didWeHelp || values.understandingAfterSession
                || values.rateAcademicCoach || values.understandingAfterSession
                || (values.textInput?.length || 0 > 0)) {
                return {};
            }
            return { error: 'At least one question must be answer to submit the form.' }
        },
        onSubmit: (values) => {
            //TODO handle form submit
            navigation.navigate('PostSessionSurveySuccess');
            console.log(values);
        }
    });

    return <SafeAreaView>
        {/*TODO Icon in the right must navigate to dashboard*/}
        <SessionFeedbackHeader onIconPress={() => navigation.reset({ routes: [{ name: 'Home' }] })} />
        <KeyboardAwareScrollView
            enableResetScrollToCoords={false}
            style={{
                paddingLeft: 23,
                paddingRight: 23,
                paddingTop: 24,
            }}>
            <FormikProvider value={formik}>
                <View style={styles.questionWrapper}>
                    <Question text='Your goal for this session was to BLANK. Did we help you achieve your goal?' highlight='BLANK' />
                    <RateNumbers selected={formik.values.didWeHelp} setSelected={(selected) => formik.setFieldValue('didWeHelp', selected)} parentStyle={{ paddingHorizontal: 40, }} />
                </View>
                <View style={styles.questionWrapper}>
                    <Question text='What is your level of understanding now that you’ve completed your session?' />
                    <RadioGroup data={pickerOptions} getText={e => e} onSelectedChanged={(value) => formik.setFieldValue('understandingAfterSession', value)} />
                </View>
                <View style={styles.questionWrapper}>
                    <Question text={'Please rate the Academic Coach who helped you.'} />
                    <RateStars selected={formik.values.rateAcademicCoach} setSelected={(selected) => formik.setFieldValue('rateAcademicCoach', selected)} parentStyle={{ paddingHorizontal: 40 }} />
                </View>
                {formik.values.rateAcademicCoach && formik.values.rateAcademicCoach <= 3
                    ? <View style={styles.questionWrapper}>
                        <Question text='What could your coach have done better?'
                            additionalText='This feedback will be anonymous! You can be honest. :)'
                        />
                        <CommonTextArea onChangeText={formik.handleChange('whatCanDoBetter')}
                            value={formik.values.whatCanDoBetter} />
                    </View>

                    : null}
                <View style={styles.questionWrapper}>
                    <Question text='Do you have any other feedback you´d like to share with UPchieve?'
                        additionalText='We read every single comment, but if you need to connect with UPchieve staff about a question or concern please email us directly.'
                        informationText='This can be about the web app, the Academic Coach who helped you, the services UPchieve offers, etc.' />
                    {/*TODO Text alignment on the input must be at top*/}
                    <CommonTextArea onChangeText={formik.handleChange('textInput')} value={formik.values.textInput} />
                </View>
                <View style={styles.buttonWrapper}>
                    <CommonButton title={'Submit'} disabled={!formik.isValid} onPress={formik.handleSubmit} type={'success'} style={{ width: 89, height: 40 }} />
                </View>
            </FormikProvider>
        </KeyboardAwareScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    questionWrapper: {
        marginBottom: 36,
    },
    buttonWrapper: {
        marginBottom: 50,
        alignItems: 'flex-end'
    }
});
