import React, { FunctionComponent } from 'react'
import { NativeBase } from 'native-base'
import { Text } from '../Text'
import { StyledButton } from './styled'

const ButtonComponent: FunctionComponent<NativeBase.Button> = ({
  children,
  ...props
}) => (
  <StyledButton {...props}>
    <Text color={'#fff'}>{children}</Text>
  </StyledButton>
)

export default ButtonComponent
