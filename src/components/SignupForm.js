import React, { Component } from 'react'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import Touchable from '@appandflow/touchable'
import { Platform, Keyboard, AsyncStorage } from 'react-native'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import { colors, fakeAvatar } from '../utils/constants'
import Loading from '../components/Loading'
import SIGNUP_MUTATION from '../graphql/mutations/signup'
import { login } from '../actions/user'

const Root = styled(Touchable).attrs({
  feedback: 'none',
})`
  flex: 1;
  position: relative;
  alignItems: center;
  zIndex: 1;
`

const Wrapper = styled.View`
  alignSelf: center;
  justifyContent: center;
  alignItems: center;
  width: 90%;
  height: 100%;
`

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  justifyContent: center;
  alignItems: center;
  position: absolute;
  top: 5%;
  left: 5%;
  zIndex: 1;
`

const ButtonConfirm = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  backgroundColor: ${p => p.theme.PRIMARY};
  borderRadius: 10;
  justifyContent: center;
  alignItems: center;
  shadowColor: #000;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  shadowOpacity: 0.2;
  elevation: 2;
`

const ButtonConfirmText = styled.Text`
  color: ${p => p.theme.WHITE};
  justifyContent: center;
  alignItems: center;
`

const InputWrapper = styled.View`
  height: 50;
  width: 80%;
  borderBottomWidth: 2;
  borderBottomColor: ${p => p.theme.LIGHT_GRAY};
  marginVertical: 5;
  justifyContent: flex-end;
`

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
  autoCorrect: false,
})`
  height: 30;
  color: ${p => p.theme.WHITE};
`

class SignupForm extends Component {
  state = {
    fullName: '',
    email: '',
    password: '',
    username: '',
    loading: false,
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }
    return (
      <Root onPress={this.handleOutsidePress}>
        <BackButton onPress={this.props.onPress}>
          <MaterialIcons color={colors.WHITE} size={30} name="arrow-back" />
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input
              placeholder="Full Name"
              autoCapitalize="words"
              onChangeText={text => this.handleChangeText(text, 'fullName')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => this.handleChangeText(text, 'email')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this.handleChangeText(text, 'password')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={text => this.handleChangeText(text, 'username')}
            />
          </InputWrapper>
          <ButtonConfirm
            onPress={this.handleSignupPress}
            disabled={this.checkIfDisabled()}
          >
            <ButtonConfirmText>Sign Up</ButtonConfirmText>
          </ButtonConfirm>
        </Wrapper>
      </Root>
    )
  }

  handleOutsidePress = () => Keyboard.dismiss()

  handleChangeText = (text, type) => this.setState({ [type]: text })

  checkIfDisabled = () => {
    const { fullName, email, password, username } = this.state
    return !fullName || !email || !password || !username
  }

  handleSignupPress = async () => {
    this.setState({ loading: true })
    const { fullName, email, password, username } = this.state
    const avatar = fakeAvatar

    try {
      const { data } = await this.props.mutate({
        variables: {
          fullName,
          email,
          password,
          username,
          avatar,
        },
      })

      await AsyncStorage.setItem('@twitter-clone', data.signup.token)
      this.setState({ loading: false })
      return this.props.login()
    } catch (error) {
      throw error
    }
  }
}

export default compose(graphql(SIGNUP_MUTATION), connect(undefined, { login }))(
  SignupForm
)
