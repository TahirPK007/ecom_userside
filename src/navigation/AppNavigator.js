import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import Main from '../screens/Main';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Checkout from '../screens/Checkout';
import MyAddress from '../screens/MyAddress';
import AddAddress from '../screens/AddAddress';
import Success from '../screens/Success';
import Orders from '../screens/Orders';

const stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <stack.Navigator>
        <stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: true}}
        />
        <stack.Screen
          name="MyAddress"
          component={MyAddress}
          options={{headerShown: true}}
        />
        <stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: true}}
        />
        <stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Orders"
          component={Orders}
          options={{headerShown: true}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
