import React, { useImperativeHandle, useState } from 'react'
import { useRef } from 'react'
import {
  AccessibilityInfo,
  Pressable,
  Text,
  View,
  findNodeHandle,
} from 'react-native'
import { Modalize, useModalize } from 'react-native-modalize'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { randomString } from '../../../utils/utils'

type ModalSelectorType = {
  title?: string
  accessibilityTitle?: string
  data?: any[]
  getLabel?: (obj: any) => string
  onClose?: () => void
}

type ModalSelectOpenProps = {
  onSelect?: (selected: any) => void
  data?: any[]
  getLabel?: (obj: any) => string
  title?: string
  accessibilityTitle?: string
}

export type ModalSelect = {
  open: (props: ModalSelectOpenProps) => void
}

//TODO add min height
const Component: React.ForwardRefRenderFunction<
  ModalSelect,
  ModalSelectorType
> = (props, ref) => {
  // const { title, data, getLabel } = props;

  const [title, setTitle] = useState<string>(props.title || '')
  const [accessibilityTitle, setAccessibilityTitle] = useState<string>(
    props.accessibilityTitle || ''
  )
  const [data, setData] = useState<any[]>(props.data || [])
  const [getLabel, setGetLabel] = useState<(obj: any) => string>(() =>
    !!props.getLabel ? props.getLabel : (e: any) => e
  )
  const [onSelect, setOnSelect] = useState<(selected?: any) => any>()
  const { ref: modalizeRef, open } = useModalize()
  const headerRef = useRef<View>(null)

  const setFocus = (element: View | null) => {
    if (element === null) {
      // early exit
      return
    }
    const reactTag = findNodeHandle(element)
    if (reactTag) {
      AccessibilityInfo.setAccessibilityFocus(reactTag)
    }
  }

  useImperativeHandle(ref, () => ({
    open: (params: ModalSelectOpenProps) => {
      open()
      params.data && setData(params.data)
      params.title && setTitle(params.title)
      params.accessibilityTitle &&
        setAccessibilityTitle(params.accessibilityTitle)
      params.getLabel && setGetLabel((_: any) => params.getLabel!)
      setOnSelect((_: any) => params.onSelect)
    },
  }))

  return (
    <Modalize
      threshold={20}
      panGestureComponentEnabled
      onOpened={() => setFocus(headerRef.current)}
      onClose={() => props?.onClose && props?.onClose()}
      HeaderComponent={
        <Text
          accessible={true}
          accessibilityRole="header"
          accessibilityLabel={accessibilityTitle}
          ref={headerRef}
          style={{
            marginTop: 20,
            fontFamily: FontIndex.WorkSans.Medium,
            fontSize: 14,
            marginBottom: 15,
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      }
      ref={modalizeRef}
      adjustToContentHeight={true}
    >
      <View style={{ paddingBottom: 20, minHeight: 200 }}>
        {data.map((x) => {
          return (
            <View
              key={randomString()}
              style={{
                minHeight: 50,
                justifyContent: 'center',
                borderTopColor: Colors.borderGray,
                borderTopWidth: 1,
              }}
            >
              <Pressable
                accessible={true}
                accessibilityRole="button"
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
                onPress={() => {
                  onSelect && onSelect(x)
                  modalizeRef.current?.close()
                }}
              >
                <Text
                  style={{
                    fontFamily: FontIndex.WorkSans.Regular,
                    fontSize: 14,
                    color: Colors.softBlack,
                  }}
                >
                  {getLabel !== undefined && getLabel(x)}
                </Text>
              </Pressable>
            </View>
          )
        })}
      </View>
    </Modalize>
  )
}

export const ModalSelect = React.forwardRef(Component)
