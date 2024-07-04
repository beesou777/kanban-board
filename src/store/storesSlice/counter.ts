import { createSlice } from "@reduxjs/toolkit";

export const counterStoreSlice = createSlice({
    name:"counter",
    initialState:{
        value:0,
    },
    reducers:{
        increment:(state)=>{
            state.value+=1
        },
        decrement:(state)=>{
            state.value-=1
        }
    }
})

export const {increment, decrement} = counterStoreSlice.actions

export default counterStoreSlice.reducer