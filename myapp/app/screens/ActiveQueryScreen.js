import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, Linking, Button, Alert } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import styles from '../styles/styles.js';
import Mailer from 'react-native-mail';
import Swipeout from 'react-native-swipeout';


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
      activeRowKey: null,
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

  deletePost = (index, item) => {
      console.log(item);
      let id = item.id;
      console.log('voici le it  ' + id);

      fetch('https://xoxoxo.localtunnel.me/snippets/' + id + '/', {
                method: 'DELETE',
                headers: {
                    'Accept': '*/*',
                    'Authorization': 'Token e3ee5d525aa8e785a76104d1da8f393b284503b3'
                }
            })
                .then(result => result.json())
                .catch(error => {
                    console.log('erreur ' + error.stack);
                    let message_erreur = 'connection problem';
                    Alert.alert('Alert Title', message_erreur, [{text: 'OK', onPress: () => console.log('OK Pressed')},], { cancelable: false })
                })
  };

  componentDidMount() {
    const {page} = this.state;
    this.setState({ loading: true });

    fetch('https://xoxoxo.localtunnel.me/snippets/')
      .then((res) => res.json())
      .catch((error) => {this.setState({ error, loading: false });})
      .then((response) => {

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
          renderItem={({ index, item }) => (
              <Swipeout
                autoclose={true}
                onClose={() => {if (this.state.activeRowKey !== null){this.setState({activeRowKey:null});} }}
                onOpen={() => {this.setState({activeRowKey:item.id})}}
                right={[
                {
                    onPress: () => {
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete?',
                            [
                                {text:'No', onPress: () => console.log('Cancel, Pressed')},
                                {text: 'Yes', onPress: () => {
                                    this.state.data.splice(index,1);
                                    this.setState({activeRowKey: null});
                                    this.deletePost(index, item);
                                }}
                            ],
                            {cancelable: true}
                            );
                    },
                    text: 'Delete', type: 'delete'
                }
                 ]}
                rowId={index}
                backgroundColor={'transparent'}

              >
                <ListItem
                  roundAvatar
                  title={item.keywords}
                  subtitle={'min price : ' + item.min_price + ' max price :' + item.max_price + ' condition : ' + item.condition }
                  avatar={{ uri: 'https://www.gravatar.com/avatar/'}}
                  containerStyle={{ borderBottomWidth: 0 }}
                  item={item}
                  index={index}
                />
              </Swipeout>
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

