import React, { Component } from 'react';
import Container from '/home/ju/PycharmProjects/myapp/src/components/Container.js';
import MyButton from '/home/ju/PycharmProjects/myapp/src/components/MyButton.js';
import Label from '/home/ju/PycharmProjects/myapp/src/components/Label.js';
import { Root, Tabs } from '/home/ju/PycharmProjects/myapp/app/config/router.js';
import { NavigationActions } from 'react-navigation'
import {StyleSheet, Text, View, TextInput, ScrollView, Alert} from 'react-native';
import {Button} from 'react-native-elements'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '',
                  password: '',
                  first_name: '',
                  last_name: '',
                  email: '',
                  email_validated: false,

    };
  }

  validate_email_style=()=> {return this.state.email_validated? '#00BB00': '#FF0000'};

  validate_email = (text) => {
    console.log(text);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(reg.test(text) === false) {
        console.log("Email is Not Correct");
        this.setState({email:text , email_validated:false});
    }else {
        this.setState({email:text, email_validated: true});
         console.log("Email is Correct");
    }
  };

  onContinueAs = () => {
      if (this.state.email_validated){
          this.props.navigation.navigate('HomeScreen', {email: this.state.email})
      }else {
          let message_erreur = '';
          if (this.state.email === ''){
              message_erreur = 'Enter a valid email';
          }else {
              message_erreur = 'invalid email format';
          }
          Alert.alert('Login Error', message_erreur, [{text: 'OK', onPress: () => console.log('OK Pressed')},], { cancelable: false })
      }
  };

  pass(){};

  _getToken = () =>{

      fetch('https://xoxoxo.localtunnel.me/auth/', {
          method: 'POST',
          headers: {
              'Accept': '*/*',
              'Content-Type': '*/*',

          },
          body: JSON.stringify({
              'username': 'ju',
              'password': this.state.password,
          })
      })
          .then(result => result.json())
          .catch(error => {
                  console.log('login():Error Stack2: ' + error.stack);
                  let message_erreur = 'problem connection';
                  Alert.alert('Alert Title', message_erreur, [{text: 'OK', onPress: () => console.log('OK Pressed')},], { cancelable: false })
              }
          )
          .then((response) => {
              console.log(response);
              if (response.token){
                  this.onContinueAs();
              }else {
                  let message_erreur = 'Wrong user or password ';
                  Alert.alert('Alert Title', message_erreur, [{text: 'OK', onPress: () => console.log('OK Pressed')},], { cancelable: false })
              }
          });

  };

  componentDidUpdate(prevProps, prevState) {}


  render() {
    let colorStyles = {color: this.validate_email_style()};

    return (
        <ScrollView style={styles.scroll}>
            <Container>
                <MyButton
                    label="Forgot Login/Pass"
                    styles={{button: styles.alignRight, label: styles.label}}
                    onPress={() => this.pass()} />
            </Container>
            <Container>
                <Label text="Email" />
                    <TextInput
                        style={[styles.textInput, colorStyles]}
                        onChangeText={this.validate_email}
                        value = {this.state.email}
                    />

            </Container>
            <Container>
                <Label text="Password" />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({password:text})}

                />
            </Container>
            <View >
                <Container>
                    <Button
                        large
                        disabled ={!this.state.email_validated}
                        backgroundColor={'dodgerblue'}
                        title="Sign In"
                        styles={styles.buttonBigText}
                        onPress={this._getToken} />
                </Container>
                <Container>
                    <MyButton
                        label="CANCEL"
                        styles={{label: styles.buttonBlackText}}
                        onPress={() => this.pass()} />
                </Container>
                <Container>
                <MyButton
                    styles={{button: styles.transparentButton}}
                    onPress={() => this.pass()}
                >
                    <View style={styles.inline}>
                        <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text>
                        <Text style={styles.buttonBlueText}>with Facebook</Text>
                    </View>
                </MyButton>
            </Container>
            </View>
        </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
    scroll: {
        backgroundColor: '#E1D7D8',
        padding: 30,
        flexDirection: 'column'
    },
    label: {
        color: '#0d8898',
        fontSize: 20
    },
    alignRight: {
        alignSelf: 'flex-end'
    },
    textInput: {
        height: 80,
        fontSize: 30,
        backgroundColor: '#FFF'
    },
    textInput_email: {
        height: 80,
        fontSize: 30,
    },
    transparentButton: {
        marginTop: 30,
        borderColor: '#3B5699',
        borderWidth: 2
    },
    buttonBlueText: {
        fontSize: 20,
        color: '#3B5699'
    },
    buttonBigText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    inline: {
        flexDirection: 'row'
    },
    buttonWhiteText: {
        fontSize: 20,
        color: '#FFF',
    },
    buttonBlackText: {
        fontSize: 20,
        color: '#595856'
    },
    primaryButton: {
        backgroundColor: '#3B5699'
    },
    footer: {
       marginTop: 100
    }
});