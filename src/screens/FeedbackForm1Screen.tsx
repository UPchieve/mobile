import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Separator } from '../components/atoms/common/Separator';
import { Medal } from '../components/atoms/session-experience/Medal';
import { Question } from '../components/atoms/session-experience/Question';
import { SessionFeedbackHeader } from '../components/atoms/session-experience/SessionFeedbackHeader';
import { RateNumbers } from '../components/molecules/session-experience/RateNumbers';
interface formType {
    didWeHelp?: number,
}
const initialValues: formType = {
    didWeHelp: undefined,
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