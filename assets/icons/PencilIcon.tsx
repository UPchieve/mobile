import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const PencilIcon: SvgFC = ({
  stroke,
  width = 23,
  height = 22,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 23 22"
      fill="none"
      stroke={stroke}
      {...props}
    >
      <Path
        d="M15.1091 19.1091L1 5L5.24264 0.757359L19.3848 14.8995L20.0919 19.8492L15.1091 19.1091Z"
        stroke="black"
        strokeLinejoin="round"
      />
      <Path d="M15.1421 19.1421L19.3847 14.8994" stroke="black" />
      <Path d="M3.82837 7.82837L8.07101 3.58573" stroke="black" />
    </Svg>
  );
};
