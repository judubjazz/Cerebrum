import React, { Component } from 'react';
import styles from '../styles/styles.js';
import {ScrollView, Text} from 'react-native';
import Camera from 'react-native-camera';

export default class SellScreen extends Component {
  static navigationOptions = {
    title: 'Sell on Ebay',
  };
  takePicture() {
   this.camera.capture()
     .then((data) => console.log(data))
     .catch(err => console.error(err));
 }
  render() {
    return (
        <Camera
           ref={(cam) => {
             this.camera = cam;
           }}
           style={styles.preview}
           aspect={Camera.constants.Aspect.fill}>
           <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
       </Camera>

    );
  }
}