
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
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
  const [data2, setdata2] = useState([]);
  const [dropDownPicker, setDropDownPicker] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [update, setUpdate] = useState(null);
  const [category, setCaegory] = useState([])

  useEffect(() => {
    // getdata();
    Subgetdata();
  }, []);
  // useEffect(() => {
  //   Subgetdata();
  // }, []);

  // const getdata = async () => {
  //   // const Categorydata = [];

  //   // const users = await firestore()

  //   //   .collection('category2')

  //   //   .get()
  //   //   .then(querySnapshot => {
  //   //     // console.log('Total users: ', querySnapshot.size);

  //   //     querySnapshot.forEach(documentSnapshot => {
  //   //       // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
  //   //       Categorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

  //   //     });
  //   //   });
  //   // setdata(Categorydata)
  //   // console.log("setItems",Categorydata.id);
  //   // console.log("setItems", data);
  //   // setItems(Categorydata.map(v => ({ label: v.name, value: v.name })))
  //   // console.log("setItemssssss", value);

  // }


  const Subgetdata = async () => {
    const Categorydata = [];

       await firestore()

      .collection('category2')

      .get()
      .then(querySnapshot => {
        // console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
          Categorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

        });
      });

      setCaegory(Categorydata)
    const SubCategorydata = [];

     await firestore()

      .collection('SubCategory')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          SubCategorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

        });
      });


    setdata2(SubCategorydata)
    setItems(Categorydata.map(v => ({ label: v.name, value: v.id })))
  
  }

  const handleSubmit1 = async (data) => {
    // console.log("fffffffffffff", value);

    // const subCategoryData = {
    //   ...data,
    //   category: value
    // };

    if (update) {
      // console.log("updet", update);
      firestore()
        .collection('SubCategory')
        .doc(update)
        .set(data)
        .then(() => {
          console.log('Updat added!');
        });
    } else {

      await firestore()
        .collection('SubCategory')
        .add(data)
        .then(() => {
          console.log('SubCategory added!');
        })
        .catch((error) => {
          console.log(error);
        })
    }


    setModalVisible(false);
    Subgetdata();
  }

  const Editdata = (data) => {

    console.log("edite", data);
    setModalVisible(true);
    setValues(data);
    setUpdate(data.id)

  }

  const handleDeleteData = async (id) => {

    console.log("eeeeeeee", id);
    await firestore()
      .collection('SubCategory')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });

    Subgetdata();
  }



  let userSchema = object({
    name: string().required(),
    dropDownPicker:string().required(),
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      dropDownPicker:''
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      //   alert(JSON.stringify(values, null, 2));
      console.log("valis", values);
      handleSubmit1(values);
      resetForm();
      // Subgetdata();
    },
  });

  const { handleBlur, handleChange, handleSubmit, errors, values, touched, setValues, resetForm,setFieldValue } = formik;


  // data2.map((v, i) => {
  //   const a = category.find((v1) => v.dropDownPicker === v1.id);
  //   console.log("sssssssssssssss",a);
  // })

  return (
    <ScrollView>

      <View style={styles.div}>
        <TouchableOpacity
          style={styles.Opacity}
          onPress={() => { setModalVisible(true); resetForm(),setUpdate(null) }}
        >
          <Text style={styles.Opacitytext}>SubCategory</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.manProduct}>
          {
            data2.map((v, i) => (
              <View key={i} style={styles.Viewman}>
                <Text style={{ color: 'black' }}>{ category.find((v1) => v.dropDownPicker === v1.id)?.name }</Text>
                <Text style={{ color: 'black' }}>{v.name}</Text>
                <View style={styles.iconview}>

                  <TouchableOpacity onPress={() => Editdata(v)}>
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
        // onBackdropPress={() => this.setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => { setModalVisible(false); resetForm() }}
          >
            <ScrollView
              directionalLockEnabled={true}
              contentContainerStyle={styles.scrollModal}
            >
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
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
                          onChangeText={handleChange('dropDownPicker')}
                          onPress={() => setDropDownPicker(!dropDownPicker)}
                          onSelectItem={(items) => setFieldValue('dropDownPicker', items.value)}
                        />
                        <Text style={{ color: 'red' }}>{dropDownPicker&&touched.dropDownPicker ? '' : errors.dropDownPicker}</Text>
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
                        onPress={handleSubmit}
                      >
                        <Text style={styles.buttonText}>{update ? "update" : "submite"}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </TouchableOpacity>

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
    borderRadius: moderateScale(5),
    elevation:4,
    alignItems: 'center',
    borderWidth: 1,
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
  },
  modalContainer:{

    paddingTop: horizontalScale(200),
  },
  
});