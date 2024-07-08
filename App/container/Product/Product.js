
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import firestore from '@react-native-firebase/firestore';
import { object, string } from 'yup';
import { useFormik } from 'formik';

export default function Product() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dropDownPicker, setDropDownPicker] = useState('');
  const [SubdropDownPicker, setSubDropDownPicker] = useState('');
  const [data, setdata] = useState([]);
  const [category, setCategory] = useState([])
  const [Subcategory, setSubcategory] = useState([])
  const [update, setUpdate] = useState(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);

  useEffect(() => {
    getdata();
    Subcategetdata();
  }, []);


  const getdata = async () => {
    const Categorydata = [];

    await firestore()
      .collection('category2')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          Categorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

        });
      });
    setCategory(Categorydata);
    setItems(Categorydata.map(v => ({ label: v.name, value: v.id })))


    const Productdata = [];
    await firestore()
      .collection('Product')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          Productdata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

        });
      });
    setdata(Productdata)

  }
  const Subcategetdata = async (id) => {
    const SubCategorydata = [];
    await firestore()
      .collection('SubCategory')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          SubCategorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        });
      });

    const sub = SubCategorydata.filter(v => v.category_id === id);
    console.log("iddddd", sub);
    setItems1(sub.map(v => ({ label: v.name, value: v.id })));
    setSubcategory(SubCategorydata);

  }


  const handleSubmit1 = async (data) => {
    // console.log(data);

    if (update) {
      firestore()
        .collection('Product')
        .doc(update)
        .update(data)
        .then(() => {
          console.log('User updated!');
        });
    } else {

      await firestore()
        .collection('Product')
        .add(data)
        .then(() => {
          console.log('Product added!');
        })
        .catch((error) => {
          console.log(error);
        })
    }


    setModalVisible(false);
    getdata();
    setdata(Productdata);

  }
  const handleDeleteData = async (id) => {
    // console.log("idddddd", id);
    await firestore()
      .collection('Product')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  }
  const Editdata = (data) => {
    // console.log(data);
    setModalVisible(true)
    setValues(data);
    setUpdate(data.id)
  }

  let userSchema = object({
    category_id: string().required(),
    Subcategory_id: string().required(),
    Product_name: string().required("enter name").matches(/^[a-zA-Z ]+$/, "enter valid name"),
    Price: string().required(),
    Discretion: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      category_id: '',
      Subcategory_id: '',
      Product_name: '',
      Price: '',
      Discretion: '',
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      // console.log("values", values);
      handleSubmit1(values);
      resetForm();

    },
  });

  // console.log("value",value);

  // console.log("dataqqqqq", data);

  const { handleBlur, handleChange, handleSubmit, errors, values, touched, setValues, resetForm, setFieldValue } = formik;
  return (
    <ScrollView>
      <View style={styles.div}>
        <TouchableOpacity
          style={styles.Opacity}
          onPress={() =>(setModalVisible(true),setUpdate(null),resetForm()) }
        >
          <Text style={styles.Opacitytext}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>


        <View style={styles.manProduct}>
          {
            data.map((v, i) => (
              <View style={styles.Viewman}>
                <View style={{   borderWidth: 0.4, width: '65%', padding: 10,borderRadius:5 }}>
                  <Text style={{ color: '#9B9B9B' }}>category:=<Text style={{ color: 'black' }}>{category.find((v1) => v.category_id === v1.id)?.name}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Subcategory:=<Text style={{ color: 'black' }}>{Subcategory.find((v1) => v.Subcategory_id === v1.id)?.name}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Product:=<Text style={{ color: 'black' }}>{v.Product_name}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Price:=<Text style={{ color: 'black' }}>{v.Price}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Discretion:=<Text style={{ color: 'black' }}>{v.Discretion}</Text></Text>
                </View>
                {/* <View>
               
                </View> */}
                <View style={styles.iconview}>

                  <TouchableOpacity onPress={() => Editdata(v)}>
                    <FontAwesome name="pencil-square" size={35} color="green" />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleDeleteData(v.id)}>
                    <FontAwesome name="trash" size={35} color="red" />
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
                  onChangeValue={() => Subcategetdata(value)}
                  onPress={() => setSubDropDownPicker(!dropDownPicker)}
                  onSelectItem={(items) => setFieldValue('category_id', items.value)}

                />
                <Text style={{ color: 'red' }}>{dropDownPicker && touched.category_id ? '' : errors.category_id}</Text>

              </View>
              <View style={styles.DropDown1}>
                <DropDownPicker
                  open={open1}
                  value={value1}
                  items={items1}
                  setOpen={setOpen1}
                  setValue={setValue1}
                  setItems={setItems1}
                  placeholder={'Subcategory_id'}
                  onChangeValue={() => handleChange('Subcategory_id')}
                  onPress={() => setDropDownPicker(!SubdropDownPicker)}
                  onSelectItem={(items) => setFieldValue('Subcategory_id', items.value)}
                />
                <Text style={{ color: 'red' }}>{SubdropDownPicker && touched.Subcategory_id ? '' : errors.Subcategory_id}</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder='Product_name'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Product_name')}
                onBlur={handleBlur('Product_name')}
                value={values.Product_name}
              />
              <Text style={{ color: 'red' }}>{errors.Product_name && touched.Product_name ? errors.Product_name : ''}</Text>

              <TextInput
                style={styles.input}
                placeholder='Price'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Price')}
                onBlur={handleBlur('Price')}
                value={values.Price}
              />
              <Text style={{ color: 'red' }}>{errors.Price && touched.Price ? errors.Price : ''}</Text>

              <TextInput
                style={styles.input}
                placeholder='Discretion'
                placeholderTextColor='#9B9B9B'
                onChangeText={handleChange('Discretion')}
                onBlur={handleBlur('Discretion')}
                value={values.Discretion}
              />
              <Text style={{ color: 'red' }}>{errors.Discretion && touched.Discretion ? errors.Discretion : ''}</Text>

              <TouchableOpacity
                style={styles.button1}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>{update ? "update" : "submite"}</Text>
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
    paddingTop: horizontalScale(20),
    alignItems: 'center',
  },
  input: {

    height: verticalScale(30),
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
    width: '95%',
    backgroundColor: '#355554',
    borderRadius: moderateScale(10),
    elevation: moderateScale(6),
    bottom: 10
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
    justifyContent: 'space-between',
    alignItems: 'center'
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