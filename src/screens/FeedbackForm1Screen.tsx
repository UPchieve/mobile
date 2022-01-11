import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { StyleSheet, View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Question } from '../components/atoms/session-experience/Question';
import { SessionFeedbackHeader } from '../components/atoms/session-experience/SessionFeedbackHeader';
import { RateNumbers } from '../components/molecules/session-experience/RateNumbers';
import { Picker, pickerDataParse } from '../components/atoms/common/Picker';

const pickerOptions = pickerDataParse([
    'I am very comfortable with this topic.',
    'I don’t know how to do this at all.',
    'I think I know how to do it, but I need help.',
    'I can do this on my own, but I don’t fully understand it.'
]);

interface formType {
    didWeHelp?: number,
    understandingAfterSession?: string
}
const initialValues: formType = {
    didWeHelp: undefined,
    understandingAfterSession: undefined,
}
export const FeedbackForm1Screen = () => {
    const formik = useFormik({
        initialValues,
        onSubmit: () => { }
    });
    return <SafeAreaView>
        <SessionFeedbackHeader />
        <KeyboardAwareScrollView style={{
            paddingLeft: 23,
            paddingRight: 21,
            paddingTop: 24,
        }}>
            <FormikProvider value={formik}>
                <View style={styles.questionWrapper}>
                    <Question text='Your goal for this session was to BLANK. Did we help you achieve your goal?' highlight='BLANK' />
                    <RateNumbers selected={formik.values.didWeHelp} setSelected={(selected) => formik.setFieldValue('didWeHelp', selected)} parentStyle={{ paddingHorizontal: 40, }} />
                </View>
                <View style={styles.questionWrapper}>
                    <Question text='What is your level of understanding now that you’ve completed your session?' />
                    <Picker data={pickerOptions} onChange={(value) => formik.setFieldValue('understandingAfterSession', value.label)}
                        placeholder='Select your level of understanding'
                    />
                </View>
                <View style={styles.questionWrapper}>
                    <Question text='Please rate the Academic Coach who helped you.' aditionalText='hola mudno lla alla la ' informationText='Información!' />
                </View>
            </FormikProvider>
        </KeyboardAwareScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    questionWrapper: {
        marginBottom: 36,
    }
});