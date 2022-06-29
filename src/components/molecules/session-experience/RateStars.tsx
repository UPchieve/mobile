import React, { useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { StarIcon } from '../../../../assets/icons/StartIcon'

interface RateStars {
  selected?: number
  setSelected: (selected: number) => void
  parentStyle?: StyleProp<ViewStyle>
}

export const RateStars: React.FC<RateStars> = ({
  setSelected,
  parentStyle,
}) => {
  const [value, setValue] = useState<number>(0)

  const renderStarIcon = (isSelected: boolean) => {
    const iconProps = { width: 45, height: 45 }
    return isSelected ? (
      <StarIcon {...iconProps} fill={Colors.success} />
    ) : (
      <StarIcon {...iconProps} />
    )
  }

  return (
    <View style={parentStyle}>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <TouchableOpacity
              key={item}
              onPress={() => {
                setValue(item)
                setSelected(item)
              }}
            >
              {renderStarIcon(item <= value)}
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
})
