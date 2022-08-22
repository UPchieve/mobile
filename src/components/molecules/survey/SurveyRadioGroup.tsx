import React, { PropsWithChildren, useState, ReactElement } from 'react'
import { View } from 'react-native'
import { randomString } from '../../../utils/utils'
import { RadioButton } from '../../atoms/common/RadioButton'
type RadioGroupType<T> = {
  data: T[]
  getText: (data: T) => string
  onSelectedChanged?: (data: T) => void
  defaultValue?: T
  itemMinHeight?: number
}
export const SurveyRadioGroup = <T extends unknown>(
  props: PropsWithChildren<RadioGroupType<T>>
): ReactElement | null => {
  const { data, getText, itemMinHeight = 60 } = props
  const [selected, setSelected] = useState<T | undefined>(props.defaultValue)
  const onPress = (t: T) => {
    if (t !== selected) {
      setSelected(t)
      props.onSelectedChanged && props.onSelectedChanged(t)
    }
  }
  return (
    <View>
      {data.map((x) => (
        <React.Fragment key={randomString()}>
          <RadioButton
            selected={selected === x}
            text={getText(x)}
            //
            onPress={() => onPress(x)}
            minHeight={itemMinHeight}
          />
          <View style={{ marginVertical: 8 }} />
        </React.Fragment>
      ))}
    </View>
  )
}
