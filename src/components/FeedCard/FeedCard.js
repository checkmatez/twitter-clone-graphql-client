import React, { Component } from 'react'
import styled from 'styled-components/native'

import FeedCardHeader from './FeedCardHeaders'
import FeedCardFooter from './FeedCardFooter'

const Root = styled.View`
  minHeight: 180;
  backgroundColor: ${p => p.theme.WHITE};
  width: 100%;
  padding: 7px;
  shadowColor: ${p => p.theme.SECONDARY};
  shadowOffset: 0px 2px;
  shadowRadius: 2;
  shadowOpacity: 0.1;
  marginVertical: 5;
`

const CardContentContainer = styled.View`
  flex: 1;
  padding: 10px 20px 10px 0px;
`

const CardContentText = styled.Text`
  fontSize: 14;
  textAlign: left;
  fontWeight: 500;
  color: ${p => p.theme.SECONDARY};
`

class FeedCard extends Component {
  render() {
    const { text, user, createdAt, favoriteCount } = this.props
    return (
      <Root>
        <FeedCardHeader {...user} createdAt={createdAt} />
        <CardContentContainer>
          <CardContentText>
            {text}
          </CardContentText>
        </CardContentContainer>
        <FeedCardFooter favoriteCount={favoriteCount} />
      </Root>
    )
  }
}

export default FeedCard
