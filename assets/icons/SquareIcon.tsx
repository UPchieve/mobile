import React from 'react';
import { Svg, Rect } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const SquareIcon: SvgFC = ({
  width = 20,
  height = 20,
  stroke = 'black',
  fill = 'none',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      stroke={stroke}
    >
      <Rect x="0.5" y="0.5" width="19" height="19" rx="3.5" />
    </Svg>
  );
};
