import React, { Component } from 'react'
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation'
import { connect } from 'react-redux'
import { Keyboard } from 'react-native'
import { FontAwesome, SimpleLineIcons, EvilIcons } from '@expo/vector-icons'

import HomeScreen from './components/screens/HomeScreen'
import ExploreScreen from './components/screens/ExploreScreen'
import NotificationScreen from './components/screens/NotificationScreen'
import ProfileScreen from './components/screens/ProfileScreen'
import AuthenticationScreen from './components/screens/AuthenticationScreen'
import NewTweetScreen from './components/screens/NewTweetScreen'
import HeaderAvatar from './components/HeaderAvatar'
import ButtonHeader from './components/ButtonHeader'
import { colors } from './utils/constants'

const TAB_ICON_SIZE = 20

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: 'Home',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="home" />,
      }),
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: () => ({
        headerTitle: 'Explore',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="search" />,
      }),
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: () => ({
        headerTitle: 'Notification',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="bell" />,
      }),
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: 'ProfileScreen',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome size={TAB_ICON_SIZE} color={tintColor} name="user" />,
      }),
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5,
      },
    },
  }
)

const NewTweetModal = StackNavigator(
  {
    NewTweet: {
      screen: NewTweetScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => {
              Keyboard.dismiss()
              navigation.goBack(null)
            }}
          >
            <EvilIcons color={colors.PRIMARY} size={25} name="close" />
          </ButtonHeader>
        ),
      }),
    },
  },
  { headerMode: 'none' }
)

const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <HeaderAvatar />,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => navigation.navigate('NewTweet')}
          >
            <SimpleLineIcons color={colors.PRIMARY} size={20} name="pencil" />
          </ButtonHeader>
        ),
      }),
    },
    NewTweet: {
      screen: NewTweetModal,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#f1f6fa',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY,
      },
    }),
  }
)

class AppNavigator extends Component {
  render() {
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    })
    if (!this.props.user.isAuthenticated) {
      return <AuthenticationScreen />
    }
    return <AppMainNav navigation={nav} />
  }
}

export default connect(state => ({ nav: state.nav, user: state.user }))(
  AppNavigator
)

export const router = AppMainNav.router
