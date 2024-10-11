
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, PermissionsAndroid } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import firestore from '@react-native-firebase/firestore';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct, getProductata, updeteProduct } from '../../redux/action/product.action';
import { getcategorydata } from '../../redux/action/fiercategory.action';
import { getSubcategory } from '../../redux/action/subcategory.action';
import { getbrand } from '../../redux/Slice/Brand.slice';
import { getcolordata } from '../../redux/Slice/Colorss.slice';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

const itemss = [('')];

export default function Product() {

  const [modalVisible, setModalVisible] = useState(false);
  const [dropDownPicker, setDropDownPicker] = useState('');
  const [SubdropDownPicker, setSubDropDownPicker] = useState('');
  const [dropDownbrand, setDropDownbrand] = useState('');
  const [dropDownColor, setDropDownColor] = useState('');
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

  const [openbrand, setOpenbrand] = useState(false);
  const [valuebrand, setValuebrand] = useState(null);
  const [itemsbrand, setItemsbrand] = useState([]);

  const [openco, setOpenco] = useState(false);
  const [valueco, setValueco] = useState(null);
  const [itemsco, setItemsco] = useState([]);
  const refRBSheet = useRef([]);

  useEffect(() => {
    dispatch(getcategorydata());
    dispatch(getSubcategory());
    dispatch(getbrand());
    dispatch(getProductata());
    dispatch(getcolordata());
  }, []);

  const dispatch = useDispatch();

  const categorya = useSelector(state => state.fiercategory);
  const subcategorya = useSelector(state => state.subcategorys);
  const productee = useSelector(state => state.products);
  const brands = useSelector(state => state.brands);
  const colord = useSelector(state => state.colord)

  // console.log("productee",productee.produc);


  const [image, setimage] = useState('');

  const handleGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("Gallery photo", image.path);

      setimage(image.path)
      //  dispatch(addProduct({...data,url:image}));
      refRBSheet.current[0]?.close()
    })

  }

  const handleCamera = async () => {

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log("camera photo", image);
      setimage(image.path)
      refRBSheet.current[0]?.close()
    });

  }

  useEffect(() => {
    // if (categorya.categories) {
    // console.log("data",categorya.categories);
    setItems(categorya.categories.map(v => ({ label: v.name, value: v.id })));
    // }
  }, [categorya.categories]);

  const Subcategetdata = async (id) => {
    // console.log("idsubcategory__________id",id);

    const sub = subcategorya.subcategories.filter(v => v.category_id === id);
    // console.log("iddddd", sub);
    setItems1(sub.map(v => ({ label: v.name, value: v.id })));
    // setSubcategory(subcategorya.subcategories);

  }



  const handleSubmit1 = async (data) => {
    // console.log("====================", data.url);

    if (update) {
      // console.log("ssssssssssssssssssssss".data);

      dispatch(updeteProduct( data ))
    } else {
      dispatch(addProduct(data));
    
    }
    setModalVisible(false);
    setimage('')
  }

  const handleDeleteData = async (id) => {
    dispatch(deleteProduct(id));

  }

  const Editdata = (data) => {
    console.log("sssssssssss",data);
    setModalVisible(true)
    setValues(data)
    setimage(data.url)
    setUpdate(data.id)
    Subcategetdata(data.category_id);
    setValue(data.category_id);
    setValue1(data.Subcategory_id);
    setValuebrand(data.Brand_id);
    setValueco(data.Color)
  }

  let userSchema = object({
    category_id: string().required("selecte your category itme"),
    Subcategory_id: string().required("selecte subcategory itme"),
    Product_name: string().required("Enter producte name").matches(/^[a-zA-Z ]+$/, "enter valid name"),
    Price: string().required().matches(/^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$/, "enter price"),
    Discretion: string().required("enter your discretion"),
    Brand_id: string().required("selecte your Brand"),
    Color: string().required("selecte your color "),
  });

  const formik = useFormik({
    initialValues: {
      category_id: '',
      Subcategory_id: '',
      Product_name: '',
      Price: '',
      Discretion: '',
      Brand_id: '',
      Color: '',
    },
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      // console.log("values", values);

      let urlD = '';

      if (image === '') {
        if (productee.produc?.url) {
          urlD = productee.produc?.url
        }
      } else {
        urlD = image
      }
      handleSubmit1({ ...values, url: urlD });
      resetForm();

    },
  });

  const renderItem = ({ item, index, refRBSheet }) => {
    return (
      <View>
        <RBSheet ref={ref => (refRBSheet.current[index] = ref)}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottommini}>

              <View style={styles.bottomcover}>
                <View style={{ flexDirection: 'row', }}>
                  <View style={{ marginTop: 10, marginLeft: 10 }}>

                    <TouchableOpacity
                      onPress={() => refRBSheet.current[0]?.close()}
                    >
                      <FontAwesome name="close" size={20} color="#A9AEB1" />
                    </TouchableOpacity>

                  </View>
                  <View style={{ marginLeft: 80 }}>
                    <Text style={styles.bottomSheetText}>Profile photo</Text>
                  </View>

                </View>

                <View style={styles.bottomiconhead}>
                  <View>
                    <TouchableOpacity style={styles.imagecircle2} onPress={() => handleCamera()}>
                      <FontAwesome name="camera" size={24} color="#DB3022" />

                      <View style={{ marginTop: 10 }}>
                        <Text style={{ color: 'black' }}>Camera</Text>
                      </View>

                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.imagecircle2} onPress={() => handleGallery()}>
                      <MaterialCommunityIcons name="image-outline" size={24} color="#DB3022" />

                      <View style={{ marginTop: 10 }}>
                        <Text style={{ color: 'black' }}>Gallery</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity style={styles.imagecircle2}>

                      <Fontisto name="smiling" size={24} color="#DB3022" />
                      <View style={{ marginTop: 10 }}><Text style={{ color: 'black' }}>Avatar</Text></View>

                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </RBSheet>
      </View>
      //  {item + 1}
    );
  };

  // console.log("value",value);

  // console.log("dataqqqqq", data);

  const { handleBlur, handleChange, handleSubmit, errors, values, touched, setValues, resetForm, setFieldValue } = formik;

  // console.log("errorserrors", productee.produc.url);


  return (
    <ScrollView>
      <View style={styles.div}>
        <TouchableOpacity
          style={styles.Opacity}
          onPress={() => {setModalVisible(true); setUpdate(null);resetForm(); setimage('');setValue('');setValue1('');setValuebrand('');setValueco('')}}
        >
          <Text style={styles.Opacitytext}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>

        <View style={styles.manProduct}>
          {
            productee.produc.map((v, i) => (

              <View style={styles.Viewman} key={i}>

                <View style={{ borderWidth: 0.4, width: '65%', padding: 10, borderRadius: 5, backgroundColor: '#FDD0EC' }}>

                  <Image
                    source={{ uri: v.url }}
                    style={{ width: 150, height: 150 }}
                  />
                  <Text style={{ color: '#9B9B9B' }}>category:=<Text style={{ color: 'black' }}>{categorya.categories.find((v1) => v.category_id === v1.id)?.name}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Subcategory:=<Text style={{ color: 'black' }}>{subcategorya.subcategories.find((v1) => v.Subcategory_id === v1.id)?.name}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Product:=<Text style={{ color: 'black' }}>{v.Product_name}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Price:=<Text style={{ color: 'black' }}>{v.Price}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Discretion:=<Text style={{ color: 'black' }}>{v.Discretion}</Text></Text>
                  <Text style={{ color: '#9B9B9B' }}>Color:=<Text style={{ color: 'black' }}>{colord.Color.find((v1) => v.Color === v1.id)?.name}</Text></Text>

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
                <View style={styles.modalOverlay}>

                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Product</Text>


                    <View style={[styles.DropDown, open ? { zIndex: 1000 } : { zIndex: 1 }]}>
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
                        listMode="SCROLLVIEW"

                      />
                      <Text style={{ color: 'red' }}>{dropDownPicker && touched.category_id ? '' : errors.category_id}</Text>

                    </View>
                    <View style={[styles.DropDown1, open1 ? { zIndex: 999 } : { zIndex: 1 }]}>

                      <DropDownPicker
                        open={open1}
                        value={value1}
                        items={items1}
                        setOpen={setOpen1}
                        setValue={setValue1}
                        setItems={setItems1}
                        placeholder={'Subcategory_id'}
                        // onChangeValue={() => handleChange('Subcategory_id')}
                        onPress={() => setDropDownPicker(!SubdropDownPicker)}
                        onSelectItem={(items) => setFieldValue('Subcategory_id', items.value)}
                        listMode="SCROLLVIEW"
                      />
                      <Text style={{ color: 'red' }}>{SubdropDownPicker && touched.Subcategory_id ? errors.Subcategory_id : ''}</Text>
                    </View>
                    <View style={[styles.DropDown2, openbrand ? { zIndex: 998 } : { zIndex: 1 }]}>

                      <DropDownPicker
                        open={openbrand}
                        value={valuebrand}
                        items={brands.brand.map(v => ({ label: v.name, value: v.id }))}
                        setOpen={setOpenbrand}
                        setValue={setValuebrand}
                        setItems={setItemsbrand}
                        placeholder={'Choose Brand'}
                        // onChangeValue={() => handleChange('Brand_id')}
                        onPress={() => setDropDownbrand(!dropDownbrand)}
                        onSelectItem={(items) => setFieldValue('Brand_id', items.value)}
                        listMode="SCROLLVIEW"
                      />
                      <Text style={{ color: 'red' }}>{dropDownbrand && touched.Brand_id ? errors.Brand_id : ''}</Text>
                    </View>



                    <View style={[styles.DropDown3, openco ? { zIndex: 997 } : { zIndex: 1 }]}>

                      <DropDownPicker
                        open={openco}
                        value={valueco}
                        items={colord.Color.map(v => ({ label: v.name, value: v.id }))}
                        setOpen={setOpenco}
                        setValue={setValueco}
                        setItems={setItemsco}
                        placeholder={'Choose color'}
                        // onChangeValue={() => handleChange('Brand_id')}
                        onPress={() => setDropDownColor(!dropDownColor)}
                        onSelectItem={(items) => setFieldValue('Color', items.value)}
                        listMode="SCROLLVIEW"
                      />
                      <Text style={{ color: 'red' }}>{dropDownColor && touched.Color ? errors.Color : ''}</Text>
                    </View>


                    <TouchableOpacity style={styles.profilecircle} onPress={() => refRBSheet.current[0]?.open()}>

                      {image ?

                        <Image style={{ width: 70, height: 70 }}
                          source={{ uri: image }}

                        /> : <Text style={{ color: "red" }}>aakak</Text>
                      }

                    </TouchableOpacity>
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
              </TouchableWithoutFeedback>
            </ScrollView>
          </TouchableOpacity>

        </Modal>
        <View style={{ flex: 1 }} >
          <FlatList
            data={items}
            renderItem={(props) => renderItem({ ...props, refRBSheet })}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
  profilecircle: {
    width: 70,
    height: 70,
    // borderWidth: 0.5,
    backgroundColor: '#DDDFE0',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    right: 90,
    // borderRadius:10
  },
  bottomiconhead: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 28,
    marginTop: 55,
  },
  bottomTextView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16
  },
  bottommini: {
    rowGap: 10,
    marginTop: 5,
  },
  bottomSheetContainer: {
    margin: 20
  },
  bottomSheetText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginTop: 5
  },
  bottomcover: {
    width: '100%',
    height: 200,
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
    padding: horizontalScale(13),
    backgroundColor: '#007BFF',
    borderRadius: moderateScale(9),
    paddingHorizontal: horizontalScale(100)
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
    // width: '95%',
    // backgroundColor: '#355554',
    borderRadius: moderateScale(10),
    // elevation: moderateScale(6),
    bottom: moderateScale(10),

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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalOverlay: {
    flex: 1,
    // justifyContent: 'center',
    // padding: 100,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    // alignItems: 'center',
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
    marginBottom: moderateScale(10),
  },
  DropDown: {
    paddingHorizontal: horizontalScale(5),
    // zIndex: 1000,

  },
  DropDown1: {
    paddingBottom: horizontalScale(10),
    paddingHorizontal: horizontalScale(5),
    // zIndex: 999,

  },
  DropDown2: {
    paddingBottom: horizontalScale(10),
    paddingHorizontal: horizontalScale(5),
    // zIndex: 1,

  },
  DropDown3: {
    paddingBottom: horizontalScale(10),
    paddingHorizontal: horizontalScale(5),
    // zIndex: 1,

  },
  input: {
    color: 'black',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
    padding: horizontalScale(10),
    // height: '11%',
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
  scrollModal: {
    paddingTop: '20%'
  }
});