import { apiSlice } from "./ApiSlice";

const coffeeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Fetch all coffees
        coffees: builder.query({
            query: () => ({ url: "/coffees" }), // Relative to baseUrl
        }),

        // Fetch a single coffee by ID
        singleCoffee: builder.query({
            query: (id) => ({ url: `/coffees/${id}` }), // Relative to baseUrl
        }),

        // Create a new coffee
        createCoffee: builder.mutation({
            query: (data) => ({
                url: "/coffees", // Relative to baseUrl
                method: "POST",
                body: data,
            }),
        }),

        // Delete a coffee by ID
        deleteCoffee: builder.mutation({
            query: (id) => ({
                url: `/coffees/${id}`, // Relative to baseUrl
                method: "DELETE",
            }),
        }),

        // Update a coffee by ID
        updateCoffee: builder.mutation({
            query: ({ id, data }) => ({
                url: `/coffees/${id}`, // Relative to baseUrl
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useCoffeesQuery,
    useSingleCoffeeQuery,
    useCreateCoffeeMutation,
    useDeleteCoffeeMutation,
    useUpdateCoffeeMutation,
} = coffeeApi;