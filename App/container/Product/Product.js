
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';

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
    <ScrollView>

      <View style={styles.container}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add Product</Text>
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
              <View style={styles.DropDown1}>
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
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: horizontalScale(80),
    alignItems: 'center',
  },
  input: {

    height: verticalScale(40),
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: horizontalScale(100),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10)
  },
  button1: {
    padding: 13,
    backgroundColor: '#007BFF',
    borderRadius: moderateScale(9),
    paddingHorizontal: 100
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: moderateScale(5),

  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(16),
  },
  manProduct: {
    width: '90%',
    // height: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10),
    elevation: moderateScale(6),
    marginTop: 100
  },
  Viewman: {
    width: '90%',
    // height: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(10),
    elevation: moderateScale(6),
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
    zIndex: 1000
  },
  DropDown1: {
    paddingBottom: 30,
    paddingHorizontal: 5,
   zIndex: 999
  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    height: '11%',
    width: '95%',
  },
});