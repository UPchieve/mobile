import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { SvgFC } from "./SvgInterface"

export const DocEditorIcon: SvgFC = ({
    width = 21,
    height = 26,
    fill = "white",
    ...props
}) => (<Svg
    width={width}
    height={height}
    viewBox="0 0 21 26"
    fill="none"
    {...props}
>
    <Path
        d="M6 11H16"
        stroke={fill}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <Path
        d="M6 15H16"
        stroke={fill}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <Path
        d="M6 19H13.5"
        stroke={fill}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <Path
        d="M3 1H12.718C13.2208 1 13.7051 1.18937 14.0746 1.53039L19.3566 6.40606C19.7667 6.78467 20 7.31747 20 7.87566V22.5C20 23.6046 19.1046 24.5 18 24.5H3C1.89543 24.5 1 23.6046 1 22.5V3C1 1.89543 1.89543 1 3 1Z"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
    />
    <Path
        d="M13.5 7V1.5L19.5 7H13.5Z"
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
    />
</Svg>
)