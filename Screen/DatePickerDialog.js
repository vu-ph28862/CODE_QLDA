import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';

const DatePickerDialog = ({ visible, onSelect, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleConfirm = () => {
    onSelect(selectedDate);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Calendar onDayPress={handleDayPress} />
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={{color: '#009ACD', fontWeight:'bold', fontSize:18}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={{color: '#009ACD', fontWeight:'bold', fontSize:18}}>OK</Text>
        </TouchableOpacity>
        
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  confirmButton: {
    marginTop: 10,
    padding: 10,
    
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    marginLeft:100
  },
});

export default DatePickerDialog;
