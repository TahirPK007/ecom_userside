import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Loader from '../common/Loader';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [visible, setvisible] = useState(false);

  const signin = () => {
    setvisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        setvisible(false);
        console.log(JSON.stringify(snapshot.docs[0].data()));
        if (snapshot.docs != []) {
          if (snapshot.docs[0].data().password == password) {
            goToNextScreen(snapshot.docs[0].data());
          } else {
            alert('Wrong Password');
          }
        }
      })
      .catch(error => {
        setvisible(false);
        console.log(error);
      });
  };

  const goToNextScreen = async data => {
    await AsyncStorage.setItem('USERID', data.userId);
    await AsyncStorage.setItem('EMAIL', data.email);
    await AsyncStorage.setItem('NAME', data.name);
    navigation.navigate('Main');
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
          Login
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
            signin();
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
            Login
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
            navigation.navigate('Signup');
          }}>
          <Text style={{color: 'purple', fontSize: 18, fontWeight: '600'}}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
      <Loader visible={visible} />
    </View>
  );
};

export default Login;
