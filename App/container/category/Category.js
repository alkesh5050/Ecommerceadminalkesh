
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Category() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [data, setdata] = useState([]);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const Cat_data = await AsyncStorage.getItem("category");
    setdata(JSON.parse(Cat_data));
    // console.log(Cat_data)
  }


  const handleSubmit = async (id) => {
    setModalVisible(false);

    const catData = await AsyncStorage.getItem("category");

    if (update) {

      const udata = JSON.parse(catData).map((v) => {
        if (v.id === update) {
          return ({ id: update, cat_name: name });
        } else {
          return v;
        }
      })

      await AsyncStorage.setItem("category", JSON.stringify(udata));
      setdata(udata);
      // console.log("async", udata);
    } else {
      if (catData) {
        // console.log("fffffff");
        const asyncData = JSON.parse(catData);

        asyncData.push({ id: Math.floor(Math.random() * 10000), cat_name: name })

        await AsyncStorage.setItem("category", JSON.stringify(asyncData))
        setdata(asyncData)
      } else {
        let data = [{ id: Math.floor(Math.random() * 10000), cat_name: name }];

        await AsyncStorage.setItem("category", JSON.stringify(data))
        setdata(asyncData)
      }
    }

    setName('')
    setUpdate(null)
    // console.log("async", catData);
    // console.log(name);
  }


  const handleDeleteData = async (id) => {
    const data = await AsyncStorage.getItem("category");
    const fData = JSON.parse(data).filter((v) => v.id !== id);

    await AsyncStorage.setItem("category", JSON.stringify(fData));

    setdata(fData);
  }

  const Editdata = async (id) => {
    setModalVisible(true);

    const data = await AsyncStorage.getItem("category");

    const fdata = JSON.parse(data).find((v) => v.id === id);
    // console.log("sdddd", fdata.cat_name);

    setName(fdata.cat_name);
    setUpdate(id)
  }

  return (
    <ScrollView>
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Add Category</Text>
        </TouchableOpacity>

        <View style={styles.manProduct}>

          {
            data.map((v, i) => (
              <View key={v.id} style={styles.Viewman}>
                <Text style={{ color: 'black' }}>{v.cat_name}</Text>
                <View style={styles.iconview}>

                  <TouchableOpacity onPress={() => Editdata(v.id)}>
                    <FontAwesome name="pencil-square" size={25} color="green" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDeleteData(v.id)}>
                    <FontAwesome name="trash" size={25} color="red" />
                  </TouchableOpacity>

                </View>

              </View>
            ))
          }

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
              <View style={{ width: '95%', }}>
                <TextInput
                  style={styles.input}
                  onChangeText={setName}
                  placeholder='Category Name'
                  placeholderTextColor='#9B9B9B'
                  value={name}
                />
              </View>

              <TouchableOpacity
                style={styles.button1}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>{update ? "update" : "submite"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: horizontalScale(80),
    alignItems: 'center',
  },
  input: {
    color: 'black',
    height: verticalScale(40),
    borderColor: 'gray',
    borderWidth: 1,
    // paddingHorizontal: 100,
    borderRadius: moderateScale(5),
    marginBottom: horizontalScale(10)
  },
  button1: {
    padding: horizontalScale(10),
    backgroundColor: '#007BFF',
    borderRadius: moderateScale(5),
    paddingHorizontal: horizontalScale(100),
  },
  button: {
    padding: horizontalScale(10),
    backgroundColor: '#007BFF',
    borderRadius: moderateScale(5),

  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(16),
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
    padding: horizontalScale(10),
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
    width: horizontalScale(300),
    padding: horizontalScale(20),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: moderateScale(18),
    marginBottom: horizontalScale(20),
  },
});
