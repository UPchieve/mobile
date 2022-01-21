import React, { useRef } from 'react'
import { useImperativeHandle } from 'react';
import { useEffect, useState } from "react";
import { TextInputProps } from "react-native"
import { TextInput } from "react-native-gesture-handler"

type DelayTextInputType = {
    value: string;
    onChangeText: (value: string) => void;
    delay?: number;
} & TextInputProps;

export type DelayTextInputHandle = {
    setText: (value: string) => void;
}

const Component: React.ForwardRefRenderFunction<DelayTextInputHandle, DelayTextInputType> =
    (props, ref) => {
        const { delay = 500, value, onChangeText } = props;
        const [query, setQuery] = useState("");

        useImperativeHandle(ref, () => ({
            setText: (value) => {
                setQuery(value);
            }
        }));

        useEffect(() => {
            const timeOutId = setTimeout(() => onChangeText(query), delay);
            return () => clearTimeout(timeOutId);
        }, [query]);

        return <TextInput {...props} value={query} onChangeText={setQuery} />
    }

export const DelayTextInput = React.forwardRef(Component);