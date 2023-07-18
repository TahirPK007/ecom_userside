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
import {useNavigation} from '@react-navigation/native';

const Cart = () => {
  const navigation = useNavigation();
  const [cartList, setcartList] = useState([]);
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
      total = total + parseInt(item._data.discountprice);
    });
    return total;
  };
  return (
    <View style={{flex: 1}}>
      {cartList.length > 0 ? (
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
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
            Empty Cart
          </Text>
          <Image
            source={require('../images/cart.png')}
            style={{width: 30, height: 30, marginTop: 20}}
          />
        </View>
      )}
      {cartList.length > 0 ? (
        <View
          style={{
            backgroundColor: 'purple',
            height: 100,
            width: '100%',
            position: 'absolute',
            bottom: 80,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 20,
            paddingRight: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '600',
              fontSize: 25,
            }}>
            {'Total:' + getTotal()}
          </Text>
          <TouchableOpacity
            style={{
              height: 46,
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 20,
              paddingRight: 20,
            }}
            onPress={() => {
              navigation.navigate('Checkout');
            }}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default Cart;
