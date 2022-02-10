import React from 'react';
import {SafeAreaView, TouchableOpacity, Text, View, StyleSheet} from "react-native";
import {Colors} from "../../../assets/Colors";
import {FontIndex} from "../../../assets/FontIndex";

export const SettingsScreen = () => {
    return (
        <SafeAreaView>
            <View style={{marginHorizontal: 24}}>
                <TouchableOpacity>
                    <Text style={styles.settingsText}>Reset Password</Text>
                </TouchableOpacity>
            </View>
                <View style={{ height: 1, backgroundColor: Colors.borderGray, marginTop: 10, marginBottom: 16 }} />
            <View style={{marginHorizontal: 24}}>
                <TouchableOpacity>
                    <Text style={styles.settingsText}>Delete Account</Text>
                </TouchableOpacity>
            </View>
                <View style={{ height: 1, backgroundColor: Colors.borderGray, marginTop: 10, marginBottom: 16 }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    settingsText: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.secondaryGray,
    }
})
