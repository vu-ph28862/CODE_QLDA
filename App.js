import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
//import thư viện navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();
//import compoent
import ManHinhChao from './Screen/ManHinhChao';
import ManHinhLogin from './Screen/ManHinhLogin';
import ManHinhChinh  from './Screen/ManHinhChinh';
import QuanLyPhong from './Screen/QuanLyPhong';
import DrawerNavigation from './Screen/DrawerNavigation';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Màn Hình Chào' screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name='Màn Hình Chào' component={ManHinhChao} />
        
        <Stack.Screen name='Màn Hình Đăng Nhập' component=
        {ManHinhLogin}/>
        {/* <Stack.Screen name='Màn Hình Chính' component= {ManHinhChinh}
        options={{ headerShown: false, gestureEnabled: false }}/>

        <Stack.Screen name='Quản Lý Phòng' component={QuanLyPhong} options={{ headerShown: false, gestureEnabled: false }}/> */}
        <Stack.Screen name='Menu' component={DrawerNavigation}
        />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
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
});
