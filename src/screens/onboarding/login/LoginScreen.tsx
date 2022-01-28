import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { H3 } from '../../../components/atoms/common/H3';
import { Separator } from '../../../components/atoms/common/Separator';
import { HelperText } from '../../../components/atoms/onboarding/HelperText';
import { CommonButton } from '../../../components/common/CommonButton';
import { authService } from '../../../services/authService';
import * as Yup from 'yup';
import { FormikInput } from '../../../components/atoms/common/Formik/FormikInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator';
interface loginValues {
    email: string,
    password: string,
}
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

type LoginScreenType = NativeStackScreenProps<OnboardingStackParamList, 'Login'>;
export const LoginScreen: React.FC<LoginScreenType> = ({ navigation }) => {
    const formik = useFormik<loginValues>({
        initialValues: {
            email: 'volunteer@nnnp.com',
            password: 'Demovolunteerpassword!'
        } as loginValues,
        validationSchema,
        validateOnMount: true,
        onSubmit: async (values: loginValues) => {
            try {
                const loginResponse = await authService.login(values.email, values.password);
                alert('login success.');
            } catch (error) {
                console.log(error);
                alert('Wrong credentials.');
            }
        }
    });


    return <FormikProvider value={formik}>
        <View style={styles.container}>
            <H3>Welcome Back!</H3>
            <HelperText mt={8} mb={25}>Sign in to your account.</HelperText>
            <FormikInput name="email" placeholder="Email" isValid={undefined} />
            <Separator backgroundColor='transparent' marginVertical={8} />
            <FormikInput
                name="password"
                placeholder='Password'
                password
                isValid={undefined}
            />
            <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end', marginTop: 8, }} onPress={() => navigation.navigate('ResetPasswordStep1')}>
                <Text style={styles.forgotYourPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
                <CommonButton title='Continue' type='information'
                    disabled={!formik.isValid || formik.isSubmitting}
                    onPress={formik.handleSubmit} />
            </View>
            <View style={{ marginVertical: 16, alignItems: 'center' }}>
                <Text style={styles.dontHaveAccountText}>Dont have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.dontHaveAccountText, { color: Colors.information }]}>See if you are eligible</Text>
                </TouchableOpacity>
            </View>
        </View>
    </FormikProvider>
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // backgroundColor: Colors.white,
    },
    forgotYourPasswordText: {
        fontFamily: FontIndex.WorkSans.Regular,
        color: Colors.information,
        fontSize: 14,
    },
    buttonWrapper: {
        marginTop: 23,
    },
    dontHaveAccountText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        marginTop: 2,
    }
});
