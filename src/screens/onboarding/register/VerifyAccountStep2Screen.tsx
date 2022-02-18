import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormikProvider, useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { H3 } from '../../../components/atoms/common/H3';
import { Input } from '../../../components/atoms/common/Input';
import { authService } from '../../../services/authService';
import { HelperText } from '../../../components/atoms/onboarding/HelperText';
import { CommonButton } from '../../../components/common/CommonButton';
import { Stepper } from '../../../components/molecules/onboarding/Stepper';
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator';
import * as Yup from 'yup';
import { MaskedText } from 'react-native-mask-text';
import { getErrorFromBackendResponse } from '../../../utils/utils';

interface formValueType {
    code: string,
}

type VerifyAccountStep2ScreenType = NativeStackScreenProps<OnboardingStackParamList, 'VerifyAccountStep2'>;
const validationSchema = Yup.object().shape({
    code: Yup.string().required().length(6),
    //TODO missing password length definition.
});
export const VerifyAccountStep2Screen: React.FC<VerifyAccountStep2ScreenType> = ({ route, navigation }) => {
    const { verificationType, sendTo, userId, firstName } = route.params;
    const countdownRef = useRef<Countdown>(null);
    const [countdownKey, setCountdownKey] = useState(0);


    const formik = useFormik<formValueType>({
        initialValues: {
            code: ''
        },
        validationSchema,
        validateOnMount: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log('handling');

                const result = await authService.createAccountVerifyValidation({
                    verificationMethod: verificationType,
                    sendTo,
                    userId: userId,
                    verificationCode: values.code
                });
                if (result) {
                    navigation.navigate('AccountVerified');
                } else {
                    alert('Incorrect verification code.');
                }
            } catch (error: any) {
                const err = getErrorFromBackendResponse(error);
                alert(err);
            } finally {
                setSubmitting(false);
            }
        }
    });


    const onResendCode = async () => {
        await authService.createAccountSendValidation({
            _id: userId,
            firstName,
            sendTo,
            verificationMethod: verificationType,
        });
        setCountdownKey(s => s + 1);
    }

    const renderInput = () => {
        return <Input
            autoFocus={verificationType === 'sms'}
            maxLength={6}
            value={formik.values.code}
            onChangeText={formik.handleChange('code')}
            placeholder="Verification Code"
            keyboardType='number-pad'
        />
    }

    const renderTimer = () => {
        return <Countdown ref={countdownRef}
            date={Date.now() + 59000}
            autoStart
            key={countdownKey}
            renderer={({ completed, minutes, seconds }) => {
                if (!completed) {
                    if (verificationType === 'email')
                        return <Text>Didn’t receive an email? {minutes}:{seconds}</Text>
                    return <Text>Didn’t receive a code? {minutes}:{seconds}</Text>
                } else {
                    return <View style={{ flexDirection: 'row' }}>
                        {verificationType === 'email'
                            ?
                            <><Text style={styles.contactUsText}>Didn’t receive an email? </Text>
                                <TouchableOpacity onPress={onResendCode}>
                                    <Text style={[styles.contactUsText, { color: Colors.information }]}>Resend</Text>
                                </TouchableOpacity>
                            </>
                            : <>
                                <Text style={styles.contactUsText}>Didn’t receive a code? </Text>
                                <TouchableOpacity onPress={onResendCode}>
                                    <Text style={[styles.contactUsText, { color: Colors.information }]}>Resend Code</Text>
                                </TouchableOpacity>
                            </>
                        }
                    </View>
                }
            }} />
    }

    const renderTimeMemo = useMemo(() => renderTimer(), [countdownKey]);

    const renderHeader = () => {
        if (verificationType === 'email') {
            return <><H3>Verification Code sent!</H3>
                <View style={{ marginTop: 16, marginBottom: 24, }}>
                    <Stepper data={[
                        { stepNumber: 1, stepState: 'completed' },
                        { stepNumber: 2, stepState: 'active' }
                    ]}
                    />
                </View>
                <HelperText mb={6}>Your verification code was sent to {sendTo}. Check your email.</HelperText>
                <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                    <TouchableOpacity onPress={() => navigation.navigate('WrongEmail')}>
                        <Text style={styles.contactUsText}>Incorrect email? </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ContactUs', {screen: 'VerifyAccountStep2'})}>
                        <Text style={[styles.contactUsText, { color: Colors.information }]}>Contact Us</Text>
                    </TouchableOpacity>
                </View>
            </>
        } else {
            return <><H3>Enter Code</H3>
                <View style={{ marginTop: 16, marginBottom: 24, }}>
                    <Stepper data={[
                        { stepNumber: 1, stepState: 'completed' },
                        { stepNumber: 2, stepState: 'active' }
                    ]}
                    />
                </View>
                <HelperText mb={29}>Please enter the 6- digit verification code we sent to (+1) <MaskedText mask='999-999-999'>{sendTo}</MaskedText></HelperText>
            </>
        }
    }

    return <View style={{ padding: 20, }}>
        <FormikProvider value={formik}>
            {renderHeader()}
            {renderInput()}
            <View style={{ marginTop: 25, alignItems: 'center' }}>
                {renderTimeMemo}
            </View>
            <CommonButton title="Verify!" type='information'
                onPress={formik.handleSubmit} style={{ marginTop: 28, }}
                disabled={formik.isSubmitting || !formik.isValid}
                loading={formik.isSubmitting}
            />
        </FormikProvider>
    </View>;
};

const styles = StyleSheet.create({
    contactUsText: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 14,
    }
});
