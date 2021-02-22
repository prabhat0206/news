import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View, Animated} from 'react-native';
import {LongPressGestureHandler, State} from 'react-native-gesture-handler';
import ListScr from './ListScr';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function (props: any) {
  const navigation = useNavigation();
  return <Home {...props} navigation={navigation} />;
}

class Home extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      ImageAvi: false,
      LinkImg: '',
    };
  }

  async componentDidUpdate() {
    const data = await AsyncStorage.getItem('url');
    if (data === null) {
      this.setState({ImageAvi: false});
    } else {
      this.setState({ImageAvi: true, LinkImg: data});
    }
  }

  render() {
    const {ImageAvi, LinkImg}: any = this.state;
    const {navigation}: any = this.props;
    return (
      <>
        <View style={styles.container}>
          <StatusBar backgroundColor="red" />
          <View style={styles.img_box}>
            <LongPressGestureHandler
              // onGestureEvent={Animated.event({ ... }, { useNativeDriver: true })}
              onHandlerStateChange={({nativeEvent}) => {
                if (nativeEvent.state === State.ACTIVE) {
                  navigation.navigate('edit');
                }
              }}
              minDurationMs={800}>
              <Animated.View style={styles.img}>
                {ImageAvi ? (
                  <Image source={{uri: LinkImg}} style={styles.img} />
                ) : (
                  <Icon
                    name="user"
                    size={60}
                    color="white"
                    style={{textAlign: 'center'}}
                  />
                )}
              </Animated.View>
            </LongPressGestureHandler>
          </View>
          <View style={styles.name_box}>
            <Text style={styles.text}>Prabhat Ranjan</Text>
            <Text style={styles.text_desc}>Prabhat0206@hotmail.com</Text>
          </View>
        </View>
        <View style={styles.other}>
          <ListScr />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: 'red',
    width: '100%',
    padding: 5,
    flexDirection: 'row',
  },
  img_box: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_box: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  text_desc: {
    color: '#fff',
  },
  other: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
});
