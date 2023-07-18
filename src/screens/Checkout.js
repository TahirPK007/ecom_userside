import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import uuid from 'react-native-uuid';

const Checkout = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [cartList, setcartList] = useState([]);
  const [selectAddress, setselectAddress] = useState('');
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const id = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('cart')
      .where('addedBy', '==', id)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0 || snapshot.docs != []) {
          setcartList(snapshot.docs);
        } else {
        }
      });
  };
  const increaseQty = item => {
    firestore()
      .collection('cart')
      .doc(item._data.cartId)
      .update({qty: item._data.qty + 1})
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
    getData();
  };
  const decreaseQty = item => {
    if (item._data.qty > 1) {
      firestore()
        .collection('cart')
        .doc(item._data.cartId)
        .update({qty: item._data.qty - 1})
        .then(res => {})
        .catch(error => {
          console.log(error);
        });
      getData();
    } else {
      firestore().collection('cart').doc(item._data.cartId).delete();
      getData();
    }
  };
  const getTotal = () => {
    let temp = cartList;
    let total = 0;
    temp.map(item => {
      total = total + parseInt(item._data.discountprice * item._data.qty);
    });
    return total;
  };
  const getQty = () => {
    let temp = cartList;
    let qty = 0;
    temp.map(item => {
      qty = qty + parseInt(item._data.qty);
    });
    return qty;
  };
  const getAddress = async () => {
    const id = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('address')
      .where('addedBy', '==', id)
      .get()
      .then(snapshot => {
        if (snapshot.docs != []) {
          snapshot.docs.map(item => {
            if (item._data.default == true) {
              setselectAddress(
                '' +
                  item._data.street +
                  ',' +
                  item._data.city +
                  ',' +
                  item._data.state +
                  ',' +
                  item._data.pincode,
              );
            }
          });
        }
      });
  };

  const orderPlace = () => {
    let temp = cartList;
    temp.map(item => {
      const orderId = uuid.v4();
      firestore()
        .collection('orders')
        .doc(orderId)
        .set({
          ...item._data,
          orderId: orderId,
        });
      firestore().collection('cart').doc(item._data.cartId).delete();
    });
    navigation.navigate('Success');
  };

  useEffect(() => {
    getAddress();
  }, [isFocused]);
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: 'black',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        Added Items
      </Text>
      <View>
        <FlatList
          data={cartList}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: Dimensions.get('window').width - 20,
                  height: 100,
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  borderRadius: 10,
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item._data.productImage}}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 10,
                    marginLeft: 10,
                  }}
                />
                <View style={{marginLeft: 10, width: '40%'}}>
                  <Text
                    style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                    {item._data.productname}
                  </Text>
                  <Text>{item._data.productdesc}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: 'green',
                        fontSize: 20,
                        marginLeft: 10,
                        fontWeight: '600',
                      }}>
                      {'PKR' + item._data.discountprice}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        fontSize: 16,
                        textDecorationLine: 'line-through',
                      }}>
                      {item._data.price}
                    </Text>
                  </View>
                </View>
                <View style={{marginLeft: 10, alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      source={require('../images/addtowishlist.png')}
                      style={{width: 30, height: 30}}
                    />
                  </TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        color: 'black',
                        fontWeight: '600',
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        decreaseQty(item);
                      }}>
                      -
                    </Text>
                    <Text
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        color: 'black',
                        fontWeight: '600',
                        marginTop: 10,
                        borderRadius: 10,
                        marginLeft: 5,
                      }}
                      onPress={() => {}}>
                      {item._data.qty}
                    </Text>
                    <Text
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        color: 'black',
                        fontWeight: '600',
                        marginTop: 10,
                        borderRadius: 10,
                        marginLeft: 5,
                      }}
                      onPress={() => {
                        increaseQty(item);
                      }}>
                      +
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Text style={{fontSize: 15, fontWeight: '600', color: 'black'}}>
          {'Items: ' + cartList.length}
        </Text>
        <Text style={{fontSize: 15, fontWeight: '600', color: 'black'}}>
          {'Total: ' + getTotal()}
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          height: 2,
          alignSelf: 'center',
          backgroundColor: 'black',
          marginTop: 10,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 30,
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <Text style={{fontSize: 15, fontWeight: '600', color: 'black'}}>
          {'Delivery Address'}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '600',
            color: 'purple',
            textDecorationLine: 'underline',
          }}
          onPress={() => {
            navigation.navigate('MyAddress');
          }}>
          {'Edit Address'}
        </Text>
      </View>
      <Text
        style={{
          marginLeft: 20,
          marginTop: 20,
          fontSize: 20,
          fontWeight: '600',
        }}>
        {selectAddress == '' ? 'No Address Select' : selectAddress}
      </Text>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          backgroundColor: 'purple',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
        onPress={() => {
          orderPlace();
        }}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>
          Pay Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkout;
