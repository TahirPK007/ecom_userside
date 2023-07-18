import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import React, {useState} from 'react';
import Home from '../tabs/Home';
import Search from '../tabs/Search';
import Cart from '../tabs/Cart';
import WishList from '../tabs/WishList';
import User from '../tabs/User';

const Main = () => {
  const [activeTab, setactiveTab] = useState(0);
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      {activeTab == 0 ? (
        <Home />
      ) : activeTab == 1 ? (
        <Search />
      ) : activeTab == 2 ? (
        <Cart />
      ) : activeTab == 3 ? (
        <WishList />
      ) : (
        <User />
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          height: 80,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'white',
          elevation: 5,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setactiveTab(0);
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: activeTab == 0 ? 'purple' : 'black',
            }}
            source={require('../images/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setactiveTab(1);
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: activeTab == 1 ? 'purple' : 'black',
            }}
            source={require('../images/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setactiveTab(2);
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: activeTab == 2 ? 'purple' : 'black',
            }}
            source={require('../images/cart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setactiveTab(3);
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: activeTab == 3 ? 'purple' : 'black',
            }}
            source={require('../images/wishlist.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: '100%',
            width: '20%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setactiveTab(4);
          }}>
          <Image
            style={{
              width: 30,
              height: 30,
              tintColor: activeTab == 4 ? 'purple' : 'black',
            }}
            source={require('../images/user.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;
