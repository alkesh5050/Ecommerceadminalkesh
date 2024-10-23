
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import firestore from '@react-native-firebase/firestore';
import Category from './Category';
import { useDispatch, useSelector } from 'react-redux';
import { addcategorydata, deletefiercategory, editfiercategory, getcategorydata, updatefierdata } from '../../redux/action/fiercategory.action';

export default function FierCategory() {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [data, setdata] = useState([]);
    const [update, setUpdate] = useState(null);
    const [isConnected, setConnected] = useState(true);

    useEffect(() => {
        getdata();
    }, []);

    const dispatch = useDispatch()
    const category = useSelector(state => state.fiercategory)
    // console.log("ssssppppppppppppppppps", category.categories);

    const getdata = async () => {

        dispatch(getcategorydata())
        // setdata(Categorydata)
    }

    const handleDeleteData = async (id) => {
        console.log("eeeeeeee", id);
     
        dispatch(deletefiercategory(id))
       
    }

    const handleSubmit1 = async (data) => {
        // console.log("updateupdate",update);
        
        if (update) {
            dispatch(handleupdate(data))

        } else {
          dispatch(addcategorydata(data));
        }

        setModalVisible(false);
        
        setUpdate(null)
        // setName('')
    }



    const Editdata = async (data) => {

        setModalVisible(true);
       
        setValues(data)
        setUpdate(data._id)
    }
    const handleupdate=(data)=>{
        // console.log("vansh",data);
        dispatch(updatefierdata(data))
    }

    let userSchema = object({
        name: string().required(),
        description: string().required(),
    });
    const formik = useFormik({
        initialValues: {
            name: '',
            description:''
        },
        validationSchema: userSchema,
        onSubmit: (values, { resetForm }) => {
       
            handleSubmit1(values);
           
            resetForm();
        },
    });


    const { handleBlur, handleChange, handleSubmit, errors, values, touched, setValues ,resetForm} = formik;
    return (
        <ScrollView>

            <View style={styles.div}>
                <TouchableOpacity
                    style={styles.Opacity}
                    onPress={() => (setModalVisible(true),setUpdate(null),resetForm())}
                >
                    <Text style={styles.Opacitytext}>Add Category</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>

                <View style={styles.manProduct}>

                    {
                        category.categories.map((v, i) => (
                            <View style={styles.Viewman} key={i}>
                                <Text style={{ color: 'black' }}>{v.name}</Text>
                                <View style={styles.iconview}>

                                    <TouchableOpacity onPress={() => Editdata(v)}>
                                        <FontAwesome name="pencil-square" size={25} color="green" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleDeleteData(v._id)}>
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
                                    placeholder='Category Name'
                                    placeholderTextColor='#9B9B9B'
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                />
                                <Text style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : ''}</Text>
                            </View>
                            <View style={{ width: '95%', }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='description'
                                    placeholderTextColor='#9B9B9B'
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                />
                                <Text style={{ color: 'red' }}>{errors.description && touched.description ? errors.description : ''}</Text>
                            </View>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // paddingTop: horizontalScale(30),
        alignItems: 'center',
        paddingBottom: 10
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
