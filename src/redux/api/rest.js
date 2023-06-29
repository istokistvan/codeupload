import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const BASE_URL = 'https://ncp-dummy.staging.moonproject.io/api/istok-istvan'

export const restApi = createApi({
    reducerPath: 'rest',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        upload: builder.mutation({
            query: (body) => ({
                url: '/code/upload',
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
    })
})

export const {useUploadMutation} = restApi