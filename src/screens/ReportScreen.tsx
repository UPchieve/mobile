import React from "react";
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontIndex} from "../../assets/FontIndex";
import {Colors} from "../../assets/Colors";
import ReadMore from 'react-native-read-more-text';
import {CommonInput} from "../components/common/CommonInput";
import {FormikProvider, useFormik} from "formik";
import {RadioGroup} from "../components/molecules/common/RadioGroup";
import {CommonButton} from "../components/common/CommonButton";
import {ImageIndex} from "../../assets/ImageIndex";

const pickerOptions = [
    'This student was extremely rude or inappropriate.',
    'I am worried for the immediate safety of this student.',
];

interface formType {
    textInput?: string,
    reasonReport?: string
}
const initialValues: formType = {
    textInput: undefined,
    reasonReport: undefined
}

export const ReportScreen = () => {

    const formik = useFormik({
        initialValues,
        validateOnMount: true,
        validate: (values) => {
            if (values.reasonReport) {
                return {};
            }
            return { error: 'At least one question must be answer to submit the form.' }
        },
        onSubmit: (values) => {
            //TODO handle form submit
            console.log(values);
        }
    });

    const handleTextReady = () => {
        console.log('ready');
    }

    const renderTruncatedFooter = (handlePress: any) => {
        return (
            <Text style={styles.readMore}
                onPress={handlePress}>
                Read More...
            </Text>
        );
    }

    const renderRevealedFooter = (handlePress: any) => {
        return (
            <Text style={styles.review}
                onPress={handlePress}>
                Review guidelines here.
            </Text>
        );
    }

    return (
        <SafeAreaView>
            <FormikProvider value={formik}>
                <View style={styles.container}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.title}>Report this session</Text>
                    </View>
                    <ReadMore numberOfLines={2}
                              onReady={handleTextReady}
                              renderRevealedFooter={renderRevealedFooter}
                              renderTruncatedFooter={renderTruncatedFooter}>
                        <Text style={styles.description}>
                            Reporting students will result in immediate action from UPchieve.
                            If you have a concern that requires less immediate attention, please let us know in the feedback form after your session is complete.
                            Not sure what to do?
                        </Text>
                    </ReadMore>
                    <View style={styles.textWrapper}>
                        <Text style={styles.subtitle}>Reason for your report</Text>
                    </View>
                    <View>
                        <RadioGroup data={pickerOptions} getText={e => e} onSelectedChanged={(value) => formik.setFieldValue('reasonReport', value)} />
                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.subtitle}>Tell us what happened</Text>
                    </View>
                        <CommonInput onChangeText={formik.handleChange('textInput')}
                                     value={formik.values.textInput}
                                     placeholder={'(Optional) Write a 1-2 sentence summary of what happened.'}/>
                    <View style={styles.textWrapper}>
                        <View style={styles.buttonWrapper}>
                            <View style={styles.paddingButton}>
                                <CommonButton title={'Cancel'} onPress={() => ''} style={styles.button}/>
                            </View>
                            <CommonButton title={'Report'} disabled={!formik.isValid} onPress={() => ''}
                                          type={'success'} style={styles.button} rightIcon={ImageIndex.feedback.goArrow}/>
                        </View>
                    </View>
                </View>
            </FormikProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 22
    },
    textWrapper: {
        marginVertical: 24
    },
    description: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.defaultGray,
        lineHeight: 21
    },
    subtitle: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 16,
        fontWeight: 'bold'
    },

    review: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.linkBlue,
        lineHeight: 21
    },
    readMore: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.secondaryGray,
        lineHeight: 21
    },
    button: {
        width: 118,
        height: 40
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    paddingButton: {
        paddingHorizontal: 20
    }
})
