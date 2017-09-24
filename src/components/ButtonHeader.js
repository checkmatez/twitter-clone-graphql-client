import React from 'react'
import styled from 'styled-components/native'
import Touchable from '@appandflow/touchable'

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  marginRight: ${p => (p.side === 'right' ? 15 : 0)};
  marginLeft: ${p => (p.side === 'left' ? 15 : 0)};
  justifyContent: center;
  alignItems: center;
`

export default ({ side, children, disabled, onPress }) => {
  return (
    <Button disabled={disabled} side={side} onPress={onPress}>
      {children}
    </Button>
  )
}
