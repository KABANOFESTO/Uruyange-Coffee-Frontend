import { apiSlice } from "./ApiSlice";

const subscriptionApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all subscriptions
        subscriptions: builder.query({
            query: () => ({ url: "/subscriptions" }), // Relative to baseUrl
        }),

        // Fetch a single subscription by ID
        singleSubscription: builder.query({
            query: (id) => ({ url: `/subscriptions/${id}` }), // Relative to baseUrl
        }),

        // Create a new subscription
        createSubscription: builder.mutation({
            query: (data) => ({
                url: "/subscriptions", // Relative to baseUrl
                method: "POST",
                body: data,
            }),
        }),

        // Delete a subscription by ID
        deleteSubscription: builder.mutation({
            query: (id) => ({
                url: `/subscriptions/${id}`, // Relative to baseUrl
                method: "DELETE",
            }),
        }),

        // Update a subscription by ID
        updateSubscription: builder.mutation({
            query: ({ id, data }) => ({
                url: `/subscriptions/${id}`, // Relative to baseUrl
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useSubscriptionsQuery,
    useSingleSubscriptionQuery,
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useUpdateSubscriptionMutation,
} = subscriptionApi;