import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  Loading: boolean;
  Error: any;
  Success: any;
  MealsData : any[];
  weekOne: any[];
  weekTwo: any[];
  weekThree: any[];
  weekFour: any[];
};

const initialState: AuthState = {
  Loading: true,
  Error: null,
  Success: null,
  MealsData : [],
  weekOne: [],
  weekTwo: [],
  weekThree: [],
  weekFour: [],
};

export const fetchMeals = createAsyncThunk<any, any>(
  "meals/fetchMeals",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/recipes`,
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Internal Server Error"
      );
    }
  }
);

// Async thunk to fetch users with pagination

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
   setWeekOne(state){
    console.log({state})
    // state.weekOne = state
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.Loading = true;
        state.Error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.Loading = false;
        state.MealsData = action.payload.recipes;
        state.Success = action.payload.message; 
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.Loading = false;
        state.Error = action.payload ?? "Unknown error";
      })
  }
});

export const {
  
} = mealsSlice.actions;
export default mealsSlice.reducer;
