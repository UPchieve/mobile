import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { CommonButton } from '../../../components/common/CommonButton';
describe('CommonButton Tests', () => {
    it('render correctly', () => {
        const tree = renderer
            .create(<CommonButton onPress={() => {}} title="" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('onPress event', () => {
        const pressMethod = jest.fn(() => {});
        const button = render(
            <CommonButton onPress={pressMethod} title="button" />
        );
        fireEvent.press(button.container);
        expect(pressMethod).toHaveBeenCalledTimes(1);
    });

    it('button texts matchs to button title', () => {
        const buttonText = 'button';
        const button = render(
            <CommonButton onPress={() => {}} title={buttonText} />
        );
        expect(button.UNSAFE_getByType(Text).props.children).toEqual(
            buttonText
        );
    });

    it('disabled button must disables inner TouchableOpacity component', () => {
        const button = render(
            <CommonButton onPress={() => {}} title={''} disabled={true} />
        );
        const touchable = button.UNSAFE_getByType(TouchableOpacity);
        expect(touchable.props.disabled).toBeTruthy();
    });
});
