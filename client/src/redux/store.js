import { configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from '@redux-saga/core'

import logger from "redux-logger";

import userReducer from "./user.slice";
import loadingReducer from './loading.slice'
import rootSaga from "./rootSaga";



const sagaMiddleware = createSagaMiddleware()

const customMiddleware = [sagaMiddleware]
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') customMiddleware.push(logger)

const store = configureStore({
	reducer: {
		user: userReducer,
		loading: loadingReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware)
})

sagaMiddleware.run(rootSaga)

export default store