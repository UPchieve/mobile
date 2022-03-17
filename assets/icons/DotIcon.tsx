import React from 'react';
import { Svg, Circle } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const DotIcon: SvgFC = ({
  width = 21,
  height = 21,
  stroke = 'black',
  fill = 'black',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill={fill}
      stroke={stroke}
      {...props}
    >
      <Circle
        cx="10.5"
        cy="10.5"
        r="9.5"
        strokeWidth="2"
      />
    </Svg>
  );
};
