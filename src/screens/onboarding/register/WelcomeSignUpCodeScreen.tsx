import React from "react";
import { Dimensions, Image, ImageBackground, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageIndex } from "../../../../assets/ImageIndex";
import { CommonButton } from "../../../components/common/CommonButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { config } from "../../../../config";
import { FontIndex } from "../../../../assets/FontIndex";
import { Colors } from "../../../../assets/Colors";
import { Separator } from "../../../components/atoms/common/Separator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OnboardingStackParamList } from "../../../routes/OnboardingStackNavigator";

type WelcomeSignUpCodeType = NativeStackScreenProps<OnboardingStackParamList, 'WelcomeSignUpCode'>;
export const WelcomeSignUpCodeScreen: React.FC<WelcomeSignUpCodeType> = ({ navigation, route }) => {

    const { studentPartnerManifest } = route.params;

    return (
        <SafeAreaView>
            <ImageBackground source={ImageIndex.onboarding.confetti} style={styles.wrapper}>
                <View style={{ paddingHorizontal: 22, alignItems: 'center' }}>
                    <Text style={styles.title}>Welcome {studentPartnerManifest?.name || '_____________'} {'\n'} Student!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.notWithText}>Not with {studentPartnerManifest?.name || '_____'} ?</Text>
                    </TouchableOpacity>
                    <Image style={{width: 213, resizeMode: 'contain',
                        height: '60%',}}
                        source={ImageIndex.onboarding.eligible} />
                </View>
            </ImageBackground>
            <Separator marginVertical={20} backgroundColor={'transparent'} />
            <View style={{ paddingHorizontal: 20}}>
                <CommonButton
                    title="Continue"
                    type="information"
                    style={{ height: 48, }}
                    onPress={() => navigation.navigate('RegisterSignUpCodeStep1', {
                        studentPartnerManifest,
                    })}
                />
                <Separator marginVertical={8} backgroundColor={'transparent'} />
                <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(`${config.marketingUrl}/students`)}>
                    <Text style={styles.buttonText}>What is UPchieve?</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: (Dimensions.get('screen').height / 2) - 10,
        paddingTop: 85,
        alignItems: 'center',
        marginBottom: 75,
    },
    wrapperNotEligible: {
        height: undefined,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 9
    },
    notWithText: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 14,
        color: Colors.information,
        paddingBottom: 54
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 0.2,
        borderColor: Colors.defaultGray,
        borderRadius: 30,
        justifyContent: 'center',
        height: 48,
    },
    buttonText: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 16,
        color: Colors.linkBlue,
        textAlign: 'center',
    },
});
