import { StyleSheet, Text, View , Image, SafeAreaView } from 'react-native';
import React , {useEffect , useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import { DrawerItemList,createDrawerNavigator , DrawerContentScrollView, } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import { Feather , MaterialIcons , FontAwesome , Fontisto ,MaterialCommunityIcons  ,Ionicons ,SimpleLineIcons,Foundation
    } from '@expo/vector-icons';
//import compoent
import ManHinhLogin from './ManHinhLogin';
import ManHinhChinh  from './ManHinhChinh';
import QuanLyPhong from './QuanLyPhong';
import QuanLyDatPhong from './DatPhongScreen';
import HoaDonScreen from './HoaDonScreen';
import DichVu from './DichVuScreen';
import KhachHangScreen from './KhachHangScreen';
import NhanVienScreen from './NhanVienScreen';
import BaoCaoThongKe from './BaoCaoThongKe';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DrawerNavigation({navigation}) {
  const [tenNhanVien , setTenNhanVien ] = useState("");
  const [chucVu , setChucVu ] = useState("");
  const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      const nhanVienToken  = await AsyncStorage.getItem('nhanVienToken');
      setTenNhanVien(nhanVienToken);
      console.log(token + " nhan vien token : "+ nhanVienToken);
  };
  // const checkChucVuToken = async () => {
  //     const chucVuToken = await AsyncStorage.getItem('chucVuInfo');
  //     console.log(chucVuToken);
  //     return checkToken;
  // };
  const checkChucVuToken = async () => {
     const chucVuToken = await AsyncStorage.getItem('chucVuToken');
    setChucVu(chucVuToken);
    console.log(chucVu);
  };
  const handleLogout = async () => {
    // await AsyncStorage.setItem('token', token);
    //       await AsyncStorage.setItem('nhanVienToken', nhanVienToken);
    //       await AsyncStorage.setItem('chucVuToken', chucVuToken);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('nhanVienToken');
    await AsyncStorage.removeItem('chucVuToken');
    navigation.navigate('Màn Hình Đăng Nhập');
  };

  useEffect(() => {
    checkToken();
    checkChucVuToken();
  },[])
  return (
   
        <Drawer.Navigator
            drawerContent={
          (props) => {
            return (
              <SafeAreaView>
                <View
                  style={{
                    height: 150,
                    width: '90%',
                    alignItems:"center",
                    borderBottomColor: "#000000",
                    borderBottomWidth: 0.5,
                    flexDirection:"row",
                    alignSelf:"center"
                  }}
                >
                  <Image
                    source={require('../assets/Maskgroup.png')}
                    style={{
                      height: 55,
                      width: 55,
                      borderRadius: 50
                    }}
                  />
                  <View style={{flexDirection:"column" , margin:10}}>
                    <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      color: "#111"
                    }}
                  >Hello</Text>
                  <Text
                    style={{
                      fontSize: 24,
                      color: "#111",
                      fontWeight: "bold",
                    }}
                  >{tenNhanVien}</Text>
                  </View>
                  
                </View>
                <DrawerItemList {...props} />
                <TouchableOpacity 
                style={{
                  backgroundColor: '#fff',
                  flexDirection:"row",
                  margin:15,
                  alignItems:"center"
                }}
                
                onPress={handleLogout}>
                  <MaterialCommunityIcons name="logout" size={30} color="black" />
                  <Text style={{marginLeft:30 , color: "#111" , fontWeight: "500",
                    fontSize:14}}>Đăng Xuất</Text>
                  </TouchableOpacity>
              </SafeAreaView>
            )
          }
        }
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
            borderTopRightRadius:15,
            borderBottomRightRadius:15,
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#111",
          headerTitleStyle: {
            fontWeight: "500",
            fontSize:18
          },
          drawerLabelStyle: {
            color: "#111"
          },
        }}
        initialRouteName="Màn Hình Chính"
        >
        <Drawer.Screen name="Màn Hình Chính"
        options={{
            drawerLabel: "Màn Hình Chính",
            title: "Màn Hình Chính",
            drawerIcon: () => (
              <Feather name="home" size={24} color="black" />
            )
          }}
         component={ManHinhChinh}
          />
        <Drawer.Screen name="Phòng" component={QuanLyPhong}
        options={{
            drawerLabel: "Phòng",
            title: "Phòng",
            drawerIcon: () => (
              <MaterialIcons name="meeting-room" size={24} color="black" />
            )
          }}
         />

         <Drawer.Screen name="Đặt Phòng" component={QuanLyDatPhong}
        options={{
            drawerLabel: "Đặt Phòng",
            title: "Đặt Phòng",
            drawerIcon: () => (
              <Fontisto name="room" size={24} color="black" />
            )
          }}
         />

         <Drawer.Screen name="Dịch Vụ" component={DichVu}
        options={{
            drawerLabel: "Dịch Vụ",
            title: "Dịch Vụ",
            drawerIcon: () => (
              <MaterialIcons name="room-service" size={24} color="black" />
            )
          }}
         />
        <Drawer.Screen name="Hóa Đơn" component={HoaDonScreen}
        options={{
            drawerLabel: "Hóa Đơn",
            title: "Hóa Đơn",
            drawerIcon: () => (
              <Foundation name="clipboard-notes" size={25} color="black" style={{margin:3}} />
            )
          }}
         />
          <Drawer.Screen name="Khách Hàng" component={KhachHangScreen}
        options={{
            drawerLabel: "Khách Hàng",
            title: "Khách Hàng",
            drawerIcon: () => (
              <Fontisto name="persons" size={24} color="black" />
            )
          }}
         />
         {chucVu === 'Quản lý' ? (
          <Drawer.Screen name="Nhân Viên" component={NhanVienScreen}
            options={{
            drawerLabel: "Nhân Viên",
            title: "Nhân Viên",
            drawerIcon: () => (
              <Ionicons name="person" size={24} color="black" />
            )
          }}
         />
        ) : null}
         <Drawer.Screen name="Báo Cáo Thống Kê" component={BaoCaoThongKe}
        options={{
            drawerLabel: "Báo Cáo Thống Kê",
            title: "Báo Cáo Thống Kê",
            drawerIcon: () => (
              <FontAwesome name="bar-chart" size={24} color="black" />
            )
          }}
         />
      </Drawer.Navigator>
       
  )
}

const styles = StyleSheet.create({})