import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import axios from 'axios';
import _ from 'lodash';

import { connect } from 'react-redux'
import { actions } from '../redux';
const withRedux = connect(
  state => state.app,
  dispatch => ({
    setToken: token => dispatch(actions.app.setToken(token)),
  })
);

class Screen extends Component {
  state = {
    username: '',
    password: '',
  }

  render() {
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>Hello Login</Text>

        <View style={{padding: 5, margin: 5, borderRaduis: 5, borderWidth: 1, borderColor: 'gray'}}>
          <TextInput onChangeText={username => this.setState({ username })} style={{padding: 0}} />
        </View>

        <View style={{padding: 5, margin: 5, borderRaduis: 5, borderWidth: 1, borderColor: 'gray'}}>
          <TextInput onChangeText={password => this.setState({ password })} style={{padding: 0}} />
        </View>

        <TouchableOpacity onPress={() => this.submitForm()} style={{padding: 5, margin: 5, borderRaduis: 5, borderWidth: 1, borderColor: 'gray'}}>
          <Text style={{textAlign: 'center'}}>登录</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async submitForm() {

    try {
      const params = _.pick(this.state, ['username', 'password']);
      console.log({ params });

      const res = (await axios.post('https://app.5ulm.cn/app/user/login', {}, { params })).data;
      console.log({ res });

      const { code, message, body } = res;
      if(code !== 200) throw new Error(message);

      const { token } = body;
      this.props.setToken(token);
      await AsyncStorage.setItem('account', JSON.stringify(params));

      this.props.navigation.replace('HomeBottomTab')

    } catch(e) {
      const message = e.response ? (_.isObject(e.response.data) ? JSON.stringify(e.response.data) : e.response.data) : e.message;
      Alert.alert(message);
    }
  }

  componentDidMount() {}
}

export default withRedux(Screen);
