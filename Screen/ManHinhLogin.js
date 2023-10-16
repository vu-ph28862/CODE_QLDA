import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ManHinhLogin(props) {
  // const hostname = "192.168.1.7";//long
  const hostname = '192.168.126.1'; //hantnph28876

  const [userName,setUsername] = useState("");
  const [passWord,setPassword] = useState("");

  //check login

  const login = () => {
    if (userName.length == 0) {
      alert("Chưa nhập username");
      return;
    }
    if (passWord.length == 0) {
      alert("Chưa nhập password");
      return;
    }
       fetch(`https://64b89a9421b9aa6eb079f300.mockapi.io/nguoidung`)
       .then((response) => response.json())
       .then(async result => {
        console.log(result)
            if(!result){
                Alert.alert('Thông báo!', 'Tài khoản không tồn tại');
            }else if(result[0].password != passWord ){
                Alert.alert('Thông báo!', 'Sai password');
            }
            else if(result[0].username != userName){
                Alert.alert('Thông báo!', 'Sai username');
            }else{
                console.log("Successfully")
                await AsyncStorage.setItem("token",JSON.stringify(result));
                props.navigation.navigate('Menu');
            }
       })
       .catch(err => {
        console.log(err)
       })

      
  }


  
  return (
    <View style={styles.container}>
      <Image
        style={{ width: "100%", height: 140, flex: 1 }}
        source={{
          uri: "https://o.remove.bg/downloads/f0cbd5fe-1b68-4e42-8a05-434514924233/Rectangle_1__1_-removebg-preview.png",
        }}
      />
      <View style={{ flexDirection: "column", margin: 10, padding: 20 }}>
        {/* form header  */}
        <Text style={{ fontSize: 36, color: "#35C2C1", fontWeight: "bold" }}>
          Welcome Back!
        </Text>
        <Text
          style={{
            fontSize: 30,
            color: "#35C2C1",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Login Here
        </Text>

        {/* input username  */}
        <Text style={{ fontSize: 14, color: "#35C2C1" }} >Username*</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#35C2C1",
            height: 40,
            padding: 10,
            marginBottom: 15,
          }}
          onChangeText={(txt) => {
            setUsername(txt);
          }}
        />
        {/* input password  */}
        <Text style={{ fontSize: 14, color: "#35C2C1" }}>Password*</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#35C2C1",
            height: 40,
            padding: 10,
          }}
          onChangeText={(txt) => {
            setPassword(txt);
          }}
        />

        {/* text remember  */}
        <Text
          style={{
            fontSize: 14,
            color: "#35C2C1",
            alignSelf: "flex-end",
            fontWeight: "bold",
          }}
        >
          Forgot Password?
        </Text>
        <TouchableOpacity
          style={{
            width: "30%",
            backgroundColor: "#35C2C1",
            alignItems: "center",
            borderRadius: 10,
            padding: 7,
            marginTop: 15,
          }}
          onPress={login}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          style={{ width: "100%" }}
          source={require("../assets/Rectangle_3-removebg-preview.png")}
        />
      </View>

      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },
});
