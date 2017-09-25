import React, { Component } from 'react'
import styled from 'styled-components/native'
import { Platform, Keyboard } from 'react-native'
import Touchable from '@appandflow/touchable'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'

import CREATE_TWEET_MUTATION from '../../graphql/mutations/createTweet'
import GET_TWEETS_QUERY from '../../graphql/queries/getTweets'
import { colors } from '../../utils/constants'

const Root = styled.View`
  background-color: ${p => p.theme.WHITE};
  flex: 1;
  align-items: center;
`

const Wrapper = styled.View`
  height: 80%;
  width: 90%;
  padding-top: 5;
  position: relative;
`

const Input = styled.TextInput.attrs({
  multiline: true,
  maxLength: 140,
  placeholder: "What's happening?",
  selectionColor: Platform.OS === 'ios' && colors.PRIMARY,
  autoFocus: true,
})`
  height: 40%;
  width: 100%;
  font-size: 18;
  color: ${p => p.theme.SECONDARY};
`

const TweetButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, left: 20, right: 20 },
})`
  background-color: ${p => p.theme.PRIMARY};
  align-items: center;
  justify-content: center;
  width: 80;
  height: 40;
  border-radius: 20;
  position: absolute;
  top: 60%;
  right: 0;
`

const TweetButtonText = styled.Text`
  color: ${p => p.theme.WHITE};
  font-size: 16;
`

const TextLength = styled.Text`
  color: ${p => p.theme.PRIMARY};
  font-size: 18;
  position: absolute;
  top: 45%;
  right: 5%;
`

class NewTweetScreen extends Component {
  state = {
    text: '',
  }

  render() {
    return (
      <Root>
        <Wrapper>
          <Input value={this.state.text} onChangeText={this.handleTextChange} />
          <TextLength>
            {140 - this.state.text.length}
          </TextLength>
          <TweetButton
            onPress={this.handleCreateTweet}
            disabled={this.buttonDisabled}
          >
            <TweetButtonText>Tweet</TweetButtonText>
          </TweetButton>
        </Wrapper>
      </Root>
    )
  }

  handleTextChange = text => this.setState({ text })

  handleCreateTweet = () => {
    const { user } = this.props
    this.props.mutate({
      variables: {
        text: this.state.text,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createTweet: {
          __typename: 'Tweet',
          _id: Math.round(Math.random() * -1000000),
          createdAt: new Date(),
          text: this.state.text,
          favoriteCount: 0,
          user: {
            __typename: 'User',
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
          },
        },
      },
      update: (store, { data: { createTweet } }) => {
        const data = store.readQuery({ query: GET_TWEETS_QUERY })
        if (!data.getTweets.find(t => t._id === createTweet._id)) {
          store.writeQuery({
            query: GET_TWEETS_QUERY,
            data: { getTweets: [{ ...createTweet }, ...data.getTweets] },
          })
        }
      },
    })
    Keyboard.dismiss()
    this.props.navigation.goBack(null)
  }

  get buttonDisabled() {
    return this.state.text.length < 5
  }
}

export default compose(
  graphql(CREATE_TWEET_MUTATION),
  connect(state => ({ user: state.user.info }))
)(NewTweetScreen)
