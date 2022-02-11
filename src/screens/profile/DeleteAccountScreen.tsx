import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageIndex } from "../../../assets/ImageIndex";
import { H3 } from "../../components/atoms/common/H3";
import { Separator } from "../../components/atoms/common/Separator";
import { Colors } from "../../../assets/Colors";
import { FontIndex } from "../../../assets/FontIndex";
import { CommonButton } from "../../components/common/CommonButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileParamList } from "../../routes/ProfileStackNavigator";
import { useLayout } from "@react-native-community/hooks";

type DeleteAccountScreenType = NativeStackScreenProps<ProfileParamList, 'ProfileDeleteAccount'>
export const DeleteAccountScreen: React.FC<DeleteAccountScreenType> = ({ navigation }) => {
    const { onLayout, ...layout } = useLayout();
    return (
        <View style={{
            backgroundColor: Colors.backgroundGray,
            flex: 1,
        }}>
            <View onLayout={onLayout} style={{
                // backgroundColor: Colors.backgroundGray,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
            }}>
                <View style={{ marginTop: 32, alignItems: 'center' }}>
                    <H3>Are you sure you want to </H3>
                    <H3> delete your account?</H3>
                    <Separator marginVertical={24} backgroundColor='transparent' />
                    <Image
                        source={ImageIndex.dashboard.deleteAccount}
                    />
                </View>
            </View>
            <View style={{
                backgroundColor: Colors.white,
                marginTop: layout.height - 20,
                flex: 1,
            }}>
                <Separator marginVertical={24} backgroundColor='transparent' />
                <Text style={{ fontSize: 16, fontFamily: FontIndex.WorkSans.Regular, textAlign: 'center', fontWeight: 'bold', lineHeight: 20 }}>
                    Deleting your account is permanent</Text>
                <Separator marginVertical={8} backgroundColor='transparent' />
                <Text style={styles.additionalText}>Once you delete your account, you </Text>
                <Text style={styles.additionalText}> won't be able to undo this action.</Text>
                <Separator marginVertical={25} backgroundColor='transparent' />
                <View style={{ marginHorizontal: 20 }}>
                    <CommonButton title={"Yes, I'm sure"} onPress={() => navigation.navigate('ProfileTellUsMore')} />
                    <Separator marginVertical={10} backgroundColor='transparent' />
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[styles.additionalText, { color: Colors.information }]}>Nevermind</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    additionalText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.secondaryGray,
        textAlign: 'center'
    }
})
