import { FlatList, StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react';
import {
  Feather,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
  EvilIcons,
} from "@expo/vector-icons";

export default function HoaDonScreen() {
  //hostname
  // const hostname = "192.168.1.6"; //long
  const hostname = '192.168.126.1'; //hantnph28876

  const [listHoaDon, setListHoaDon] = useState([]);

  const [khachHang, setKhachHang] = useState();

  const getListHoaDon = () => {
    fetch(`http://${hostname}:3000/getHoaDon`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setListHoaDon(res);
          // setOldListNV(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getKHTheoMaDatPhong = (_id) => {
    fetch(`http://${hostname}:3000/getKHTheoMaDatPhong/${_id}`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setKhachHang(res)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //tự đổ dữ liệu
  useEffect(() => {
    getListHoaDon();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')} // Đường dẫn tới ảnh
        style={styles.backgroundImage}
      >
        <FlatList
          style={{ flex: 0.9, width: "90%", alignSelf: "center" }}
          data={listHoaDon}
          keyExtractor={(item, index) => item._id}
          onRefresh={() => getListHoaDon()}
          refreshing={false}
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                margin: 10,
                padding: 5,
                flexDirection: "row",
                borderColor: "white",
                backgroundColor: "#FAFAFA",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 1,
                shadowRadius: 4,
                elevation: 7,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  margin: 5,
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flex: 1,
                }}
              >
                <Text>Tên khách hàng: {getKHTheoMaDatPhong(item.maDatPhong.maKhachHang)}</Text>
                <Text style={styles.textStyle}>
                  Tên nhân viên: {item.maNV}
                </Text>
                <Text style={styles.textStyle}>Tổng tiền: {item.tongTienHoaDon} VND</Text>
                <Text style={styles.textStyle}>Thời gian: {item.maDatPhong.thoiGianDen} - {item.maDatPhong.thoiGianDen}</Text>
                <Text style={item.trangThai === 'Hoàn tất' ? styles.HoanTat : styles.HuyDatPhong}>{item.trangThai}</Text>

              </View>
              {/* dialog delete */}

              <TouchableOpacity
                onPress={() => {

                }}
              >
                <Ionicons name="reorder-two" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: 'cover', // Để ảnh phủ kín phần nền
    // justifyContent: 'center', // Để nội dung nằm giữa ảnh nền
    alignItems: 'center'
  },
  //set style trống phòng
  HoanTat: {
    color: "white",
    backgroundColor: 'green',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    borderRadius: 5,
    width: 70
},
HuyDatPhong: {
    color: "white",
    backgroundColor: 'red',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    borderRadius: 5,
    width: 105
},
})