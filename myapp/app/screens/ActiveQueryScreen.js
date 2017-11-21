import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Linking, Button, Alert } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import styles from '/home/ju/PycharmProjects/myapp/styles/styles.js';
import Mailer from 'react-native-mail';

let url_filter = "";
let url = "";

export default class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false,
      email:this.props.navigation.state.params.email,
    };
  }
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
    this.setState({ loading: true });

    fetch('https://xoxoxo.localtunnel.me/snippets/')
      .then((res) => res.json())
      .catch((error) => {this.setState({ error, loading: false });})
      .then((response) => {
          console.log(response);
          this.setState({
              data: page === 1 ? response : [...this.state.data, ...response],
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
              title={item.keywords}
              subtitle={'min price : ' + item.min_price + ' max price :' + item.max_price + ' condition : ' + item.condition }
              avatar={{ uri: 'https://www.gravatar.com/avatar/'}}
              containerStyle={{ borderBottomWidth: 0 }}
              // onPress={() => Linking.openURL(item.viewItemURL[0])}
            />
          )}
          keyExtractor={item => item.id}
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

