import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity, FlatList, ImageBackground, SafeAreaView } from 'react-native';
import DatePickerDialog from './DatePickerDialog'
import moment from 'moment';

export default function BaoCaoThongKe() {
  const hostname = '192.168.126.1'; //hantnph28876

  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  // const [listPhieuMuon, setListPhieuMuon] = useState([]);
  const [doanhThu, setDoanhThu] = useState(0);

  const [loading, setLoading] = useState(false);


  // dialog chọn ngày bắt đầu
  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleStartDateSelect = (date) => {
    console.log(moment(date).format('DD-MM-YYYY'))
    // {date ? moment(date).format('DD-MM-YYYY') : 'Select a date'}
    if (date) {
      date = moment(date).format('DD-MM-YYYY');
    }
    setSelectedStartDate(date);
    hideStartDatePicker();
  };

  // dialog chọn ngày kết thúc
  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndDateSelect = (date) => {
    console.log(moment(date).format('DD-MM-YYYY'))
    // {date ? moment(date).format('DD-MM-YYYY') : 'Select a date'}
    if (date) {
      date = moment(date).format('DD-MM-YYYY');
    }
    setSelectedEndDate(date);
    hideEndDatePicker();
  };

  // tính doanh thu
  const getDoanhThu = (startDate, endDate) => {
    var raw = "";

    var requestOptions = {
      method: 'GET',
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/doanhThu?startDate=${startDate}&endDate=${endDate}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setDoanhThu(result);
          setLoading(false);
          
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')} // Đường dẫn tới ảnh
        style={styles.backgroundImage}
      >

        {/* chọn ngày bắt đầu */}
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
              placeholder="Ngày bắt đầu"
            />
            <DatePickerDialog
              visible={isStartDatePickerVisible}
              onSelect={handleStartDateSelect}
              onCancel={hideStartDatePicker}
            />
          </TouchableOpacity>
        </View>
        {/* Chọn ngày kết thúc */}
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
              placeholder="Ngày kết thúc"
            />
            <DatePickerDialog
              visible={isEndDatePickerVisible}
              onSelect={handleEndDateSelect}
              onCancel={hideEndDatePicker}
            />
          </TouchableOpacity>
        </View>

        {/* button doanh thu */}
        <TouchableOpacity style={styles.btnDoanhThu} onPress={() => {
          getDoanhThu(selectedStartDate, selectedEndDate);

        }}>
          <Text style={{ color: '#35C2C1', fontSize: 18, fontWeight: 'bold' }}>DOANH THU</Text>
        </TouchableOpacity>

        {/* text hiện doanh thu */}
        <View style={{ flexDirection: 'row', flex: 1, marginTop: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Doanh thu: </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{doanhThu+" VND"}</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: 'cover', // Để ảnh phủ kín phần nền
    // justifyContent: 'center', // Để nội dung nằm giữa ảnh nền
    alignItems: 'center'
  },
  // style input chọn ngày
  inputStyle: {
    width: "85%",
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
    marginTop: 20,
  },
  // button daonh thu
  btnDoanhThu: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    marginTop: 30
  },
})