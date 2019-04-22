import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AsyncStorage } from 'react-native';

import { connect } from 'react-redux'
import { actions } from '../redux';
const withRedux = connect(
  state => state.app,
  dispatch => ({
  })
);

class Screen extends Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <Text>Hello 首页</Text>
        <Text>{this.props.token}</Text>
        <TouchableOpacity onPress={() => this.logout()} style={{padding: 5, margin: 5, borderRaduis: 5, borderWidth: 1, borderColor: 'gray'}}>
          <Text style={{textAlign: 'center'}}>退出</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async logout() {
    await AsyncStorage.removeItem('account');
    this.props.navigation.replace('Login');
  }

  componentDidMount() {}
}

export default withRedux(Screen);
