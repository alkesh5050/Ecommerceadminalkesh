import { Form, useFormik } from 'formik';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { object, string, number, date, InferType } from 'yup';
import { Formik } from 'formik';

export default function Category1() {
    const [modalVisible, setModalVisible] = useState(false);

    let userSchema = object({
        name: string().required()
    });

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log(values);
            setModalVisible(!modalVisible);
        },
    });

    const { handleChange, values, errors, handleSubmit } = formik;

    console.log(errors);

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
                        <TextInput
                            placeholder='Category Name'
                            placeholderTextColor='#9B9B9B'
                            onChangeText={handleChange('name')}
                            value={values.name}
                        />
                        <Text style={{ color: 'red' }}>{errors.name ? errors.name : ''}</Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => { handleSubmit() }}>
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
});