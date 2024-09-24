
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import { useFormik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getcategorydata } from '../../redux/action/fiercategory.action';
import { subcategoriesriducer } from '../../redux/reducer/subcategory.reducer';
import { addSubcategory, deleteSubcategory, getSubcategory, updeteSubcategory } from '../../redux/action/subcategory.action';
import { deleteCategory, getCategory } from '../../redux/action/category.action';

export default function SubCategory() {
  const [modalVisible, setModalVisible] = useState(false);
  const [data2, setdata2] = useState([]);
  const [dropDownPicker, setDropDownPicker] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);
  const [items2, setItems2] = useState([]);
  const [update, setUpdate] = useState(null);
  const [category, setCategory] = useState([])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcategorydata());
    Subgetdata();
  }, []);

  const categorya = useSelector(state => state.fiercategory);
  const subcategorya = useSelector(state => state.subcategorys);
  // console.log("ssssppppppppppppp", subcategorya.subcategories);
  // console.log("ssssppppppppppppp", subcategorya.subcategories);

  const Subgetdata = async () => {

    dispatch(getSubcategory())

  }


  const handleSubmit1 = async (data) => {

    if (update) {
      dispatch(updeteSubcategory(data))
      Subgetdata();
    } else {
      dispatch(addSubcategory(data))

    }

    setModalVisible(false);
    Subgetdata();
  }

  const Editdata = (data) => {

    // console.log("edite", data);
    setModalVisible(true);
    setValues(data);
    setUpdate(data.id)

  }

  const handleDeleteData = async (id) => {
    dispatch(deleteSubcategory(id))


    Subgetdata();
  }



  let userSchema = object({
    name: string().required(),
    category_id: string().required(),
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      category_id: ''
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {

      // console.log("valis", values);
      handleSubmit1(values);
      resetForm();

    },
  });

  const { handleBlur, handleChange, handleSubmit, errors, values, touched, setValues, resetForm, setFieldValue } = formik;


  // data2.map((v, i) => {
  //   const a = category.find((v1) => v.dropDownPicker === v1.id);
  //   console.log("sssssssssssssss",a);
  // })

  return (
    <ScrollView>

      <View style={styles.div}>
        <TouchableOpacity
          style={styles.Opacity}
          onPress={() => { setModalVisible(true); resetForm(), setUpdate(null) }}
        >
          <Text style={styles.Opacitytext}>SubCategory</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={styles.manProduct}>
          {
            subcategorya.subcategories.map((v, i) => (
              <View key={i} style={styles.Viewman}>
                <Text style={{ color: 'black' }}>{categorya.categories.find((v1) => v.category_id === v1.id)?.name}</Text>
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
                      <Text style={styles.modalText}>Sub category</Text>
                      <View style={styles.DropDown}>

                        <DropDownPicker
                          open={open}
                          value={formik.values.category_id}
                          items={categorya.categories.map(v => ({ label: v.name, value: v.id }))}
                          setOpen={setOpen}
                          setValue={setValue}
                          setItems={setItems}
                          placeholder={'Category'}
                          onChangeText={handleChange('category_id')}
                          onPress={() => setDropDownPicker(!dropDownPicker)}
                          onSelectItem={(items) => setFieldValue('category_id', items.value)}
                    
                        />
                        <Text style={{ color: 'red' }}>{dropDownPicker && touched.category_id ? '' : errors.category_id}</Text>
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
    elevation: 4,
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
  modalContainer: {

    paddingTop: horizontalScale(200),
  },

});