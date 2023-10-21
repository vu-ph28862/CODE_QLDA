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
  ScrollView,
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

import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function DichVu() {
  // const hostname = "192.168.1.4";//long
  const hostname = '192.168.126.1'; //hantnph28876

  // value compoent
  const [_id, setId] = useState();
  const [tenDichVu, setTenDichVu] = useState("");
  const [giaDichVu, setGiaDichVu] = useState("");

  const [picture, setPicture] = useState("");
  const [image, setImage] = useState([]);

  //mã loại dịch vụ
  const [maLoaiDichVu, setMaLoaiDichVu] = useState([]);
  const [selectLoaiDichVu, setSelectLoaiDichVu] = useState();
  //value list
  const [listDichVu, setListDichVu] = useState([]);
  //value danh mục click item -> mặc định để 0 lấy vị trí đầu tiên
  const [selectedTypeServiceId, setSelectedTypeServiceId] = useState(0);
  
  //value list loại dịch vụ
  const [listLoaiDichVu, setListLoaiDichVu] = useState([]);
  //checked dialog
  const [modalVisible, setModalVisible] = useState(false);
  //check dialog chức năng
  const [showDialogChucNang, setShowDiaLogChucNang] = useState(false);
  //searchview
  const [search, setSearch] = useState("");
  const [oldListDV, setOldListDV] = useState([]);
  //const set value title dialog
  const [title, setTitle] = useState("");

  const [cart, setCart] = useState([]);
  const getListLoaiDichVu = () => {
    fetch(`http://${hostname}:3000/getLoaiDichVu`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setMaLoaiDichVu(res);
          setListLoaiDichVu(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getListDichVu = () => {
    fetch(`http://${hostname}:3000/getDichVu`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setListDichVu(res);
          setOldListDV(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //tự đổ dữ liệu
  useEffect(() => {
    getListLoaiDichVu();
    getListDichVu();
  }, []);
  //action seachview
  const onSearch = (text) => {
    if (text == "") {
      setListDichVu(oldListDV);
    } else {
      const tempList = listDichVu.filter((item) => {
        return (
          item.tenDichVu.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
          item.giaDichVu.toLowerCase().indexOf(text.toLowerCase()) > -1
        );
      });
      setListDichVu(tempList);
    }
  };

  //action insert dữ liệu
  const handleSubmit = (tenDichVu, giaDichVu, selectLoaiDichVu, picture) => {
    const allInputValue = {
      tenDichVu: tenDichVu,
      giaDichVu: giaDichVu,
      maLoaiDichVu: selectLoaiDichVu,
      hinhAnh: picture,
    };
    //check trống ô nhập
    if (tenDichVu.length == 0) {
      Alert.alert("Thông báo", "Tên thành viên không được để trống");
      return;
    }
    if (giaDichVu.length == 0) {
      Alert.alert("Thông báo", "CCCD không được để trống");
      return;
    }
    // if (maLoaiDichVu.length == 0) {
    //   Alert.alert("Thông báo", "Số điện thoại không được để trống");
    //   return;
    // }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(allInputValue),
    };

    fetch(`http://${hostname}:3000/insertDichVu`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    Alert.alert("Them thanh cong");
    getListDichVu();
    setModalVisible(!modalVisible);
    setTenDichVu("");
    setGiaDichVu("");
    setPicture("");
    setSelectLoaiDichVu(null);
    setImage([]);
    console.log(allInputValue);
  };
  //action update dữ liệu
  const handleUpdate = (
    _id,
    tenDichVu,
    giaDichVu,
    selectLoaiDichVu,
    picture
  ) => {
    const allInputValue = {
      tenDichVu: tenDichVu,
      giaDichVu: giaDichVu,
      maLoaiDichVu: selectLoaiDichVu,
      hinhAnh: picture,
    };
    //check trống ô nhập
    //check trống ô nhập
    if (tenDichVu.length == 0) {
      Alert.alert("Thông báo", "Tên thành viên không được để trống");
      return;
    }
    if (giaDichVu.length == 0) {
      Alert.alert("Thông báo", "CCCD không được để trống");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(allInputValue),
    };

    fetch(`http://${hostname}:3000/updateDichVu/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    setModalVisible(!modalVisible);
    getListDichVu();
    Alert.alert("Update thanh cong");
    setId(0);
    setTenDichVu("");
    setGiaDichVu("");
    setPicture("");
    setSelectLoaiDichVu(null);
    setImage([]);
    console.log(allInputValue);
  };

  //aciont delete dữ liệu
  const handleRemove = (_id) => {
    fetch(`http://${hostname}:3000/deleteDichVu/${_id}`, {
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
        getListDichVu();
        setId(0);
        setTenDichVu("");
        setGiaDichVu("");
        setPicture("");
        setSelectLoaiDichVu(null);
        setImage([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //lấy vị trí từng item đổ lên textinput để update
  const info = (id, tenDichVu, giaDichVu, image, selectLoaiDichVu) => {
    console.log(id);
    // console.log(selectLoaiDichVu._id);
    setId(id);
    setTenDichVu(tenDichVu);
    setGiaDichVu(giaDichVu);
    setImage(image);
    setSelectLoaiDichVu(selectLoaiDichVu._id);
  };
  const [selectedLoaiDV, setSelectLoaiDV] = useState(false);
  //chon hinh anh
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, // Tắt tùy chọn chỉnh sửa
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false,
    });

    console.log(result.uri);

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri, {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "image.jpg",
      });
      setPicture(result.assets[0].uri);
    }
  };

  const getListWithLoaiDV = (_id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`http://${hostname}:3000/getTheoLoaiDV/${_id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          console.log(res);
          setListDichVu(res);
          setOldListDV(res);
        }
      })
      .catch((error) => console.log("error", error));
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
                getListDichVu();
                setSearch("");
              }}
            >
              <Text style={{ fontSize: 18 }}>X</Text>
            </TouchableOpacity>
          )}
        </View>
        {/* list danh sach loại dịch vụ */}

        <View style={{ width: "100%", flexDirection: "row" , alignSelf:"center" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{ padding: 10 }}
          >
            <TouchableOpacity
              style={[styles.selectItemContainer, { backgroundColor: selectedTypeServiceId === 0 ? '#000' : '#fff' }]}
              onPress={() => {
                setSelectedTypeServiceId(0);
                getListDichVu();
              }}
            >
              <Text
                style={[styles.selectItemName, { color: selectedTypeServiceId === 0 ? "#fff" : "#000" }]}>
                Tất cả
              </Text>
            </TouchableOpacity>

            {/* ten ten  */}

            {maLoaiDichVu.map((data) => {
              return (
                <TouchableOpacity
                  key={data._id}
                  style={[
                    styles.selectItemContainer,
                    { backgroundColor: selectedTypeServiceId === data._id ? '#000' : '#fff' }
                  ]}
                  onPress={() => {
                    setSelectedTypeServiceId(data._id);
                    getListWithLoaiDV(data._id);
                  }}
                >
                  <Text
                    style={[styles.selectItemName, { color: selectedTypeServiceId === data._id ? "#fff" : "#000" }]}
                  >
                    {data.tenLoaiDichVu}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* list danh sach dịch vụ */}
        <View style={{ width: "95%", margin: 7, flex: 1 }}>
          <FlatList
            style={{ flex: 1, width: "95%", alignSelf: "center" }}
            data={listDichVu}
            keyExtractor={(item, index) => item._id}
            onRefresh={() => {getListDichVu()
              getListLoaiDichVu()
            }}
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
                <Image
                  src={item.hinhAnh}
                  style={{ width: 35, height: 35, margin: 10 }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    margin: 5,
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flex: 1,
                  }}
                >
                  <Text style={styles.textStyle}>{item.tenDichVu}</Text>
                  <Text style={styles.textStyle}>
                    {item.maLoaiDichVu.tenLoaiDichVu}
                  </Text>
                  <Text style={styles.textStyle}>
                    Giá tiền: {item.giaDichVu}
                  </Text>
                </View>
                {/* dialog delete */}

                <TouchableOpacity
                  onPress={() => {
                    setShowDiaLogChucNang(true);
                    info(
                      item._id,
                      item.tenDichVu,
                      item.giaDichVu,
                      item.hinhAnh,
                      item.maLoaiDichVu
                    );
                  }}
                >
                  <Ionicons name="reorder-two" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
        {/* dialog chọn chức năng  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDialogChucNang}
          onRequestClose={() => {
            this.setShowDiaLogChucNang(false);
            setId(0);
            setTenDichVu("");
            setGiaDichVu("");
            setPicture("");
            setSelectLoaiDichVu(null);
            setImage([]);
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
                setTenDichVu("");
                setGiaDichVu("");
                setPicture("");
                setSelectLoaiDichVu(null);
                setImage([]);
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
                                info(
                                  _id,
                                  tenDichVu,
                                  giaDichVu,
                                  image,
                                  maLoaiDichVu
                                );
                                handleRemove(_id);
                              },
                            },
                            {
                              text: "Không",
                              onPress: () => {
                                setId(0);
                                setTenDichVu("");
                                setGiaDichVu("");
                                setPicture("");
                                setSelectLoaiDichVu(null);
                                setImage([]);
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
                          setTitle("Sửa Dịch Vụ");
                          setShowDiaLogChucNang(!showDialogChucNang);
                          // const info = (id, tenDichVu, giaDichVu , image , selectLoaiDichVu) => {
                          info(_id, tenDichVu, giaDichVu, image, maLoaiDichVu);
                          console.log(maLoaiDichVu);
                          //k hiểu sao nó k đổ dữ liệu vào picker
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
        {/* dialog thêm sửa dịch vụ */}
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
                    <Text
                      style={{ fontSize: 16, fontWeight: "500", margin: 7 }}
                    >
                      {title}
                    </Text>
                    {/* picker  */}
                    <View style={styles.dropdown}>
                      <Picker
                        mode="dropdown"
                        selectedValue={selectLoaiDichVu}
                        onValueChange={(itemValue) =>
                          setSelectLoaiDichVu(itemValue)
                        }
                      >
                        {listLoaiDichVu.map((data) => (
                          <Picker.Item
                            key={data._id}
                            label={data.tenLoaiDichVu}
                            value={data._id}
                            color="#8391A1"
                            style={{ fontSize: 14, fontWeight: "600" }}
                          />
                        ))}
                      </Picker>
                    </View>

                    {/* text-input  */}
                    <TextInput
                      placeholderTextColor={"#767b83"}
                      style={styles.inputStyle}
                      value={tenDichVu}
                      mode="outlined"
                      placeholder="Nhập tên dịch vụ"
                      onChangeText={(text) => setTenDichVu(text)}
                    />
                    <TextInput
                      placeholderTextColor={"#767b83"}
                      style={styles.inputStyle}
                      value={giaDichVu}
                      mode="outlined"
                      placeholder="Nhập giá dịch vụ"
                      onChangeText={(text) => setGiaDichVu(text)}
                    />

                    <TouchableOpacity
                      style={{
                        width: "100%",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                      onPress={() => pickImage()}
                    >
                      {image.length > 0 ? (
                        <Image
                          source={{ uri: image }}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 5,
                            alignSelf: "center",
                          }}
                        />
                      ) : (
                        <Image
                          style={{ width: 40, height: 40, marginRight: 10 }}
                          source={require("../assets/image_58__1_-removebg-preview.png")}
                        />
                      )}
                      <Text>Choose image</Text>
                      <Image />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        if (
                          _id &&
                          tenDichVu &&
                          giaDichVu &&
                          maLoaiDichVu &&
                          picture
                        ) {
                          handleUpdate(
                            _id,
                            tenDichVu,
                            giaDichVu,
                            selectLoaiDichVu,
                            picture
                          );
                        } else {
                          // tenDichVu, giaDichVu, maLoaiDichVu, picture
                          handleSubmit(
                            tenDichVu,
                            giaDichVu,
                            selectLoaiDichVu,
                            picture
                          );
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
                setTitle("Thêm Mới Dịch Vụ");
                setTenDichVu("");
                setGiaDichVu("");
                setPicture("");
                setSelectLoaiDichVu(null);
                setImage([]);
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
    width: "90%",
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

  //style flatlist scollview
  item: {
    width: 110,
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 7,
    borderColor: "#fff",
  },
  itemOnclick: {
    width: 110,
    alignItems: "center",
    backgroundColor: "#000",
    margin: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 7,
  },
  textContainer: {
    fontSize: 14,
    color: "#000",
  },
  textOnCLick: {
    fontSize: 14,
    color: "#fff",
  },

  //dropdown picker
  dropdown: {
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
    height: 40,
    margin: 10,
    justifyContent: "center",
  },

  //danh mục menu loại dịch vụ
  selectItemContainer: {
    width:110,
    borderRadius: 16,
    padding: 10,
    marginRight:10,
    alignItems:"center"
  },
  selectItemName: {
    fontSize: 14,
    fontWeight: '600',
  },
});
