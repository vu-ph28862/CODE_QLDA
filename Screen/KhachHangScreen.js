import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Button,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
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

export default function KhachHangScreen() {
  //hostname
  // const hostname = "192.168.1.6"; //long
  const hostname = '192.168.126.1'; //hantnph28876

  // value compoent
  const [_id, setId] = useState();
  const [tenKhachHang, setTenKhachHang] = useState("");
  const [sdt, setSdt] = useState("");
  const [cccd, setCccd] = useState("");
  const [diaChi, setDiaChi] = useState("");
  //value list
  const [listKhachHang, setListKhachHang] = useState([]);

  //checked dialog
  const [modalVisible, setModalVisible] = useState(false);
  //check dialog chức năng
  const [showDialogChucNang, setShowDiaLogChucNang] = useState(false);
  //searchview
  const [search, setSearch] = useState("");
  const [oldListKH, setOldListKH] = useState([]);
  //const set value title dialog
  const [title,setTitle] = useState("");

  //tự đổ dữ liệu
  useEffect(() => {
    getListKhachHang();
  }, []);
  //action seachview
  const onSearch = (text) => {
    if (text == "") {
      setListKhachHang(oldListKH);
    } else {
      const tempList = listKhachHang.filter((item) => {
        return (
          item.tenKhachHang.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.diaChi.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.cccd.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.sdt.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
      });
      setListKhachHang(tempList);
    }
  };

  //action insert dữ liệu
  const handleSubmit = (tenKhachHang, sdt, cccd, diaChi) => {
    const phoneRegex = /^(09|03)\d{8}$/;
    const allInputValue = {
      tenKhachHang: tenKhachHang,
      sdt: sdt,
      cccd: cccd,
      diaChi: diaChi,
    };
    //check trống ô nhập
    if (tenKhachHang.length == 0) {
      Alert.alert("Thông báo", "Tên thành viên không được để trống");
      return;
    }
    if (cccd.length == 0) {
      Alert.alert("Thông báo", "CCCD không được để trống");
      return;
    }
    if (sdt.length == 0) {
      Alert.alert("Thông báo", "Số điện thoại không được để trống");
      return;
    }

    if (diaChi.length == 0) {
      Alert.alert("Thông báo", "Địa chỉ không được để trống");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(allInputValue),
    };

    fetch(`http://${hostname}:3000/insertKhachHang`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setModalVisible(!modalVisible);
    getListKhachHang();
    Alert.alert("Them thanh cong");
    setTenKhachHang("");
    setSdt("");
    setCccd("");
    setDiaChi("");
    console.log(allInputValue);
  };
  //action update dữ liệu
  const handleUpdate = (_id, tenKhachHang, sdt, cccd, diaChi) => {
    const phoneRegex = /^(09|03)\d{8}$/;
    const allInputValue = {
      tenKhachHang: tenKhachHang,
      sdt: sdt,
      cccd: cccd,
      diaChi: diaChi,
    };
    //check trống ô nhập
    if (tenKhachHang.length == 0) {
      Alert.alert("Thông báo", "Tên thành viên không được để trống");
      return;
    }
    if (cccd.length == 0) {
      Alert.alert("Thông báo", "CCCD không được để trống");
      return;
    }
    if (sdt.length == 0) {
      Alert.alert("Thông báo", "Số điện thoại không được để trống");
      return;
    }

    if (diaChi.length == 0) {
      Alert.alert("Thông báo", "Địa chỉ không được để trống");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(allInputValue),
    };

    fetch(`http://${hostname}:3000/updateKhachHang/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setModalVisible(!modalVisible);
    getListKhachHang();
    Alert.alert("Update thanh cong");
    setTenKhachHang("");
    setSdt("");
    setCccd("");
    setDiaChi("");
    
    console.log(allInputValue);
  };

  //aciont delete dữ liệu
  const handleRemove = (_id) => {
    fetch(`http://${hostname}:3000/deleteKhachHang/${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        getListKhachHang();
        setId(0);
        setTenKhachHang("");
        setCccd("");
        setSdt("");
        setDiaChi("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //lấy vị trí từng item đổ lên textinput để update
  const info = (id, tenKhachHang, sdt, cccd, diaChi) => {
    console.log(id);
    setId(id);
    setTenKhachHang(tenKhachHang);
    setSdt(sdt);
    setCccd(cccd);
    setDiaChi(diaChi);
  };

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
          setOldListKH(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={{ flex: 1, opacity: 1 }}>
      <StatusBar hidden={true} />
      <ImageBackground
        style={styles.container}
        source={require("../assets/background.png")}
      >
        <View style={styles.sectionStyle}>
          {/* search view*/}
          <EvilIcons
            name="search"
            size={30}
            color="black"
            style={{ marginLeft: 10 }}
          />
          <TextInput
            style={{ flex: 1, borderColor: "#fff", marginLeft: 10 }}
            placeholder="Search..."
            underlineColorAndroid="transparent"
            mode="outlined"
            value={search}
            onChangeText={(text) => {
              onSearch(text);
              setSearch(text);
            }}
          />
          {search == "" ? null : (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                getListKhachHang();
                setSearch("");
              }}
            >
              <Text style={{ fontSize: 18 }}>X</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* list danh sach  */}

        <FlatList
          style={{ flex: 0.9, width: "90%", alignSelf: "center" }}
          data={listKhachHang}
          keyExtractor={(item, index) => item._id}
          onRefresh={() => getListKhachHang()}
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
                <Text style={styles.textStyle}>
                  Tên thành viên: {item.tenKhachHang}
                </Text>
                <Text style={styles.textStyle}>CCCD: {item.cccd}</Text>
                <Text style={styles.textStyle}>Sdt: {item.sdt}</Text>
                <Text style={styles.textStyle}>Địa chỉ: {item.diaChi}</Text>
              </View>
              {/* dialog delete */}

              <TouchableOpacity
                onPress={() => {
                  setShowDiaLogChucNang(true);
                  info(
                    item._id,
                    item.tenKhachHang,
                    item.sdt,
                    item.cccd,
                    item.diaChi
                  );
                }}
              >
                <Ionicons name="reorder-two" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* dialog action insert - update  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
          style={styles.cardView}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(52, 52, 52, 0.8)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableWithoutFeedback
              onPressOut={() => setModalVisible(false)}
              style={{ backgroundColor: "#fff", width: "100%" }}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback
                  style={{ backgroundColor: "#fff", width: "100%" }}
                >
                  <View style={styles.modalView}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      {title}
                    </Text>
                    <TextInput
                      placeholderTextColor={"#767b83"}
                      style={styles.inputStyle}
                      // keyboardType="numeric"
                      value={tenKhachHang}
                      mode="outlined"
                      placeholder="Nhập tên khách hàng"
                      onChangeText={(text) => setTenKhachHang(text)}
                    />
                    <TextInput
                      placeholderTextColor={"#767b83"}
                      style={styles.inputStyle}
                      value={sdt}
                      mode="outlined"
                      placeholder="Nhập số điện thoại"
                      onChangeText={(text) => setSdt(text)}
                    />
                    <TextInput
                      placeholderTextColor={"#767b83"}
                      style={styles.inputStyle}
                      value={cccd}
                      mode="outlined"
                      placeholder="Nhập căn cước công dân"
                      onChangeText={(text) => setCccd(text)}
                    />
                    <TextInput
                      placeholderTextColor={"#767b83"}
                      style={styles.inputStyle}
                      // keyboardType="numeric"
                      value={diaChi}
                      mode="outlined"
                      placeholder="Nhập địa chỉ"
                      onChangeText={(text) => setDiaChi(text)}
                    />

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        if (_id && tenKhachHang && cccd && sdt && diaChi) {
                          handleUpdate(_id, tenKhachHang, cccd, sdt, diaChi);
                          
                        } else {
                          handleSubmit(tenKhachHang, cccd, sdt, diaChi);
                        }
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Lưu</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>

        {/* dialog chọn chức năng  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDialogChucNang}
          onRequestClose={() => {
            this.setShowDiaLogChucNang(false);
            setId(0);
            setTenKhachHang("");
            setCccd("");
            setSdt("");
            setDiaChi("");
          }}
          onBackdropPress={false}
          style={styles.cardView}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(52, 52, 52, 0.8)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableWithoutFeedback
              onPressOut={() => {
                setShowDiaLogChucNang(false);
                setId(0);
                setTenKhachHang("");
                setCccd("");
                setSdt("");
                setDiaChi("");
              }}
              style={{ backgroundColor: "#fff" }}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback
                  style={{ backgroundColor: "#fff", width: "100%" }}
                >
                  <View style={styles.modalView}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      Dialog Chọn Chức Năng
                    </Text>

                    {/* btn xóa khách hàng  */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setShowDiaLogChucNang(!showDialogChucNang);
                        Alert.alert(
                          //title
                          "Thông Báo!",
                          //body
                          "Bạn có chắc chắn muốn xóa không?",
                          [
                            {
                              text: "Có",
                              onPress: () => {
                                info(_id, tenKhachHang, cccd, sdt, diaChi);
                                handleRemove(_id);
                              },
                            },
                            {
                              text: "Không",
                              onPress: () => {
                                setId(0);
                                setTenKhachHang("");
                                setCccd("");
                                setSdt("");
                                setDiaChi("");
                                setModalVisible(false);
                              },
                              style: "cancel",
                            },
                          ],
                          { cancelable: false }
                        );
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Xóa</Text>
                    </TouchableOpacity>
                    {/* btn sửa khách hàng  */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        {

                          setModalVisible(!modalVisible);
                          setTitle("Sửa Thông Tin Khách Hàng")
                          setShowDiaLogChucNang(!showDialogChucNang);
                          info(_id, tenKhachHang, cccd, sdt, diaChi);
                        }
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Sửa</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        {/* click btn add  */}
        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
            alignSelf: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              borderColor: "white",
              elevation: 100,
              backgroundColor: "#35C2C1",
              borderRadius: 50,
              overflow: "hidden",
              alignItems: "center",
              padding: 7,
              margin: 10,
            }}
            onPress={() => {
              {
                
                setModalVisible(true);
                setTitle("Thêm Thông Tin Khách Hàng")
                setId(0);
                setTenKhachHang("");
                setCccd("");
                setSdt("");
                setDiaChi("");
              }
            }}
          >
            <Ionicons name="add" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, justifyContent: "flex-start", backgroundColor: "#000" },
  cardView: {
    backgroundColor: "#000",
    margin: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    borderRadius: 10,
    flex: 1,
  },
  //searchview
  sectionStyle: {
    width: "85%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
    borderRadius: 5,
    elevation: 10,
    padding: 7,
    alignSelf: "center",
  },
  // input style
  inputStyle: {
    width: 280,
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
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
    width: "100%",
  },
  //style dialog
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    width: "85%",
    alignItems: "center",
  },

  //flatlist - textview
  textStyle: {
    fontWeight: "600",
  },
  //button dialog
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#35C2C1",
    margin: 10,
  },
});
