import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FontIndex } from '../../../../assets/FontIndex';
interface SeparatorType {
    backgroundColor?: string,
    marginVertical?: number,
    text?: string,
}
export const Separator: React.FC<SeparatorType> = ({ backgroundColor = 'black', marginVertical = 0, text }) => {
    if (!text) {
        return <View style={[styles.line, { backgroundColor, marginVertical }]} />
    } else {
        return <View style={{ marginVertical, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
            <View style={[{ flex: 1, height: 1, backgroundColor, marginRight: 5 }]} />
            <Text style={[styles.text, { color: backgroundColor }]}>{text}</Text>
            <View style={[{ flex: 1, height: 1, backgroundColor, marginLeft: 5 }]} />
        </View>
    }
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
    },
    text: {
        fontFamily: FontIndex.WorkSans.Medium,
        fontSize: 14,
    }
});