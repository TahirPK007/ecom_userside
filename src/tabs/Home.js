import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSignupDialogue from '../common/LoginSignupDialogue';
import uuid from 'react-native-uuid';

const Home = () => {
  const navigation = useNavigation();
  const [products, setproducts] = useState([]);
  const [visible, setvisible] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    firestore()
      .collection('products')
      .get()
      .then(snapshot => {
        if (snapshot.docs != []) {
          setproducts(snapshot.docs);
        }
      });
  };

  const checkLogin = async item => {
    let id = await AsyncStorage.getItem('USERID');
    const cartId = uuid.v4();
    if (id != null) {
      firestore()
        .collection('cart')
        .where('addedBy', '==', id)
        .get()
        .then(snapshot => {
          if (snapshot.docs.length > 0) {
            snapshot.docs.map(x => {
              if (x._data.productid == item._data.productid) {
                firestore()
                  .collection('cart')
                  .doc(x._data.cartId)
                  .update({qty: x._data.qty + 1})
                  .then(res => {})
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                firestore()
                  .collection('cart')
                  .doc(cartId)
                  .set({...item._data, addedBy: id, cartId: cartId, qty: 1})
                  .then(res => {})
                  .catch(error => {
                    console.log(error);
                  });
              }
            });
          } else {
            firestore()
              .collection('cart')
              .doc(cartId)
              .set({...item._data, addedBy: id, cartId: cartId, qty: 1})
              .then(res => {})
              .catch(error => {
                console.log(error);
              });
          }
        });
    } else {
      setvisible(true);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 65,
          backgroundColor: 'white',
          elevation: 5,
          justifyContent: 'center',
          paddingLeft: 20,
        }}>
        <Text style={{fontSize: 25, color: 'purple', fontWeight: '600'}}>
          Ecom User App
        </Text>
      </View>
      <View>
        <FlatList
          data={products}
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
                  <TouchableOpacity
                    onPress={() => {
                      checkLogin(item);
                    }}>
                    <Image
                      source={require('../images/addtowishlist.png')}
                      style={{width: 30, height: 30}}
                    />
                  </TouchableOpacity>
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
                      checkLogin(item);
                    }}>
                    Add to Cart
                  </Text>
                </View>
                <LoginSignupDialogue
                  onCancel={() => {
                    setvisible(false);
                  }}
                  onClickLoginSignup={() => {
                    navigation.navigate('Login');
                  }}
                  visible={visible}
                />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Home;
