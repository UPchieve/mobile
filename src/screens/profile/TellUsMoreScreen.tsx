import React from 'react';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {Separator} from "../../components/atoms/common/Separator";
import {H3} from "../../components/atoms/common/H3";
import {CommonTextArea} from "../../components/common/CommonTextArea";
import {Colors} from "../../../assets/Colors";
import {StyleSheet, Text} from "react-native";
import {FontIndex} from "../../../assets/FontIndex";
import {CommonButton} from "../../components/common/CommonButton";

interface formTypeValues {
    moreText: string
}

export const TellUsMoreScreen = () => {

    const countWords = (str: string | undefined) => {
        let matches = str?.match(/[\w\d\’\'-]+/gi);
        return matches ? matches.length > 4 : false;
    }

    const validationSchema = Yup.object().shape({
        moreText: Yup.string().required().test('len', 'You must write at least 5 words', (val) => countWords(val))
    });

    const formik = useFormik<formTypeValues>({
        initialValues: {moreText: ''} as formTypeValues,
        validateOnMount: true,
        validationSchema,
        onSubmit: async (values: formTypeValues) => {
        }
    });

    return(
        <KeyboardAwareScrollView style={{ paddingVertical: 60, paddingHorizontal: 20}}>
            <FormikProvider value={formik}>
                <Separator marginVertical={24} backgroundColor='transparent' />
                <H3>Tell us more</H3>
                <Separator marginVertical={8} backgroundColor='transparent' />
                <Text style={styles.additionalText}>To initiate the account deletion process, </Text>
                <Text style={styles.additionalText}>please tell us more about why you've </Text>
                <Text style={styles.additionalText}>decided to delete your account. </Text>
                <Separator marginVertical={24} backgroundColor='transparent' />
                <CommonTextArea borderColorSelected={Colors.information}
                                placeholder={'Why do you want to delete your account?. (min 5 words)'}
                                onChangeText={formik.handleChange('moreText')}
                                value={formik.values.moreText}/>
                <Separator marginVertical={24} backgroundColor='transparent' />
                <CommonButton title={'Submit request'} onPress={() => formik.handleSubmit()} type={'information'}  disabled={!formik.isValid} />
            </FormikProvider>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    additionalText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.secondaryGray,
    }
})
