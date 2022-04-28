import React from 'react';
import { View } from 'react-native';
import { AppLoading } from './AppLoading';

export const LoadingOverlay: React.FC = () => {
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                zIndex: 10,
            }}
        >
            <AppLoading />
        </View>
    );
};
