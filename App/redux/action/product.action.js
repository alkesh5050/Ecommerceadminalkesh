import firestore from '@react-native-firebase/firestore';
import { ADD_PRODUCTE, DELETE_PRODUCTEDATA, GET_PRODUCTEDATA, UPDATE_PRODUCT } from '../ActionTypes';

export const getProductata = () => async (dispatch) => {
    try {
        const Productdata = [];

        await firestore()

            .collection('Product')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {

                    Productdata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

                });
            });
        dispatch({ type: GET_PRODUCTEDATA, payload: Productdata })
    } catch (error) {

    }

}
export const addProduct = (data) => async (dispatch) => {

    console.log("Product");
    try {
        await firestore()
            .collection('Product')
            .add(data)
            .then((doc) => {
                console.log('Product add');
                dispatch({ type: ADD_PRODUCTE, payload: { ...data, id: doc.id } });
            })
            .catch((errors) => {
                console.log(errors);
            })

    } catch (error) {
        console.log(error);
    }

}
export const deleteProduct = (id) => async (dispatch) => {
    try {

        await firestore()
            .collection('Product')
            .doc(id)
            .delete()
            .then(() => {
                console.log('User deleted!');
                dispatch({ type: DELETE_PRODUCTEDATA, payload: id })
            });
    } catch (error) {

    }

}

export const updeteProduct = (data) => async (dispatch) => {
    console.log("updete");
      try {
        const temp = { ...data };
        delete temp.id;
        await firestore()
          .collection('Product')
          .doc(data.id)
          .update(temp)
          .then(() => {
            dispatch({ type: UPDATE_PRODUCT, payload: data })
          });
      } catch (error) {
    
      }
    }