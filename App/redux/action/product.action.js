import firestore from '@react-native-firebase/firestore';
import { ADD_PRODUCTE, DELETE_PRODUCTEDATA, GET_PRODUCTEDATA, UPDATE_PRODUCT } from '../ActionTypes';
import storage from '@react-native-firebase/storage';

export const getProductata = () => async (dispatch) => {
    try {
        const Productdata = [];

        await firestore()

            .collection('Product')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {

                    Productdata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
// console.log("Productdata",Productdata);

                });
            });
        dispatch({ type: GET_PRODUCTEDATA, payload: Productdata })
    } catch (error) {

    }

}
export const addProduct = (data) => async (dispatch) => {

    // console.log("Product-----photo gallery",data);
    try {
        // console.log("File path:", data.url); 
        if (data.url === "") {
            await firestore()
            .collection('Product')
            .add({...data, url: data.url}) 
            .then((doc) => {
                console.log('Product add');
                dispatch({ type: ADD_PRODUCTE, payload: { ...data, id: doc.id, url: data.url} });
            })
            .catch((errors) => {
                console.log(errors);
            })
        }
  
               const arr = data.url.split("/");
        
            console.log(arr[arr.length - 1]);

            const rNo = Math.floor(Math.random() * 10000);
            const fileName = rNo + arr[arr.length - 1];

            console.log(fileName);
            
            const reference = await storage().ref('/Product/' + fileName);
            
            const task = await reference.putFile(data.url);
 
            const url = await storage().ref('/Product/' + fileName).getDownloadURL();
            // console.log("url_url", url);

        await firestore()
            .collection('Product')
            .add({...data, url: url,imgName:fileName}) 
            .then((doc) => {
                console.log('Product add');
                dispatch({ type: ADD_PRODUCTE, payload: { ...data, id: doc.id, url: url,imgName:fileName } });
            })
            .catch((errors) => {
                console.log(errors);
            })

    } catch (error) {
        console.log("errrprrr",error);
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

          if (data.url === '') {
              await firestore()
                  .collection('Product')
                  .doc(data.id)
                  .update({
                      url: data.url,
                      category_id: data.category_id,
                      Subcategory_id: data.Subcategory_id,
                      Product_name: data.Product_name,
                      Price: data.Price,
                      Discretion: data.Discretion,
                      Brand_id: data.Brand_id,
                      Color: data.Color
                  })
                  .then(() => {
                      console.log('User updated!');
                      dispatch({
                          type: UPDATE_PRODUCT, payload:
                          {
                              ...data,
                              url: data.url,
                              category_id: data.category_id,
                              Subcategory_id: data.Subcategory_id,
                              Product_name: data.Product_name,
                              Price: data.Price,
                              Discretion: data.Discretion,
                              Brand_id: data.Brand_id,
                              Color: data.Color
                          }
                      })
                  });


          } else {
              let check = data.url.split("/")[0];

              if (check === 'https') {
                  await firestore()
                      .collection('Product')
                      .doc(data.id)
                      .update({
                          url: data.url,
                          category_id: data.category_id,
                          Subcategory_id: data.Subcategory_id,
                          Product_name: data.Product_name,
                          Price: data.Price,
                          Discretion: data.Discretion,
                          Brand_id: data.Brand_id,
                          Color: data.Color
                      })
                      .then(() => {
                          console.log('User updated!');
                          dispatch({
                              type: UPDATE_PRODUCT, payload:
                              {
                                  ...data,
                                  url: data.url,
                                  category_id: data.category_id,
                                  Subcategory_id: data.Subcategory_id,
                                  Product_name: data.Product_name,
                                  Price: data.Price,
                                  Discretion: data.Discretion,
                                  Brand_id: data.Brand_id,
                                  Color: data.Color
                              }
                          })
                      });

              } else {

                  if (data?.imgName) {
                      const reference = await storage().ref('/Product/' + data?.imgName);

                      reference.delete();
                  }
                  // console.log("chcke_2222222222");
                  const rNo = Math.floor(Math.random() * 10000);

                  let arr = data.url.split("/");

                  const fileName = rNo + arr[arr.length - 1];

                  const reference = await storage().ref('/Product/' + fileName);

                  const task = await reference.putFile(data.url);

                  const url = await storage().ref('/Product/' + fileName).getDownloadURL();
                  // console.log("url_url", url);

                  await firestore()
                      .collection('Product')
                      .doc(data.id)
                      .update({
                          url: url,
                          category_id: data.category_id,
                          Subcategory_id: data.Subcategory_id,
                          Product_name: data.Product_name,
                          Price: data.Price,
                          Discretion: data.Discretion,
                          Brand_id: data.Brand_id,
                          Color: data.Color,
                          imgName: fileName
                      })
                      .then(() => {
                          console.log('User updated!');
                          dispatch({
                              type: UPDATE_PRODUCT, payload:
                              {
                                  ...data,
                                  url: data.url,
                                  category_id: data.category_id,
                                  Subcategory_id: data.Subcategory_id,
                                  Product_name: data.Product_name,
                                  Price: data.Price,
                                  Discretion: data.Discretion,
                                  Brand_id: data.Brand_id,
                                  Color: data.Color,
                                  imgName: fileName
                              }
                          })
                      });


              }
          }
        } catch (error) {
            //  console.log("errorr",error);
            
        }
    }

   

    