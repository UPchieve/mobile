import React from 'react'
import { StyleSheet, Text } from "react-native"
import { FontIndex } from '../../../../assets/FontIndex'

type HelperTextType = {
    children: string;
    mt?: number;
    mb?: number;
}

export const HelperText: React.FC<HelperTextType> = ({ children, mt, mb }) => {
    return <Text style={[styles.text, { marginTop: mt, marginBottom: mb }]}>{children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 14,
        fontWeight: '400',
    }
});