import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const RedoIcon: SvgFC = ({
  width = 21,
  height = 9,
  stroke = '#000',
  fill = undefined,
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 9"
      fill={fill ? fill : stroke}
      stroke={stroke}
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 1C13.15 1 15.55 1.99 17.4 3.6L21 0V9H12L15.62 5.38C14.23 4.22 12.46 3.5 10.5 3.5C6.96 3.5 3.95 5.81 2.9 9L0.530001 8.22C1.92 4.03 5.85 1 10.5 1Z"
      />
    </Svg>
  );
};
