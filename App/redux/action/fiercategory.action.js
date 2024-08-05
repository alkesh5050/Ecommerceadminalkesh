import firestore from '@react-native-firebase/firestore';
import { ADD_FIERCATEGORY, DELETE_FIERCATEGORY, GETDATACATEGORY, GETDATAFIERCATEGORY, UPDATE_FIERCATEGORY } from '../ActionTypes';

export const getcategorydata = () => async (dispatch) => {

    try {
        const Categorydata = [];

        const users = await firestore()

            .collection('category2')
            .get()
            .then(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    Categorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

                });
            });
        dispatch({ type: GETDATAFIERCATEGORY, payload: Categorydata })
    } catch (error) {
        console.log(error);
    }
}

export const addcategorydata = (data) => async (dispatch) => {

    try {
        await firestore()
            .collection('category2')
            .add(data)
            .then((doc) => {
                console.log('category2 add');
                dispatch({ type: ADD_FIERCATEGORY, payload: { ...data, id: doc.id } });
            })
            .catch((errors) => {
                console.log(errors);
            })

    } catch (error) {
        console.log(error);
    }
}


export const deletefiercategory = (id) => async (dispatch) => {

    try {
        await firestore()
            .collection('category2')
            .doc(id)
            .delete()
            .then(() => {
                console.log('User deleted!');
                dispatch({ type: DELETE_FIERCATEGORY, payload: id });
            });

    } catch (error) {
        console.log(error);
    }
}
export const updatefierdata = () =>async (dispatch) => {
    try {
        const temp ={...data};
        delete temp.id;
      await  firestore()
            .collection('category2')
            .doc(data.id)
            .update(temp)
            .then(() => {
               dispatch({type:UPDATE_FIERCATEGORY,payload:data})
            });
    } catch (error) {

    }
}