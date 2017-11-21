import React, { Component } from 'react';
import styles from '/home/ju/PycharmProjects/myapp/styles/styles.js';
import {ScrollView, TextInput, View, Picker, ToolbarAndroid, Text} from 'react-native';
import _ from 'lodash'
import { NavigationActions } from 'react-navigation'
import CheckboxField from 'react-native-checkbox-field';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements'


export default class BuyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {keywords: '',
                  condition: '',
                  sort_order: '',
                  email:this.props.navigation.state.email,
                  min_price: '0',
                  max_price: '',
                  user:'',
                  selected: false,
                  card_company: '',
                  hockey_team:'',
    };
  }

  getNavigationParams= () => {return this.props.navigation.state.params || {}};

  searchExactSentence = (string) => {
      if (!this.state.selected) {
          string = string.replace(/,/g , " ");
      }else {
          string = string.split(/[ ,]+/).join(',');
      }
      return string
  };

  ContinueToResultScreen = () => {
      let params = this.getNavigationParams();
      let keywords = this.searchExactSentence(this.state.keywords + ' ' +this.state.hockey_team + ' ' + this.state.card_company);
      console.log(keywords);
      console.log(this.state.selected);
      this.props.navigation.navigate('ResultScreen', {
                          email: params.email,
                          keywords: keywords,
                          condition: this.state.condition,
                          min_price: this.state.min_price,
                          max_price: this.state.max_price,
                          sort_order: this.state.sort_order,
                        });
  };


  render() {

    return (
      <View style={styles.container}>
        <ToolbarAndroid
          title='Options'
          style={styles.toolbar}
         />

          <TextInput
            style={{height: 40}}
            placeholder="Keywords"
            onChangeText={(text) => this.setState({keywords:text})}
          />

          <CheckboxField
            onSelect={() => this.setState({selected: !this.state.selected})}
            selected={this.state.selected}
            label="search exact keywords"
            labelSide="left"
          >
          <Icon name="check" color="#fff" />
          </CheckboxField>

          <TextInput
            style={{height: 40}}
            placeholder="min price"
            onChangeText={(text) => this.setState({min_price:text})}
          />

          <TextInput
            style={{height: 40}}
            placeholder="max price"
            onChangeText={(text) => this.setState({max_price:text})}
          />

          <Picker
            selectedValue={this.state.sort_order}
            onValueChange={(itemValue, itemIndex) => this.setState({sort_order: itemValue})}>
            <Picker.Item label="Select the item sort order" value="" />
            <Picker.Item label="CurrentPriceLowest" value="CurrentPriceLowest" />
            <Picker.Item label="CurrentPriceHighest" value="CurrentPriceHighest" />
          </Picker>

          <Picker
            selectedValue={this.state.condition}
            onValueChange={(itemValue, itemIndex) => this.setState({condition: itemValue})}>
            <Picker.Item label="Select a item condition" value="" />
            <Picker.Item label="Used" value="Used" />
            <Picker.Item label="New" value="New" />
          </Picker>

          <Picker
            selectedValue={this.state.card_company}
            onValueChange={(itemValue, itemIndex) => this.setState({card_company: itemValue})}>
            <Picker.Item label="Select a card company" value="" />
            <Picker.Item label="Bowman Gum" value="Bowman Gum" />
            <Picker.Item label="Donruss Fleer" value="Donruss Fleer" />
            <Picker.Item label="In the Game Trading Cards" value="In the Game Trading Cards" />
            <Picker.Item label="Leaf Trading Cards" value="Leaf Trading Cards" />
            <Picker.Item label="O-Pee-Chee" value="O-Pee-Chee" />
            <Picker.Item label="Panini" value="Panini" />
            <Picker.Item label="Parkhurst Products" value="Parkhurst Products" />
            <Picker.Item label="Philadelphia Gum" value="Philadelphia Gum" />
            <Picker.Item label='Pinnacle Brands'  value='Pinnacle Brands' />
            <Picker.Item label='Playoff' value='Playoff' />
            <Picker.Item label='Pro Set' value='Pro Set' />
            <Picker.Item label='Razor Entertainment'  value='Razor Entertainment' />
            <Picker.Item label='SkyBox International' value='SkyBox International' />
            <Picker.Item label='Topps'  value='Topps' />
            <Picker.Item label='Upper Deck' value='Upper Deck' />
          </Picker>

          <Picker
            selectedValue={this.state.hockey_team}
            onValueChange={(itemValue, itemIndex) => this.setState({hockey_team: itemValue})}>
            <Picker.Item label="Select a hockey team" value="" />
            <Picker.Item label="Montreal Canadiens" value="Montreal Canadiens" />
            <Picker.Item label="Toronto Maple Leafs" value="Toronto Maple Leafs" />
            <Picker.Item label="Edmonton Oilers" value='Edmonton Oilers' />
            <Picker.Item label="Ottawa Senators" value='Ottawa Senators' />
            <Picker.Item label='Calgary Flames' value='Calgary Flames' />
            <Picker.Item label='Winnipeg Jets' value='Winnipeg Jets' />
            <Picker.Item label='Quebec Nordiques' value='Quebec Nordiques' />
            <Picker.Item label='New York Rangers' value='New York Rangers' />
            <Picker.Item label='Vancouver Canucks'  value='Vancouver Canucks' />
            <Picker.Item label='Boston Bruins' value='Boston Bruins' />
            <Picker.Item label='New York Islanders' value='New York Islanders' />
            <Picker.Item label='Detroit Red Wings'  value='Detroit Red Wings' />
            <Picker.Item label='New Jersey Devils' value='New Jersey Devils' />
            <Picker.Item label='Tampa Bay Lightning'  value='Tampa Bay Lightning' />
            <Picker.Item label='Buffalo Sabers'  value='Buffalo Sabers' />
            <Picker.Item label='Pittsburgh Penguins' value='Pittsburgh Penguins' />
            <Picker.Item label='Vegas Golden Knights' value='Vegas Golden Knights' />
            <Picker.Item label='Chicago Blackhawks' value='Chicago Blackhawks' />
            <Picker.Item label='Colorado Avalanche' value='Colorado Avalanche' />
            <Picker.Item label='Philadelphia Flyers' value='Philadelphia Flyers' />
            <Picker.Item label='St. Louis Blues' value='St. Louis Blues' />
            <Picker.Item label='Washington Capitals' value='Washigton Capitals' />
            <Picker.Item label='Anaheim Ducks' value='Anaheim Ducks' />
            <Picker.Item label='Florida Panthers'  value='Florida Panthers' />
            <Picker.Item label='Arizona Coyotes' value='Arizona Coyotes' />
            <Picker.Item label='Los Angeles Kings' value='Los Angeles Kings' />
            <Picker.Item label='Colombus Blue Jackets'  value='Colombus Blue Jackets' />
            <Picker.Item label='Dallas Stars' value='Dallas Stars' />
            <Picker.Item label='Carolina Hurricanes'  value='Carolina Hurricanes' />
            <Picker.Item label='Minnesota Wild' value='Minnesota Wild' />
          </Picker>

          <Button
              containerViewStyle={styles.container}
              backgroundColor={'dodgerblue'}
              borderRadius={5}
              large
              onPress={this.ContinueToResultScreen}
              title="See Results"
              style={styles.buttonStyle}
            />

        </View>

    );
  }
}