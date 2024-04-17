import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'resoponsedata',
  initialState: {
    value: ''
  },
  reducers: {
    addValue: (state, action) => {
      state.value = action.payload;
    },
   
  }
})

// Action creators are generated for each case reducer function
export const { addValue } = dataSlice.actions
export default dataSlice.reducer