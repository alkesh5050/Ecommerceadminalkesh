
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
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../../redux/action/category.action';
import { fetchbrand, getbrand } from '../../redux/Slice/Brand.slice';

export default function brand() {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('');
    const [data, setdata] = useState([]);
    const [update, setUpdate] = useState(null);
    const [isConnected, setConnected] = useState(true);

    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getbrand())
    }, []);
    
    const brands = useSelector(state => state.brands);
    
    console.log("ssssssssss", brands.brand);


    const handleSubmit1 = async (data) => {
        console.log("ffffffffffffff", data);
        dispatch(fetchbrand(data));

        
    }


    const handleDeleteData = async (id) => {
        // dispatch(deleteCategory(id))
    }

    const Editdata = async (data) => {
        // setModalVisible(true);

        // setValues(data)
        // setUpdate(data.id)
    }

    let catSchema = object({
        name: string().required()
    });

    const handleUpdateData = (data) => {
        // dispatch(updateCategory(data))

        // setUpdate(null);
    }

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: catSchema,
        onSubmit: (values, {resetForm}) => {
            // if (update) {
            //     handleUpdateData(values)
            // } else {
                handleSubmit1(values)
            // }
            
            resetForm();
            setModalVisible(false);
        },
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched,setValues } = formik;

    console.log("errors", errors);
    console.log("values", values);
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

            
                {
                        brands.brand.map((v, i) => (
                            <View key={i} style={styles.Viewman}>
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
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Add category</Text>
                            <View style={{ width: '95%', }}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('name')}
                                    placeholder='Category Name'
                                    placeholderTextColor='#9B9B9B'
                                    onBlur={handleBlur("name")}
                                    value={values.name}
                                />
                                <Text style={{ color: 'red' }}>{errors.name && touched.name ? errors.name : ''}</Text>
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
