import React, { useImperativeHandle, useState } from 'react'
import { useRef } from 'react'
import {
  AccessibilityInfo,
  Pressable,
  Text,
  View,
  findNodeHandle,
  Dimensions,
  ScrollView,
} from 'react-native'
import { Modalize, useModalize } from 'react-native-modalize'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'

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

const SCREEN_HEIGHT = Dimensions.get('screen').height

//TODO add min height
const Component: React.ForwardRefRenderFunction<
  ModalSelect,
  ModalSelectorType
> = (props, ref) => {
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
      if (params.data) setData(params.data)
      if (params.title) setTitle(params.title)
      if (params.accessibilityTitle)
        setAccessibilityTitle(params.accessibilityTitle)
      if (params.getLabel) setGetLabel(() => params.getLabel!)
      if (params.onSelect) setOnSelect(() => params.onSelect)

      // Delay opening the modal until after state updates
      // The delay is intended to prevent possible height jumps if Modalize measures layout too early
      requestAnimationFrame(() => {
        open()
      })
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
      <ScrollView
        style={{ maxHeight: SCREEN_HEIGHT * 0.8, minHeight: 200 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={true}
      >
        {data.map((x, index) => {
          return (
            <View
              key={x.id ?? x.key ?? index}
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
      </ScrollView>
    </Modalize>
  )
}

export const ModalSelect = React.forwardRef(Component)
