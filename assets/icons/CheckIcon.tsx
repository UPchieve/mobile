
import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { SvgFC } from './SvgInterface';

export const CheckIcon: SvgFC = ({
    width = 20,
    height = 20,
    fill = 'green',
    ...props
}) => {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175C8.53033 14.2478 8.53028 14.2479 8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z"
                fill={fill}
            />
        </Svg>
    );
};
