import React, { Component } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { graphql, compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'

import { getUserInfo } from '../../actions/user'
import FeedCard from '../FeedCard'
import GET_TWEETS_QUERY from '../../graphql/queries/getTweets'
import ME_QUERY from '../../graphql/queries/me'

const Root = styled.View`
  flex: 1;
  paddingTop: 5;
`

const List = styled.FlatList``

class HomeScreen extends Component {
  state = {}

  render() {
    const { data, error } = this.props
    if (data.loading) {
      return (
        <Root>
          <ActivityIndicator size="large" />
        </Root>
      )
    }
    return (
      <Root>
        <FlatList
          contentContainerStyle={{ alignSelf: 'stretch' }}
          data={data.getTweets}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
        />
      </Root>
    )
  }

  componentDidMount() {
    this.getUserInfo()
  }

  renderItem = ({ item }) => <FeedCard {...item} />

  getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY })
    this.props.getUserInfo(me)
  }
}

export default withApollo(
  compose(connect(undefined, { getUserInfo }), graphql(GET_TWEETS_QUERY))(
    HomeScreen
  )
)
