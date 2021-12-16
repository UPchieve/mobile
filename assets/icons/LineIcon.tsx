import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const LineIcon: SvgFC = ({
  width = 20,
  height = 22,
  stroke = '#000',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 22"
      fill="none"
      stroke={stroke}
      {...props}
    >
      <Path d="M19.3408 1.29004L0.370117 21.001" stroke={stroke} />
    </Svg>
  );
};
