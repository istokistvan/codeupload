import {configureStore} from "@reduxjs/toolkit";
import {restApi} from "./api/rest.js";

const store = configureStore({
    reducer: {
        [restApi.reducerPath]: restApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(restApi.middleware)
})

export default store