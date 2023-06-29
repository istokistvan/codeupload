import {configureStore} from "@reduxjs/toolkit";
import {restApi} from "./api/rest.js";
import entryReducer from "./slices/entrySlice.js";

const store = configureStore({
    reducer: {
        entry: entryReducer,

        [restApi.reducerPath]: restApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(restApi.middleware)
})

export default store