
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

const intialState = {
    isLoading: false,
    brand: [],
    error: null
}

export const addbrand = createAsyncThunk(
    'brand/addbrand',
    async (data) => {
        // console.log("sssssssssssssssss",data);
        try {
            let id = '';
            await firestore()
                .collection('Brand')
                .add(data)
                .then((doc) => {
                    id = doc.id
                    // console.log('Category added!', doc.id);
                })
            return { ...data, id: id };

        } catch (error) {
            // console.log("Branddata", Branddata);
            // console.log(error);
        }
    },
)

export const getbrand = createAsyncThunk(
    'brand/getbrand',
    async () => {
        // console.log("sssssssssssssssss",data);

        try {
            const getbranddata = [];
            await firestore()
                .collection('Brand')
                .get()
                .then(querySnapshot => {

                    querySnapshot.forEach(documentSnapshot => {

                        getbranddata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
                    });
                });

            return getbranddata;

        } catch (error) {
            console.log(error);
        }
    },
)
export const Deletbrand = createAsyncThunk(
    'brand/Deletbrand',
    async (id) => {
        // console.log("idididididididi ", id);
        try {
            await firestore()
                .collection('Brand')
                .doc(id)
                .delete()
                .then(() => {
                    // console.log('User deleted!');
                    // console.log("idididididididi ", id);
                });

            return id;

        } catch (error) {
            console.log(error);
        }
    },
)

export const updatebrand = createAsyncThunk(
    'brand/updatebrand',
    async (data) => {
        // console.log("sjsjsjsjs ", data);
        try {
            const temp = { ...data };
            delete temp.id;
            await firestore()
                .collection('Brand')
                .doc(data.id)
                .update(temp)

            return data;

        } catch (error) {
            // console.log(error);

        }
        // console.log('datawwwwwwwwww',data);
    },
)

export const brandSlice = createSlice({
    name: 'brand',
    initialState: intialState,
    extraReducers: (builder) => {
        builder
            .addCase(getbrand.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.brand = action.payload;
                state.error = null;
            })
            .addCase(addbrand.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.brand = state.brand.concat(action.payload),
                    state.error = null
            })
            .addCase(Deletbrand.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.brand = state.brand.filter((v) => v.id !== action.payload),
                    state.error = null
            })
            .addCase(updatebrand.fulfilled, (state, action) => {
                state.isLoading = false,
                    brand = state.brand.map((v) => {
                        if (v.id === action.payload.id) {
                            return action.payload
                        } else {
                            return v;
                        }
                    }),
                    state.error = null
            })

    },
})
export default brandSlice.reducer 