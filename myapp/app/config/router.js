import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import BuyScreen from '../screens/BuyScreen'
import HomeScreen from '../screens/HomeScreen'
import ResultScreen from '../screens/ResultScreen'
import SellScreen from '../screens/SellScreen'
import Login from '../screens/Login'
import AlertScreen from '../screens/AlertScreen'
import ActiveQueryScreen from '../screens/ActiveQueryScreen'
import SplashScreen from '../screens/SplashScreen'

export const SettingsStack = StackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {title: 'Home'},
  },
  BuyScreen: {
    screen: BuyScreen,
    navigationOptions: {title: 'BuyScreen'},
  },
  SellScreen: {
    screen: SellScreen,
    navigationOptions: {title: 'Sellscreen'},
  },
  ActiveQueryScreen: {
    screen: ActiveQueryScreen,
    navigationOptions: {title: 'Active Query'},
  },
  ResultScreen: {
    screen: ResultScreen,
    navigationOptions: {title: 'ResultScreen'},
  },
  AlertScreen: {
    screen: AlertScreen,
    navigationOptions: {title: 'Alert'},
  },
});

export const Root = StackNavigator({
  SplashScreen: {
    screen: SplashScreen,
  },
  Login: {
    screen: Login,
    navigationOptions: {tabBarLabel: 'Login'}
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  headerMode: 'none',
});

