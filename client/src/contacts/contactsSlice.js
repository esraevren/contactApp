import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getContactsService,
  addContactService,
  getContactByIdService,
  deleteContactByIdService,
} from "../services/apiService";

export const getContactsAsync = createAsyncThunk(
  "/contacts/getContactsAsync",
  async () => {
    try {
      const response = await getContactsService();
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const addContactAsync = createAsyncThunk(
  "/contacts/addContactAsync",
  async (data) => {
    try {
      const response = await addContactService(data);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteContactAsync = createAsyncThunk("/contacts/deleteContactAsync",async (id) => {
  try {
    const response = await deleteContactByIdService(id);
    return response.data;
  } catch (err) {
    return err.message;
  }
} )



export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    status: "loading",
    error: "",
  },
  reducers: {},
  extraReducers: {
    //get contacts
    [getContactsAsync.pending]: (state, action) => {
      state.status = "loading";
    },
    [getContactsAsync.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.items = action.payload;
    },
    [getContactsAsync.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },

    //add contacts
    [addContactAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      return state;
    },

    //delete contacts 
    [deleteContactAsync.fulfilled] :(state, action) => {
      const id= action.payload;
      const index = state.items.findIndex(item => item.id === id )
      state.items.splice(index, 1)
    }
  },
});



export default contactsSlice.reducer;
