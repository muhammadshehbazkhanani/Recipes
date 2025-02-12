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
  WeekSuccess: any;
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
  WeekSuccess: null,
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
    setSelectedMealsForWeek(state, action: PayloadAction<{ week: string; meals: any[] }>) {
      const { week, meals } = action.payload;
      
      // Convert to lowercase for consistency
      const normalizedWeek = week.toLowerCase(); 
    
    
      if (normalizedWeek === "weekone") state.weekOne = meals;
      if (normalizedWeek === "weektwo") state.weekTwo = meals;
      if (normalizedWeek === "weekthree") state.weekThree = meals;
      if (normalizedWeek === "weekfour") state.weekFour = meals;
    
      state.WeekSuccess = `Successfully Added to ${week}`;
    },
    setRemoveMealFromWeek(state, action: PayloadAction<{ week: string; mealId: number }>) {
      const { week, mealId } = action.payload;
      
      if (week == "Week 1") state.weekOne = state.weekOne.filter(meal => meal.id !== mealId);
      if (week == "Week 2") state.weekTwo = state.weekTwo.filter(meal => meal.id !== mealId);
      if (week == "Week 3") state.weekThree = state.weekThree.filter(meal => meal.id !== mealId);
      if (week == "Week 4") state.weekFour = state.weekFour.filter(meal => meal.id !== mealId);
    },
    setResetWeekSuccess(state){
      state.WeekSuccess = null;
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
  setSelectedMealsForWeek,
  setResetWeekSuccess,
  setRemoveMealFromWeek
} = mealsSlice.actions;
export default mealsSlice.reducer;
