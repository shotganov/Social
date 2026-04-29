// export const login = createAsyncThunk(
//   "login",
//   async ({ username, password }: Auth, { dispatch, rejectWithValue }) => {
//     try {
//       const result = await api.post("/auth", {
//         username: username + "sdf",
//         password: password,
//       });
//       dispatch(setToken(result.data.token));
//     } catch (error) {
//       return rejectWithValue(getErrorMessage(error));
//     }
//   },
// );
