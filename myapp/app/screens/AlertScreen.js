'use strict';

import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Alert} from 'react-native';
import {email} from 'react-native-communications'
import {Button} from 'react-native-elements'


export default class AlertScreen extends Component {
    constructor(props) {
    super(props);

    this.state = {
      keywords: this.props.navigation.state.params.keywords,
      email:this.props.navigation.state.params.email,
      condition: this.props.navigation.state.params.condition,
      sort_order: this.props.navigation.state.params.sort_order,
      min_price: this.props.navigation.state.params.min_price,
      max_price: this.props.navigation.state.params.max_price,
      show_text:false,
    };
  }

    getNavigationParams= () => {return this.props.navigation.state.params || {}};

    createBodyTextEmail = () => {
      return 'Cher' + this.state.email + ' Il n y a aucun item en vente sur ebay pour la recherche de "' + this.state.keywords +
          '". Un email vous sera envoyé si un item correspond à cette recherche. Merci'
    };

    sendEmail = () => {
      let message = this.createBodyTextEmail;
      email([this.state.email, 'julienguite3@hotmail.com'], null, null, 'Alerte', message)
    };

    doFetch = () =>{
        let params = this.getNavigationParams;
        console.log(this.state);
        fetch('https://xoxoxo.localtunnel.me/snippets/', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': '*/*',
                    'Authorization': 'Token e3ee5d525aa8e785a76104d1da8f393b284503b3'
                },
                body: JSON.stringify({
                    'email':this.state.email,
                    'keywords': this.state.keywords,
                    'condition': this.state.condition,
                    'sort_order': this.state.sort_order,
                    'min_price': this.state.min_price,
                    'max_price': this.state.max_price,
                    'currency': 'USD',
                })
            })
                .then(result => result.json())
                .catch(error => {
                    console.log('erreur ' + error.stack);
                    let message_erreur = 'connection problem';
                    Alert.alert('Alert Title', message_erreur, [{text: 'OK', onPress: () => console.log('OK Pressed')},], { cancelable: false })
                })
                .then((response) => {
                    console.log('response   ' + response);
                    if (response !== undefined){
                        this.setState({show_text: true});
                        console.log("show_text_false")
                    }

                })
    };

    _showText = () =>{
        if (this.state.show_text) {
            console.log("test de show text");
            return (
                <View>
                    <Text>Your request has been saved, Thank you!</Text>
                </View>
            );
        } else {
            return null;
        }
    };

    componentDidMount(){
      let params = this.getNavigationParams
    }

    render() {
        return (
            <View style={styles.container}>
              <TouchableOpacity
                  onPress={this.sendEmail}>
                <View>
                  <Text style={styles.text}>
                      There is no available item on ebay for the query :
                      <Text style={{textDecorationLine: 'underline'}}>
                          {this.state.keywords}
                      </Text>
                  </Text>
                  <Text style={styles.text}>Save the query to the database to receive an email when it comes available or do another query
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{flexDirection:'row'}}>
                  <Button
                      onPress={()=> this.props.navigation.navigate('BuyScreen',{email:this.state.email}) }
                      large
                      backgroundColor={'dodgerblue'}
                      title={'Do Another Query'}
                      borderRadius={20}
                  />
                  <Button
                      onPress={this.doFetch}
                      large
                      backgroundColor={'dodgerblue'}
                      title={'Save the Query'}
                      borderRadius={20}
                  />
              </View>
               {this._showText()}
            </View>



        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(253,253,253)',
  },
  holder: {
    flex: 0.25,
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
});

