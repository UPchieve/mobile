import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormikProvider, useFormik } from "formik";
import { SessionFeedbackHeader } from "../../components/atoms/session-experience/SessionFeedbackHeader";
import { FontIndex } from "../../../assets/FontIndex";
import { RateStars } from "../../components/molecules/session-experience/RateStars";
import { Question } from "../../components/atoms/session-experience/Question";
import { Medal } from "../../components/atoms/session-experience/Medal";
import { RateNumbers } from "../../components/molecules/session-experience/RateNumbers";
import { Colors } from "../../../assets/Colors";
import { CommonButton } from "../../components/common/CommonButton";
import { MedalPicker } from "../../components/molecules/session-experience/MedalPicker";
import { CommonInput } from "../../components/common/CommonInput";
import { MainStackParamList } from "../../routes/MainStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


const pickerOptions = [
    'Improve my understanding',
    'Finish a homework assignment',
    'Prepare for a test',
    'Get advice',
    'Check my answers',
    'Others'
];

interface formType {
    didWeHelp?: number,
    knowledgeCoach?: number,
    howWasCoach?: number,
    rateAcademicCoach?: number,
    textInput?: string,
    primaryGoal?: string
}
const initialValues: formType = {
    didWeHelp: undefined,
    knowledgeCoach: undefined,
    howWasCoach: undefined,
    rateAcademicCoach: undefined,
    textInput: undefined,
    primaryGoal: undefined
}

type PostSessionSurveyType = NativeStackScreenProps<MainStackParamList, 'PostSessionSurveyCollege'>;
export const PostSessionSurveyCollegeScreen: React.FC<PostSessionSurveyType> = ({ navigation }) => {
    const formik = useFormik({
        initialValues,
        validateOnMount: true,
        validate: (values) => {
            if (values.didWeHelp || values.knowledgeCoach
                || values.rateAcademicCoach || values.howWasCoach
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

    return (
        <SafeAreaView>
            <SessionFeedbackHeader onIconPress={() => navigation.reset({ routes: [{ name: 'Home' }] })} />
            <KeyboardAwareScrollView style={{
                paddingLeft: 23,
                paddingRight: 23,
                paddingTop: 24,
            }}>
                <FormikProvider value={formik}>
                    <View style={styles.questionWrapper}>
                        <Text style={styles.title}>Rate your session</Text>
                    </View>
                    <View style={styles.questionWrapper}>
                        <RateStars selected={formik.values.rateAcademicCoach} setSelected={(selected) => formik.setFieldValue('rateAcademicCoach', selected)} parentStyle={{ paddingHorizontal: 40 }} />
                    </View>
                    <View style={styles.questionWrapper}>
                        <Question text={'What was your primary goal today?'} />
                        <MedalPicker data={pickerOptions} getText={e => e} />
                    </View>
                    <View style={styles.questionWrapper}>
                        <Text style={styles.subtitle}>Please tell us about your coach.</Text>
                    </View>
                    <View style={styles.questionWrapper}>
                        <Question text={'My coach was knowledgeable about the topic.'} />
                        <RateNumbers selected={formik.values.knowledgeCoach} setSelected={(selected) => formik.setFieldValue('knowledgeCoach', selected)} parentStyle={{ paddingHorizontal: 40, }} />
                    </View>
                    <View style={styles.questionWrapper}>
                        <Question text={'My coach was friendly and approachable.'} />
                        <RateNumbers selected={formik.values.howWasCoach} setSelected={(selected) => formik.setFieldValue('howWasCoach', selected)} parentStyle={{ paddingHorizontal: 40, }} />
                    </View>
                    <View style={styles.questionWrapper}>
                        <Question text={'I would like to receive help from this coach again.'} />
                        <RateNumbers selected={formik.values.didWeHelp} setSelected={(selected) => formik.setFieldValue('didWeHelp', selected)} parentStyle={{ paddingHorizontal: 40, }} />
                    </View>
                    <View style={styles.questionWrapper}>
                        <Question text='Do you have any other feedback you´d like to share with UPchieve?'
                            additionalText='We read every single comment, but if you need to connect with UPchieve staff about a question or concern please email us directly.'
                            informationText='This can be about the web app, the Academic Coach who helped you, the services UPchieve offers, etc.' />
                        {/*TODO Text alignment on the input must be at top*/}
                        <CommonInput onChangeText={formik.handleChange('textInput')} value={formik.values.textInput} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <CommonButton title={'Submit'} disabled={!formik.isValid} onPress={formik.handleSubmit} type={'success'} style={{ width: 89, height: 40 }} />
                    </View>
                </FormikProvider>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    questionWrapper: {
        marginBottom: 36
    },
    title: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 22
    },
    subtitle: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 18
    },
    textInput: {
        height: 148,
        borderWidth: 0.5,
        paddingLeft: 10,
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
})
