import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaskedTextInput } from 'react-native-mask-text';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { H3 } from '../../../components/atoms/common/H3';
import { Input } from '../../../components/atoms/common/Input';
import { PhoneInput } from '../../../components/atoms/common/PhoneInput';
import { Separator } from '../../../components/atoms/common/Separator';
import { HelperText } from '../../../components/atoms/onboarding/HelperText';
import { CommonButton } from '../../../components/common/CommonButton';
import { Stepper } from '../../../components/molecules/onboarding/Stepper';
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator';
import * as Yup from 'yup';
import { authService } from '../../../services/authService';
import { VerificationMethod } from '../../../types/services/authServiceTypes';
import { getErrorFromBackendResponse } from '../../../utils/utils';

interface formValueType {
    code: string,
}
const validationSchema = Yup.object().shape({
    code: Yup.string().matches(/^\+\d{10,14}$/),
});
type VerifyAccountScreenType = NativeStackScreenProps<OnboardingStackParamList, 'VerifyAccount'>;
export const VerifyAccountStep1Screen: React.FC<VerifyAccountScreenType> = ({ route, navigation }) => {
    const { firstName, email, userId } = route.params;
    const inputRef = useRef<TextInput>(null);
    const formik = useFormik<formValueType>({
        initialValues: {
            validationType: 'sms',
            code: ''
        } as formValueType,
        validationSchema,
        onSubmit: async ({ code }, { setSubmitting }) => {
            try {
                //TODO check how is the expected number format for the request.
                await sendVerification(code, 'sms');
            } catch (error) {
                const err = getErrorFromBackendResponse(error);
                alert(err);
            }
            finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        inputRef.current?.focus();
    }, [inputRef]);

    const sendVerification = async (sendTo: string, type: VerificationMethod) => {
        await authService.createAccountSendValidation({
            _id: userId,
            firstName,
            sendTo,
            verificationMethod: type,
        });
        navigation.navigate('VerifyAccountStep2', {
            verificationType: type,
            firstName,
            userId,
            sendTo
        });
    }

    const onEmailVerifyPress = async () => {
        await sendVerification(email, 'email');
    }

    return <View style={{ padding: 20, }}>
        <FormikProvider value={formik}>
            <H3>Verify your email or phone</H3>
            <View style={{ marginTop: 16, marginBottom: 24, }}>
                <Stepper data={[
                    { stepNumber: 1, stepState: 'completed' },
                    { stepNumber: 2, stepState: 'active' }
                ]}
                />
            </View>
            <HelperText mb={29}>Confirm you’re not a robot by verifying your account. Please select how you would like to receive your verification code.</HelperText>
            <PhoneInput onChangeText={(_, rawText) => formik.handleChange('code')(rawText)} ref={inputRef} />
            <View style={styles.bottomTextWrapper}>
                <Text style={styles.bottomText}>or  </Text>
                <TouchableOpacity onPress={onEmailVerifyPress}>
                    <Text style={[styles.bottomText, { color: Colors.information }]}>verify with your email.</Text>
                </TouchableOpacity>
            </View>
            <CommonButton
                title='Continue'
                type='information'
                disabled={formik.isSubmitting || !formik.isValid}
                loading={formik.isSubmitting}
                onPress={formik.handleSubmit}
                style={{ height: 48, }}
            />

        </FormikProvider>
    </View>;
};

const styles = StyleSheet.create({
    bottomTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        marginTop: 16,
        marginBottom: 25,
        textAlign: 'center',
    }
});
