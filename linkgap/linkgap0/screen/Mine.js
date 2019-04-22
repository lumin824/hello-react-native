import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class Screen extends Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <Text>Hello 我的</Text>

        <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{padding: 5, margin: 5, borderRaduis: 5, borderWidth: 1, borderColor: 'gray'}}>
          <Text style={{textAlign: 'center'}}>退出</Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {}
}

export default Screen;
