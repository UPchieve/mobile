import React, { PropsWithChildren, ReactElement, useState } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { randomString } from '../../../utils/utils'

type SurveyEmoji<T> = {
  emojiData: T
  isSelected: boolean
  imageSrc: string
  onPress: (data: T) => void
  isInitialDisplay: boolean
}

export const SurveyEmoji = <T extends unknown>(
  props: PropsWithChildren<SurveyEmoji<T>>
): ReactElement | null => {
  const { onPress, imageSrc, isSelected, emojiData, isInitialDisplay } = props
  const animation = new Animated.Value(0)
  const inputRange = [0, 1]
  const outputRange = [1, 0.8]
  const scale = animation.interpolate({ inputRange, outputRange })
  // the animation functions are encapsulated within the component
  // so that each icon has its own reference to an animation
  // instead of sharing the same reference which would make all icons
  // invoke an animation when an individual icon is pressed
  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <Pressable
        onPress={() => onPress(emojiData)}
        onPressIn={() => onPressIn()}
        onPressOut={onPressOut}
      >
        <SvgUri
          uri={imageSrc}
          // achieve a psuedo gray-scale by lowering the opacity when an emoji is selected
          fillOpacity={isInitialDisplay ? 1 : isSelected ? 1 : 0.3}
          strokeOpacity={isInitialDisplay ? 1 : isSelected ? 1 : 0.3}
        />
      </Pressable>
    </Animated.View>
  )
}

type SurveyEmojiGroup<T> = {
  data: T[]
  getImageSrc: (data: T) => string
  getText: (data: T) => string
  isSelected: (selected: T | undefined, compareTo: T) => boolean
  onSelectedChanged?: (data: T) => void
}

export const SurveyEmojiGroup = <T extends unknown>(
  props: PropsWithChildren<SurveyEmojiGroup<T>>
): ReactElement | null => {
  const { data, getText, getImageSrc, isSelected } = props
  const [selected, setSelected] = useState<T | undefined>(undefined)
  const onPress = (t: T) => {
    setSelected(t)
    props.onSelectedChanged && props.onSelectedChanged(t)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {data.map((x) => (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '20%',
          }}
          key={randomString()}
        >
          <SurveyEmoji
            imageSrc={getImageSrc(x)}
            isSelected={isSelected(selected, x)}
            onPress={onPress}
            emojiData={x}
            isInitialDisplay={selected === undefined}
          />
          <View style={{ marginVertical: 8, width: '100%', height: 20 }}>
            {isSelected(selected, x) && (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                }}
              >
                {getText(x)}
              </Text>
            )}
          </View>
        </View>
      ))}
    </View>
  )
}
