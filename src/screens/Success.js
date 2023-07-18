import {View, Text, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Success = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../images/success.png')}
        style={{width: 100, height: 100}}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginTop: 10,
          color: 'black',
        }}>
        Congrats
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginTop: 10,
          color: 'black',
        }}>
        Your Order Has Placed Successfully
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          marginTop: 10,
          color: 'black',
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          navigation.navigate('Main');
        }}>
        Go To Home
      </Text>
    </View>
  );
};

export default Success;
