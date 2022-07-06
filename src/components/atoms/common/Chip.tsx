import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'
import { Colors } from '../../../../assets/Colors'
import { FontIndex } from '../../../../assets/FontIndex'

export type ChipType = {
  message: string
  selected: boolean
  onPress?: () => void
}

export const Chip: React.FC<ChipType> = ({ message, selected, onPress }) => {
  return (
    <Pressable
      style={[styles.chip, selected && styles.selected]}
      onPress={() => onPress && onPress()}
    >
      <Text style={[styles.text, selected && styles.selected]}>{message}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.borderGray,
  },
  text: {
    fontFamily: FontIndex.WorkSans.Regular,
    fontSize: 12,
    color: Colors.black,
    textAlign: 'justify',
  },
  selected: {
    color: Colors.selectedBorderGreen,
    backgroundColor: Colors.selectedGreen,
    borderColor: Colors.selectedBorderGreen,
  },
})
