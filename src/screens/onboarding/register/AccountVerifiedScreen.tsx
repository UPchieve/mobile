import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useContext } from 'react';
import { Image, View } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { ImageIndex } from '../../../../assets/ImageIndex';
import { SvgIcons } from '../../../../assets/IndexIcons';
import { H3 } from '../../../components/atoms/common/H3';
import { HelperText } from '../../../components/atoms/onboarding/HelperText';
import { CommonButton } from '../../../components/common/CommonButton';
import { AuthContext } from '../../../providers/AuthProvider';
import { OnboardingStackParamList } from '../../../routes/OnboardingStackNavigator';

type AccountVerifiedScreenType = NativeStackScreenProps<OnboardingStackParamList, 'AccountVerified'>;
export const AccountVerifiedScreen: React.FC<AccountVerifiedScreenType> = ({ navigation }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const { refreshUser } = useContext(AuthContext);

    return <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: 45, }}>
        <View>
            <Image
                source={ImageIndex.onboarding.accountVerified}
                style={{
                    width: '100%',
                    resizeMode: 'stretch',
                }}
            />
            <View style={{
                paddingHorizontal: 25,
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <H3>Welcome to UPchieve!</H3>
                <HelperText color={Colors.secondaryGray} mt={22}>
                    You’re almost ready to get started!
                </HelperText>
                <HelperText color={Colors.secondaryGray}>
                    We just need to lay down some ground rules.
                </HelperText>
            </View>
        </View>
        <View style={{ padding: 25, }}>
            <CommonButton
                type='information'
                title='Get Started'
                loading={loading}
                onPress={() => {
                    navigation.navigate('Rules');
                }}
                SvgIcon={SvgIcons.GoArrow}
            />
        </View>
    </View>
};
