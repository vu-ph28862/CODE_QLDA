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
  Platform,
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
import { Picker } from "@react-native-picker/picker";
import DatePickerDialog from "./DatePickerDialog";
import moment from "moment";
import Product from './Product';

export default function QuanLyDatPhong() {
  const hostname = "192.168.1.6"; //long
  // const hostname = '192.168.126.1'; //hantnph28876

  // value compoent
  const [_id, setId] = useState();
  const [tenKhachHang, setTenKhachHang] = useState("");
  const [sdt, setSdt] = useState("");
  const [cccd, setCccd] = useState("");
  const [diaChi, setDiaChi] = useState("");
  //value list khách hàng
  const [listKhachHang, setListKhachHang] = useState([]);
  const [listPhong, setListPhong] = useState([]);
  const [listDatPhong, setListDatPhong] = useState([]);
  const [listDichVu, setListDichVu] = useState([]);
  //mã loại dịch vụ
  const [selectDichVu, setSelectDichVu] = useState();
  const [selectKhachHang, setSelectKhachHang] = useState();
  const [selectPhong , setSelectPhong] = useState();
  //value list
  
  //checked dialog
  const [modalVisible, setModalVisible] = useState(false);
  //check dialog chức năng
  const [showDialogChucNang, setShowDiaLogChucNang] = useState(false);
  //searchview
  const [search, setSearch] = useState("");
  //const set value title dialog
  const [title, setTitle] = useState("");
  //date
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [soNgayThue, setSoNgayThue] = useState('');
  const calculateDuration = (start, end) => {
    if (start && end) {
      if(start > end){
        console.log("ngay dau hon cuoi")
        setSoNgayThue(0);
        return;
      }else{
        const startDate = moment(start, 'DD-MM-YYYY');
        const endDate = moment(end, 'DD-MM-YYYY');
        console.log(startDate);
        const soNgay = endDate - startDate;
        // Chuyển đổi thành số ngày
        setSoNgayThue(soNgay / (1000 * 24 * 60 * 60)); 
      }
    }
  };

  //lấy giá trị tiền thuê theo ngày/giờ
  const selectedData = listPhong.find((item) => item._id === selectPhong);
  const selectedValue = selectedData ? selectedData.tienThueTheoGio : "";
  //tong tien phong
  const tongTienPhong = soNgayThue * selectedValue;
  const [selectThoiGian, setSelectThoiGian] = useState();
  const [tinhTrang , setTinhTrang]  = useState("");
  const [type,setType] = useState();
  //chọn ngày bắt đầu
  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleStartDateSelect = (date) => {
    if (date) {
      date = moment(date).format("DD-MM-YYYY");
      // date = moment(date).format("DD/MM");

    }
    setSelectedStartDate(date);
    calculateDuration(date, selectedEndDate);
    hideStartDatePicker();
  };

  // dialog chọn ngày kết thúc
  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndDateSelect = (date ) => {
        if (date) {
      date = moment(date).format("DD-MM-YYYY");
      // date = moment(date).format("DD/MM");

    }
    setSelectedEndDate(date);
    calculateDuration(selectedStartDate, date);
    hideEndDatePicker();
  };
  
  
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
          const filteredRooms = res.filter(item => item.tinhTrang === 'Yes');
          console.log(res)
          // Cập nhật state với danh sách phòng đã lọc
          setListPhong(filteredRooms);
          // setListPhong(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getListKhachHang();
    getListPhong();
    getListDatPhong();
    getListDichVu();
  }, []);

  //insert du lieu
  const insertDatPhong = () => {
    const datPhong = {
      thoiGianDen:selectedStartDate,
      thoiGianTra:selectedEndDate,
      thoiGianThue: soNgayThue,
      tinhTrang: "Đặt trước",
      maKhachHang: selectKhachHang,
      maPhong: selectPhong,
      tongTien:tongTienPhong,
    };

    fetch(`http://${hostname}:3000/insertDatPhong`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datPhong),
    });
    console.log(datPhong);
    getListDatPhong();
    setModalVisible(!modalVisible);
    Alert.alert("Thêm thành công");
    //thêm thành công sẽ sửa trạng thái
    updateTrangThaiPhong(selectPhong)
    setTinhTrang("");
    setSoNgayThue("");
    setSelectKhachHang(null);
    setSelectPhong(null);
    setSelectedStartDate("");
    setSelectedEndDate("");
  };

  const insertNhanPhong = () => {
    const datPhong = {
      thoiGianDen:selectedStartDate,
      thoiGianTra:selectedEndDate,
      thoiGianThue: soNgayThue,
      tinhTrang: "Đang thuê",
      maKhachHang: selectKhachHang,
      maPhong: selectPhong,
      tongTien:tongTienPhong,
    };

    fetch(`http://${hostname}:3000/insertDatPhong`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datPhong),
    });
    console.log(datPhong);
    getListDatPhong();
    setModalVisible(!modalVisible);
    Alert.alert("Thêm thành công");
    setSoNgayThue("");
    setTinhTrang("");
    setSelectKhachHang(null);
    setSelectPhong(null);
    setSelectedStartDate("");
    setSelectedEndDate("");
  };
  
  
  const [roomServices, setRoomServices] = useState({});
  const [currentRoom, setCurrentRoom] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const handleItemClick = (item) => {
  // Sao chép số lượng hiện tại từ state

    const updatedItemQuantities = { ...itemQuantities };
    
    // Kiểm tra xem mục đã tồn tại trong state không
    if (item._id in updatedItemQuantities) {
      // Nếu đã tồn tại, tăng số lượng lên 1
      updatedItemQuantities[item._id] += 1;
    } else {
      // Nếu chưa tồn tại, set số lượng bằng 1
      updatedItemQuantities[item._id] = 1;
    }

    // Cập nhật state với số lượng mới
    setItemQuantities(updatedItemQuantities);
  };
  const handleItemSelection = (item) => {
  // Kiểm tra xem mục đã tồn tại trong danh sách đã chọn hay chưa
  const isItemSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);

  if (isItemSelected) {
    // Nếu mục đã tồn tại, loại bỏ nó khỏi danh sách đã chọn
    const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem._id !== item._id);
    setSelectedItems(updatedSelectedItems);
    console.log("trùng")
  } else {
    // Nếu mục chưa tồn tại, thêm nó vào danh sách đã chọn
    setSelectedItems([...selectedItems, item]);
    console.log("khôong trùng")
  }
};

  const handleTruSoLuong = (item) => {
    const updatedItemQuantities = { ...itemQuantities };
    if (item._id in updatedItemQuantities) {
      // Nếu đã tồn tại, cộng hoặc trừ số lượng
      updatedItemQuantities[item._id] -= 1;
      if (updatedItemQuantities[item._id] < 0) {
          updatedItemQuantities[item._id] = 0;
      }
    }
    setItemQuantities(updatedItemQuantities);
  }
  const handleCongSoLuong = (item) => {
    const updatedItemQuantities = { ...itemQuantities };
    if (item._id in updatedItemQuantities) {
      // Nếu đã tồn tại, cộng hoặc trừ số lượng
      updatedItemQuantities[item._id] += 1;
    }
    setItemQuantities(updatedItemQuantities);
  }
  const changeRoom = (room) => {
    setCurrentRoom(room);

    // Lấy danh sách dịch vụ cho phòng từ state hoặc từ nguồn dữ liệu
    const servicesForRoom = roomServices[room.id] ;
    setListDatPhong(servicesForRoom);
  };
  const updateRoomServices = (room, services) => {
    setListDatPhong((prevRoomServices) => ({
      ...prevRoomServices,
      [room._id]: services,
    }));
  };
  
  //   if (currentRoom) {
  //     // Sao chép danh sách đã chọn cho phòng hiện tại từ state
  //     const updatedSelectedItems = { ...selectedItemsByRoom };

  //     // Kiểm tra xem danh sách đã chọn cho phòng hiện tại đã tồn tại chưa
  //     if (!(currentRoom.id in updatedSelectedItems)) {
  //       updatedSelectedItems[currentRoom.id] = [];
  //     }

  //     // Tìm vị trí của mục trong danh sách đã chọn cho phòng hiện tại (nếu có)
  //     const itemIndex = updatedSelectedItems[currentRoom.id].findIndex(
  //       (selectedItem) => selectedItem._id === item._id
  //     );

  //     // Nếu mục chưa được chọn cho phòng hiện tại, thêm vào danh sách đã chọn
  //     if (itemIndex === -1) {
  //       updatedSelectedItems[currentRoom.id].push(item);
  //     } else {
  //       // Nếu mục đã được chọn cho phòng hiện tại, loại bỏ khỏi danh sách đã chọn
  //       updatedSelectedItems[currentRoom.id].splice(itemIndex, 1);
  //     }

  //     // Cập nhật state với danh sách đã chọn mới
  //     setSelectedItemsByRoom(updatedSelectedItems);
  //   }
  // };
  const calculateTotalPrice = () => {
    let total = 0;

    for (const item of listDichVu) {
      if (item._id in itemQuantities) {
        total += itemQuantities[item._id] * parseFloat(item.giaDichVu);
      }
    }

    return total;
  };

  //update trạng thái phòng
    const updateTrangThaiPhong = (selectPhong) => {
        const phong = {
            tinhTrang: "No",
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(phong),
        };

        fetch(`http://${hostname}:3000/updateTrangThaiPhong/${selectPhong}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                Alert.alert("Sửa thành công");
            })
            .catch(error => console.log('error', error));
    }
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
          data={listDatPhong}
          keyExtractor={(item, index) => item._id}
          onRefresh={() => getListDatPhong()}
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
                  Tên Phòng: {item.maPhong.tenPhong}
                </Text>
                <Text style={styles.textStyle}>Khách Hàng: {item.maKhachHang.tenKhachHang}</Text>
                  <Text style={styles.textStyle}>
                  Thời gian: {item.thoiGianThue} ngày
                </Text>
                
                <View style={{flexDirection:"row"}}>
                  <Text style={styles.textStyle }>
                  Trạng Thái:
                  </Text>
                  <Text style={[styles.textStyle , { color: item.tinhTrang === 'Đặt trước' ? '#FF0000' : '#388EBB'}]}>
                  {"\t"}{ item.tinhTrang}
                  </Text>
                </View>
                
              </View>
              {/* dialog delete */}

              <TouchableOpacity
                onPress={() => {
                  // setShowDiaLogChucNang(true);
                  // info(
                  //   item._id,
                  //   item.tenKhachHang,
                  //   item.sdt,
                  //   item.cccd,
                  //   item.diaChi
                  // );
                  if(item.tinhTrang === 'Đặt trước'){
                    console.log("1")
                  }else{
                    setShowDiaLogChucNang(true);
                    handleItemSelection(item)
                    console.log("2")
                  }
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
              onPressOut={() => {setModalVisible(false)
                }}
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
                    <View
                      style={{
                        flexDirection: "row",
                        margin: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* picker khách hàng */}
                      <View style={[styles.dropdown, { flex: 1 }]}>
                        <Picker
                          mode="dropdown"
                          selectedValue={selectKhachHang}
                          onValueChange={(itemValue) =>
                            setSelectKhachHang(itemValue)
                          }
                        >
                          {listKhachHang.map((data) => (
                            <Picker.Item
                              key={data._id}
                              label={data.tenKhachHang}
                              value={data._id}
                              color="#8391A1"
                              style={{ fontSize: 14, fontWeight: "600" }}
                            />
                          ))}
                        </Picker>
                      </View>
                      <View
                        style={{
                          flex: 0.2,
                          alignItems: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            borderColor: "white",
                            backgroundColor: "#35C2C1",
                            borderRadius: 60,
                            overflow: "hidden",
                            alignItems: "center",
                            padding: 7,
                          }}
                          onPress={() => {
                            {
                              setModalVisible(true);
                              setTitle("Đặt Phòng");
                              setId(0);
                              setTenKhachHang("");
                              setCccd("");
                              setSdt("");
                              setDiaChi("");
                            }
                          }}
                        >
                          <Ionicons name="add" size={15} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* //picker phòng  */}
                    <View style={styles.dropdown}>
                      <Picker
                        mode="dropdown"
                        selectedValue={selectPhong}
                        onValueChange={(itemValue) => {
                          setSelectPhong(itemValue);
                        }}
                      >
                        {listPhong.map((data) => (
                          <Picker.Item
                            mode={"dropdown"}
                            key={data._id}
                            label={data.tenPhong}
                            value={data._id}
                            color="#8391A1"
                            style={{ fontSize: 14, fontWeight: "600" }}
                          />
                        ))}
                      </Picker>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        margin: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={[styles.dropdown, { flex: 1 }]}>
                        <Picker
                          mode="dropdown"
                          selectedValue={selectThoiGian}
                          onValueChange={(itemValue) =>
                            setSelectThoiGian(itemValue)
                          }
                        >
                          <Picker.Item
                            label="Ngày"
                            value="java"
                            color="#8391A1"
                            style={{ fontSize: 14, fontWeight: "600" }}
                          />
                          <Picker.Item
                            label="Giờ"
                            value="js"
                            color="#8391A1"
                            style={{ fontSize: 14, fontWeight: "600" }}
                          />
                        </Picker>
                      </View>
                      <Text
                        style={{
                          fontSize: 11,
                          color: "#0075FF",
                          fontWeight: "bold",
                          marginLeft: 10,
                        }}
                      >
                        {soNgayThue + " Ngày"}
                      </Text>
                    </View>
                    {/* //thời gian nhận phòng  */}
                    <View style={styles.inputStyle}>
                      <TouchableOpacity
                        onPress={showStartDatePicker}
                        style={{ flexDirection: "row" }}
                      >
                        <Image
                          style={{ width: 24, height: 24, margin: 5 }}
                          source={require("../assets/appointment-date-icon-free-vector-removebg-preview.png")}
                        />
                        <TextInput
                          style={styles.input}
                          value={selectedStartDate}
                          placeholder="Thời gian nhận phòng"
                        />
                        <DatePickerDialog
                          visible={isStartDatePickerVisible}
                          onSelect={handleStartDateSelect}
                          onCancel={hideStartDatePicker}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* //thời gian trả phòng  */}
                    <View style={styles.inputStyle}>
                      <TouchableOpacity
                        onPress={showEndDatePicker}
                        style={{ flexDirection: "row" }}
                      >
                        <Image
                          style={{ width: 24, height: 24, margin: 5 }}
                          source={require("../assets/appointment-date-icon-free-vector-removebg-preview.png")}
                        />
                        <TextInput
                          style={styles.input}
                          value={selectedEndDate}
                          placeholder="Thời gian dự kiến trả phòng"
                        />
                        <DatePickerDialog
                          visible={isEndDatePickerVisible}
                          onSelect={handleEndDateSelect}
                          onCancel={hideEndDatePicker}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          marginRight: 5,
                          fontWeight: "500",
                        }}
                      >
                        Tổng Tiền:
                      </Text>
                      <Text
                        style={{
                          color: "red",
                          fontSize: 13,
                          marginRight: 15,
                          fontWeight: "500",
                        }}
                      >
                        {/* {selectedValue} */}
                        {tongTienPhong}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#08BE25" }]}
                        onPress={() => {{
                           insertNhanPhong();
                          //  updateTrangThaiPhong(selectPhong)
                        }
                         
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Nhận Phòng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#FF9900" }]}
                        onPress={() => {
                          {
                            {
                            insertDatPhong();
                            updateTrangThaiPhong(selectPhong)
                            }
                          }
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Đặt Trước</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
        
        {/* dialog nhận phòng  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDialogChucNang}
          onRequestClose={() => {
            this.showDialogChucNang(false);
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
              onPressOut={() => {
                 setShowDiaLogChucNang(false);
                }}
              style={{ backgroundColor: "#fff", width: "100%" }}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback
                  style={{ backgroundColor: "#fff", width: "100%" }}
                >
                  <View style={styles.modalView}>
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>
                      Thông Tin Nhận Phòng
                    </Text>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal={false}
                      style={{ padding: 5 , height:70 , margin:10 }}
                    >
                      {listDichVu.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => 
                        // handleItemSelection(item)
                        handleItemClick(item)
                      }
                    >
                      <View style={{width:"100%" , height:50 , flexDirection:"row" , justifyContent:"space-evenly"}}>
                        <Image
                          style={{width:30,height:30}}
                          src={item.hinhAnh}
                        />
                        <Text>{item.tenDichVu}</Text>
                        <Text>{item.giaDichVu}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                  </ScrollView>
                  
                    
                    <Text>Các mục đã chọn:</Text>
                    <FlatList
                    style={{width:"100%",height:120 , backgroundColor:"#F7F8F9" , }}
                      data={listDichVu.filter((item) => item._id in itemQuantities)}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                          <View>
                            <Text>Tên dịch vụ: {item.tenDichVu}</Text>
                            <Text>Giá dịch vụ: {item.giaDichVu}</Text>
                          </View>
                          <View style={{flexDirection:"row" , alignItems:"center"}}>
                          <TouchableOpacity
                           style={{margin:10 }}
                           onPress={() => handleTruSoLuong(item)}>
                            <Text style={{fontSize:18 , fontWeight:"bold"}}>-</Text>
                          </TouchableOpacity>

                          <Text>{itemQuantities[item._id] || 0}</Text>
                          
                          <TouchableOpacity
                          style={{margin:10 }}
                           onPress={() => handleCongSoLuong(item)}>
                            <Text style={{fontSize:18 , fontWeight:"bold"}}>+</Text>
                          </TouchableOpacity>
                          </View>
                        </View>
                        
                      )}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        alignSelf: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          marginRight: 5,
                          fontWeight: "500",
                        }}
                      >
                        Tổng Tiền Dịch Vụ:
                      </Text>
                      <Text
                        style={{
                          color: "red",
                          fontSize: 13,
                          marginRight: 15,
                          fontWeight: "500",
                        }}
                      >
                        {/* {selectedValue} */}
                        {/* {tongTienPhong} */}
                        {calculateTotalPrice()}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#08BE25" }]}
                        onPress={() => {
                          insertNhanPhong();
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Hoàn Tất</Text>
                      </TouchableOpacity>
                    </View>
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
                setTitle("Đặt Phòng");
                setId(0);
                setTenKhachHang("");
                setCccd("");
                setSdt("");
                setDiaChi("");
                setTinhTrang("");
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
    flex:1,
    alignItems: "center",
    margin: 10,
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
    margin: 5,
    justifyContent: "center",
  },
});
