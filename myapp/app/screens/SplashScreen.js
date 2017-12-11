import React, {Component} from 'react';
import { Animated, Text, View, StyleSheet, Image, Dimensions, TouchableHighlight } from 'react-native';
import MyButton from '../components/MyButton.js';

class FadeInView extends Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
   };

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 10000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;
// You can then use your `FadeInView` in place of a `View` in your components:
export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FadeInView style={{backgroundColor: 'transparent'}}>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')}>
                 <Image style={ styles.item } source = {require('../components/cute_ball_time.png')}/>
          </TouchableHighlight>
        </FadeInView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  item: {
    width: deviceWidth,
    height: deviceWidth,
  },
});