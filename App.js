import React, { Component } from 'react'
import { AppLoading } from 'expo'
import { UIManager, AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

import { store, client } from './src/store'
import { login } from './src/actions/user'
import { colors } from './src/utils/constants'
import AppNavigation from './src/navigation'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class App extends Component {
  state = {
    appIsReady: false,
  }

  render() {
    if (!this.state.appIsReady) {
      return <AppLoading />
    }
    return (
      <ApolloProvider store={store} client={client}>
        <ActionSheetProvider>
          <ThemeProvider theme={colors}>
            <AppNavigation />
          </ThemeProvider>
        </ActionSheetProvider>
      </ApolloProvider>
    )
  }

  componentDidMount() {
    this.checkIfToken()
  }

  checkIfToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@twitter-clone')
      if (token) {
        store.dispatch(login())
      }
    } catch (error) {
      throw error
    }

    this.setState({ appIsReady: true })
  }
}
