import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { combineReducers } from 'redux'

import killmails from './killmails'
import connection from './connection'

const rootReducer = combineReducers({ killmails, connection })

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  })
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export { receiveKillmail, trimKillmails } from './killmails'
export { receivePing, checkConnection } from './connection'
export { useConfiguration } from './configuration'
export { useSolarSystems } from './solarSystems'

export default store
