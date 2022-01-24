import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { H3 } from '../../../components/atoms/common/H3';
import { HelperText } from '../../../components/atoms/onboarding/HelperText';
import { Stepper } from '../../../components/molecules/onboarding/Stepper';
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator';

interface formValueType {
    code: string,
}

type VerifyAccountStep2ScreenType = NativeStackScreenProps<OnboardingStackParamList, 'VerifyAccountStep2'>;
export const VerifyAccountStep2Screen: React.FC<VerifyAccountStep2ScreenType> = ({ route }) => {
    const { verificationType, email } = route.params;
    const formik = useFormik({
        initialValues: {
            code: ''
        },
        onSubmit: (values, { setSubmitting }) => {

        }
    });

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
                <HelperText mb={6}>Your verification code was sent to {email}. Check your email.</HelperText>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.contactUsText}>Incorrect email? </Text>
                    <TouchableOpacity>
                        <Text style={[styles.contactUsText, {color: Colors.information}]}>Contact Us</Text>
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
                <HelperText mb={29}>Confirm you’re not a robot by verifying your account. Please select how you would like to receive your verification code.</HelperText>
            </>
        }
    }

    return <View style={{ padding: 20, }}>
        <FormikProvider value={formik}>
            {renderHeader()}
        </FormikProvider>
    </View>;
};

const styles = StyleSheet.create({
    contactUsText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
    }
});