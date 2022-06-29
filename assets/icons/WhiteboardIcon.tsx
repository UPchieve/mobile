import * as React from 'react'
import Svg, { Rect, Path } from 'react-native-svg'
import { Colors } from '../Colors'
import { SvgFC } from './SvgInterface'

export const WhiteboardIcon: SvgFC = ({
  width = 27,
  height = 25,
  fill = Colors.success,
  stroke = 'white',
  ...props
}) => (
  <Svg width={27} height={25} viewBox="0 0 27 25" fill="none" {...props}>
    <Rect
      x={0.75}
      y={4.75}
      width={23.5}
      height={19.5}
      rx={1.25}
      stroke={stroke}
      strokeWidth={1.5}
    />
    <Path d="M25 9L0 9" stroke={stroke} strokeWidth={1.5} />
    <Path
      d="M13.0233 10.9767L23 1L26 4L16 14L12.5 14.5L13.0233 10.9767Z"
      fill={fill}
      stroke={stroke}
      strokeLinejoin="round"
    />
    <Path d="M13 11L16 14" stroke={stroke} />
    <Path d="M21 3L24 6" stroke={stroke} />
  </Svg>
)
