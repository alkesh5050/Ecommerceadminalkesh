
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

const intialState = {
    isLoading: false,
    brand: [],
    error: null
}

export const fetchbrand = createAsyncThunk(
    'brand/fetchbrand',
    async (data) => {
        console.log("sssssssssssssssss",data);
        
        try {
        
            await firestore()
                .collection('Brand')
                .add(data)
                .then(() => {
                    console.log('User added!');
                    
                });

            return data;

        } catch (error) {
            console.log("Branddata", Branddata);
            console.log(error);
        }
    },
)

export const getbrand = createAsyncThunk(
    'brand/fetchbrand',
    async () => {
        // console.log("sssssssssssssssss",data);
        
        try {
        const getbranddata=[];
            await firestore()
                .collection('Brand')
                .get()
                .then(querySnapshot => {
                    console.log('Total users: ', querySnapshot.size);
    
                    querySnapshot.forEach(documentSnapshot => {
                   
                        getbranddata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
                    });
                });

            return getbranddata;

        } catch (error) {
            console.log("Branddata", Branddata);
            console.log(error);
        }
    },
)

export const brandSlice = createSlice({
    name: 'brand',
    initialState: intialState,
    extraReducers: (builder) => {
        builder.addCase(fetchbrand.fulfilled, (state, action) => {
            state.brand = action.payload;
        })
    },
})
export default brandSlice.reducer