import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { combineReducers } from 'redux'

import solarSystems from './solarSystems'
import killmails from './killmails'
import connection from './connection'
import configuration from './configuration'

const rootReducer = combineReducers({ solarSystems, killmails, connection, configuration })

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

export { fetchSolarSystems } from './solarSystems'
export { receiveKillmail, trimKillmails } from './killmails'
export { receivePing, checkConnection } from './connection'
export { updateConfiguration } from './configuration'

export default store
