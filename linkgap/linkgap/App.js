import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CodePush from 'react-native-code-push';
const withCodePush = CodePush({ checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME, installMode: CodePush.InstallMode.IMMEDIATE });

class App extends Component {
  render() {
    return (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Hello Linkgap!!@</Text>
      </View>
    );
  }
}

export default withCodePush(App)
