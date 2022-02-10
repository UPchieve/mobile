import React from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ImageIndex} from "../../../assets/ImageIndex";
import {H3} from "../../components/atoms/common/H3";
import {Separator} from "../../components/atoms/common/Separator";
import {Colors} from "../../../assets/Colors";
import {HelperText} from "../../components/atoms/onboarding/HelperText";
import {FontIndex} from "../../../assets/FontIndex";
import {BaseButton} from "react-native-gesture-handler";
import {CommonButton} from "../../components/common/CommonButton";

export const DeleteAccountScreen = () => {
    return (
        <View>
            <View style={{
                backgroundColor: Colors.backgroundGray
            }}>
                <View style={{marginTop: 150, alignItems: 'center'}}>
                    <H3>Are you sure you want to </H3>
                    <H3> delete your account?</H3>
                    <Separator marginVertical={24} backgroundColor='transparent' />
                    <Image
                           source={ImageIndex.dashboard.deleteAccount}/>
                </View>
            </View>
            <View>
                <Separator marginVertical={24} backgroundColor='transparent' />
                <Text style={{ fontSize: 16, fontFamily: FontIndex.WorkSans.Regular, textAlign: 'center', fontWeight: 'bold', lineHeight: 20 }}>
                    Deleting your account is permanent</Text>
                <Separator marginVertical={8} backgroundColor='transparent' />
                <Text style={styles.additionalText}>Once you delete your account, you </Text>
                <Text style={styles.additionalText}> won't be able to undo this action.</Text>
                <Separator marginVertical={25} backgroundColor='transparent' />
                <View style={{marginHorizontal: 20}}>
                    <CommonButton title={"Yes, I'm sure"} onPress={() => {}}/>
                    <Separator marginVertical={10} backgroundColor='transparent' />
                    <TouchableOpacity>
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
