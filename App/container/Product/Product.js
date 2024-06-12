
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Product() {
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'shirts for men', value: 'shirts for men' },
    { label: 'shirt for women', value: 'shirt for women' },
    { label: 'women shoes', value: 'women shoes' },
  ]);
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: 'shirts for men', value: 'shirts for men' },
    { label: 'shirt for women', value: 'shirt for women' },
    { label: 'women shoes', value: 'women shoes' },
  ]);
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>


      <Modal
        // animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Product</Text>
            <View style={styles.DropDown}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Category'}
              />
            </View>
            <View style={styles.DropDown}>
              <DropDownPicker
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setItems1}
                placeholder={'Sub Category'}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder='Name'
              placeholderTextColor='#9B9B9B'

            />
            <TextInput
              style={styles.input}
              placeholder='Price'
              placeholderTextColor='#9B9B9B'

            />
            <TextInput
              style={styles.input}
              placeholder='Discretion'
              placeholderTextColor='#9B9B9B'

            />

            <TouchableOpacity
              style={styles.button1}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 80,
    alignItems: 'center',
  },
  input: {

    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 100,
    borderRadius: 5,
    marginBottom: 10
  },
  button1: {
    padding: 13,
    backgroundColor: '#007BFF',
    borderRadius: 9,

    paddingHorizontal: 100
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',

  },
  modalText: {
    color: 'black',
    fontSize: 18,
    marginBottom: 20,
  },
  DropDown: {
    paddingBottom: 30,
    paddingHorizontal: 5,

  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    height: '11%',
    width: '95%',
  },
});