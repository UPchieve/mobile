import React from 'react';
import { View, StyleSheet } from 'react-native';
interface SeparatorType {
    backgroundColor?: string,
}
export const Separator: React.FC<SeparatorType> = ({ backgroundColor = 'black' }) => {
    return <View style={[styles.line, { backgroundColor }]} />
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
    }
});