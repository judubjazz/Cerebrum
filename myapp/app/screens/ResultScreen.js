import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Linking, Button, Alert } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import styles from '/home/ju/PycharmProjects/myapp/styles/styles.js';
import Mailer from 'react-native-mail';

let url_filter = "";
let url = "";

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false,
      keywords: this.props.navigation.state.params.keywords,
      condition: this.props.navigation.state.params.condition,
      sort_order: this.props.navigation.state.params.sort_order,
      email:this.props.navigation.state.params.email,
      min_price: this.props.navigation.state.params.min_price,
      max_price: this.props.navigation.state.params.max_price,
    };
  }

  buildFilterArray = () =>{
      let filter_array = [
                {"name":"MaxPrice",
                "value":this.state.max_price,
                "paramName":"Currency",
                "paramValue":"USD"},
                {"name":"MinPrice",
                "value":this.state.min_price,
                "paramName":"Currency",
                "paramValue":"USD"},
      ];
      if (this.state.condition !== ''){
          filter_array.push({"name":"Condition", "value":this.state.condition})
      }
      console.log(filter_array);

      if (this.state.max_price === ''){filter_array.shift();}
      // Iterate through each filter in the array
      for(let i=0; i < filter_array.length; i++) {
        //Index each item filter in filter_array
        let item_filter = filter_array[i];
        // Iterate through each parameter in each item filter
        for(let index in item_filter) {
          // Check to see if the paramter has a value (some don't)
          if (item_filter[index] !== "") {
            if (item_filter[index] instanceof Array) {
              for(let r = 0; r < item_filter[index].length; r++) {
              let value = item_filter[index][r];
              url_filter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value ;
              }
            }else {
              url_filter += "&itemFilter\(" + i + "\)." + index + "=" + item_filter[index];
            }
          }
        }
      }
  };

  buildQueryURL = () => {
    url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=juliengu-carte-PRD-fec73a437-365ab89a";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    url += "&REST-PAYLOAD";
    url += "&keywords=" + this.state.keywords;
    url += "&paginationInput.entriesPerPage=3";
    url += "&sortOrder="+this.state.sort_order;
    url += url_filter;
  };


  // handleRefresh = () => {
  //   this.setState(
  //     {
  //       page: 1,
  //       seed: this.state.seed + 1,
  //       refreshing: true
  //     },
  //     () => {this.makeRemoteRequest();}
  //   );
  // };

  // handleLoadMore = () => {
  //   this.setState({page: this.state.page + 1}, () => {this.makeRemoteRequest();});
  // };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Result" lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  componentDidMount() {
    const {page} = this.state;

    this.buildFilterArray();
    this.buildQueryURL();

    this.setState({ loading: true });

    fetch(url)
      .then((res) => res.json())
      .catch((error) => {this.setState({ error, loading: false });})
      .then((response) => {
        let findItemsByKeywordsResponse  = response.findItemsByKeywordsResponse;
        let test = findItemsByKeywordsResponse[0];
        let searchResult = test.searchResult;
        let items = searchResult[0].item;
        if (items === undefined){
            this.props.navigation.navigate('AlertScreen',
                {email:this.state.email,
                 keywords:this.state.keywords,
                 condition: this.state.condition,
                 max_price:this.state.max_price,
                 min_price:this.state.min_price,
                 sort_order:this.state.sort_order});
            // console.log(this.state.send_email);
            // console.log(this.props.navigation);
        }
        this.setState({
              data: page === 1 ? items : [...this.state.data, ...items],
              error: response.error || null,
              loading: false,
              refreshing: false,
          });
      })

  }

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.title[0]}
              subtitle={item.sellingStatus[0].currentPrice[0].__value__ + '$'}
              avatar={{ uri: item.galleryURL[0] }}
              containerStyle={{ borderBottomWidth: 0 }}
              onPress={() => Linking.openURL(item.viewItemURL[0])}
            />
          )}
          keyExtractor={item => item.itemId}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          // onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          // onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>

    );
  }
}

export default FlatListDemo;
