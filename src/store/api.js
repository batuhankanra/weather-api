import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const token=import.meta.env.VITE_API_TOKEN
export const getAPI=createAsyncThunk('getAPI',async (request)=>{
    const response =await axios.get(`https://api.weatherapi.com/v1/current.json/forecast.json?days=2025-02-01&key=${token}&q=${request.city}&lang=${request.lang}`)  
      console.log(response.data)
      return response.data   
})

const initialState={
    status:'Loading',
    data:{}

}

const api=createSlice({
    name:'api',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAPI.rejected,(state)=>{
            state.status="Fail"
        })
        builder.addCase(getAPI.pending,(state)=>{
            state.status='Loading'
        })
        builder.addCase(getAPI.fulfilled,(state,action)=>{
            state.status='Success'
            state.data=action.payload
        })

    }
})


export default api.reducer