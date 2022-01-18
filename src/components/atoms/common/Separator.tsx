import React from 'react';
import { View, StyleSheet } from 'react-native';
interface SeparatorType {
    backgroundColor?: string,
    marginVertical?: number,
}
export const Separator: React.FC<SeparatorType> = ({ backgroundColor = 'black', marginVertical = 0,  }) => {
    return <View style={[styles.line, { backgroundColor, marginVertical }]} />
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        width: '100%',
    }
});