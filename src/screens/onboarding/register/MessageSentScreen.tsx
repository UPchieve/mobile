import React from "react";
import {Image, Text, View} from "react-native";
import {H3} from "../../../components/atoms/common/H3";
import {ImageIndex} from "../../../../assets/ImageIndex";
import {CommonButton} from "../../../components/common/CommonButton";
import {FontIndex} from "../../../../assets/FontIndex";
import {Separator} from "../../../components/atoms/common/Separator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ContactUsParamList } from "../../../routes/ContactUsStackNavigator";

type MessageSentScreenType = NativeStackScreenProps<ContactUsParamList, 'MessageSent'>;
export const MessageSentScreen: React.FC<MessageSentScreenType> = ({route, navigation}) => {

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 150,
        }}>
            <H3>Your message has </H3>
                <H3> been sent!</H3>
            <Separator marginVertical={8} backgroundColor='transparent' />
            <View style={{marginHorizontal: 20}}>
                <Text style={{ fontSize: 16, fontFamily: FontIndex.WorkSans.Regular, textAlign: 'center' }}>
                    We will usually respond in about 1-3 business days. Make sure to check your email!</Text>
            </View>
            <Image source={ImageIndex.onboarding.messageSent} style={{
                marginVertical: 60,
                marginBottom: 20,
            }}/>
            <CommonButton
                title='Continue'
                type='information'
                onPress={() => {
                    //@ts-ignore
                    navigation.navigate(route.params?.nextRoute);
                }}
                style={{width: '80%', height: 48}}
            />
        </View>
    )
}
