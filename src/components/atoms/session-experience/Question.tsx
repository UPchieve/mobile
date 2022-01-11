import React from 'react';
import { Text, View, StyleSheet } from "react-native"
import { Colors } from "../../../../assets/Colors";
import { FontIndex } from "../../../../assets/FontIndex";

interface QuestionType {
    text: string,
    highlight?: string,
    aditionalText?: string,
    aditionalTextColor?: string,
}
export const Question: React.FC<QuestionType> = ({ text, highlight, aditionalText, aditionalTextColor }) => {
    const getText = () => {
        if (highlight) {
            const startIndex = text.indexOf(highlight);
            const endIndex = text.indexOf(highlight) + highlight.length;
            return <Text style={styles.text}>
                {text.substring(0, startIndex)}
                <Text style={styles.highlightedText}>
                    {text.substring(startIndex, endIndex)}
                </Text>
                {text.substring(endIndex, text.length)}
            </Text>
        } else {
            return <Text style={styles.text}>
                {text}
            </Text>
        }
    }
    return <View style={styles.container}>
        <Text>{getText()}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        fontFamily: FontIndex.WorkSans.Regular,
        color: Colors.softBlack,
    },
    highlightedText: {
        color: Colors.success,
    }
});