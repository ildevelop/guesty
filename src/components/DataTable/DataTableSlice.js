import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefinitionList, treatList, resetDB } from "./DataTableApi";

const initialState = {
  status: null,
  definitions: [],
  selected: [],
  loading: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const definitionList = createAsyncThunk("main/getDefinitions", async () => {
  const response = await getDefinitionList();
  return response.data;
});
export const treat = createAsyncThunk("main/treatList", async (list) => {
  const response = await treatList(list);
  return response.data;
});
export const reset = createAsyncThunk("main/reset", async () => {
  const response = await resetDB();
  return response.data;
});

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSelectValue: (state, action) => {
      state.selected = [...state.selected, action.payload.id];
    },
    unSelectValue: (state, action) => {
      state.selected = state.selected.filter((s) => s !== action.payload.id);
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(definitionList.pending, (state) => {
        state.loading = true;
      })
      .addCase(definitionList.fulfilled, (state, action) => {
        state.loading = false;
        state.definitions = action.payload;
      });
    builder
      .addCase(treat.pending, (state) => {
        state.loading = true;
      })
      .addCase(treat.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = [];
        state.definitions = action.payload;
      });
    builder
      .addCase(reset.pending, (state) => {
        state.loading = true;
      })
      .addCase(reset.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = [];
        state.definitions = action.payload;
      });
  },
});

export const { unSelectValue, setSelectValue } = mainSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDefinitions = (state) => state.main.definitions;
export const selectSelectedDefinitions = (state) => state.main.selected;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default mainSlice.reducer;
