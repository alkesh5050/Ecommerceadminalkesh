import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { object, string, number, date, InferType } from 'yup';
import { horizontalScale, moderateScale, verticalScale } from '../../../assets/Fonts/Matrix/Matrix';
import { useFormik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';
import { RadioButton } from 'react-native-paper';
import { CheckBox } from 'react-native-elements';



export default function Cate() {
    const [selectedValue, setSelectedValue] = useState('');
    const [isSelected, setSelection] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dropDownPicker, setDropDownPicker] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'shirts for men', value: 'shirts for men' },
        { label: 'shirt for women', value: 'shirt for women' },
        { label: 'women shoes', value: 'women shoes' },
    ]);
    // let userSchema = Yup.object({
    //     name: Yup.string().required(),
    //     age: Yup.number().required().positive().integer().min(18),
    //     email: Yup.string().email().required(),
    //     mobile: Yup.string()
    //         .required("required")
    //         .matches(phoneRegExp, 'Phone number is not valid')
    //         .min(10, "too short")
    //         .max(10, "too long"),


    //     password: Yup
    //         .string()
    //         .min(8, 'Password must be 8 characters long')
    //         .matches(/[0-9]/, 'Password requires a number')
    //         .matches(/[a-z]/, 'Password requires a lowercase letter')
    //         .matches(/[A-Z]/, 'Password requires an uppercase letter')
    //         .matches(/[^\w]/, 'Password requires a symbol'),

    // });

    // let userSchema = Yup.object({
    //     name: string().required("Please enter name").matches(/^[a-zA-Z ]+$/, "Please enter valid name"),
    //     email: string().required().email(),
    //     mobile: string().required().matches(/^\d{10}$/, "Mobile number must be 10 digit"),
    //     age: number().required().min(18, "Minimum 18 age allowed").typeError("Please enter age in digit"),
    //     password: string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be 8 combination of alpabet, digit and special symbol.")
    // })

    let userSchema = Yup.object({
        name: Yup.string().required("enter name").matches(/^[a-zA-Z ]+$/, "enter valid name"),
        email: Yup.string().required().email(),
        mobile: Yup.string().required().matches(/^\d{10}$/, "Mobile number must be 10 digit"),
        age: Yup.number().required().min(18, "enter your age").typeError("Please enter age in digit"),
        password: Yup.string().required().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Password must be 8 combination of alpabet, digit and special symbol."),
        check: Yup.boolean().oneOf([true]).required(),
        Radio: Yup.string().required(),
        dropDownPicker :Yup.string().required(),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            age: '',
            mobile: '',
            password: '',
            check:'',
            Radio:'',
            dropDownPicker:'',
        },
        validationSchema: userSchema,

        onSubmit: values => {
            console.log(values);
            setModalVisible(!modalVisible)
        },
    });

    const { handleSubmit, handleChange, errors, values, setFieldValue } = formik;

    // console.log("errors",errors);
    // console.log("check",errors.check);

    //dropdown
    //radio button
    //check box

    return (
        <View style={styles.centeredView}>


            <Modal
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
                                onPress={() => {setSelection(!isSelected);setFieldValue("check",!isSelected)}}
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
                                    onPress={() => {setSelectedValue('option1');setFieldValue('Radio','ReactJS')}}
                                    color="#007BFF"
                                    onChangeText={handleChange('Radio')}
                                />
                                <Text style={styles.radioLabel}> ReactJS</Text>
                            </View>

                            <View style={styles.radioButton}>
                                <RadioButton.Android
                                    value="option2"
                                    status={selectedValue === 'option2' ? 'checked' : 'unchecked'}
                                    onPress={() => {setSelectedValue('option2');setFieldValue('Radio','React Native')}}
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
                                onSelectItem={(items)=>setFieldValue('dropDownPicker',items.value)}
                            />
                            <Text style={{ color: 'red' }}>{dropDownPicker ? '' : errors.dropDownPicker}</Text>
                        </View>

                        
                        <TextInput
                            color={'black'}
                            placeholder='name'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('name')}
                            value={values.name}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.name : ''}</Text>


                        <TextInput
                            color={'black'}
                            placeholder='age'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('age')}
                            value={values.age}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.age : ''}</Text>
                        <TextInput
                            color={'black'}
                            placeholder='email'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('email')}
                            value={values.email}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.email : ''}</Text>
                        <TextInput
                            color={'black'}
                            placeholder='mobile'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('mobile')}
                            value={values.mobile}
                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.mobile : ''}</Text>

                        <TextInput
                            color={'black'}
                            placeholder='password'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('password')}
                            value={values.password}

                        />
                        <Text style={{ color: 'red' }}>{errors ? errors.password : ''}</Text>
                        
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => handleSubmit()}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
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
        paddingBottom: horizontalScale(30),
        paddingHorizontal: horizontalScale(5),
        paddingTop: 40

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
});





