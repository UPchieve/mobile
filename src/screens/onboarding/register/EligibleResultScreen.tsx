import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { Image, Linking, StyleSheet } from 'react-native';
import { ImageBackground, Text, View } from 'react-native';
import { FontIndex } from '../../../../assets/FontIndex';
import { ImageIndex } from '../../../../assets/ImageIndex';
import { CommonButton } from '../../../components/common/CommonButton';
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator';
import { config } from "../../../../config";

type EligibleResultScreenType = NativeStackScreenProps<OnboardingStackParamList, 'EligibleResult'>;
export const EligibleResultScreen: React.FC<EligibleResultScreenType> = ({ route, navigation }) => {
    const { eligible, grade, highSchoolId, zipCode, email } = route.params;

    const renderEligible = () => {
        return <><ImageBackground source={ImageIndex.onboarding.confetti} style={[styles.wrapper, {paddingTop: 85}]}>
            <Text style={styles.title}>You’re Eligible!</Text>
            <Image style={{ width: 193, height: 192 }}
                source={ImageIndex.onboarding.eligible} />
        </ImageBackground>
            <Image style={{ marginTop: 15, width: 44, height: 44, alignSelf: 'center'}}
                source={ImageIndex.icons.check} />
        </>
    }

    const renderNotEligible = () => {
        return <View style={[styles.wrapper, styles.wrapperNotEligible]}>
            <Text style={styles.title}>Sorry, we can’t verify {'\n'} your eligibility yet.</Text>
            <Image source={ImageIndex.onboarding.notEligible} style={{ marginBottom: 30, resizeMode: 'contain',
                height: '40%',
                width: 312 }} />
            <Text style={{ fontSize: 16, fontFamily: FontIndex.WorkSans.Regular, textAlign: 'center' }}>
                <Text style={{ fontFamily: FontIndex.WorkSans.Bold }}>Don’t worry: you may still be eligible!{"\n"}</Text>
                We just need your parent/guardian to answer some more questions first!</Text>
        </View>
    }

    return (
        <View>
            {/* {eligible ? renderEligible() : null} */}
            {eligible ? renderEligible() : renderNotEligible()}
            <View style={{ paddingHorizontal: 20 }}>
                <CommonButton
                    title="Continue"
                    type="information"
                    style={{ height: 48, marginTop: 17, }}
                    onPress={() => {
                        if (eligible) {
                            navigation.navigate('CreateAccount', {
                                grade, highSchoolId, zipCode, email
                            });
                        } else {
                            Linking.openURL(`${config.baseUrl}/request-access`);
                        }
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        // height: (Dimensions.get('screen').height / 2) - 50,
        height: 462,
        alignItems: 'center',
        justifyContent: 'flex-end'
        // marginBottom: 70,
    },
    wrapperNotEligible: {
        height: undefined,
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 68
    }
});
