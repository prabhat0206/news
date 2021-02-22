import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function (props: any) {
  const navigation = useNavigation();
  return <Detail {...props} navigation={navigation} />;
}

class Detail extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  hide_loading() {
    this.setState({isLoading: false});
  }
  render() {
    const {route, navigation}: any = this.props;
    const {link}: any = route.params;
    const {isLoading}: any = this.state;
    return (
      <>
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            backgroundColor: 'red',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
            }}
            onPress={() => navigation.goBack()}>
            <View>
              <Icon
                name="angle-left"
                color="#fff"
                size={25}
                style={{textAlign: 'center'}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1, flexDirection: 'row-reverse'}}>
            <View>{isLoading ? <Loading /> : null}</View>
          </TouchableOpacity>
        </View>
        <WebView
          source={{uri: link}}
          onLoad={() => this.hide_loading()}
          onLoadEnd={() => this.hide_loading()}
          style={{backgroundColor: '#000'}}
        />
      </>
    );
  }
}

const Loading = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ActivityIndicator color="white" size="large" />
    </View>
  );
};
