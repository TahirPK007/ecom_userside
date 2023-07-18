import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MyAddress = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [addressList, setaddressList] = useState([]);
  const getAddress = async () => {
    const id = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('address')
      .where('addedBy', '==', id)
      .get()
      .then(snapshot => {
        if (snapshot.docs != []) {
          setaddressList(snapshot.docs);
        }
      });
  };

  useEffect(() => {
    getAddress();
  }, [isFocused]);

  const setDefault = addressId => {
    let temp = addressList;
    temp.map(item => {
      if (item._data.addressId == addressId) {
        firestore().collection('address').doc(addressId).update({
          default: true,
        });
      } else {
        firestore().collection('address').doc(item._data.addressId).update({
          default: false,
        });
      }
    });
    getAddress();
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={addressList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '90%',
                paddingTop: 20,
                paddingBottom: 20,
                flexDirection: 'row',
                backgroundColor: 'white',
                marginTop: 10,
                alignSelf: 'center',
                borderRadius: 10,
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
              }}
              onPress={() => {
                setDefault(item._data.addressId);
              }}>
              <View>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                  {'Street :' + item._data.street}
                </Text>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                  {'City :' + item._data.city}
                </Text>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                  {'State :' + item._data.state}
                </Text>
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                  {'Pincode :' + item._data.pincode}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                {item._data.default == true && (
                  <Text
                    style={{
                      backgroundColor: 'purple',
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 10,
                      paddingBottom: 10,
                      color: 'white',
                    }}>
                    {item._data.default == true ? 'Default' : ''}
                  </Text>
                )}
                <Text
                  style={{
                    fontSize: 16,

                    color: 'purple',
                    fontWeight: '600',
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: 'purple',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  Edit
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'red',
                    fontWeight: '600',
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                  }}>
                  Delete
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'purple',
          height: 50,
          width: '90%',
          position: 'absolute',
          borderRadius: 10,
          alignSelf: 'center',
          bottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('AddAddress');
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
          Add New Address
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyAddress;
