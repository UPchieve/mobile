import { StarIcon } from '../../../../assets/icons/StartIcon'
import React, { PropsWithChildren, useState, ReactElement } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { SurveyResponseDefinition } from '../../../types/services/surveyServiceTypes'

type RateStarType<T> = {
  data: SurveyResponseDefinition[]
  onSelectedChanged?: (data: SurveyResponseDefinition) => void
}
export const RateStars = <T extends unknown>(
  props: PropsWithChildren<RateStarType<T>>
): ReactElement | null => {
  const { data } = props
  const [selected, setSelected] = useState<
    SurveyResponseDefinition | undefined
  >()
  const [value, setValue] = useState<number | undefined>(undefined)

  const renderStarIcon = (isSelected: boolean) => {
    const iconProps = { width: 45, height: 45 }
    return isSelected ? (
      <StarIcon {...iconProps} fill={Colors.success} />
    ) : (
      <StarIcon {...iconProps} />
    )
  }
  const onPress = (clicked: SurveyResponseDefinition) => {
    if (clicked !== selected) {
      setSelected(clicked)
      props.onSelectedChanged && props.onSelectedChanged(clicked)
    }
  }
  return (
    <View style={styles.starContainer}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={item.responseId}
          accessible={true}
          accessibilityRole={'button'}
          accessibilityLabel={item.responseText}
          onPress={() => {
            setValue(index)
            onPress(item)
          }}
        >
          {renderStarIcon(value === undefined ? false : index <= value)}
        </TouchableOpacity>
      ))}
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
