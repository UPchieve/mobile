import React from 'react'
import { Svg, Path } from 'react-native-svg'
import { SvgFC } from './SvgInterface'

export const DropdownIcon: SvgFC = ({
  width = 20,
  height = 20,
  fill = '#8B939F',
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={width}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5582 12.7604L10 12.1818L9.44176 12.7604C9.75007 13.0799 10.2499 13.0799 10.5582 12.7604ZM10 11.0247L6.34772 7.23964C6.03941 6.92012 5.53954 6.92012 5.23123 7.23964C4.92292 7.55916 4.92292 8.0772 5.23123 8.39672L9.44176 12.7604L10 12.1818L10.5582 12.7604L14.7688 8.39672C15.0771 8.0772 15.0771 7.55916 14.7688 7.23964C14.4605 6.92012 13.9606 6.92012 13.6523 7.23964L10 11.0247Z"
        fill={fill}
      />
    </Svg>
  )
}
