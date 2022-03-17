import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const DragIcon: SvgFC = ({
  width = 26,
  height = 26,
  stroke = '#000',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      stroke={stroke}
      {...props}
    >
      <Path
        d="M13 13L13 2M13 13V24M13 13L24 13M13 2C13 2 11.1716 3.82843 10 5M13 2L16 5M13 24L10 21M13 24L16 21M24 13L21 16M24 13L21 10M24 13L2 13M2 13L5 10M2 13L5 16"
        stroke-width="2"
      />
    </Svg>
  );
};
