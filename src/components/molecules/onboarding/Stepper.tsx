import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../../../assets/Colors';
import { FontIndex } from '../../../../assets/FontIndex';
import { SvgIcons } from '../../../../assets/IndexIcons';
import { randomString } from '../../../utils/utils';

type StepperState = 'active' | 'not-started' | 'completed';

export type StepperItem = {
    stepNumber: number,
    stepState: StepperState,
}
type StepperType = {
    data: StepperItem[]
}
export const Stepper: React.FC<StepperType> = ({ data }) => {
    const getMedalStyle = (item: StepperItem) => {
        switch (item.stepState) {
            case 'active': return styles.medalActive;
            case 'not-started': return styles.medalNotStarted;
            case 'completed': return styles.medalCompleted;
        }
    }

    const getTextStyle = (item: StepperItem) => {
        switch (item.stepState) {
            case 'active': return styles.textActive;
            case 'not-started': return styles.textNotStarted;
        }
    }

    const renderItem = (item: StepperItem, isLast: boolean) => {
        return <View style={{ flexDirection: 'row', alignItems: 'center' }} key={randomString()}>
            <View style={[styles.medalBase, getMedalStyle(item)]}>
                {item.stepState === 'completed' ? <SvgIcons.CheckIcon fill="#fff" />
                    : <Text style={[styles.textBase, getTextStyle(item)]}>
                        {item.stepNumber}
                    </Text>}

            </View>
            {!isLast
                ? <View style={{ height: 1, width: 40, borderWidth: .8, borderColor: Colors.borderGray }} />
                : null}
        </View>
    }
    return <View style={{ flexDirection: 'row' }}>
        {data.map((x, i) => renderItem(x, i === data.length - 1))
        }
    </View >
}

const styles = StyleSheet.create({
    medalBase: {
        height: 32,
        width: 32,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    medalActive: {
        backgroundColor: Colors.selectedGreen,
        borderColor: Colors.success
    },
    medalNotStarted: {
        borderColor: Colors.borderGray
    },
    medalCompleted: {
        borderColor: Colors.success,
        backgroundColor: Colors.success,
    },
    textBase: {
        fontFamily: FontIndex.WorkSans.Regular,
        fontSize: 16,
    },
    textActive: {
        color: Colors.success,
    },
    textNotStarted: {
        color: Colors.borderGray,
    }
});