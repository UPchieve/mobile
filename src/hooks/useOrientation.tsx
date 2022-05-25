import React, { useEffect, useState } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

export type OrientationType = 'PORTRAIT' | 'LANDSCAPE'
type NotchPositionType = 'LEFT' | 'RIGHT' | 'TOP' | 'BOTTOM'
export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>('PORTRAIT')
  const [notchPosition, setNotchPosition] = useState<NotchPositionType>('TOP')

  useEffect(() => {
    const listener = ScreenOrientation.addOrientationChangeListener((e) => {
      // if (e.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ||
      //     e.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT
      // ) {
      //     setOrientation('LANDSCAPE');
      // } else {
      //     setOrientation('PORTRAIT');
      // }
      switch (e.orientationInfo.orientation) {
        case ScreenOrientation.Orientation.PORTRAIT_UP:
          setNotchPosition('TOP')
          setOrientation('PORTRAIT')
          break
        case ScreenOrientation.Orientation.PORTRAIT_DOWN:
          setNotchPosition('BOTTOM')
          setOrientation('PORTRAIT')
          break
        case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
          setNotchPosition('RIGHT')
          setOrientation('LANDSCAPE')
          break
        case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
          setNotchPosition('LEFT')
          setOrientation('LANDSCAPE')
          break
      }
    })
    return () => {
      ScreenOrientation.removeOrientationChangeListener(listener)
    }
  }, [])

  const lockAsync = async (orientation: OrientationType) => {
    if (orientation === 'PORTRAIT') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    } else {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      )
    }
  }
  const unlockAsync = async () => {
    await ScreenOrientation.unlockAsync()
  }
  return {
    lockAsync,
    unlockAsync,
    orientation,
    notchPosition,
  }
}
