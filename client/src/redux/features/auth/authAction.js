import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API"; 
import { toast } from 'react-toastify';

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/auth/login`, { email, password, role });
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        toast.success(data.message || "Login successful!", { autoClose: 3000 });

        await new Promise((resolve) => setTimeout(resolve, 3000));
        window.location.replace("/");
      }
      return data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, { autoClose: 3000 });
        
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return rejectWithValue(err.response.data.message);
      } else {
        toast.error(err.message || 'An error occurred', { autoClose: 3000 });
        
        await new Promise((resolve) => setTimeout(resolve, 3000));
        return rejectWithValue(err.message || 'An error occurred');
      }
    }
  }
);


export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ email, password, role, name, organisationName, hospitalName, website, address, phoneNo }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/auth/register`, { email, password, role, name, organisationName, hospitalName, website, address, phoneNo });        
      
      if (data) {
        toast.success(data.message || "Registration successful!", { autoClose: 3000 });
        await new Promise((resolve) => setTimeout(resolve, 5000));
        window.location.replace("/login");
      }
      return data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, { autoClose: 3000 });
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return rejectWithValue(err.response.data.message);
      }
      toast.error(err.message || 'An error occurred', { autoClose: 3000 });
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return rejectWithValue(err.message || 'An error occurred');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => { 
    try {
      const res = await API.get('/auth/current-user');
      if (res && res.data) {
        return res.data; 
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue(err.message || 'An error occurred');
    }
  }
);

