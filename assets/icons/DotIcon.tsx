import React from 'react';
import { Svg, Circle } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const DotIcon: SvgFC = ({
  width = 21,
  height = 21,
  stroke,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
      stroke={stroke}
      {...props}
    >
      <Circle
        cx="10.5"
        cy="10.5"
        r="9.5"
        fill="#343440"
        stroke="white"
        strokeWidth="2"
      />
    </Svg>
  );
};
