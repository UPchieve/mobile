import React, { useImperativeHandle, useState } from 'react'
import { createRef } from 'react'
import { useRef } from 'react'
import { Pressable, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { randomString } from '../../../utils/utils'
import { Separator } from './Separator'

type ModalSelectorType = {
    title: string,
    data: any[]
    getLabel: (obj: any) => string;
}

type refType = {
    open: ((selected?: any) => void)
}

export const ModalSelect = React.forwardRef<refType, ModalSelectorType>((props, ref) => {
    const {title, data, getLabel} = props;
    const [onSelect, setOnSelect] = useState<(selected?: any) => any>();
    const modalizeRef = useRef<Modalize>(null);
    useImperativeHandle(ref, () => ({
        open: (onSelect: (selected?: any) => void) => {
            modalizeRef.current?.open();
            setOnSelect((_: any) => onSelect);
        }
    }));
    return <Modalize
        HeaderComponent={
            <Text style={{
                marginTop: 20,
                fontFamily: FontIndex.WorkSans.Medium, fontSize: 14, marginBottom: 15,
                textAlign: 'center'
            }}>{title}</Text>
        }
        ref={modalizeRef} adjustToContentHeight={true}>
        <View style={{ paddingBottom: 20, }}>
            {data.map(x => {
                return <React.Fragment key={getLabel(x)+randomString()}>
                    <Separator backgroundColor={Colors.borderGray} />
                    <Pressable style={{ alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20 }}
                        onPress={() => {
                            onSelect && onSelect(x);
                            modalizeRef.current?.close();
                        }}
                    >
                        <Text style={{ fontFamily: FontIndex.WorkSans.Regular, fontSize: 14, color: Colors.softBlack }}
                        >{getLabel(x)}</Text>
                    </Pressable>
                </React.Fragment>
            })}
        </View>
    </Modalize>
})

