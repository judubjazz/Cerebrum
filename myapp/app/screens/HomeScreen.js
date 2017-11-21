import React, { Component } from 'react';
import styles from '/home/ju/PycharmProjects/myapp/styles/styles.js';
import { NavigationActions } from 'react-navigation'
import {Text, View,} from 'react-native';
import { Button } from 'react-native-elements'


export default class HomeScreen extends Component {

  componentDidUpdate(prevP, prevS) {}

  getParams= () => {
      if (this.props.navigation.state.params === undefined){
        return ''
    }else{
          return this.props.navigation.state.params.email
      }
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={styles.container}>

        <View style={styles.centerText }>
            <Text style={styles.loginWelcome} >Welcome {this.getParams()}</Text>
        </View>

        <View style={styles.buttonHome}>
            <Button
              backgroundColor={'dodgerblue'}
              borderRadius={20}
              large
              onPress={() => navigate('SellScreen')}
              title="Sell on Ebay"
              style={styles.buttonStyle}
            />
          <Button
              backgroundColor={'dodgerblue'}
              borderRadius={20}
              large
              onPress={() => navigate('BuyScreen', {email:this.props.navigation.state.params.email})}
              title="Buy on Ebay"
              style={styles.buttonStyle}
          />
        </View>

          <Button
              containerViewStyle={styles.container}
              backgroundColor={'dodgerblue'}
              borderRadius={5}
              large
              onPress={() => navigate('ActiveQueryScreen', {email:this.props.navigation.state.params.email})}
              title="See Active Alert"
              style={styles.buttonStyle}
            />

      </View>
    );
  }
}

