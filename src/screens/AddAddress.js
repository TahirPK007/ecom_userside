import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Loader from '../common/Loader';
import {useNavigation} from '@react-navigation/native';
const AddAddress = () => {
  const navigation = useNavigation();
  const [street, setstreet] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [pinCode, setpinCode] = useState('');
  const [visible, setvisible] = useState(false);

  const saveAddress = async () => {
    setvisible(true);
    const id = await AsyncStorage.getItem('USERID');
    const addressId = uuid.v4();
    firestore()
      .collection('address')
      .doc(addressId)
      .set({
        addedBy: id,
        addressId: addressId,
        street: street,
        city: city,
        state: state,
        pincode: pinCode,
        default: false,
      })
      .then(res => {
        setvisible(false);
        console.log(res);
      })
      .catch(error => {
        setvisible(false);
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <TextInput
        style={{
          width: '80%',
          height: 50,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 10,
        }}
        value={street}
        onChangeText={txt => setstreet(txt)}
        placeholder="Enter Street Address"
      />
      <TextInput
        style={{
          width: '80%',
          height: 50,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 10,
        }}
        value={city}
        onChangeText={txt => setcity(txt)}
        placeholder="Enter City"
      />
      <TextInput
        style={{
          width: '80%',
          height: 50,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 10,
        }}
        value={state}
        onChangeText={txt => setstate(txt)}
        placeholder="Enter State"
      />
      <TextInput
        style={{
          width: '80%',
          height: 50,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 10,
        }}
        value={pinCode}
        onChangeText={txt => setpinCode(txt)}
        keyboardType="number-pad"
        placeholder="Enter PinCode"
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'purple',
          height: 50,
          width: '80%',

          borderRadius: 10,
          alignSelf: 'center',

          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}
        onPress={() => {
          saveAddress();
          navigation.goBack();
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
          Add New Address
        </Text>
      </TouchableOpacity>
      <Loader visible={visible} />
    </View>
  );
};

export default AddAddress;
