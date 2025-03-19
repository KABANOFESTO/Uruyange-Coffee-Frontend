"use client";

import React, { useState } from "react";
import {
    useSubscriptionsQuery,
    useCreateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useUpdateSubscriptionMutation,
} from "../../../lib/redux/slices/subscribersSlice";

type Subscription = {
    id: string;
    name: string;
    price: number;
};

const SubscriptionsPage = () => {
    const { data: subscriptions, isLoading, isError, refetch } = useSubscriptionsQuery({});
    const [createSubscription] = useCreateSubscriptionMutation();
    const [deleteSubscription] = useDeleteSubscriptionMutation();
    const [updateSubscription] = useUpdateSubscriptionMutation();

    const [formData, setFormData] = useState({ name: "", price: 0 });
    const [editId, setEditId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            await updateSubscription({ id: editId, data: formData });
            setEditId(null);
        } else {
            await createSubscription(formData);
        }
        setFormData({ name: "", price: 0 });
        refetch();
    };

    const handleDelete = async (id: string) => {
        await deleteSubscription(id);
        refetch();
    };

    const handleEdit = (subscription: { id: string; name: string; price: number }) => {
        setFormData({ name: subscription.name, price: subscription.price });
        setEditId(subscription.id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching subscriptions</div>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Subscriptions</h1>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        className="p-2 border rounded"
                        required
                    />
                </div>
                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    {editId ? "Update Subscription" : "Create Subscription"}
                </button>
            </form>

            {/* Subscription Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions?.map((sub: Subscription) => (
                            <tr key={sub.id}>
                                <td className="py-2 px-4 border">{sub.name}</td>
                                <td className="py-2 px-4 border">${sub.price}</td>
                                <td className="py-2 px-4 border">
                                    <button
                                        onClick={() => handleEdit(sub)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(sub.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubscriptionsPage;