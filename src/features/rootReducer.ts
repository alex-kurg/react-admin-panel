import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import authReducer from './auth/authSlice'

export const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  })
