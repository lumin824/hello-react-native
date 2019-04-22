/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, WebView, AsyncStorage} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import CodePush from 'react-native-code-push';
const withCodePush = CodePush({ checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME, installMode: CodePush.InstallMode.IMMEDIATE });

import axios from 'axios';

import ScreenMap from './screen';

import { connect } from 'react-redux'
import { actions } from './redux';
const withRedux = connect(
  state => state.app,
  dispatch => ({
    setToken: token => dispatch(actions.app.setToken(token)),
    setUser: user => dispatch(actions.app.setUser(user)),
  })
);

class App extends Component<Props> {
  state = {
    RootStack: null,
    codepushProgress_value: 0,
    text: '',
    uri: '',
  }
  render() {
    const { RootStack } = this.state;
    if(RootStack) return <RootStack />
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <Text style={{ color: 'blue', textAlign: 'center'}}>Welcome to Linkgap! {this.state.codepushProgress_value} {this.state.text}</Text>
        <View style={{borderWidth: 1, borderColor: 'gray', padding: 10, margin: 10}}>
        <TextInput onChangeText={text => this.setState({ text })} value={this.state.text} style={{padding: 0}} />
        </View>
        <View style={{alignItems: 'center'}}>
        <Image source={require('./logo.png')} style={{width: 32, height: 32}} />
        </View>

        <WebView source={{uri: this.state.uri}} />

        <TouchableOpacity onPress={() => this.setState({ text: '登录'})} style={{borderWidth: 1, borderColor: 'red', borderRaduis: 10, padding: 10, margin: 10, alignItems: 'center'}}>
          <Text>登录</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.setState({ uri:  'https://www.baidu.com'})} style={{borderWidth: 1, borderColor: 'red', borderRaduis: 10, padding: 10, margin: 10, alignItems: 'center'}}>
          <Text>百度</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ uri:  'https://www.sina.com.cn'})} style={{borderWidth: 1, borderColor: 'red', borderRaduis: 10, padding: 10, margin: 10, alignItems: 'center'}}>
          <Text>新浪</Text>
        </TouchableOpacity>
      </View>
    );
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ codepushProgress_value: progress.receivedBytes / progress.totalBytes});
  }

  async componentDidMount(){
    let initialRoute = {
      initialRouteName: 'Login'
    };

    try {
      const account = await AsyncStorage.getItem('account');

      console.log({ account })
      const params = JSON.parse(account);
      const { code, message, body } = (await axios.post('https://app.5ulm.cn/app/user/login', {}, { params })).data;
      if(code != 200) throw new Error(message);

      console.log({ body });
      const { token } = body;
      this.props.setToken(token);
      this.props.setUser(body);

      initialRoute = {
        initialRouteName: 'HomeBottomTab',
      };

    }catch(e) { console.log({ e })}

    const { Home, Mine, ...StackScreenMap } = ScreenMap;

    const HomeBottomTab = createBottomTabNavigator({
      Home, Mine,
    })

    const RootStack = createStackNavigator({ HomeBottomTab, ...StackScreenMap }, {
      ...initialRoute,
      navigationOptions: {
        header: null,
      },
    })

    this.setState({ RootStack });
  }
}

export default withRedux(withCodePush(App));
