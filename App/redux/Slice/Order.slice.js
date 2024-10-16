
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import firestore from '@react-native-firebase/firestore';
import firestore, { firebase } from '@react-native-firebase/firestore';

const intialState = {
  isLoading: false,
  order: [],
  error: null
}

export const getorderdata = createAsyncThunk(
  'order/getorderdata',
  async (id) => {
    // console.log("eeeeeeeeee",id);
    try {
      const orderdata = [];
      await firestore()
        .collection('order')
        .get()
        .then(querySnapshot => {

          querySnapshot.forEach(documentSnapshot => {
            orderdata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
          });
        });
      // console.log("dddddssssssssssss",orderdata);

      return orderdata
    } catch (error) {

      console.log("sssssssssssssssssdddaa", error);
    }

  }
)


export const updatestatus = createAsyncThunk(
  'order/updatestatus',

  async (data) => {
    // console.log("dataqqqqqqq", data.olddata.adresss.uid);
    // console.log("new--------data", data.newdata.DropDownPicker);

    // try {

    const userDocRef = await firestore().collection('order')
      .doc(data.olddata.adresss.uid);
    const userDoc = await userDocRef.get();

    console.log("userDoc", userDoc.exists, userDoc.data());
    // console.log("userDoc", userDocRef);

    const fdata = userDoc.data().order.map((v) => {
      if (v.ordernum === data.olddata.ordernum) {
        return { ...v, status: data.newdata.DropDownPicker }
      } else {
        return v
      }
    })
    // console.log("ddddddddddddd", fdata);

    try {
      firestore()
      .collection('order')
      .doc(data.olddata.adresss.uid)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });


      await firestore()
        .collection('order')
        .doc(data.olddata.adresss.uid)
        .set({
          order:fdata
        })
        .then(() => {
          console.log('User added!');
        });
    } catch (error) {

    }
    // await userDocRef.update(
    //   {
    //     order: firebase.firestore.FieldValue.arrayRemove(
    //        data.olddata
    //     )
    //   }
    // )
    // await userDocRef.update(
    //   {
    //     order: firebase.firestore.FieldValue.arrayUnion(
    //     {...data.newdata}
    //     )
    //   }
    // )


    //   const orderdata = [];

    //   await firestore()
    //     .collection('order')
    //     .doc(data.olddata.uid)
    //     .get()
    //     .then(documentSnapshot => {
    //       // console.log('User exists: ', documentSnapshot.exists);
    //       if (documentSnapshot.exists) {
    //          console.log('User data: ', documentSnapshot.data());

    //         orderdata.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
    //       }
    //     });

    //     console.log("error ", orderdata);

    //   // return orderdata
    // } catch (error) {
    //   console.log("erroraaaaaaaaaaa ", error);

    // }

  }
)

export const Orderslice = createSlice({
  name: 'order',
  initialState: intialState,
  extraReducers: (builder) => {

    builder.addCase(getorderdata.fulfilled, (state, action) => {
      // console.log("action.payload", action.payload);
      state.order = action.payload;
    })
 
    builder.addCase(updatestatus.fulfilled, (state, action) => {
      // console.log("action.payload", action.payload);
      state.order = action.payload;
    })

  }
})
export default Orderslice.reducer

