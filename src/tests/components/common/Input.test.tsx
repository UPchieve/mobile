import React from 'react'
import { TextInput, View } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'
import renderer from 'react-test-renderer'
import { Input } from '../../../components/atoms/common/Input'
import { Colors } from '../../../../assets/Colors'

describe('Input tests', () => {
  it('render correctly', () => {
    const tree = renderer.create(<Input />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('onChangeText event should be propagated to TextInput', () => {
    const onChangeParameter = 'test'
    const onChangeText = jest.fn((text: string) => {})
    const { getByTestId } = render(
      <Input onChangeText={onChangeText} testID="input" />
    )
    const input = getByTestId('input')
    fireEvent.changeText(input, onChangeParameter)
    expect(onChangeText).toHaveBeenCalledWith(onChangeParameter)
  })
  it('When Input is in focus should change borders to information blue', () => {
    const wrapper = render(<Input />)
    const viewContainer = wrapper.UNSAFE_getByType(View)
    const input = wrapper.UNSAFE_getByType(TextInput)
    fireEvent(input, 'onFocus')
    expect(viewContainer.props.style).toContainEqual({
      borderColor: Colors.information,
    })
  })
  it('When Input has an error and have been touched, it should show it', async () => {
    const errorMessage = 'errorMessageTest'
    const wrapper = render(<Input />)
    const viewContainer = wrapper.UNSAFE_getByType(View)
    wrapper.update(
      <Input touched={true} isValid={false} errorMessage={errorMessage} />
    )
    const errorMessageTextComponent = await wrapper.findByText(errorMessage)
    expect(errorMessageTextComponent).toBeDefined()
    expect(errorMessageTextComponent.props.children).toStrictEqual(errorMessage)
    expect(viewContainer.props.style).toContainEqual({
      borderColor: Colors.error,
    })
  })
})
