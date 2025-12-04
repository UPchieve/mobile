import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import { CommonButton } from '../../../components/common/CommonButton'

describe('CommonButton Tests', () => {
  it('render correctly', () => {
    const { toJSON } = render(<CommonButton onPress={() => {}} title="" />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('onPress event', () => {
    const pressMethod = jest.fn(() => {})
    const { getByText } = render(
      <CommonButton onPress={pressMethod} title="button" />
    )
    const button = getByText('button')
    fireEvent.press(button)
    expect(pressMethod).toHaveBeenCalledTimes(1)
  })

  it('button texts matchs to button title', () => {
    const buttonText = 'button'
    const button = render(
      <CommonButton onPress={() => {}} title={buttonText} />
    )
    expect(button.UNSAFE_getByType(Text).props.children).toEqual(buttonText)
  })

  it('disabled button must disables inner TouchableOpacity component', () => {
    const button = render(
      <CommonButton onPress={() => {}} title={''} disabled={true} />
    )
    const touchable = button.UNSAFE_getByType(TouchableOpacity)
    expect(touchable.props.disabled).toBeTruthy()
  })
})
