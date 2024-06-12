
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Category() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
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
            <TouchableOpacity><FontAwesome name="edit" size={25} color="green" /></TouchableOpacity>
            <TouchableOpacity><MaterialCommunityIcons name="delete" size={25} color="red" /></TouchableOpacity>

          </View>

        </View>
        <View style={styles.Viewman}>
          <Text style={{ color: 'black', }}>Women</Text>
          <View style={styles.iconview}>
            <TouchableOpacity><FontAwesome name="edit" size={25} color="green" /></TouchableOpacity>
            <TouchableOpacity><MaterialCommunityIcons name="delete" size={25} color="red" /></TouchableOpacity>

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
            <Text style={styles.modalText}>Add category</Text>
            <TextInput
              style={styles.input}

              placeholder='Category Name'
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
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
