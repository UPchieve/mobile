import React, {useRef} from "react";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {FormikProvider, useFormik} from "formik";
import {H3} from "../../components/atoms/common/H3";
import * as Yup from "yup";
import {Separator} from "../../components/atoms/common/Separator";
import {CommonInput} from "../../components/common/CommonInput";
import {Colors} from "../../../assets/Colors";
import {CommonButton} from "../../components/common/CommonButton";
import {FormikPicker} from "../../components/atoms/common/Formik/FormikPicker";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MainStackParamList} from "../../routes/MainStackNavigator";
import {OnboardingStackParamList} from "../../routes/OnboardingStackNavigator";

interface formTypeValues {
    reason: string,
    moreText: string
}

const options = ['General question', 'General feedback', 'Technical issue', 'Feature request', 'Subject suggestion', 'Other'];

type contactUsScreenType = NativeStackScreenProps<OnboardingStackParamList, 'ContactUs'>;
export const ContactUsScreen: React.FC<contactUsScreenType> = ({navigation}) => {

    const countWords = (str: string | undefined) => {
        let matches = str?.match(/[\w\d\’\'-]+/gi);
        return matches ? matches.length > 4 : false;
    }

    const validationSchema = Yup.object().shape({
        reason: Yup.string().required(),
        moreText: Yup.string().required().test('len', 'You must write at least 5 words', (val) => countWords(val))
    });

    const formik = useFormik<formTypeValues>({
        initialValues: {moreText: ''} as formTypeValues,
        validateOnMount: true,
        validationSchema,
        onSubmit: async (values: formTypeValues) => {
            navigation.navigate('MessageSent')
        }
    });



    return (
        <KeyboardAwareScrollView style={{ paddingVertical: 60, paddingHorizontal: 20}}>
            <FormikProvider value={formik}>
                <H3>Contact Us</H3>
                <Separator marginVertical={24} backgroundColor='transparent' />
                <FormikPicker title='What is your reason?'
                              placeholder='What is your reason?'
                              name='reason'
                              options={options}
                              initialColor={Colors.information}/>
                <Separator marginVertical={24} backgroundColor='transparent' />
                <CommonInput borderColorSelected={Colors.information}
                             placeholder={'Tell us more. (min 5 words)'}
                             onChangeText={formik.handleChange('moreText')}
                              value={formik.values.moreText}/>
                <Separator marginVertical={24} backgroundColor='transparent' />
                <CommonButton title={'Send'} onPress={() => formik.handleSubmit()} type={'information'}  disabled={!formik.isValid} />
            </FormikProvider>
        </KeyboardAwareScrollView>
    )
}
