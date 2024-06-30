
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import { useFormik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import { object, string } from 'yup';

export default function SubCategory() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [data, setdata] = useState([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    // { label: 'shirts for men', value: 'shirts for men' },
    // { label: 'shirt for women', value: 'shirt for women' },
    // { label: 'women shoes', value: 'women shoes' },
  ]);
  useEffect(() => {
    getdata();
}, []);


const getdata = async () => {
  const Categorydata = [];

        const users = await firestore()

            .collection('category2')
            .get()
            .then(querySnapshot => {
                console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    Categorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

                });
            });
        setdata(Categorydata)
      // console.log("setItems",data);
      console.log("setItems",data);
      setItems(Categorydata.map(v =>({label: v.name, value: v.name})))
    
}

  const handleSubmit1 = async (data) => {
    console.log("ffffffffffffff", data);
    await firestore()
      .collection('SubCategory')
      .add(data)
      .then(() => {
        console.log('SubCategory added!');
      })
      .catch((error) => {
        console.log(error);
      })

    setModalVisible(false);

  }

  let userSchema = object({
    name: string().required(),

  });


  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: userSchema,
    onSubmit: (values,{resetForm}) => {
      //   alert(JSON.stringify(values, null, 2));
      //  console.log("valis",values);
      handleSubmit1(values);
      resetForm();

    },
  });
console.log( "setItemssssss",setValue);

  const { handleBlur, handleChange, handleSubmit, errors, values, touched, setValues } = formik;

  return (
    <ScrollView>

      <View style={styles.div}>
        <TouchableOpacity
          style={styles.Opacity}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.Opacitytext}>Add Category</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>


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

                placeholder='Category Name'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <Text style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : ''}</Text>



              <TouchableOpacity
                style={styles.button1}
                onPress={() => (setModalVisible(false), handleSubmit())}
              >
                <Text style={styles.buttonText}>Submit</Text>
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
    // paddingTop: horizontalScale(10),
    alignItems: 'center',
    paddingBottom: 10,

  },
  input: {

    height: verticalScale(40),
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: horizontalScale(100),
    borderRadius: moderateScale(5),
    marginBottom: horizontalScale(10)
  },
  button1: {
    padding: horizontalScale(13),
    backgroundColor: '#007BFF',
    borderRadius: moderateScale(9),
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
  manProduct: {
    width: '90%',
    // height: '30%',
    backgroundColor: '#355554',
    borderRadius: moderateScale(10),
    elevation: moderateScale(6),


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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  DropDown: {
    paddingBottom: horizontalScale(30),
    paddingHorizontal: horizontalScale(5),


  },
  input: {
    color: 'black',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    marginBottom: horizontalScale(10),
    padding: horizontalScale(10),
    height: verticalScale(50),
    width: '95%',
  },
  div: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '10%'
  },
  Opacity: {
    padding: horizontalScale(12),
    backgroundColor: '#007BFF',
    borderRadius: moderateScale(50),
  },
  Opacitytext: {
    color: 'white',
    fontSize: moderateScale(16),
  }
});