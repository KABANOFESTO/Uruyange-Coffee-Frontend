import { apiSlice } from "./ApiSlice";

const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        getMessages: builder.query({
            query: () => ({
                url: "/messages",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                },
            }),
        }),


        createMessage: builder.mutation({
            query: (data) => ({
                url: "/messages", 
                method: "POST",
                body: data,
            }),
        }),


        deleteMessage: builder.mutation({
            query: (id) => ({
                url: `/messages/${id}`, 
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, 
                },
            }),
        }),
    }),
});

export const {
    useGetMessagesQuery,
    useCreateMessageMutation,
    useDeleteMessageMutation,
} = messagesApi;