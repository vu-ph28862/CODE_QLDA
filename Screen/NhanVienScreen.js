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
import { Picker } from '@react-native-picker/picker';


export default function NhanVienScreen() {
  //hostname
  // const hostname = "192.168.1.6"; //long
  const hostname = '192.168.126.1'; //hantnph28876

  // value compoent
  const [_id, setId] = useState();
  const [tenNhanVien, setTenNhanVien] = useState("");
  const [sdt, setSdt] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [chucVu, setChucVu] = useState("");
  const [listChucVu, setListChucVu] = useState(["Lễ tân", "CEO"]);
  //value list
  const [listNhanVien, setListNhanVien] = useState([]);

  //checked dialog
  const [modalVisible, setModalVisible] = useState(false);
  //check dialog chức năng
  const [showDialogChucNang, setShowDiaLogChucNang] = useState(false);
  //searchview
  const [search, setSearch] = useState("");
  const [oldListNV, setOldListNV] = useState([]);
  //const set value title dialog
  const [title, setTitle] = useState("");

  //tự đổ dữ liệu
  useEffect(() => {
    getListNhanVien();
  }, []);
  //action seachview
  const onSearch = (text) => {
    if (text == "") {
      setListNhanVien(oldListNV);
    } else {
      const tempList = listNhanVien.filter((item) => {
        return (
          item.tenNhanVien.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.chucVu.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.matKhau.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.sdt.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
      });
      setListNhanVien(tempList);
    }
  };

  //action insert dữ liệu
  const handleSubmit = (tenNhanVien, sdt, matKhau, chucVu) => {
    const phoneRegex = /^(09|03)\d{8}$/;
    const allInputValue = {
      tenNhanVien: tenNhanVien,
      sdt: sdt,
      matKhau: matKhau,
      chucVu: chucVu,
    };
    //check trống ô nhập
    if (tenNhanVien.length == 0) {
      Alert.alert("Thông báo", "Tên nhân viên không được để trống");
      return;
    }
    if (matKhau.length == 0) {
      Alert.alert("Thông báo", "Nật khẩu không được để trống");
      return;
    }
    if (sdt.length == 0) {
      Alert.alert("Thông báo", "Số điện thoại không được để trống");
      return;
    }

    if (chucVu.length == 0) {
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

    fetch(`http://${hostname}:3000/insertNhanVien`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setModalVisible(!modalVisible);
    getListNhanVien();
    Alert.alert("Them thanh cong");
    setTenNhanVien("");
    setSdt("");
    setMatKhau("");
    setChucVu("");

    console.log(allInputValue);
  };
  //action update dữ liệu
  const handleUpdate = (_id, tenNhanVien, sdt, matKhau, chucVu) => {
    const phoneRegex = /^(09|03)\d{8}$/;
    const allInputValue = {
      tenNhanVien: tenNhanVien,
      sdt: sdt,
      matKhau: matKhau,
      chucVu: chucVu,
    };
    //check trống ô nhập
    if (tenNhanVien.length == 0) {
      Alert.alert("Thông báo", "Tên thành viên không được để trống");
      return;
    }
    if (matKhau.length == 0) {
      Alert.alert("Thông báo", "Mật khẩu không được để trống");
      return;
    }
    if (sdt.length == 0) {
      Alert.alert("Thông báo", "Số điện thoại không được để trống");
      return;
    }

    if (chucVu.length == 0) {
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

    fetch(`http://${hostname}:3000/updateNhanVien/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setModalVisible(!modalVisible);
    getListNhanVien();
    Alert.alert("Update thanh cong");
    setTenNhanVien("");
    setSdt("");
    setMatKhau("");
    setChucVu("");

    console.log(allInputValue);
  };

  //aciont delete dữ liệu
  const handleRemove = (_id) => {
    fetch(`http://${hostname}:3000/deleteNhanVien/${_id}`, {
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
        getListNhanVien();
        setId(0);
        setTenNhanVien("");
        setMatKhau("");
        setSdt("");
        setChucVu("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //lấy vị trí từng item đổ lên textinput để update
  const info = (id, tenNhanVien, sdt, matKhau, chucVu) => {
    console.log(id);
    setId(id);
    setTenNhanVien(tenNhanVien);
    setSdt(sdt);
    setMatKhau(matKhau);
    setChucVu(chucVu);
  };

  const getListNhanVien = () => {
    fetch(`http://${hostname}:3000/getNhanVien`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setListNhanVien(res);
          setOldListNV(res);
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
                getListNhanVien();
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
          data={listNhanVien}
          keyExtractor={(item, index) => item._id}
          onRefresh={() => getListNhanVien()}
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
                  Tên nhân viên: {item.tenNhanVien}
                </Text>
                {/* <Text style={styles.textStyle}>Mật khẩu: {item.matKhau}</Text> */}
                <Text style={styles.textStyle}>Sđt: {item.sdt}</Text>
                <Text style={styles.textStyle}>Bộ phận: {item.chucVu}</Text>
              </View>
              {/* dialog delete */}

              <TouchableOpacity
                onPress={() => {
                  setShowDiaLogChucNang(true);
                  info(
                    item._id,
                    item.tenNhanVien,
                    item.sdt,
                    item.matKhau,
                    item.chucVu
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
                      value={tenNhanVien}
                      mode="outlined"
                      placeholder="Nhập tên nhân viên"
                      onChangeText={(text) => setTenNhanVien(text)}
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
                      value={matKhau}
                      mode="outlined"
                      placeholder="Nhập mật khẩu"
                      onChangeText={(text) => setMatKhau(text)}
                    />
                    {/* <TextInput
                        placeholderTextColor={"#767b83"}
                        style={styles.inputStyle}
                        // keyboardType="numeric"
                        value={chucVu}
                        mode="outlined"
                        placeholder="Nhập địa chỉ"
                        onChangeText={(text) => setChucVu(text)}
                      /> */}
                    <View>
                      <Text style={{marginLeft:10, color:'gray'}}>Bộ phận</Text>
                      <Picker
                        mode="dropdown"
                        selectedValue={chucVu}
                        onValueChange={(itemValue) => setChucVu(itemValue)}
                        style={styles.dropdown}
                      >
                        <Picker.Item label="Lễ tân" value="Lễ tân" />
                        <Picker.Item label="Phục vụ phòng" value="Phục vụ phòng" />
                        <Picker.Item label="Nhà hàng" value="Nhà hàng" />
                        <Picker.Item label="An ninh" value="An ninh" />
                        <Picker.Item label="Kỹ thuật" value="Kỹ thuật" />
                        <Picker.Item label="Quản lý" value="Quản lý" />



                        {/* {listChucVu.map(category => (
                        <Picker.Item
                          key={category._id}
                          label={category.tenLoaiPhong}
                          value={category._id}
                        />
                      ))} */}
                      </Picker>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        if (_id && tenNhanVien && matKhau && sdt && chucVu) {
                          handleUpdate(_id, tenNhanVien, sdt, matKhau, chucVu);

                        } else {
                          handleSubmit(tenNhanVien, sdt, matKhau, chucVu);
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
            setTenNhanVien("");
            setMatKhau("");
            setSdt("");
            setChucVu("");
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
                setTenNhanVien("");
                setMatKhau("");
                setSdt("");
                setChucVu("");
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
                                info(_id, tenNhanVien, sdt, matKhau, chucVu);
                                handleRemove(_id);
                              },
                            },
                            {
                              text: "Không",
                              onPress: () => {
                                setId(0);
                                setTenNhanVien("");
                                setMatKhau("");
                                setSdt("");
                                setChucVu("");
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
                          info(_id, tenNhanVien, sdt, matKhau, chucVu);
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
                setTenNhanVien("");
                setMatKhau("");
                setSdt("");
                setChucVu("");
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
  //picker
  dropdown: {
    backgroundColor: '#E0EEE0',
    borderRadius: 20,
    width: 280,
    padding: 10,
    margin: 10
  },
});
