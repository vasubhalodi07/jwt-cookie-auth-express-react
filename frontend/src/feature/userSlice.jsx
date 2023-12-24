import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios/axiosInstance";

const userState = {
  loading: false,
  loginStatus: localStorage.getItem("status")
    ? localStorage.getItem("status")
    : null,
  error: null,
  token: {
    access_token: null,
    refresh_token: null,
  },
};

export const getToken = createAsyncThunk("user/token", async () => {
  const response = await instance.post("/user/cookie_token", null, {
    withCredentials: true,
  });
  return response.data;
});

export const login = createAsyncThunk("user/login", async (data) => {
  const response = await instance.post(
    "/user/login",
    {
      email: data.email,
      password: data.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await instance.post("/user/logout", null, {
    withCredentials: true,
  });
  return response.data;
});

export const register = createAsyncThunk("user/register", async (data) => {
  const response = await instance.post(
    "/user/register",
    {
      name: data.name,
      email: data.email,
      password: data.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    changeState: (state) => {
      state.loginStatus = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.loading = false;
        if (
          action.payload.token.access_token &&
          action.payload.token.refresh_token
        ) {
          state.token.access_token = action.payload.token.access_token;
          state.token.refresh_token = action.payload.token.refresh_token;
        }
        console.log(action.payload);
      })
      .addCase(getToken.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.loginStatus = true;
        state.token.access_token = action.payload.token.access_token;
        state.token.refresh_token = action.payload.token.refresh_token;
        localStorage.setItem("status", true);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.loginStatus = false;
        state.token.access_token = null;
        state.token.refresh_token = null;
        console.log(action.payload);
        localStorage.removeItem("status");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });

    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        console.log(action.error.message);
      });
  },
});

export default userSlice.reducer;
export const changeState = userSlice.actions;
