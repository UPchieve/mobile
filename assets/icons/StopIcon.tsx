import * as React from "react"
import Svg, { SvgProps, Circle, Rect } from "react-native-svg"
import { SvgFC } from "./SvgInterface"

export const StopIcon: SvgFC = ({ ...props }) => (
    <Svg
        width={58}
        height={58}
        viewBox="0 0 58 58"
        fill="none"
        {...props}
    >
        <Circle cx={29} cy={29} r={29} fill="#F44747" />
        <Rect x={9} y={27} width={40} height={4} fill="white" />
    </Svg>
)