import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import _ from 'lodash';

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
        <Text>{_.get(this.props.user, 'company.address')}</Text>
        <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{padding: 5, margin: 5, borderRaduis: 5, borderWidth: 1, borderColor: 'gray'}}>
          <Text style={{textAlign: 'center'}}>退出</Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    console.log(this.props.user)
  }
}

export default withRedux(Screen);
