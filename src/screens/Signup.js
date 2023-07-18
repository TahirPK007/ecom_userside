import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Loader from '../common/Loader';
const Singup = () => {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setvisible] = useState(false);
  const registerUser = () => {
    setvisible(true);
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        userId: userId,
      })
      .then(res => {
        setvisible(false);
        console.log('user created');
        navigation.goBack();
      })
      .catch(error => {
        setvisible(false);
        console.log(error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <Image
        style={{width: '100%', height: 300}}
        source={require('../images/banner.jpg')}
      />
      <View
        style={{
          width: '90%',
          height: '70%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'white',
          elevation: 5,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            alignSelf: 'center',
            marginTop: 30,
            fontWeight: '600',
          }}>
          Signup
        </Text>
        <TextInput
          style={{
            width: '90%',
            height: 55,
            borderWidth: 1,
            paddingLeft: 20,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 20,
          }}
          value={name}
          onChangeText={txt => setname(txt)}
          placeholder="Enter Name"
        />
        <TextInput
          style={{
            width: '90%',
            height: 55,
            borderWidth: 1,
            paddingLeft: 20,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 20,
          }}
          value={email}
          onChangeText={txt => setemail(txt)}
          placeholder="Enter Email"
        />
        <TextInput
          style={{
            width: '90%',
            height: 55,
            borderWidth: 1,
            paddingLeft: 20,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 20,
          }}
          value={mobile}
          onChangeText={txt => setmobile(txt)}
          placeholder="Enter Mobile"
        />
        <TextInput
          style={{
            width: '90%',
            height: 55,
            borderWidth: 1,
            paddingLeft: 20,
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 20,
          }}
          value={password}
          onChangeText={txt => setpassword(txt)}
          placeholder="Enter Password"
        />
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
            registerUser();
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Signup
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '90%',
            height: 50,
            backgroundColor: 'white',
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'purple',
          }}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: 'purple', fontSize: 18, fontWeight: '600'}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <Loader visible={visible} />
    </View>
  );
};

export default Singup;
