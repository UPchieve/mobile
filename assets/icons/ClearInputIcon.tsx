import React from 'react';
import { Svg, Circle, Path } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const ClearInputIcon: SvgFC = ({
    width = 14,
    height = 14,
    ...props
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 14 14"
            fill="none"
            {...props}
        >
            <Circle cx={7} cy={7} r={7} fill="#8B939F" />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.79311 3.49311C10.086 3.20021 10.5609 3.20021 10.8538 3.49311C11.1467 3.786 11.1467 4.26087 10.8538 4.55377L8.2341 7.17344L10.8538 9.79311C11.1467 10.086 11.1467 10.5609 10.8538 10.8538C10.5609 11.1467 10.086 11.1467 9.79311 10.8538L7.17344 8.2341L4.55377 10.8538C4.26087 11.1467 3.786 11.1467 3.49311 10.8538C3.20021 10.5609 3.20021 10.086 3.49311 9.79311L6.11278 7.17344L3.49311 4.55377C3.20021 4.26087 3.20021 3.786 3.49311 3.49311C3.786 3.20021 4.26087 3.20021 4.55377 3.49311L7.17344 6.11278L9.79311 3.49311Z"
                fill="#F1F3F6"
            />
        </Svg>
    );
};
