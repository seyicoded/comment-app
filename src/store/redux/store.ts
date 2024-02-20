import { legacy_createStore as createStore } from '@reduxjs/toolkit'
import AppReducer from './reducers/appReducer'

export const reduxStore = createStore(AppReducer)