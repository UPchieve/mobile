import React from 'react';
import {Color} from "react-native-svg/lib/typescript/lib/extract/types";

interface SvgInterface {
  stroke?: Color;
  fill?: Color;
  height?: number;
  width?: number;
  [x: string]: any;
}

export interface SvgFC extends React.FC<SvgInterface> {}
