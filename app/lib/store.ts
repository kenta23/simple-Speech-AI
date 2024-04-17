import { configureStore } from '@reduxjs/toolkit'
import slicedata from './data'


export const makeStore = () => {
  return configureStore({
    reducer: {
        //Reducers
        responsedata: slicedata
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']