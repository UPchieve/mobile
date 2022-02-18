import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';
import { Colors } from "../../../assets/Colors";
import { FontIndex } from "../../../assets/FontIndex";
import { ProfileParamList } from '../../routes/ProfileStackNavigator';

type SettingScreenType = NativeStackScreenProps<ProfileParamList, 'Settings'>
export const SettingsScreen: React.FC<SettingScreenType> = ({navigation}) => {
    return (
        <SafeAreaView>
            <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.settingsText}>Reset Password</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: Colors.borderGray, }} />
            <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ProfileDeleteAccount')}>
                <Text style={styles.settingsText}>Delete Account</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: Colors.borderGray, }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    settingsText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.secondaryGray,
    },
    itemContainer: {
        justifyContent: 'center',
        marginHorizontal: 24,
        height: 56
    }
})
