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
            query: (data) => ({
                url: "/payments",
                method: "POST",
                body: data
            }),
        }),
        buySubscription: builder.mutation({
            query: (data) => ({
                url: "/buySubscription",
                method: "POST",
                body: data
            }),
        }),
    }),
});

export const {
    usePaymentsQuery,
    useCreatePaymentMutation,
    useBuySubscriptionMutation
} = paymentApi;