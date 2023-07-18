import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const User = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const navigation = useNavigation();

  const getData = async () => {
    let mName = await AsyncStorage.getItem('NAME');
    setname(mName);
    let mEmail = await AsyncStorage.getItem('EMAIL');
    setemail(mEmail);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../images/dp.png')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          alignSelf: 'center',
          marginTop: 40,
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 10,
          fontSize: 30,
          fontWeight: '600',
        }}>
        {name}
      </Text>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 20,
          fontWeight: '500',
        }}>
        {email}
      </Text>
      <View style={{marginTop: 20}}>
        <FlatList
          data={[
            'Orders',
            'Address',
            'Notfifications',
            'About Us',
            'Contact Us',
            'Log Out',
          ]}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '90%',
                  height: 60,
                  borderBottomWidth: 1,
                  borderBottomColor: 'purple',
                  justifyContent: 'center',

                  alignSelf: 'center',
                }}
                onPress={() => {
                  if (index == 0) {
                    navigation.navigate('Orders');
                  }
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default User;
