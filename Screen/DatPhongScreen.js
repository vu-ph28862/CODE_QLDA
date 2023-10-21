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
// import { 
//   Icon , Feather,
//   MaterialIcons,
//   FontAwesome,
//   Fontisto,
//   MaterialCommunityIcons,
//   Ionicons,
//   SimpleLineIcons,
//   EvilIcons, } from "react-native-vector-icons/icon";

export default function QuanLyDatPhong({route}) {

  // const hostname = "192.168.1.6"; //long
  const hostname = '192.168.126.1'; //hantnph28876


  //const hostname = "192.168.1.2"; //long




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
  const [listPhieuDichVu , setListPhieuDichVu] = useState([]);
  const [listNhanVien , setListNhanVien] = useState([]);
  //mã loại dịch vụ
  const [selectDichVu, setSelectDichVu] = useState();
  const [selectKhachHang, setSelectKhachHang] = useState();
  const [selectPhong , setSelectPhong] = useState();
  const [selectNhanVien , setSelectNhanVien ] = useState();
  //value list
  
  //checked dialog
  const [modalVisible, setModalVisible] = useState(false);
  //check dialog thêm - sửa dịch vụ nhận phòng
  const [showDialogChiTietNhanPhong, setShowDiaLogChiTietNhanPhong] = useState(false);
  //check dialog nhận phòng: gồm btn chi tiết - btn thanh toán
  const [showDialogNhanPhong, setShowDiaLogNhanPhong] = useState(false);
  //check dialog đặt trước: gồm btn hủy - btn nhận phòng
  const [showDialogDatTruoc, setShowDiaLogDatTruoc] = useState(false);
  //check dialog trả phòng
  const [showDialogTraPhong , setShowDialogTraPhong] = useState(false);
  //check dialog nhận phòng
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
        console.log("ngay: "+startDate);
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getListKhachHang();
    getListPhong();
    getListDatPhong();
    getListDichVu();
    getListPhieuDichVu();
    getListNhanVien();
  }, []);

  
  //insert du lieu đặt phòng
  const insertDatPhong = () => {
    const datPhong = {
      thoiGianDen:selectedStartDate,
      thoiGianTra:selectedEndDate,
      thoiGianThue: soNgayThue,
      tinhTrang: "Đặt Trước",
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
      tinhTrang: "Đang Thuê",
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
    console.log("value insert dat phong: "+datPhong);
    getListDatPhong();
    setModalVisible(!modalVisible);
    //thêm thành công sẽ sửa trạng thái
    updateTrangThaiPhong(selectPhong)
    setSoNgayThue("");
    setTinhTrang("");
    setSelectKhachHang(null);
    setSelectPhong(null);
    setSelectedStartDate("");
    setSelectedEndDate("");
  };
  
  
  
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
  const updateTrangThaiPhong = (_id) => {
        const phong = {
            _id:selectPhong,
            tinhTrang: "No",
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(phong),
        };

        fetch(`http://${hostname}:3000/updateTrangThaiPhong/${_id}`, requestOptions)
            .then(response => {
              response.json()
              })
            .then(result => {
                console.log("value update trang thai phong: "+result)
                getListPhong();
            })
            .catch(error => console.log('error', error));
  }

  
  const [maPhong,setMaPhong] = useState("");
  // thêm list dịch vụ vào bảng chiTietDichVu

  const infoPhong = (maPhong , id , tienDatPhong) => {
    console.log("ma Phong: "+ maPhong + " \t ma dat phong: \t" + id + "\t tien dat phong: " + tienDatPhong);
    setMaPhong(maPhong);
    setValueIdDatPhong(id);
    setTienDatPhong(tienDatPhong);
    //
  }
  const insertPhieuDichVu = () => {
      const phieuDichVu = {
      maPhong:maPhong,
      tongTien:calculateTotalPrice(),
    };

    fetch(`http://${hostname}:3000/insertPhieuDichVu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phieuDichVu),
    });
    console.log("value insert phieu dich vu: "+phieuDichVu);
    setShowDiaLogChiTietNhanPhong(!showDialogChiTietNhanPhong)
    
    //thêm thành công sẽ sửa trạng thái
    setItemQuantities({});
    setItemQuantities([]);

  }
  const getListPhieuDichVu = () => {
    fetch(`http://${hostname}:3000/getPhieuDichVu`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res) {
          setListPhieuDichVu(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [tongTienDichVu , setTongTienDichVu] = useState(0);  
  const [tienDatPhong , setTienDatPhong] = useState(0);
  const [valueIdPhieuDichVu,setValueIdPhieuDichVu] = useState("");
  const [valueIdDatPhong , setValueIdDatPhong] = useState();
  
  //lay id phong
  onItemClick = (maPhong) => {
    const phieuDatDichVuItem = listPhieuDichVu.find(
      (item) => item.maPhong?._id === maPhong
    );
    if (phieuDatDichVuItem) {
      console.log("Id Phieu Dich Vu "+ phieuDatDichVuItem._id);
      setValueIdPhieuDichVu(phieuDatDichVuItem._id);
      setTongTienDichVu(phieuDatDichVuItem.tongTien);
    }
  }
  
  //Hóa đơn
  //lấy ngày hiện tại
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('DD-MM-YYYY');
  const insertHoaDonThanhToan = () => {
      const dichVu = parseInt(tongTienDichVu, 10);
      const datPhong = parseInt(tienDatPhong, 10);
      const hoaDon = {
      ngayTao:formattedDate,
      tongTienHoaDon:dichVu + datPhong,
      trangThai:"Hoàn tất",
      maNV:"admin",
      maCTDV:valueIdPhieuDichVu,
      maDatPhong:valueIdDatPhong,
    };

    fetch(`http://${hostname}:3000/insertHoaDonThanhToan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hoaDon),
    });
    console.log("value hoa don: "+hoaDon);
    setShowDiaLogNhanPhong(!showDialogNhanPhong)
    Alert.alert("Thanh toán thành công");
    updateTraPhong(maPhong);
    setValueIdPhieuDichVu(0);
    setTienDatPhong(0);
    setTongTienDichVu(0);
  }
  
  const insertHoaDonHuy = () => {
      const hoaDon = {
      ngayTao:formattedDate,
      tongTienHoaDon:0,
      trangThai:"Hủy Đặt Phòng",
      maNV:"admin",
      maDatPhong:valueIdDatPhong,
    };

    fetch(`http://${hostname}:3000/insertHoaDonThanhToan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hoaDon),
    });
    console.log("value hoa don huy :" + hoaDon);
    setShowDiaLogDatTruoc(!showDialogDatTruoc)
    Alert.alert("Hủy đặt phòng thành công");
    updateTraPhong(maPhong);
    updateTrangThaiHuyDat(valueIdDatPhong)
  }
  const updateTraPhong = (maPhong) => {
        const phong = {
            tinhTrang: "Yes",
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(phong),
        };

        fetch(`http://${hostname}:3000/updateTrangThaiPhong/${maPhong}`, requestOptions)
            .then(response => {
                response.json()
              })
            .then(result => {
                console.log("value update trang thai phong: "+result)
                getListPhong();
                setMaPhong(0);
            })
            .catch(error => console.log('error', error));
  }
  const [tinhTrangDatPhong, setTinhTrangDatPhong] = useState("");
  //update trạng thái nhận phòng
  const updateTrangThaiDatPhong = (valueIdDatPhong) => {
    const datPhong = {
      tinhTrang:tinhTrangDatPhong
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(datPhong),
    };

    fetch(`http://${hostname}:3000/updateTrangThaiDatPhong/${valueIdDatPhong}`, requestOptions)
    .then(response => {
    response.json()
    })
    .then(result => {
    console.log("value update trang thai dat phong: "+result)
    getListDatPhong();
    setValueIdDatPhong(0);
    })
    .catch(error => console.log('error', error));
  }

  //update hủy đặt phòng
  const updateTrangThaiHuyDat = (valueIdDatPhong) => {
    const datPhong = {
      tinhTrang:"Hủy Đặt"
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(datPhong),
    };

    fetch(`http://${hostname}:3000/updateTrangThaiDatPhong/${valueIdDatPhong}`, requestOptions)
    .then(response => {
    response.json()
    })
    .then(result => {
    console.log("value update trang thai dat phong: "+result)
    getListDatPhong();
    setValueIdDatPhong(0);
    })
    .catch(error => console.log('error', error));
  }


  //xem chi tiết
  const [chiTietMaPhong, setChiTietMaPhong] = useState("");
  const [chiTietPhong , setChiTietPhong] = useState("");
  const [chiTietTienPhong , setChiTietTienPhong] = useState("");
  const [chiTietNgayThue , setChiTietNgayThue] = useState("");
  const infoChiTietPhong = (chiTietPhong , chiTietNgayThue , chiTietTienPhong) => {
    setChiTietPhong(chiTietPhong),
    setChiTietTienPhong(chiTietTienPhong);
    setChiTietNgayThue(chiTietNgayThue)
  }

  const getStyleTinhTrang = (tinhTrang) => {
    switch (tinhTrang) {
      case "Đang Thuê":
        return { color: "#08BE25" };
      case "Đặt Trước":
        return { color: "#FF9900" };
      case "Đã Trả Phòng":
        return { color: 'blue' };
        case "Hủy Đặt":
        return { color: 'red' , textDecorationLine: 'line-through', textDecorationStyle: 'solid' };
      default:
        return { color: '#000' };
    }
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
          data={listDatPhong}
          keyExtractor={(item, index) => item._id}
          onRefresh={() => {getListDatPhong()
            getListPhong()
            getListKhachHang()
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
                  Thời gian nhận: {item.thoiGianDen}
                  </Text>
                  <Text style={styles.textStyle}>
                  Thời gian trả: {item.thoiGianTra}
                  </Text>
                <View style={{flexDirection:"row"}}>
                  <Text style={styles.textStyle }>
                  Trạng Thái:
                  </Text>
                  <Text 
                  // style={[styles.textStyle , { color: item.tinhTrang === 'Đặt trước' ? '#FF0000' : '#388EBB'}]}
                  style={[styles.textStyle ,  getStyleTinhTrang(item.tinhTrang)]}

                  >
                  {"\t"}{ item.tinhTrang}
                  </Text>
                </View>
                
              </View>
              {/* dialog item chi tiết */}

              <TouchableOpacity
                onPress={() => {
                  
                  infoPhong(item.maPhong._id , item._id , item.tongTien);
                  onItemClick(item.maPhong?._id)
                  console.log(item.maPhong?._id);

                  infoChiTietPhong(item.maPhong.tenPhong , item.thoiGianThue , item.tongTien)
                  //đặt trước
                  if(item.tinhTrang === 'Đặt Trước'){
                    setShowDiaLogDatTruoc(true)
                    setTinhTrangDatPhong("Đang Thuê")
                    console.log(tinhTrangDatPhong);
                  }else if(item.tinhTrang === 'Đã Trả Phòng'){
                    console.log(null);
                    setShowDiaLogDatTruoc(false)
                    setShowDiaLogNhanPhong(false);
                  }else if(item.tinhTrang === 'Hủy Đặt'){
                    console.log(null);
                    setShowDiaLogDatTruoc(false)
                    setShowDiaLogNhanPhong(false);
                  }
                  else{
                    //nhận phòng
                    setShowDiaLogNhanPhong(true);
                    setTinhTrangDatPhong("Đã Trả Phòng")
                    console.log(tinhTrangDatPhong);
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
                        justifyContent:"space-between",
                        width:"95%"
                      }}
                    >
                      <View style={{alignSelf:"flex-start"}}>
                        <Text
                        style={{
                          fontSize: 11,
                          color: "#0075FF",
                          fontWeight: "bold",
                          textAlign:"left"
                        }}
                      >
                        {soNgayThue + " Ngày"}
                      </Text>
                      </View>
                      <View style={{alignSelf:"flex-end" , flexDirection:"row"}}>
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
                      
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.buttonChiTiet, { backgroundColor: "#08BE25" }]}
                        onPress={() => {{
                           insertNhanPhong();
                        }
                        }}
                      >
                        <Text style={{ color: "#fff" }}>Nhận Phòng</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.buttonChiTiet, { backgroundColor: "#FF9900" }]}
                        onPress={() => {
                          {
                            {
                                insertDatPhong();
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
        
        {/* dialog chi tiết thêm - sửa dịch vụ nhận phòng  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDialogChiTietNhanPhong}
          onRequestClose={() => {
            this.setShowDiaLogChiTietNhanPhong(false);
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
                 setShowDiaLogChiTietNhanPhong(false);
                 setItemQuantities({})
                 setItemQuantities([])

                }}
              style={{ backgroundColor: "#fff", width: "100%" }}
            >
              <View style={styles.centeredView}>
                <TouchableWithoutFeedback
                  style={{ backgroundColor: "#fff", width: "100%" }}
                >
                  <View style={styles.modalView}>
                    <Text style={{ fontSize: 18, fontWeight: "500" , marginBottom:10 }}>
                      Chi tiết Nhận Phòng
                    </Text>

                    {/* thông tin chi tiết đặt phòng  */}

                    <View style={{flexDirection:"row" , width:"100%" , justifyContent:"space-around"}}>
                      <View style={{flexDirection:"row"}}>
                        <MaterialIcons
                        name="meeting-room"
                        size={20}
                        color="black"
                      />
                      <Text> Phòng: {chiTietPhong}</Text>  
                      </View>
                       <View style={{flexDirection:"row"}}>
                      <Ionicons
                        name="time-outline"
                        size={20}
                        color="black"
                      />
                      <Text>Thời gian thuê: {chiTietNgayThue} ngày</Text>
                       </View>
                      
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <FontAwesome
                        name="money"
                        size={20}
                        color="black"
                      />
                      <Text> Tiền Đặt Phòng {chiTietTienPhong} đ</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: "500" , margin:10 }}>
                      Dịch vụ Phòng 
                    </Text>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      horizontal={false}
                      style={{ padding: 5 , height:70 , marginTop:10 }}
                    >
                      {listDichVu.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => 
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
                  
                    
                    <Text style={{ fontSize: 13, fontWeight: "500" }}>
                      Danh sách dịch vụ
                    </Text>
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
                          insertPhieuDichVu();
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
         {/* dialog chọn chức năng nhận phòng  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDialogNhanPhong}
          onRequestClose={() => {
            this.setShowDiaLogNhanPhong(false);
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
                setShowDiaLogNhanPhong(false);
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
                        setShowDiaLogChiTietNhanPhong(!showDialogChiTietNhanPhong);
                        setShowDiaLogNhanPhong(false);
                        
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Chi Tiết</Text>
                    </TouchableOpacity>
                    {/* btn sửa khách hàng  */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        {
                            insertHoaDonThanhToan();
                            console.log("value ID dat phong: "+ valueIdDatPhong);
                            updateTrangThaiDatPhong(valueIdDatPhong);
                            console.log(tinhTrangDatPhong);
                        }
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Trả Phòng</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>               
        {/* dialog chọn chức năng đặt trước  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDialogDatTruoc}
          onRequestClose={() => {
            this.setShowDiaLogDatTruoc(false);
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
                setShowDiaLogDatTruoc(false);
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
                        setShowDiaLogDatTruoc(!showDialogDatTruoc);
                        insertHoaDonHuy();
                        
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Hủy Đặt Phòng</Text>
                    </TouchableOpacity>
                    {/* btn sửa khách hàng  */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        {
                          setShowDiaLogDatTruoc(!showDialogDatTruoc);
                          console.log("value ID dat phong: "+ valueIdDatPhong);
                          updateTrangThaiDatPhong(valueIdDatPhong);
                          console.log(tinhTrangDatPhong);
                        }
                      }}
                    >
                      <Text style={{ color: "#fff" }}>Nhận Phòng</Text>
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
  buttonChiTiet: {
    flex:1,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    alignItems: "center",
    backgroundColor: "#35C2C1",
    margin: 10,
  },
});
