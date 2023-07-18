import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const Search = () => {
  const [productList, setproductList] = useState([]);
  const [itemName, setitemName] = useState('');
  const searchProduct = () => {
    firestore()
      .collection('products')
      .where('productname', '==', itemName)
      .get()
      .then(snapshot => {
        console.log(snapshot.docs);
        setproductList(snapshot.docs);
      });
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 1,
          width: '90%',
          height: 50,
          alignSelf: 'center',
          borderRadius: 20,
          alignItems: 'center',
          paddingLeft: 20,
          paddingRight: 20,
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder="Enter Product Name"
          placeholderTextColor={'black'}
          style={{fontSize: 15, width: '85%'}}
          value={itemName}
          onChangeText={txt => setitemName(txt)}
        />
        <TouchableOpacity
          onPress={() => {
            searchProduct();
          }}>
          <Image
            source={require('../images/search.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={productList}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                height: 100,

                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 10,
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 10,
                backgroundColor: 'white',
              }}>
              <Image
                source={{uri: item._data.productImage}}
                style={{width: 90, height: 90, borderRadius: 10}}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
                  {item._data.productname}
                </Text>
                <Text
                  style={{color: 'black', textDecorationLine: 'line-through'}}>
                  {item._data.price}
                </Text>
                <Text style={{color: 'green', fontSize: 20}}>
                  {item._data.discountprice}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Search;
