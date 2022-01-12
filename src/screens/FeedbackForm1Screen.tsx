import { FormikProvider, useFormik } from 'formik';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Question } from '../components/atoms/session-experience/Question';
import { SessionFeedbackHeader } from '../components/atoms/session-experience/SessionFeedbackHeader';
import { RateNumbers } from '../components/molecules/session-experience/RateNumbers';
import { RateStars } from "../components/molecules/session-experience/RateStars";
import { Colors } from "../../assets/Colors";
import { CommonButton } from "../components/common/CommonButton";
import { RadioGroup } from '../components/molecules/common/RadioGroup';

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
    textInput?: string
}
const initialValues: formType = {
    didWeHelp: undefined,
    understandingAfterSession: undefined,
    rateAcademicCoach: undefined,
    textInput: undefined,
}
export const FeedbackForm1Screen = () => {
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
            console.log(values);
        }
    });
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
        setIsFocused(false)
    }

    const handleFocus = () => {
        setIsFocused(true);
    }
    return <SafeAreaView>
        {/*TODO Icon in the right must navigate to dashboard*/}
        <SessionFeedbackHeader />
        <KeyboardAwareScrollView style={{
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
                <View style={styles.questionWrapper}>
                    <Question text='Do you have any other feedback you´d like to share with UPchieve?'
                        additionalText='This can be about the web app, the Academic Coach who helped you, the services UPchieve offers, etc. '
                        informationText='Información!' />
                    {/*TODO Text alignment on the input must be at top*/}
                    <TextInput style={[styles.textInput, isFocused && styles.textInputSelected]}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={formik.handleChange('textInput')}
                        value={formik.values.textInput}
                    />
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
    textInput: {
        height: 148,
        borderWidth: 0.5,
        padding: 10,
        borderColor: Colors.borderGray,
        textAlignVertical: 'top',
    },
    textInputSelected: {
        borderColor: Colors.success
    },
    buttonWrapper: {
        marginBottom: 50,
        alignItems: 'flex-end'
    }
});
