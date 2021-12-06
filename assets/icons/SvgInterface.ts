import React from 'react';

interface SvgInterface {
  stroke?: string;
  height?: number;
  width?: number;
  [x: string]: any;
}

export interface SvgFC extends React.FC<SvgInterface> {}
