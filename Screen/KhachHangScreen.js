import { StyleSheet,ImageBackground, Text, View , Image } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

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
export default function KhachHangScreen() {
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
            Tổng tiền: 0
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
