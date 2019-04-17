/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, WebView} from 'react-native';

import CodePush from 'react-native-code-push';
const withCodePush = CodePush({ checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME, installMode: CodePush.InstallMode.IMMEDIATE });


type Props = {};
class App extends Component<Props> {
  state = {
    codepushProgress_value: 0,
    text: '',
    uri: '',
  }
  render() {
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
}

export default withCodePush(App);
