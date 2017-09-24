import React, { Component } from 'react'
import styled from 'styled-components/native'
import Touchable from '@appandflow/touchable'

import SignupForm from '../SignupForm'

const Root = styled.View`
  flex: 1;
  backgroundColor: ${p => p.theme.SECONDARY};
  position: relative;
`

const ButtonSignupText = styled.Text`
  color: ${p => p.theme.WHITE};
  fontWeight: bold;
  fontSize: 20;
`

const ButtonSignup = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  height: 75;
  width: 150;
  backgroundColor: ${p => p.theme.PRIMARY};
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 30%;
  right: 0%;
  borderTopLeftRadius: 20;
  borderBottomLeftRadius: 20;
  shadowOpacity: 0.4;
  shadowRadius: 5;
  shadowOffset: 0px 4px;
  shadowColor: #000;
`

const BottomTextContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200;
  justifyContent: center;
  alignItems: center;
`

const ButtonLogin = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  justifyContent: center;
  alignItems: center;
`

const ButtonLoginText = styled.Text`
  color: ${p => p.theme.WHITE}
  fontWeight: 400;
  fontSize: 16;
`

const initialState = {
  showSignup: false,
  showLogin: false,
}

class AuthenticationScreen extends Component {
  state = initialState

  render() {
    if (this.state.showSignup) {
      return (
        <Root>
          <SignupForm onPress={this.handleBackPress} />
        </Root>
      )
    }
    return (
      <Root>
        <ButtonSignup onPress={this.handleSignupPress}>
          <ButtonSignupText>Get Started</ButtonSignupText>
        </ButtonSignup>
        <BottomTextContainer>
          <ButtonLogin>
            <ButtonLoginText>Already have an account?</ButtonLoginText>
          </ButtonLogin>
        </BottomTextContainer>
      </Root>
    )
  }

  handleSignupPress = () => {
    this.setState({ showSignup: true })
  }

  handleBackPress = () => {
    this.setState({ ...initialState })
  }
}

export default AuthenticationScreen
