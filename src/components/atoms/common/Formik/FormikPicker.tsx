import { useFormikContext } from 'formik'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../../../../assets/Colors'
import { FontIndex } from '../../../../../assets/FontIndex'
import { SvgIcons } from '../../../../../assets/IndexIcons'
import { ModalBottomPicker } from '../ModalBottomPicker'

type FormikPickerType = {
  name: string
  getLabel?: (item: any) => string
  placeholder?: string
  title: string
  options: any[]
  initialColor?: string
}
export const FormikPicker: React.FC<FormikPickerType> = ({
  name,
  placeholder,
  options,
  title,
  getLabel = (e) => e,
  initialColor = Colors.borderGray,
}) => {
  const formik = useFormikContext<any>()
  const [showOptions, setShowOptions] = useState<boolean>(false)
  return (
    <>
      <View
        style={[
          styles.container,
          !!formik.values[name] && initialColor === Colors.borderGray
            ? { borderColor: Colors.success }
            : { borderColor: Colors.information },
          { borderColor: initialColor },
          !!formik.values[name] && { borderColor: Colors.success },
        ]}
      >
        <Pressable
          onPress={() => setShowOptions(true)}
          style={styles.selectWrapper}
        >
          <View style={{ flex: 1 }}>
            {formik.values[name] ? (
              <Text style={styles.text}>{getLabel(formik.values[name])}</Text>
            ) : (
              <Text style={[styles.text, styles.placeholder]}>
                {placeholder}
              </Text>
            )}
          </View>
          <SvgIcons.DropdownIcon />
        </Pressable>
      </View>
      <ModalBottomPicker
        title={title}
        options={options}
        visible={showOptions}
        getLabel={getLabel}
        dismiss={() => setShowOptions(false)}
        onSelect={(e) => formik.setFieldValue(name, e)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 13,
    borderWidth: 1,
    borderRadius: 4,
  },
  selectWrapper: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 15,
    flex: 1,
    marginRight: 10,
    color: Colors.softBlack,
  },
  placeholder: {
    color: Colors.defaultGray,
  },
})
