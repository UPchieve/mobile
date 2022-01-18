import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { H3 } from '../../../components/atoms/common/H3';
import { Input } from '../../../components/atoms/common/Input';
import { Separator } from '../../../components/atoms/common/Separator';
import { HelperText } from '../../../components/atoms/onboarding/HelperText';
export const LoginScreen: React.FC = () => {
    return <View style={styles.container}>
        <H3>Welcome Back!</H3>
        <HelperText mt={8} mb={25}>Sign in to your account.</HelperText>
        <Input
            placeholder='Email'
        />
        <Separator backgroundColor='transparent' marginVertical={8} />
        <Input
            placeholder='Password'
            password
        />
        <Text>Forgot your password</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

});