import React from 'react';
import { Svg, Circle } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const CircleIcon: SvgFC = ({
  width = 20,
  height = 20,
  stroke = 'black',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      stroke={stroke}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Circle cx="10" cy="10" r="9.5" stroke={stroke} />
    </Svg>
  );
};
