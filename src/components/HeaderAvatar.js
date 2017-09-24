import React, { Component } from 'react'
import styled from 'styled-components/native'
import { withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import { logout } from '../actions/user'
import ButtonHeader from './ButtonHeader'
import Loading from './Loading'

const AVATAR_SIZE = 30
const AVATAR_RADIUS = AVATAR_SIZE / 2

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`

class HeaderAvatar extends Component {
  render() {
    if (!this.props.info) {
      return (
        <ButtonHeader side="left" disabled>
          <Loading size="small" />
        </ButtonHeader>
      )
    }
    return (
      <ButtonHeader side="left" onPress={this.handleOpenActionSheet}>
        <Avatar source={{ uri: this.props.info.avatar }} />
      </ButtonHeader>
    )
  }

  handleOpenActionSheet = () => {
    const options = ['Logout', 'Cancel']
    const destructiveButtonIndex = 0
    this.props.showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.client.resetStore()
          return this.props.logout()
        }
      }
    )
  }
}

export default withApollo(
  connect(state => ({ info: state.user.info }), { logout })(
    connectActionSheet(HeaderAvatar)
  )
)
