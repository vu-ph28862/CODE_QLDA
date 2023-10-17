import { StyleSheet, Text, View , SafeAreaView , Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
//rnfs : tạo sẵn 
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ManHinhChao({navigation}){

    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
      if (token) {
        navigation.navigate('Menu');
      } else {
        navigation.navigate('Màn Hình Đăng Nhập');
      }
    };
    useEffect(() => {
      setTimeout(() => {
          checkToken();
      } , 2000 )
    }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Image  style={{ width:"100%",height:50 , flex:1  }} source = {require('../assets/SplashHotel.png')}/>
      {/* <StatusBar style="auto" /> */}
      <StatusBar hidden={true} />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHotel:{
      width:100,
      height:50,
  }
})