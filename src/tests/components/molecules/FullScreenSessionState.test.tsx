import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import renderer from 'react-test-renderer';
import { FullScreenSessionState } from '../../../components/molecules/dashboard/FullScreenSessionState';
import { userStateType } from '../../../hooks/useUserState';

const CASES: string[][] = [
    ['banned', 'Your account is under review'],
    ['in_session', 'You are currently in a session.'],
    [
        'waiting',
        'You must wait at least 5 minutes before requesting a new session.',
    ],
];

describe('FullScreenSessionState tests', () => {
    it.each(CASES)(
        'when sessionState is: %p should render %p text',
        (sessionState, expected) => {
            const screen = render(
                <FullScreenSessionState
                    navigation={null as any}
                    refreshUserState={null as any}
                    topInsets={0}
                    lastSessionDate={new Date()}
                    userState={sessionState as any}
                />
            );

            const text = screen.getByText(expected);
            expect(text).toBeDefined();
            expect(text.props.children).toStrictEqual(expected);
        }
    );
});
