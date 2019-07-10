import * as React from 'react';
import { Text } from 'react-native';

import { GLOBAL } from '../styles/global';

export interface Props {
  style: Text.propTypes.style;
}

interface State {}

class CText extends React.PureComponent<Props, State> {
  static defaultProps = {
    style: GLOBAL.TEXT.Default,
  };

  render() {
    const { style, children } = this.props;

    return (
      <Text {...this.props} style={[GLOBAL.TEXT.Default, style]}>
        {children}
      </Text>
    );
  }
}

export { CText };
