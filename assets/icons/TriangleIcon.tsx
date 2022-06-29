import React from 'react'
import { Svg, Path } from 'react-native-svg'
import { SvgFC } from './SvgInterface'

export const TriangleIcon: SvgFC = ({
  width = 25,
  height = 21,
  stroke = 'black',
  fill = 'none',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 21"
      fill={fill}
      stroke={stroke}
      strokeWidth={1.4}
    >
      <Path d="M1.67468 19.75L12.5 1L23.3253 19.75H1.67468Z" />
    </Svg>
  )
}
