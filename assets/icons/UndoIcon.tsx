import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const UndoIcon: SvgFC = ({
  width = 21,
  height = 9,
  stroke = 'null',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 9"
      fill="none"
      stroke={stroke}
      {...props}
    >
      <Path
        d="M10.5 1C7.85 1 5.45 1.99 3.6 3.6L0 0V9H9L5.38 5.38C6.77 4.22 8.54 3.5 10.5 3.5C14.04 3.5 17.05 5.81 18.1 9L20.47 8.22C19.08 4.03 15.15 1 10.5 1Z"
        fill="#343440"
      />
    </Svg>
  );
};
