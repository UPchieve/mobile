import React, {PropsWithChildren, ReactElement, useState} from "react";
import {StyleSheet, View} from "react-native";
import {randomString} from "../../../utils/utils";
import {RadioButton} from "../../atoms/common/RadioButton";
import {Medal} from "../../atoms/session-experience/Medal";


type MedalPickerType<T> = {
    data: T[],
    getText: (data: T) => string,
    onSelectedChanged?: (data: T) => void;
    defaultValue?: T;
}

export const MedalPicker = <T extends unknown>(props: PropsWithChildren<MedalPickerType<T>>): ReactElement | null => {
    const { data, getText } = props;
    const [selected, setSelected] = useState<T | undefined>(props.defaultValue);
    const [disabled, setDisabled] = useState(false);
    const onPress = (t: T) => {
        if (t !== selected) {
            setSelected(t);
            props.onSelectedChanged && props.onSelectedChanged(t);
        }
    }
    return <View style={styles.medalWrapper}>
        {data.map(x => <React.Fragment key={randomString()}>
            <View style={styles.medal}>
                <Medal fullRounded={false} disabled={disabled} selected={x === selected} value={getText(x)} onPress={() => {
                     setSelected( x);
                }}/>
            </View>
        </React.Fragment>)}
    </View>
}

const styles = StyleSheet.create({
    medalWrapper: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    medal: {
        padding: 5
    }
})
