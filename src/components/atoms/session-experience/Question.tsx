import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { Colors } from "../../../../assets/Colors";
import { FontIndex } from "../../../../assets/FontIndex";
import { Popover, usePopover, } from 'react-native-modal-popover';

interface QuestionType {
    text: string,
    highlight?: string,
    aditionalText?: string,
    informationText?: string,
}
export const Question: React.FC<QuestionType> = ({ text, highlight, aditionalText, informationText }) => {
    const {
        openPopover,
        closePopover,
        popoverVisible,
        touchableRef,
        popoverAnchorRect,
    } = usePopover();

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
        <View style={styles.questionContainer}>
            <Text>{getText()}</Text>
            {informationText
                ? <TouchableOpacity style={styles.informationIcon} onPress={() => openPopover()} ref={touchableRef}>
                    <Text style={styles.informationIconText}>i</Text>
                </TouchableOpacity>
                : null}
        </View>
        {aditionalText
            ? <Text style={styles.mutedText}>
                {aditionalText}
            </Text>
            : null
        }
        {informationText ?
            < Popover
                contentStyle={styles.content}
                backgroundStyle={styles.background}
                visible={popoverVisible}
                onClose={closePopover}
                fromRect={popoverAnchorRect}
                placement='top'
                supportedOrientations={['portrait']}>
                <Text style={styles.popoverText}>{informationText}</Text>
            </Popover>
            : null
        }
    </View >
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
    },
    mutedText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: FontIndex.WorkSans.Regular,
        color: Colors.defaultGray,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    informationIcon: {
        borderColor: Colors.defaultGray,
        borderWidth: 1,
        borderRadius: 100,
        height: 18,
        width: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    informationIconText: {
        color: Colors.defaultGray,
        fontSize: 12,
        fontFamily: FontIndex.WorkSans.Regular
    },
    //popover
    content: {
        paddingBottom: 14,
        paddingTop: 14,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
        width: 250,
    },
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    popoverText: {
        color: Colors.secondaryGray,
        fontSize: 12,
        fontFamily: FontIndex.WorkSans.Regular,
    }
});