import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
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
  //const hostname = "192.168.1.2"; //long
  const hostname = '192.168.126.1'; //hantnph28876

  const [listHoaDon, setListHoaDon] = useState([]);
  const [listKhachHang, setListKhachHang] = useState([]);
  const [listPhong, setListPhong] = useState([]);

  //const [khachHang, setKhachHang] = useState();
  

  const getListKhachHang = () => {
    fetch(`http://${hostname}:3000/getKhachHang`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setListKhachHang(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getListPhong = () => {
    fetch(`http://${hostname}:3000/getPhong`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setListPhong(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  


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

          //setKhachHang(res)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //tự đổ dữ liệu
  useEffect(() => {
    getListHoaDon();
    getListKhachHang();
    getListPhong();
  }, []);

  const renderHoaDonItem = ({ item }) => {
    // Tạo biến khachHang để lưu thông tin khách hàng
    const khachHang = listKhachHang.find(
      (kh) => kh._id === item.maDatPhong.maKhachHang
    );
    // Tạo biến phong để lưu thông tin phong
    const phong = listPhong.find(
      (p) => p._id === item.maDatPhong.maPhong
    );
    return (
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
          <Text>Mã hóa đơn: {item._id}</Text>
          <Text>Tổng Tiền Hóa Đơn: {item.tongTienHoaDon}</Text>
          <Text>Trạng Thái: {item.trangThai}</Text>
          <Text>
            Tên Khách Hàng:{""}
            {khachHang ? khachHang.tenKhachHang : ""}
          </Text>
          <Text>
            Số Điện Thoại: {khachHang ? khachHang.sdt : ""}
          </Text>
          {item.trangThai === 'Hoàn tất' && (
            <Text>Tổng Tiền Dịch Vụ: {item.maCTDV.tongTien} đ</Text>
          )}
        </View>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="reorder-two" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")} // Đường dẫn tới ảnh
        style={styles.backgroundImage}
      >
        <FlatList
          style={{ flex: 0.9, width: "90%", alignSelf: "center" }}
          data={listHoaDon}
          keyExtractor={(item, index) => item._id}
          onRefresh={() => getListHoaDon()}
          refreshing={false}

          renderItem={renderHoaDonItem}

         
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: 'cover', // Để ảnh phủ kín phần nền
    // justifyContent: 'center', // Để nội dung nằm giữa ảnh nền
    alignItems: "center",
  },
  //set style trống phòng
  HoanTat: {
    color: "white",
    backgroundColor: "green",
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    borderRadius: 5,
    width: 70,
  },
  HuyDatPhong: {
    color: "white",
    backgroundColor: "red",
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    borderRadius: 5,
    width: 105,
  },
});
