import React, { useRef, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormikProvider, useFormik } from "formik";
import { H3 } from "../../components/atoms/common/H3";
import * as Yup from "yup";
import { Separator } from "../../components/atoms/common/Separator";
import { CommonTextArea } from "../../components/common/CommonTextArea";
import { Colors } from "../../../assets/Colors";
import { CommonButton } from "../../components/common/CommonButton";
import { FormikPicker } from "../../components/atoms/common/Formik/FormikPicker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../routes/MainStackNavigator";
import { OnboardingStackParamList } from "../../routes/OnboardingStackNavigator";
import {View, Image, TouchableOpacity, Dimensions} from "react-native";
import { ImageIndex } from "../../../assets/ImageIndex";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { DrawerParamList } from "../../routes/DrawerNavigator";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContactUsParamList } from "../../routes/ContactUsStackNavigator";

interface formTypeValues {
    reason: string,
    moreText: string
}

const options = ['General question', 'General feedback', 'Technical issue', 'Feature request', 'Subject suggestion', 'Other'];

type contactUsScreenType = NativeStackScreenProps<OnboardingStackParamList | ContactUsParamList>;
export const ContactUsScreen: React.FC<contactUsScreenType> = ({ navigation, route }) => {
    const countWords = (str: string | undefined) => {
        let matches = str?.match(/[\w\d\’\'-]+/gi);
        return matches ? matches.length > 4 : false;
    }

    const validationSchema = Yup.object().shape({
        reason: Yup.string().required(),
        moreText: Yup.string().required().test('len', 'You must write at least 5 words', (val) => countWords(val))
    });

    const formik = useFormik<formTypeValues>({
        initialValues: { moreText: '' } as formTypeValues,
        validateOnMount: true,
        validationSchema,
        onSubmit: async (values: formTypeValues) => {
            //TODO add logic to send.
            navigation.navigate('MessageSent', {nextRoute: route.name === 'DrawerContactUs' ? 'Dashboard' : ''})
            // navigation.navigate('MessageSent', { buttonAction: () => {
            //     if(route.name === 'DrawerContactUs')
            // }})
        }
    });

    return (
        <View style={{backgroundColor: 'white', height: Dimensions.get('window').height}}>
            <KeyboardAwareScrollView style={{ paddingHorizontal: 20, paddingTop: 24}}>
                <FormikProvider value={formik}>
                    {/* <TouchableOpacity onPress={() => navigation.canGoBack() && navigation.goBack()}>
                    <Image
                        style={{width: 20, height: 20}}
                        source={ImageIndex.icons.goBack}/>
                </TouchableOpacity> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <H3>Contact Us</H3>
                        {route.name === 'DrawerContactUs' ? <TouchableOpacity
                            onPress={() => (navigation.getParent() as any)?.openDrawer()}>
                            <Image source={ImageIndex.dashboard.openMenuButton} style={{ width: 28, height: 28, }} />
                        </TouchableOpacity> : null}
                    </View>
                    <Separator marginVertical={24} backgroundColor='transparent' />

                    <FormikPicker title='What is your reason?'
                        placeholder='What is your reason?'
                        name='reason'
                        options={options}
                        initialColor={Colors.information} />
                    <Separator marginVertical={24} backgroundColor='transparent' />
                    <CommonTextArea borderColorSelected={Colors.information}
                        placeholder={'Tell us more. (min 5 words)'}
                        onChangeText={formik.handleChange('moreText')}
                        value={formik.values.moreText} />
                    <Separator marginVertical={24} backgroundColor='transparent' />
                    <CommonButton title={'Send'} onPress={formik.handleSubmit} type={'information'} disabled={!formik.isValid} />
                </FormikProvider>
            </KeyboardAwareScrollView>
        </View >
    )
}
