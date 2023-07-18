import {View, Text, Modal, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';

const LoginSignupDialogue = ({onCancel, onClickLoginSignup, visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'black',
              width: '85%',
              alignSelf: 'center',
              marginTop: 20,
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            {' Add product in cart ?\n Login/Signup now'}
          </Text>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              backgroundColor: 'purple',
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              onClickLoginSignup();
            }}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
              Login/Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              backgroundColor: 'gray',
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
            onPress={() => {
              onCancel();
            }}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LoginSignupDialogue;
