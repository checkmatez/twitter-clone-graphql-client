import React, { Component } from 'react'
import styled from 'styled-components/native'
import { SimpleLineIcons, Entypo } from '@expo/vector-icons'
import Touchable from '@appandflow/touchable'

import { colors } from '../../utils/constants'

const ICON_SIZE = 20

const Root = styled.View`
  flexDirection: row;
  height: 40;
`

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  flexDirection: row;
  flex: 1;
  alignItems: center;
  justifyContent: space-around;
  paddingHorizontal: 32px;
`

const ButtonText = styled.Text`
  fontSize: 14;
  fontWeight: 500;
  color: ${p => p.theme.LIGHT_GRAY};
`

const isFavorite = true

const FeedCardFooter = ({ favoriteCount }) =>
  <Root>
    <Button>
      <SimpleLineIcons
        name="bubble"
        size={ICON_SIZE}
        color={colors.LIGHT_GRAY}
      />
      <ButtonText>
        {favoriteCount}
      </ButtonText>
    </Button>
    <Button>
      <Entypo name="retweet" size={ICON_SIZE} color={colors.LIGHT_GRAY} />
      <ButtonText>
        {favoriteCount}
      </ButtonText>
    </Button>
    <Button>
      <Entypo
        name="heart"
        size={ICON_SIZE}
        color={isFavorite ? 'red' : colors.LIGHT_GRAY}
      />
      <ButtonText>
        {favoriteCount}
      </ButtonText>
    </Button>
  </Root>

export default FeedCardFooter
