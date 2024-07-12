import { ADDSUBCATEGORYDATA, DELETESUBCATEGORYDATA, GET_SUBCATEGORY, UPDATE_SUBCATEGORY } from "../ActionTypes";
import firestore from '@react-native-firebase/firestore';

export const getSubcategory=()=>async(dispatch)=>{
  try {
    const SubCategorydata = [];

    await firestore()

      .collection('SubCategory')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {

          SubCategorydata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });

        });
      });
      dispatch({type:GET_SUBCATEGORY,payload:SubCategorydata})
  } catch (error) {
    
  }
  
}

export const addSubcategory = (data) => async (dispatch) => {

  console.log("subdata");
  try {
    await firestore()
      .collection('SubCategory')
      .add(data)
      .then((doc) => {
        console.log('SubCategory add');
        dispatch({ type: ADDSUBCATEGORYDATA, payload: { ...data, id: doc.id } });
      })
      .catch((errors) => {
        console.log(errors);
      })

  } catch (error) {
    console.log(error);
  }

}

export const deleteSubcategory = (id) => async (dispatch) => {
  try {

    await firestore()
      .collection('SubCategory')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        dispatch({ type: DELETESUBCATEGORYDATA, payload: id })
      });
  } catch (error) {

  }

}

export const updeteSubcategory = (data) => async (dispatch) => {
console.log("updete");
  try {
    const temp = { ...data };
    delete temp.id;
    await firestore()
      .collection('SubCategory')
      .doc(data.id)
      .update(temp)
      .then(() => {
        dispatch({ type: UPDATE_SUBCATEGORY, payload: data })
      });
  } catch (error) {

  }
}