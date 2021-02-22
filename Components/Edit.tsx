import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

class Edit extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  async _savelink() {
    const {inputValue}: any = this.state;
    const {navigation}: any = this.props;
    await AsyncStorage.setItem('url', inputValue);
    navigation.goBack();
  }
  async _delLink() {
    const {navigation}: any = this.props;
    await AsyncStorage.removeItem('url');
    navigation.goBack();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          padding: 10,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>
          Enter Your Image Link:
        </Text>
        <TextInput
          style={{
            color: 'white',
            fontSize: 15,
            borderWidth: 1,
            borderColor: '#fff',
            width: '100%',
            paddingLeft: 20,
            borderRadius: 25,
            marginTop: 20,
            marginBottom: 20,
          }}
          placeholder="Link"
          placeholderTextColor="#fff"
          onChangeText={(value: string) => {
            this.setState({inputValue: value});
          }}
        />
        <TouchableOpacity
          style={{
            width: 180,
            padding: 10,
            backgroundColor: 'red',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => this._savelink()}>
          <Text style={{color: 'white'}}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 180,
            padding: 10,
            backgroundColor: 'blue',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={() => this._delLink()}>
          <Text style={{color: 'white'}}>Delete Current Image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default function (props: any) {
  const navigation = useNavigation();
  return <Edit {...props} navigation={navigation} />;
}
