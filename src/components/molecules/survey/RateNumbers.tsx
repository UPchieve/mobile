import React, { PropsWithChildren, useState, ReactElement } from 'react'
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native'
import { randomString } from '../../../utils/utils'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'
import { Medal } from '../../atoms/session-experience/Medal'
import { SurveyResponseDefinition } from '../../../types/services/surveyServiceTypes'

type RateNumberType<T> = {
  data: SurveyResponseDefinition[]
  onSelectedChanged?: (data: SurveyResponseDefinition) => void
}
export const RateNumbers = <T extends unknown>(
  props: PropsWithChildren<RateNumberType<T>>
): ReactElement | null => {
  const { data } = props
  const [selected, setSelected] = useState<
    SurveyResponseDefinition | undefined
  >()
  const onPress = (clicked: SurveyResponseDefinition) => {
    if (clicked !== selected) {
      setSelected(clicked)
      props.onSelectedChanged && props.onSelectedChanged(clicked)
    }
  }
  return (
    <View style={styles.medalContainer}>
      {data.map((item, index) => (
        <React.Fragment key={randomString()}>
          <Medal
            key={item.responseId}
            value={index + 1}
            accessible={true}
            accessibilityRole={'button'}
            accessibilityLabel={`${index + 1}: ${item.responseText}`}
            disabled={false}
            fullRounded={true}
            selected={item === selected}
            onPress={() => onPress(item)}
          />
          <View style={{ marginVertical: 8 }} />
        </React.Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  medalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  textIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  textIndicator: {
    color: Colors.secondaryGray,
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 12,
  },
})
