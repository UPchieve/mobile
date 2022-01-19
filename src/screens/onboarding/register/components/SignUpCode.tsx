import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { FormikInput } from '../../../../components/atoms/common/Formik/FormikInput'
import { H3 } from '../../../../components/atoms/common/H3'
import { CommonButton } from '../../../../components/common/CommonButton'

type formValueType = { code: string }
export const SignUpCode: React.FC = () => {
    const formik = useFormik<formValueType>({
        initialValues: {} as formValueType,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: () => {

        }
    });
    return <FormikProvider value={formik}>
        <H3>Enter your sign up code</H3>
        <View style={{ marginVertical: 20, }}>
            <FormikInput name="code" placeholder="Sign up Code" />
        </View>
        <CommonButton title='Sign Up'
            style={{ height: 48, }}
            type="information"
            onPress={() => { }} />
    </FormikProvider>
}