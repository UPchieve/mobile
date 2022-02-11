import React from 'react';
import { Image, Text, View } from "react-native";
import { H3 } from "../../components/atoms/common/H3";
import { Separator } from "../../components/atoms/common/Separator";
import { FontIndex } from "../../../assets/FontIndex";
import { ImageIndex } from "../../../assets/ImageIndex";
import { CommonButton } from "../../components/common/CommonButton";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileParamList } from '../../routes/ProfileStackNavigator';

type RequestDeleteAccountScreenType = NativeStackScreenProps<ProfileParamList, 'ProfileDeleteReceived'>
export const RequestDeleteAccountScreen: React.FC<RequestDeleteAccountScreenType> = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 150,
            marginHorizontal: 20
        }}>
            <H3>We've received your </H3>
            <H3> request!</H3>
            <Separator marginVertical={8} backgroundColor='transparent' />
            <Text style={{ fontSize: 16, fontFamily: FontIndex.WorkSans.Regular, textAlign: 'center' }}>
                We will usually respond in about 1-3 business days. Make sure to check your email!</Text>
            <Image source={ImageIndex.onboarding.messageSent} style={{
                marginVertical: 60,
                marginBottom: 39,
                alignItems: 'center'
            }} />
            <CommonButton
                title='Back to Profile'
                type='information'
                onPress={() => navigation.reset({
                    routes: [{ name: 'ProfileIndex' }]
                })}
                style={{ width: '80%', height: 48 }}
            />
        </View>
    )
}
