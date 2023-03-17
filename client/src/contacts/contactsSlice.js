import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getContactsService,
  addContactService,
  getContactByIdService,
  deleteContactByIdService,
  editContactByIdService,
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

export const deleteContactAsync = createAsyncThunk(
  "/contacts/deleteContactAsync",
  async (id) => {
    try {
      const response = await deleteContactByIdService(id);
      if (response.status === 204) {
        toast.success("User deleted succesfully ! ");
      }
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const getContactAsync = createAsyncThunk(
  "/contacts/getContactAsync",
  async (id) => {
    try {
      const response = await getContactByIdService(id);

      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const editContactAsync = createAsyncThunk(
  "/contacts/editContactAsync",
  async ( {id, contact}) => {
    try {
      console.log( "contact", contact )
      const response = await editContactByIdService(id, contact);
    
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

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
    [deleteContactAsync.fulfilled]: (state, action) => {
      const id= action.payload;
      const index = state.items.findIndex(item => item.id === id )
      state.items.splice(index, 1)
    },

    //edit contacts 
    [editContactAsync.fulfilled]: (state, action) => {
        const findByIndex = state.items.findIndex((item) => item.id === action.payload.id);

        state.items[findByIndex] = {
          ...state.items[findByIndex],
          ...action.payload
        }

        return state;
    },

  },
});

export default contactsSlice.reducer;
