import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { FormikInput } from '../../../components/atoms/common/Formik/FormikInput';
import { H3 } from '../../../components/atoms/common/H3';
import { HelperText } from '../../../components/atoms/onboarding/HelperText';
import { CommonButton } from '../../../components/common/CommonButton';
import * as Yup from 'yup';

type formikValueType = {
    email: string,
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});


export const WrongEmailScreen = () => {
    const formik = useFormik<formikValueType>({
        initialValues: { email: '' },
        validationSchema,
        validateOnMount: true,
        onSubmit: (values, { setSubmitting }) => {
            //TODO Check the endpoint to send this message.
            setSubmitting(false);
        }
    }
    );
    return <View style={{
        paddingTop: 23,
        paddingHorizontal: 20,
    }}>
        <FormikProvider value={formik}>
            <H3>What is your correct email?</H3>
            <HelperText mt={8} mb={24}>Once you enter your correct email, we will update your account and send you a new verification email.</HelperText>
            <FormikInput
                name='email'
                placeholder='Enter correct email'
            />
            <View style={{ marginTop: 32, }}>
                <CommonButton
                    title='Send'
                    type='information'
                    loading={formik.isSubmitting}
                    disabled={formik.isSubmitting || !formik.isValid}
                    onPress={formik.handleSubmit}
                />
            </View>
        </FormikProvider>
    </View>
};
