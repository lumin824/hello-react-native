import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, StackActions, NavigationActions } from 'react-navigation';
import CodePush from 'react-native-code-push';
const withCodePush = CodePush({ checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME, installMode: CodePush.InstallMode.IMMEDIATE });

import axios from 'axios';

import { connect } from 'react-redux'
import { actions } from './src/redux';
const withRedux = connect(
  state => state.app,
  dispatch => ({
    setToken: token => dispatch(actions.app.setToken(token)),
  })
);

import ScreenMap from './src/screen';

class App extends Component {
  state = {
    RootStack: null,
  }

  render() {
    const { RootStack } = this.state;
    if (RootStack) return <RootStack />
    return <View style={{backgroundColor: 'gray'}} />
  }

  async componentDidMount() {
    const { Home, Mine, ...StackScreenMap } = ScreenMap;

    let initialRoute = {
      initialRouteName: 'Login',
    };


    try {
      const account = await AsyncStorage.getItem('account');

      console.log({ account })
      const params = JSON.parse(account);
      const { code, message, body } = (await axios.post('https://app.5ulm.cn/app/user/login', {}, { params })).data;
      if(code != 200) throw new Error(message);

      const { token } = body;
      this.props.setToken(token);

      initialRoute = {
        initialRouteName: 'HomeBottomTab',
      };

    }catch(e) { console.log({ e })}

    const HomeBottomTab = createBottomTabNavigator({
      Home, Mine,
    })

    const RootStack = createStackNavigator({ HomeBottomTab, ...StackScreenMap}, {
      ...initialRoute,
      navigationOptions: {
        header: null,
      },
    });

    this.setState({ RootStack });
  }
}

export default withRedux(withCodePush(App))
