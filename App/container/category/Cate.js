import React, { useEffect, useState } from 'react';
import {
    Alert, Modal, StyleSheet, Text, Pressable, View,
    KeyboardAvoidingView, Keyboard, ScrollView, TouchableOpacity
} from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFormik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Cate() {
    const [selectedValue, setSelectedValue] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropDownPicker, setDropDownPicker] = useState('');
    const [data, setdata] = useState([]);
    const [name, setName] = useState('');
    const [update, setUpdate] = useState(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'shirts for men', value: 'shirts for men' },
        { label: 'shirt for women', value: 'shirt for women' },
        { label: 'women shoes', value: 'women shoes' },
    ]);


    let userSchema = Yup.object({
        name: Yup.string().required("enter name").matches(/^[a-zA-Z ]+$/, "enter valid name"),
        email: Yup.string().required().email(),
        mobile: Yup.string().required().matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        age: Yup.number().required().min(18, "enter your age").typeError("Please enter age in digit"),
        password: Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be 8 combination of alpabet, digit and special symbol."),
        check: Yup.boolean().oneOf([true]).required(),
        Radio: Yup.string().required(),
        dropDownPicker: Yup.string().required(),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            age: '',
            mobile: '',
            password: '',
            check: '',
            Radio: '',
            dropDownPicker: '',
        },
        validationSchema: userSchema,

        onSubmit: values => {
            console.log(values);
            setModalVisible(!modalVisible)

        },
    });
    useEffect(() => {
        getdata();
    }, []);


    const getdata = async () => {

        const catData = await AsyncStorage.getItem("category");
        if (catData) {
            setdata(JSON.parse(catData));
        }
    }


    const handleSubmitdata = async () => {

        const catData = await AsyncStorage.getItem("category");
        // console.log(catData);

        console.log("update", update);

        if (update) {

            const udata = JSON.parse(catData).map((v) => {
                if (v.id === update) {
                    return ({ id: update, name: values.name, age: values.age,email: values.email, mobile: values.mobile,password: values.password });
                } else {
                    return v;
                }
            })

            await AsyncStorage.setItem("category", JSON.stringify(udata));
        
            setdata(udata);

        } else {
            if (catData) {
                let asyncdata = JSON.parse(catData);
                asyncdata.push({
                    id: Math.floor(Math.random() * 10000), name: values.name, age: values.age,email: values.email, mobile: values.mobile,password: values.password
                })
                await AsyncStorage.setItem("category", JSON.stringify(asyncdata));
                setdata(asyncdata)

            } else {
                let data = [{
                    id: Math.floor(Math.random() * 10000),name: values.name, age: values.age,email: values.email, mobile: values.mobile,password: values.password

                }];
                await AsyncStorage.setItem("category", JSON.stringify(data));
                setdata(asyncdata)
                // console.log("aaaaaaa", data);
            }
        }
        setName('')
        setModalVisible(false);
        setUpdate(null)
        formik.resetForm();
    }

    const handleDelete = async (id) => {
        const data = await AsyncStorage.getItem("category");
        const fData = JSON.parse(data).filter((v) => v.id !== id);

        await AsyncStorage.setItem("category", JSON.stringify(fData));

        setdata(fData);
    }


    const Editdata = async (data) => {
        setModalVisible(true);

        setValues(data);

        setUpdate(data.id)
    }

    const { handleSubmit, handleChange, errors, values, setFieldValue, setValues } = formik;

    // console.log("errors",errors);
    // console.log("check", errors.name);

    //dropdown
    //radio button
    //check box

    return (

        <Modal
            isVisible={modalVisible}>
            <KeyboardAvoidingView enabled behavior={Platform.OS === "android" ? undefined : "position"}>
                <ScrollView scrollEnabled={true} keyboardShouldPersistTaps="handled">
                    <View style={[styles.modalContent, { flex: 1 }]}>

                        <View style={styles.centeredView}>

                            <Modal

                                avoidKeyboard
                                animationType="slide"
                                transparent={true}

                                visible={modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                                }}>
                                <View style={styles.centeredView}>

                                    <View style={styles.modalView}>

                                        <View style={styles.checkboxContainer}>
                                            <CheckBox
                                                checked={isSelected}
                                                onPress={() => { setSelection(!isSelected); setFieldValue("check", !isSelected) }}
                                                onChangeText={handleChange('check')}
                                                containerStyle={styles.checkbox}
                                            />
                                            <Text style={styles.label}>Do you like React Native?</Text>
                                        </View>
                                        <Text style={{ color: 'red' }}>{isSelected ? '' : errors.check}</Text>



                                        <View style={styles.radioGroup}>
                                            <View style={styles.radioButton}>
                                                <RadioButton.Android
                                                    value="option1"
                                                    status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                                                    onPress={() => { setSelectedValue('option1'); setFieldValue('Radio', 'ReactJS') }}
                                                    color="#007BFF"
                                                    onChangeText={handleChange('Radio')}
                                                />
                                                <Text style={styles.radioLabel}> ReactJS</Text>
                                            </View>

                                            <View style={styles.radioButton}>
                                                <RadioButton.Android
                                                    value="option2"
                                                    status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                                                    onPress={() => { setSelectedValue('option2'); setFieldValue('Radio', 'React Native') }}
                                                    color="#007BFF"
                                                    onChangeText={handleChange('Radio')}
                                                />
                                                <Text style={styles.radioLabel}>React Native</Text>
                                            </View>


                                        </View>
                                        <Text style={{ color: 'red' }}>{selectedValue ? '' : errors.Radio}</Text>
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
                                            <Text style={{ color: 'red' }}>{dropDownPicker ? '' : errors.dropDownPicker}</Text>
                                        </View>


                                        <TextInput
                                            style={styles.input}
                                            color={'black'}
                                            placeholder='name'
                                            placeholderTextColor='#9B9B9B'
                                            onChangeText={handleChange('name')}
                                            value={values.name}
                                        />
                                        <Text style={{ color: 'red' }}>{errors.name ? errors.name : ''}</Text>


                                        <TextInput
                                            style={styles.input}
                                            placeholder='age'
                                            placeholderTextColor='#9B9B9B'
                                            onChangeText={handleChange('age')}
                                            value={values.age}
                                        />
                                        <Text style={{ color: 'red' }}>{errors.age ? errors.age : ''}</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='email'
                                            placeholderTextColor='#9B9B9B'
                                            onChangeText={handleChange('email')}
                                            value={values.email}
                                        />
                                        <Text style={{ color: 'red' }}>{errors.email ? errors.email : ''}</Text>
                                        <TextInput
                                            style={styles.input}
                                            placeholder='mobile'
                                            placeholderTextColor='#9B9B9B'
                                            onChangeText={handleChange('mobile')}
                                            value={values.mobile}
                                        />
                                        <Text style={{ color: 'red' }}>{errors.mobile ? errors.mobile : ''}</Text>

                                        <TextInput
                                            style={styles.input}
                                            placeholder='password'
                                            placeholderTextColor='#9B9B9B'
                                            onChangeText={handleChange('password')}
                                            value={values.password}

                                        />
                                        <Text style={{ color: 'red' }}>{errors.password ? errors.password : ''}</Text>

                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => { handleSubmit(), handleSubmitdata() }}>
                                            <Text style={styles.textStyle}>{update ? "update" : "submite"}</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>


                            {

                                data.map((v) => (
                                    <View style={styles.Viewman}>
                                        <Text style={{ color: 'black' }}>{v.name}</Text>
                                        <Text style={{ color: 'black' }}>{v.age}</Text>
                                        <View style={styles.iconview}>

                                            <TouchableOpacity onPress={() => Editdata(v)}>
                                                <FontAwesome name="pencil-square" size={25} color="green" />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => handleDelete(v.id)}>
                                                <FontAwesome name="trash" size={25} color="red" />
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                ))
                            }



                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => setModalVisible(true)}>
                                <Text style={styles.textStyle}>Show Modal</Text>
                            </Pressable>

                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </Modal>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    radioLabel: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,

    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    DropDown: {
        paddingBottom: horizontalScale(20),
        paddingHorizontal: horizontalScale(5),
        paddingTop: 20

    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        padding: 0,
    },
    label: {
        margin: 8,
        color: 'black'
    },
    input: {
        color: 'black',
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 5,
        width: 250,
    },
    modalContainer: {
        justifyContent: 'flex-end'
    },
    modalContent: {
    },
    Viewman: {
        width: '90%',
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
});





