import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';
import {RootState} from './store';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({ name, email, password }:User, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:3000/users',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      let data = await response.json();

      if (response.status === 201) {        
        localStorage.setItem('token', data.accessToken);
        return { ...data, username: name, email: email };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
      
    } catch (e: any) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({ email, password }:User, thunkAPI) => {
    try {
      const response = await fetch(
        'http://localhost:3000/login',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      let data = await response.json();      
      console.log('response-login', response, data);

      if (response.status === 200) {
        localStorage.setItem('token', data.accessToken);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }

    } catch (e: any) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// export const fetchUserByToken = createAsyncThunk(
//   'users/fetchUserByToken',
//   async ({ token }:{token:string}, thunkAPI) => {
//     try {
//       const response = await fetch(
//         'http://localhost:3000/users',
//         {
//           method: 'GET',
//           headers: {
//             Accept: 'application/json',
//             Authorization: token,
//             'Content-Type': 'application/json',
//             "Access-Control-Allow-Origin": "*",
//           },
//         }
//       );
//       let data = await response.json();
//       console.log('data', data, response.status);

//       if (response.status === 200) {
//         return { ...data };
//       } else {
//         return thunkAPI.rejectWithValue(data);
//       }
//     } catch (e: any) {
//       console.log('Error', e.response.data);
//       return thunkAPI.rejectWithValue(e.response.data);
//     }
//   }
// );

type UserStateType = {
    user: User;
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string,
  }

const initialState: UserStateType= {
    user: {} as User,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  }

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled.type]: (state, { payload }) => {
      state.user.email = payload.email;
      state.user.name = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [signupUser.pending.type]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected.type]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },

    [loginUser.fulfilled.type]: (state, { payload }) => {
      state.user.email = payload.email;
      state.user.name = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
    },
    [loginUser.pending.type]: (state) => {
      state.isFetching = true;
    },
    [loginUser.rejected.type]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    
    // [fetchUserByToken.pending.type]: (state) => {
    //   state.isFetching = true;
    // },
    // [fetchUserByToken.fulfilled.type]: (state, { payload }) => {
    //   state.isFetching = false;
    //   state.isSuccess = true;
    //   state.user.email = payload.email;
    //   state.user.name = payload.name;
    // },
    // [fetchUserByToken.rejected.type]: (state) => {
    //   console.log('fetchUserByToken');
    //   state.isFetching = false;
    //   state.isError = true;
    // },
  },
});

export const { clearState } = userSlice.actions;
export default userSlice.reducer;

export const user = (state: RootState) => state.user;