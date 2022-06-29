import React from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

type ProgressBarType = {
  value: number
  color: string
}

export const ProgressBar: React.FC<ProgressBarType> = ({ color, value }) => {
  const animated = useAnimatedStyle(() => {
    return {
      width: withTiming(`${value * 100}%`),
    }
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progress,
          {
            backgroundColor: color,
          },
          animated,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    backgroundColor: '#F0F9F7',
    borderRadius: 5.5,
  },
  progress: {
    borderRadius: 5.5,
    height: '100%',
  },
})
