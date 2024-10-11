
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

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
        // .then(documentSnapshot => {
        //   if (documentSnapshot.exists) {
        //     orderdata.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
        //   }
        // });
        .then(querySnapshot => {

            querySnapshot.forEach(documentSnapshot => {
              orderdata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
            });
          });
        // console.log("dddddssssssssssss",orderdata);
        
      return orderdata
    } catch (error) {

      console.log("sssssssssssssssssdddaa",error);
    }

  }
)

export const getproduct = createAsyncThunk(
  'getproduct/fetch',
  async () => {
      // console.log("jjjjjjjjj", data);
      const byproduct = [];
      await firestore()
          .collection('Product')
          .get()
          .then(querySnapshot => {

              querySnapshot.forEach(documentSnapshot => {
                  byproduct.push({...documentSnapshot.data(),id:documentSnapshot.id })

              });

          });
      // console.log("byproduct", byproduct);
      return byproduct

  },
)

export const Orderslice = createSlice({
    name: 'order',
    initialState: intialState,
    extraReducers: (builder) => {
   
        builder.addCase(getorderdata.fulfilled, (state, action) => {
          // console.log("action.payload", action.payload);
          state.order = action.payload;
      })
      builder.addCase(getproduct.fulfilled, (state, action) => {
        // console.log("action.payload", action.payload);
        state.order = action.payload;
    })

    }
})
export default Orderslice.reducer

