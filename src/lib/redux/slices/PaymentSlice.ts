import { apiSlice } from "./ApiSlice";

const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        payments: builder.query({
            query: (token) => ({
                url: "/payments",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        createPayment: builder.mutation({
            query: ({ data, token }) => ({
                url: "/payments",
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {
    usePaymentsQuery,
    useCreatePaymentMutation
} = paymentApi;