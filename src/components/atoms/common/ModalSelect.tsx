import React, { useEffect, useImperativeHandle, useState } from 'react'
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
    title?: string,
    data?: any[]
    getLabel?: (obj: any) => string;
}

type ModalSelectOpenProps = {
    onSelect?: (selected: any) => void;
    data?: any[];
    getLabel?: (obj: any) => string;
    title?: string;
}

export type ModalSelect = {
    open: (props: ModalSelectOpenProps) => void;
}

//TODO add min height
const Component: React.ForwardRefRenderFunction<ModalSelect, ModalSelectorType> = ((props, ref) => {
    // const { title, data, getLabel } = props;

    const [title, setTitle] = useState<string>(props.title || '');
    const [data, setData] = useState<any[]>(props.data || []);
    const [getLabel, setGetLabel] = useState<((obj: any) => string)>(() => !!props.getLabel ? props.getLabel : ((e: any) => e));
    const [onSelect, setOnSelect] = useState<(selected?: any) => any>();
    const modalizeRef = useRef<Modalize>(null);
    useImperativeHandle(ref, () => ({
        open: (params: ModalSelectOpenProps) => {
            modalizeRef.current?.open();
            params.data && setData(params.data);
            params.title && setTitle(params.title);
            params.getLabel && setGetLabel((_: any) => params.getLabel!);
            setOnSelect((_: any) => params.onSelect);
        }
    }));

    return <Modalize
        threshold={20}
        panGestureComponentEnabled
        HeaderComponent={
            <Text style={{
                marginTop: 20,
                fontFamily: FontIndex.WorkSans.Medium, fontSize: 14, marginBottom: 15,
                textAlign: 'center'
            }}>{title}</Text>
        }
        ref={modalizeRef} adjustToContentHeight={true}>
        <View style={{ paddingBottom: 20, minHeight: 200}}>
            {data.map(x => {
                return <React.Fragment key={randomString()}>
                    <Separator backgroundColor={Colors.borderGray} />
                    <Pressable style={{ alignItems: 'flex-start', justifyContent: 'center', paddingVertical: 10, paddingHorizontal: 20 }}
                        onPress={() => {
                            onSelect && onSelect(x);
                            modalizeRef.current?.close();
                        }}
                    >
                        <Text style={{ fontFamily: FontIndex.WorkSans.Regular, fontSize: 14, color: Colors.softBlack }}
                        >{getLabel !== undefined && getLabel(x)}</Text>
                    </Pressable>
                </React.Fragment>
            })}
        </View>
    </Modalize>
})

export const ModalSelect = React.forwardRef(Component);
