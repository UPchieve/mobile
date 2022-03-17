import React from 'react'
import { StyleSheet, Text } from "react-native"
import { FontIndex } from '../../../../assets/FontIndex'

type HelperTextType = {
    mt?: number;
    mb?: number;
    bold?: boolean;
    color?: string;
    textAlign?: "auto" | "left" | "right" | "center" | "justify";
}

export const HelperText: React.FC<HelperTextType> = ({ children, mt, mb, bold = false, color = 'black', textAlign }) => {
    return <Text style={[styles.text,
    textAlign && { textAlign: 'center' },
    {
        marginTop: mt, marginBottom: mb
        , color
        , fontFamily: bold ? FontIndex.WorkSans.Medium : FontIndex.WorkSans.Regular
    }]}>{children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        lineHeight: 21
    }
});
