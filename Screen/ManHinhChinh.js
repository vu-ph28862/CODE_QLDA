import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import moment from 'moment';


const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, justifyContent: "flex-start" },
  cardView: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 10,
  },
});
export default function ManHinhChinh() {

  const hostname = '192.168.126.1'; //hantnph28876 

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
              backgroundColor: "#45CECD",
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
              source={require("../assets/Maskgroup.png")}
            />
            <View style={{}}>
              <Text style={{ fontSize: 18, fontWeight: 700 }}>UserAdmin</Text>
              <Text>Lương Tháng này: 1000$</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardView}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Phòng trống</Text>
          <Text style={{ textAlign: "right", fontSize: 16, fontWeight: 500 }}>
            Số lượng 0
          </Text>
        </View>

        <View style={styles.cardView}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>Đặt Phòng</Text>
          <Text style={{ textAlign: "right", fontSize: 16, fontWeight: 500 }}>
            Số lượng 0
          </Text>
        </View>

        <View style={styles.cardView}>
          <Text style={{ fontSize: 16, fontWeight: 500 }}>
            Doanh Thu Ngày Hôm Nay
          </Text>
          <Text style={{ textAlign: "right", fontSize: 16, fontWeight: 500 }}>
            Tổng tiền: {doanhThu} VND
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
