import firestore from '@react-native-firebase/firestore';
import { ADD_FIERCATEGORY, DELETE_FIERCATEGORY, GETDATACATEGORY, GETDATAFIERCATEGORY, UPDATE_FIERCATEGORY } from '../ActionTypes';
import axios from 'axios';

export const getcategorydata = () => async (dispatch) => {

    try {
        // const Categorydata = [];

        // const users = await firestore()

        //     .collection('category2')
        //     .get()
        //     .then(querySnapshot => {
        //         // console.log('Total users: ', querySnapshot.size);

        //         querySnapshot.forEach(documentSnapshot => {
        //             // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        //             Categorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

        //         });
        //     });

        const response = await axios.get("http://192.168.1.8:8000/api/v1/categories/list-categories",
            { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyNWI1ZDA1MjZkM2VlMjA3OTI5MDQiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ1MDkzLCJleHAiOjE3MjkzNDg2OTN9._VR5byaI6vaZUC71yKaqu2poOiaIpX094FMqNcpSAJE` } });

        // console.log("rrrrrrrrrrrrr",response.data.data);

        dispatch({ type: GETDATAFIERCATEGORY, payload: response.data.data })
    } catch (error) {
        // console.log(error);
    }
}

export const addcategorydata = (data) => async (dispatch) => {

    try {
        // console.log("assss",data);

        // await firestore()
        //     .collection('category2')
        //     .add(data)
        //     .then((doc) => {
        //         console.log('category2 add');
        //         dispatch({ type: ADD_FIERCATEGORY, payload: { ...data, id: doc.id } });
        //     })
        //     .catch((errors) => {
        //         console.log(errors);
        //     })
        // 8000/api/v1/categories/add-category
        const response = await axios.post("http://192.168.1.8:8000/api/v1/categories/add-category", data,
            { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyNWI1ZDA1MjZkM2VlMjA3OTI5MDQiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ1MDkzLCJleHAiOjE3MjkzNDg2OTN9._VR5byaI6vaZUC71yKaqu2poOiaIpX094FMqNcpSAJE` } });

        //    console.log("aaaaaaaaaaaaaaa",response.data.data);
        dispatch({ type: ADD_FIERCATEGORY, payload: response.data.data });

    } catch (error) {
        // console.log(error);
    }
}

export const deletefiercategory = (id) => async (dispatch) => {

    try {
        // console.log('dddd',id);

        // await firestore()
        //     .collection('category2')
        //     .doc(id)
        //     .delete()
        //     .then(() => {
        //         console.log('User deleted!');
        //         dispatch({ type: DELETE_FIERCATEGORY, payload: id });
        //     });
        const response = await axios.delete("http://192.168.1.8:8000/api/v1/categories/delete-category/" + id,
            { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyNWI1ZDA1MjZkM2VlMjA3OTI5MDQiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ1MDkzLCJleHAiOjE3MjkzNDg2OTN9._VR5byaI6vaZUC71yKaqu2poOiaIpX094FMqNcpSAJE` } });

        //    console.log("aaaaaaaaaaaaaaa",id);

        dispatch({ type: DELETE_FIERCATEGORY, payload: id });
    } catch (error) {
        // console.log(error);
    }
}

export const updatefierdata = (data) => async (dispatch) => {
    try {
        // console.log("svansh", data);

            // const temp ={...data};
            // delete temp.id;
        //   await  firestore()
        //         .collection('category2')
        //         .doc(data.id)
        //         .update(temp)
        //         .then(() => {
        //            dispatch({type:UPDATE_FIERCATEGORY,payload:data})
        //         });
        const response = await axios.put("http://192.168.1.8:8000/api/v1/categories/update-category/"+data._id,
            {name:data.name, description:data.description},
            { headers: { "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEyNWI1ZDA1MjZkM2VlMjA3OTI5MDQiLCJyb2xlIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxIGhvdXJzIiwiaWF0IjoxNzI5MzQ1MDkzLCJleHAiOjE3MjkzNDg2OTN9._VR5byaI6vaZUC71yKaqu2poOiaIpX094FMqNcpSAJE` } });

        //    console.log("aaaaaaaaaaaaaaa",response);

        dispatch({ type: UPDATE_FIERCATEGORY, payload: response.data.data });
  

    } catch (error) {
        // console.log('error', error);

    }
}