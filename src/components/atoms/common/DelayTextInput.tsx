import React, { useRef } from 'react'
import { useImperativeHandle } from 'react'
import { useEffect, useState } from 'react'
import { TextInputProps, TextInput } from 'react-native'

type DelayTextInputType = {
  value: string
  onChangeText: (value: string) => void
  delay?: number
} & TextInputProps

export type DelayTextInputHandle = {
  setText: (value: string) => void
  focus: () => void
}

const Component: React.ForwardRefRenderFunction<
  DelayTextInputHandle,
  DelayTextInputType
> = (props, ref) => {
  const { delay = 500, value, onChangeText } = props
  const [query, setQuery] = useState('')
  const inputRef = useRef<TextInput>(null)
  useImperativeHandle(ref, () => ({
    setText: (value) => {
      setQuery(value)
    },
    focus: () => {
      inputRef.current?.focus()
    },
  }))

  useEffect(() => {
    const timeOutId = setTimeout(() => onChangeText(query), delay)
    return () => clearTimeout(timeOutId)
  }, [query])

  return (
    <TextInput
      {...props}
      ref={inputRef}
      value={query}
      onChangeText={setQuery}
    />
  )
}

export const DelayTextInput = React.forwardRef(Component)
