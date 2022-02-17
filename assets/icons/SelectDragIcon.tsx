import * as React from "react"
import Svg, { SvgProps, Line, Path } from "react-native-svg"
import {SvgFC} from "./SvgInterface";

export const SelectDragIcon: SvgFC = ({
                                          width = 24,
                                          height = 24,
                                          fill = 'none',
                                          stroke = 'black',
                                          ...props
                                      }) => {
    return (<Svg
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill={fill}
            stroke={stroke}
            strokeWidth={1.4}
            {...props}
        >
            <Line x1={2} y1={6} x2={2} y2={9} stroke={stroke} strokeWidth={2}/>
            <Line x1={19} y1={9} x2={19} y2={6} stroke={stroke} strokeWidth={2}/>
            <Line
                x1={19}
                y1={14}
                x2={19}
                y2={11}
                stroke={stroke}
                strokeWidth={2}
            />
            <Line x1={2} y1={11} x2={2} y2={14} stroke={stroke} strokeWidth={2}/>
            <Path
                d="M1.5 4V2.5V2C1.5 1.44772 1.94772 1 2.5 1H4.5"
                stroke={stroke}
                strokeWidth={2}
            />
            <Path
                d="M4.5 19H3H2.5C1.94772 19 1.5 18.5523 1.5 18L1.5 16"
                stroke={stroke}
                strokeWidth={2}
            />
            <Path
                d="M16.5 1L18 1H18.5C19.0523 1 19.5 1.44772 19.5 2V4"
                stroke={stroke}
                strokeWidth={2}
            />
            <Path d="M9.5 1H6.5" stroke={stroke} strokeWidth={2}/>
            <Path d="M9.5 19H6.5" stroke={stroke} strokeWidth={2}/>
            <Path d="M14.5 1H11.5" stroke={stroke} strokeWidth={2}/>
            <Path d="M14.5 19H11.5" stroke={stroke} strokeWidth={2}/>
            <Path
                d="M15.6972 15.0696L25.2612 18.4451C25.3467 18.4753 25.3511 18.5946 25.268 18.631L21 20.5L19.131 24.768C19.0946 24.8511 18.9753 24.8467 18.9451 24.7612L15.5696 15.1972C15.5416 15.1179 15.6179 15.0416 15.6972 15.0696Z"
                fill={fill}
                stroke={stroke}
            />
        </Svg>
    );
};

