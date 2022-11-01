import React, { PropsWithChildren, useState, ReactElement } from 'react'
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native'
import { randomString } from '../../../utils/utils'
import { SurveyResponseDefinition } from '../../../types/services/surveyServiceTypes'
import { Chip } from '../../atoms/common/Chip'

type SurveyChipType<T> = {
  data: SurveyResponseDefinition[]
  onSelectedChanged?: (data: SurveyResponseDefinition) => void
}
export const SurveyChipGroup = <T extends unknown>(
  props: PropsWithChildren<SurveyChipType<T>>
): ReactElement | null => {
  const { data } = props
  const [selected, setSelected] = useState<SurveyResponseDefinition[]>([])
  const onPress = (clicked: SurveyResponseDefinition) => {
    if (isSelected(clicked)) {
      setSelected((selected) =>
        selected.filter((s) => s.responseId != clicked.responseId)
      )
    } else {
      setSelected((selected) => [...selected, clicked])
    }
    props.onSelectedChanged && props.onSelectedChanged(clicked)
  }
  const isSelected = (toCheck: SurveyResponseDefinition): boolean => {
    const found = selected?.find((s) => s.responseId === toCheck.responseId)
    return !!found
  }
  return (
    <View style={styles.chipContainer}>
      {data.map((item) => (
        <React.Fragment key={randomString()}>
          <Chip
            message={item.responseText}
            selected={isSelected(item)}
            onPress={() => onPress(item)}
          />
          <View style={{ marginVertical: 8 }} />
        </React.Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 5,
  },
  chipItem: {
    paddingHorizontal: 5,
  },
})
