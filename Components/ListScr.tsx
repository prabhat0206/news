import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TimeAgo from 'react-native-timeago';
import NLink from './Link';
import {useNavigation} from '@react-navigation/native';

export default function (props: any) {
  const navigation = useNavigation();
  return <ListScr {...props} navigation={navigation} />;
}

class ListScr extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }
  async componentDidMount() {
    const link_s = new NLink();
    await fetch(link_s.get_links())
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        this.setState({
          data: res.articles,
          isLoading: false,
        });
      });
  }
  async get_data() {
    const link = new NLink();
    try {
      // this.setState({
      //   isLoading: false,
      // });
      await fetch(link.get_links())
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          this.setState({
            data: res.articles,
            isLoading: false,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const {isLoading, data}: any = this.state;
    const {navigation}: any = this.props;
    return (
      <>
        {isLoading ? (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={this.get_data}
              />
            }
            renderItem={({item}: any) => (
              <View style={kalakari.container}>
                <TouchableOpacity
                  style={{flex: 1}}
                  onPress={() =>
                    navigation.navigate('webview', {link: item.url})
                  }>
                  <ImageBackground
                    source={{uri: item.urlToImage}}
                    style={kalakari.sub_container}>
                    <View style={kalakari.image}></View>
                    <LinearGradient
                      colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
                      style={kalakari.head}>
                      <Text style={kalakari.text}>{item.title}</Text>
                      <View style={kalakari.time}>
                        <Text style={kalakari.time_text}>
                          <TimeAgo time={item.publishedAt} interval={20000} />
                        </Text>
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </>
    );
  }
}

const kalakari = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    padding: 5,
    paddingBottom: 5,
    paddingTop: 5,
  },
  sub_container: {
    width: '100%',
    flex: 1,
    elevation: 5,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    flex: 0,
  },
  head: {
    width: '100%',
    flex: 2,
    padding: 10,
    color: '#fff',
    paddingTop: 70,
  },
  time: {
    flexDirection: 'column-reverse',
    flex: 1,
    color: '#fff',
  },
  time_text: {
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
