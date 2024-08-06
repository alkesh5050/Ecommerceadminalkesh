
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

const intialState = {
    isLoading: false,
    Color: [],
    error: null
}

export const addColordata = createAsyncThunk(
    'Color/addColordata',
    async (data) => {
        // console.log("sssssssssssssssss",data);
        try {
            let id = '';
            await firestore()
                .collection('Color')
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

export const getcolordata = createAsyncThunk(
    'Color/getcolordata',
    async () => {
        // console.log("sssssssssssssssss",data);

        try {
            const getcolordata = [];
            await firestore()
                .collection('Color')
                .get()
                .then(querySnapshot => {

                    querySnapshot.forEach(documentSnapshot => {

                        getcolordata.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
                    });
                });

            return getcolordata;

        } catch (error) {
            console.log(error);
        }
    },
)
export const Deletcolordata = createAsyncThunk(
    'Color/Deletcolordata',
    async (id) => {
        // console.log("idididididididi ", id);
        try {
            await firestore()
                .collection('Color')
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

export const Updatecolordata = createAsyncThunk(
    'Color/Updatecolordata',
    async (data) => {
        // console.log("sjsjsjsjs ", data);
        try {
            const temp = { ...data };
            delete temp.id;
            await firestore()
                .collection('Color')
                .doc(data.id)
                .update(temp)

            return data;

        } catch (error) {
            // console.log(error);

        }
        // console.log('datawwwwwwwwww',data);
    },
)

export const ColordataSlice = createSlice({
    name: 'Color',
    initialState: intialState,
    extraReducers: (builder) => {
        builder
            .addCase(addColordata.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.Color = state.Color.concat(action.payload),
                    state.error = null
            })
            .addCase(getcolordata.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.Color = action.payload;
                state.error = null;
            })
            .addCase(Deletcolordata.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.Color = state.Color.filter((v) => v.id !== action.payload),
                    state.error = null
            })
            .addCase(Updatecolordata.fulfilled, (state, action) => {
                state.isLoading = false,
                    Color = state.Color.map((v) => {
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
export default ColordataSlice.reducer 