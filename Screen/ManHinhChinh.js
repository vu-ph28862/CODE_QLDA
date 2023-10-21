import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import React , {useEffect, useState} from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from 'moment';


const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, justifyContent: "flex-start" },
  cardView: {
    backgroundColor: "#F7F8F9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    borderRadius: 10,
    width: 160,

  },
});
export default function ManHinhChinh() {
  const [tenNhanVien, setTenNhanVien] = useState("");
  const [listPhong, setListPhong] = useState([]);
  const [listDatPhong, setListDatPhong] = useState([]);
  // const hostname = "192.168.1.4"; //long
  const hostname = '192.168.126.1'; //hantnph28876 
  const thongTinNhanVien = async () => {
    const nhanVienInfo = await AsyncStorage.getItem('nhanVienToken');
    setTenNhanVien(nhanVienInfo);
    console.log(nhanVienInfo);
  };
  const getListPhong = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/getPhong`, requestOptions)
      .then(response => response.json())
      .then(res => {
        if (res) {
          console.log(res)
          setListPhong(res)
        }

      })
      .catch(error => console.log('error', error));
  }
  const getListDatPhong = () => {
    fetch(`http://${hostname}:3000/getDatPhong`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setListDatPhong(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //số lượng phòng trống
  const phongTrong = listPhong.filter((phong) => phong.tinhTrang === 'Yes');
  const soLuongPhongTrong = phongTrong.length;

  //số lượng đặt phòng
  const datPhong = listDatPhong.filter((datPhong) => datPhong.tinhTrang === 'Đặt Trước')
  const soLuongDaThue = datPhong.length;
  //số lượng phòng đang thuê
  const dangThue = listDatPhong.filter((dangThue) => dangThue.tinhTrang === "Đang Thuê")
  const soLuongDangThue = dangThue.length;
  useEffect(() => {
    thongTinNhanVien();
    getListPhong();
    getListDatPhong();
  }, [])



  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('DD-MM-YYYY');

  const [doanhThu, setDoanhThu] = useState(0);



  useEffect(() => {
    getDoanhThu(formattedDate);
  }, []);

  // tính doanh thu
  const getDoanhThu = (date) => {
    var raw = "";

    var requestOptions = {
      method: 'GET',
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/doanhThuTrongNgay?ngayTao=${date}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setDoanhThu(result);


        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <View style={styles.root}>
      <StatusBar hidden />
      <ImageBackground
        style={styles.container}
        source={require("../assets/background.png")}
      >
        <View
          style={{
            backgroundColor: "#fff",
            height: 100,
            margin: 20,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              backgroundColor: "#8CDBDA",
              height: 80,
              margin: 10,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              shadowColor: "#fff",
              shadowOpacity: 1,
              shadowOffset: 2,
            }}
          >
            <Image
              style={{ width: 50, height: 50, borderRadius: 20, margin: 20 }}
              source={require("../assets/avtPerson.png")}
            />

            <View style={{alignSelf:"center"}}>
              <Text style={{ fontSize: 16, fontWeight: 700 }}>{tenNhanVien}</Text>
              <View style={{flexDirection:"row" , alignItems:"center"}}>

                <Image
                  style={{ width: 10, height: 10, borderRadius: 20, }}
                  source={require("../assets/image_66.png")}
                />
                <Text style={{ fontSize: 14, fontWeight: "400", marginLeft: 10 }}>Online</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
              <Image
                style={{ width: 50, height: 50, }}
                source={require("../assets/Group_1000003409.png")}
              />
              <Image
                style={{ width: 50, height: 50, }}
                source={require("../assets/Group_1000003404.png")}
              />
            </View>
          </View>
        </View>

        {/* view center  */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 20 }}>
          <View style={[styles.cardView, { justifyContent: "space-around" }]}>
            <Image
              style={{ width: 100, height: 100, alignSelf: "center", margin: 10 }}
              source={require("../assets/image_65.png")}
            />
            <Text style={{ fontSize: 14, fontWeight: 500, textAlign: "center" }}>Phòng trống: {soLuongPhongTrong}</Text>
          </View>

          <View style={[styles.cardView, { justifyContent: "space-around" }]}>
            <Image
              style={{ width: 100, height: 100, alignSelf: "center", margin: 10 }}
              source={require("../assets/image_67.png")}
            />
            <Text style={{ fontSize: 14, fontWeight: 500, textAlign: "center" }}>Đặt Phòng: {soLuongDaThue}</Text>
          </View>

        </View>

        {/* view footer  */}
        <View
          style={{
            width: "100",
            backgroundColor: "#F7F8F9",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            padding: 10,
            marginLeft: 20,
            marginRight: 20
          }}
        >

         <View>
          <Text style={{textAlign:"left"}}>Phòng Đang Thuê</Text>
          <Text style={{textAlign:"right"}}>Số lượng: {soLuongDangThue}</Text>
         </View>
        
            </View>

          <View
          style={{
          width: "100",
          backgroundColor: "#F7F8F9",
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          padding:10,
          marginLeft:20,
          marginRight:20,
          marginTop:20,
          }}
        >
         <View>
          <Text style={{textAlign:"left"}}>Doanh Thu Ngày Hôm Nay</Text>
          <Text style={{textAlign:"right"}}>Tổng tiền: {doanhThu} VND</Text>
         </View>

        </View>
      
        
      </ImageBackground>
    </View>
  );
}
