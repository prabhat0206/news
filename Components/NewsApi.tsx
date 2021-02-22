import React from 'react';
import {Text, View} from 'react-native';

class NewsApi extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: null,
      isLoding: true,
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Hello World</Text>
      </View>
    );
  }
}

export default NewsApi;
