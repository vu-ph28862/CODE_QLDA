import { StyleSheet, Text, View , SafeAreaView , Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
//rnfs : tạo sẵn 
export default function ManHinhChao({navigation}){

    useEffect(() => {
      const timer = setTimeout(() => {
      navigation.replace('Màn Hình Đăng Nhập');
      // navigation.openDrawer()
    }, 3000);
    return () => clearTimeout(timer);
    })

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