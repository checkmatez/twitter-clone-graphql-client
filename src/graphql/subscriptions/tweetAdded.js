import { gql } from 'react-apollo'

export default gql`
  subscription {
    tweetAdded {
      _id
      createdAt
      text
      favoriteCount
      user {
        username
        firstName
        lastName
        avatar
      }
    }
  }
`
