import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
type H3Type = {
    color?: string,
    fontFamily?: string,
}
export const H3: React.FC<H3Type> = ({ children, color = Colors.black, fontFamily = FontIndex.WorkSans.Regular }) => {
    return <View style={styles.container}>
        <Text style={[styles.text, { color, fontFamily}]}>{children}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
    },
    text: {
        fontWeight: '500',
        fontSize: 22,
    }
})