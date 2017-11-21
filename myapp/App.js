import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  ToolbarAndroid,
  TextInput,
  Picker,
  TouchableHighlight,
  ScrollView,
  ListView,
  ActivityIndicator,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './views/Login';
import HomeScreenTest from './views/HomeScreen';
import ResultScreenTest from './views/ResultScreen';
import MoviesScreenTest from './views/Movies';
import BuyScreenTest from './views/BuyScreen';
import SellScreenTest from './views/SellScreen';

class Movies extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <MoviesScreenTest />
    );
  }
}

class LoginScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Login />
    );
  }

}

class HomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <HomeScreenTest />
    );
  }
}

class SellScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <SellScreenTest />
    );
  }
}

class BuyScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <BuyScreenTest />
    );
  }
}

class ResultScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ResultScreenTest />
    );
  }
}

export default myapp = StackNavigator({
  Home: { screen: HomeScreen },
  Login:{ screen: LoginScreen},
  Sell: { screen: SellScreen },
  Buy : { screen: BuyScreen },
  Result : { screen: ResultScreen },
  Movies : {screen: Movies},
});

// if you are using create-react-native-app you don't need this line
// AppRegistry.registerComponent('myapp', () => myapp);

