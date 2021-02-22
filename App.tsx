import 'react-native-gesture-handler';
import React from 'react';
import Home from './Components/Home';
import Edit from './Components/Edit';
import Detail from './Components/Detail';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

export default function (props: any) {
  const stack = createStackNavigator();
  return <App {...props} stack={stack} />;
}

class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const {stack}: any = this.props;
    return (
      <>
        <NavigationContainer>
          <stack.Navigator>
            <stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="webview"
              component={Detail}
              options={{headerShown: false}}
            />
            <stack.Screen
              name="edit"
              component={Edit}
              options={{
                title: 'Edit Image Url',
                headerTintColor: '#fff',
                headerTransparent: true,
              }}
            />
          </stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}
