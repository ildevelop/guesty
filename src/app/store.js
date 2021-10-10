import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../components/DataTable/DataTableSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});
