import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
import { SvgFC } from "./SvgInterface"

export const MessageIcon: SvgFC = ({
    width = 28,
    height = 28,
    fill = '#D8DEE5',
    ...props
}) => (
  <Svg
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 28 28"
    {...props}
  >
    <Circle cx={14} cy={14} r={13.5} fill={fill} stroke={fill} />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.464 6.933a1 1 0 0 0-1.806 0L7.957 18.925a1 1 0 0 0 .903 1.43h4.545l.98-6.614c.008-.056.088-.057.098-.002l1.225 6.615h4.555a1 1 0 0 0 .903-1.43l-5.702-11.99Z"
      fill="#fff"
    />
  </Svg>
)
