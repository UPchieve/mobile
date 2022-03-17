import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, PrimaryColorType } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';

export type DashboardMessageType = {
    message: string,
    type?: PrimaryColorType,
    fixedWidth?: number
}

export const DashboardMessage: React.FC<DashboardMessageType> = ({ message, type = 'success', fixedWidth = '100%' }) => {
    return <View style={[styles.container, { backgroundColor: Colors[type], width: fixedWidth }]}>
        <Text style={styles.text}>{message}</Text>
    </View >
}

const styles = StyleSheet.create({
    container: {
        minHeight: 87,
        width: '100%',
        paddingVertical: 13,
        paddingHorizontal: 14.6,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    text: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        color: Colors.white,
        textAlign: 'justify'
    }
})