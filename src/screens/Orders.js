import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Orders = () => {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('orders')
      .where('addedBy', '==', userId)
      .get()
      .then(snapshot => {
        setorders(snapshot.docs);
      });
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={orders}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignSelf: 'center',
                height: 100,
                marginTop: 20,
                backgroundColor: 'white',
                alignItems: 'center',
                paddingLeft: 10,
              }}>
              <Image
                source={{uri: item._data.productImage}}
                style={{width: 70, height: 70, borderRadius: 10}}
              />
              <View style={{marginLeft: 10, width: '50%'}}>
                <Text style={{fontSize: 18, color: 'black'}}>
                  {item._data.productname}
                </Text>
                <Text style={{fontSize: 15, color: 'black'}}>
                  {item._data.productdesc}
                </Text>
              </View>
              <Text style={{color: 'green', fontSize: 18}}>
                {item._data.status ? 'Order Placed' : item._data.status}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Orders;
