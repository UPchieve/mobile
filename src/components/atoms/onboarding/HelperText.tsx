import React from 'react'
import { StyleSheet, Text } from "react-native"
import { FontIndex } from '../../../../assets/FontIndex'

type HelperTextType = {
    mt?: number;
    mb?: number;
    bold?: boolean;
}

export const HelperText: React.FC<HelperTextType> = ({ children, mt, mb, bold = false }) => {
    return <Text style={[styles.text, { marginTop: mt, marginBottom: mb
        , fontFamily: bold ? FontIndex.WorkSans.Medium : FontIndex.WorkSans.Regular }]}>{children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
    }
});