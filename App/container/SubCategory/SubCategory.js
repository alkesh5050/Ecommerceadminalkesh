
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SubCategory() {
  const [modalVisible, setModalVisible] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
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
        <Text style={styles.buttonText}>Add SubCategory</Text>
      </TouchableOpacity>

      <View style={styles.manProduct}>
        <View style={styles.Viewman}>
          <Text style={{ color: 'black' }}>men</Text>
          <View style={styles.iconview}>
          <TouchableOpacity><FontAwesome name="pencil-square" size={25} color="green" /></TouchableOpacity>
          <TouchableOpacity><FontAwesome name="trash" size={25} color="red" /></TouchableOpacity>

          </View>

        </View>
        <View style={styles.Viewman}>
          <Text style={{ color: 'black', }}>Women</Text>
          <View style={styles.iconview}>
          <TouchableOpacity><FontAwesome name="pencil-square" size={25} color="green" /></TouchableOpacity>
          <TouchableOpacity><FontAwesome name="trash" size={25} color="red" /></TouchableOpacity>

          </View>

        </View>

      </View>

      <Modal
        // animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalContent}>
            <Text style={styles.modalText}>category</Text>
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
            <TextInput
              style={styles.input}
              placeholder=' Add SubCategory Name'
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
  );
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
    paddingHorizontal: 100,
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
  manProduct: {
    width: '90%',
    // height: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 6,
    marginTop: 100
  },
  Viewman: {
    width: '90%',
    // height: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 6,
    margin: '5%',
    // justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // columnGap:90
  },
  iconview: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-between'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
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
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    height: 50,
    width: '95%',
  },
});