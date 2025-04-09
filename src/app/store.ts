import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga"
import { routerMiddleware } from "connected-react-router"
import { createBrowserHistory } from "history"
import { rootReducer } from "../features/rootReducer"
import rootSaga from "../features/rootSaga"

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(routerMiddleware(history), sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
