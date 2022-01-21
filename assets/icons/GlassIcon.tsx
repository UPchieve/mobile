import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const GlassIcon: SvgFC = ({
    width = 12,
    height = 14,
    ...props
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 12 14"
            fill="none"
            {...props}
        >
            <Circle cx={5} cy={5} r={4.5} stroke="#8B939F" />
            <Path
                d="M8 9L10.5 12.5"
                stroke="#8B939F"
                strokeWidth={1.5}
                strokeLinecap="round"
            />
        </Svg>
    );
};
