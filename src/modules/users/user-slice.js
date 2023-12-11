import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
};



export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(toggleLoading(true));
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com//users"
    );
    if (response.status === 200) {
      dispatch(setUsers(response.data));
    }
  } catch (err) {
    console.log(err);

  } finally {
    dispatch(toggleLoading(false));
  }
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { toggleLoading, setUsers } = userSlice.actions;

export default userSlice.reducer;
