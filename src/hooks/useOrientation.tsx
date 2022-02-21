import React, { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

type OrientationType = 'PORTRAIT' | 'LANDSCAPE';
export const useOrientation = () => {
    const [orientation, setOrientation] = useState<OrientationType>('PORTRAIT');
    useEffect(() => {
        const listener = ScreenOrientation.addOrientationChangeListener(e => {
            if (e.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ||
                e.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT
            ){
                setOrientation('LANDSCAPE');
            } else {
                setOrientation('PORTRAIT');
            }
        });
        return () => {
            ScreenOrientation.removeOrientationChangeListener(listener);
        }
    }, []);

    const lockAsync = async () => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
    const unlockAsync = async () => {
        await ScreenOrientation.unlockAsync();
    }
    return {
        lockAsync,
        unlockAsync,
        orientation
    }
}