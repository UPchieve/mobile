import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react'
import {Image, ImageBackgroundComponent, Linking, StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontIndex } from '../../../../assets/FontIndex';
import { ImageIndex } from '../../../../assets/ImageIndex';
import { Separator } from '../../../components/atoms/common/Separator';
import { CommonButton } from '../../../components/common/CommonButton';
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator';
import {config} from "../../../../config";

type EligibleResultScreenType = NativeStackScreenProps<OnboardingStackParamList, 'EligibleResult'>;
export const EligibleResultScreen: React.FC<EligibleResultScreenType> = ({ route, navigation }) => {
    const { eligible, grade, highSchoolId, zipCode, email } = route.params;

    const renderEligible = () => {
        return <><ImageBackground source={ImageIndex.onboarding.confetti} style={styles.wrapper}>
            <Text style={styles.title}>You’re Eligible!</Text>
            <Image style={{width: 193, height: 192}}
                source={ImageIndex.onboarding.eligible} />
            <Image style={{marginTop: 10}}
                source={ImageIndex.icons.check} />
        </ImageBackground>
        </>
    }

    const renderNotEligible = () => {
        return <View style={[styles.wrapper, styles.wrapperNotEligible]}>
            <Text style={styles.title}>Sorry, we can’t verify {'\n'} your eligibility yet.</Text>
            <Image source={ImageIndex.onboarding.notEligible} style={{ marginBottom: 30 }} />
            <Text style={{ fontSize: 16, fontFamily: FontIndex.WorkSans.Regular, textAlign: 'center' }}>
                <Text style={{ fontFamily: FontIndex.WorkSans.Bold }}>Don’t worry: you may still be eligible!{"\n"}</Text>
                We just need your parent/guardian to answer some more questions first!</Text>
        </View>
    }

    return (
        <SafeAreaView>
            {/* {eligible ? renderEligible() : null} */}
            {eligible ? renderEligible() : renderNotEligible()}
            <View style={{ paddingHorizontal: 20}}>
                <CommonButton
                    title="Continue"
                    type="information"
                    style={{ height: 48, }}
                    onPress={() => {
                        if(eligible){
                            navigation.navigate('CreateAccount', {
                                grade, highSchoolId, zipCode, email
                            });
                        } else {
                            Linking.openURL(`${config.baseUrl}/request-access`);
                        }
                     }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: (Dimensions.get('screen').height / 2) - 50,
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
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 68
    }
});
