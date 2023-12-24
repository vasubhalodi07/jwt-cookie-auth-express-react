import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../feature/userSlice";

const store = configureStore({
  reducer: {
    userKey: userSlice,
  },
});

export default store;
