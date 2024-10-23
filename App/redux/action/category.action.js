import axios from "axios";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from "../ActionTypes";
import firestore from '@react-native-firebase/firestore';

export const getCategory = () => async (dispatch) => {
    try {
        // const allCat = [];
        // await firestore()
        //     .collection('Category')
        //     .get()
        //     .then(querySnapshot => {
        //         // console.log('Total users: ', querySnapshot.size);

        //         querySnapshot.forEach(documentSnapshot => {
        //             // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        //             allCat.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
        //         });
        //     });

        const response = await axios.get("http://192.168.1.8:8000/api/v1/categories/list-categories", { headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyNWI1ZDA1MjZkM2VlMjA3OTI5MDQiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MjU2MzYwLCJleHAiOjE3MjkyNTk5NjB9.oEoQOiKb7IIJs3QrJx8AIwtsTQcGP1_l01VnzfoLII0`} });

        console.log("rrrrrrrrrrrrr",response.data.data);
        

        dispatch({ type: GET_CATEGORY, payload: response.data.data })
    } catch (error) {
        console.log(error);
    }
}

export const addCategory = (data) => async (dispatch) => {
    try {
        const dataF = await firestore()
            .collection('Category')
            .add(data)
            .then((doc) => {
                console.log('Category added!', doc.id);

                dispatch({ type: ADD_CATEGORY, payload: { ...data, id: doc.id } })
            })
            .catch((error) => {
                console.log(error);
            });

        console.log("dataFdataF", data);

    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await firestore()
            .collection('Category')
            .doc(id)
            .delete()
            .then(() => {
                dispatch({ type: DELETE_CATEGORY, payload: id })
            });
    } catch (error) {

    }
}

export const updateCategory = (data) => async (dispatch) => {
    try {
        const temp = {...data};
        delete temp.id;
        await firestore()
            .collection('Category')
            .doc(data.id)
            .update(temp)
            .then((doc) => {
                dispatch({type: UPDATE_CATEGORY, payload: data})
            });
    } catch (error) {
        console.log(error);
    }
}