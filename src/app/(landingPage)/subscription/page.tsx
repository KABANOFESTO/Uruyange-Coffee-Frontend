'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type PlanType = 'weekly' | 'monthly' | 'yearly';

interface PlanDetails {
    name: string;
    price: string;
    imageSrc: string;
}

const SubscriptionPage = () => {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        zipCode: '',
        phone: '',
        receiveOffers: false
    });

    const plans: Record<PlanType, PlanDetails> = {
        weekly: {
            name: 'Weekly Plan',
            price: '$18.99/week',
            imageSrc: '/images/E.webp'
        },
        monthly: {
            name: 'Monthly Plan',
            price: '$49.99/month',
            imageSrc: '/images/D.webp'
        },
        yearly: {
            name: 'Yearly Plan',
            price: '$199.99/year',
            imageSrc: '/images/C.webp'
        }
    };

    const handlePlanSelect = (plan: PlanType) => {
        setSelectedPlan(plan);
        setShowPaymentForm(true);
        // Scroll to payment form
        setTimeout(() => {
            document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the payment processing
        console.log('Payment submitted for', selectedPlan, formData);
        // Simulate successful payment
        alert('Payment successful! Thank you for subscribing.');
        router.push('/dashboard');
    };

    return (
        <>
            <section className="relative h-screen flex items-center justify-center text-white text-center">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/me5.webp')" }}></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* Hero Content */}
                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover the World Through Coffee</h1>
                    <p className="mb-6 text-lg max-w-lg mx-auto">
                        Explore single-origin coffees from the best growers worldwide. Delivered fresh to your door.
                    </p>
                    <button
                        onClick={() => router.push("/plan")}
                        className="bg-yellow-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-600 transition"
                    >
                        Start Your Journey
                    </button>
                </div>
            </section>
            <div className="pt-24 bg-gray-50 min-h-screen">
                {/* Subscription Plans */}
                <section id="plans" className="py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-6">Subscription Plans</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {Object.entries(plans).map(([key, plan]) => (
                                <div key={key} className="p-8 bg-white shadow-lg rounded transition-all hover:shadow-xl">
                                    <div className="relative h-48 w-full mb-4">
                                        <Image
                                            src={plan.imageSrc}
                                            alt={plan.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className="rounded"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                                    <p className="text-lg text-gray-600 mb-6">{plan.price}</p>
                                    <button
                                        onClick={() => handlePlanSelect(key as PlanType)}
                                        className={`bg-yellow-500 text-white py-2 px-6 rounded shadow hover:bg-yellow-600 transition-colors ${selectedPlan === key ? 'ring-2 ring-yellow-400' : ''}`}
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Payment Form */}
                {showPaymentForm && (
                    <section id="payment-form" className="py-16 bg-gray-100">
                        <div className="container mx-auto px-6">
                            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold mb-6 text-center">Payment Details</h2>
                                <h3 className="text-xl mb-6 text-center">
                                    Selected Plan: <span className="font-semibold text-blue-600">{selectedPlan && plans[selectedPlan].name}</span> - {selectedPlan && plans[selectedPlan].price}
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            onChange={handleInputChange}
                                            value={formData.email}
                                        />
                                    </div>

                                    {/* Card Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2">
                                            <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">Card Number</label>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                placeholder="Enter your card number"
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                                onChange={handleInputChange}
                                                value={formData.cardNumber}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">Expiry Date</label>
                                                <input
                                                    type="text"
                                                    id="expiryDate"
                                                    name="expiryDate"
                                                    placeholder="MM/YY"
                                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                    onChange={handleInputChange}
                                                    value={formData.expiryDate}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">CVV</label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    name="cvv"
                                                    placeholder="Enter CVV"
                                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    required
                                                    onChange={handleInputChange}
                                                    value={formData.cvv}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mt-8 mb-4">Delivery</h3>

                                    {/* Name */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name (Optional)</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                placeholder="Enter your first name"
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                onChange={handleInputChange}
                                                value={formData.firstName}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                placeholder="Enter your last name"
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                                onChange={handleInputChange}
                                                value={formData.lastName}
                                            />
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="Enter your address"
                                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                            onChange={handleInputChange}
                                            value={formData.address}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="apartment" className="block text-gray-700 font-medium mb-2">Apartment, Suite, etc. (Optional)</label>
                                        <input
                                            type="text"
                                            id="apartment"
                                            name="apartment"
                                            placeholder="Enter apartment or suite"
                                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={handleInputChange}
                                            value={formData.apartment}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                placeholder="Enter your city"
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                                onChange={handleInputChange}
                                                value={formData.city}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">ZIP Code</label>
                                            <input
                                                type="text"
                                                id="zipCode"
                                                name="zipCode"
                                                placeholder="Enter your ZIP code"
                                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                                onChange={handleInputChange}
                                                value={formData.zipCode}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone (Optional)</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter your phone number"
                                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onChange={handleInputChange}
                                            value={formData.phone}
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="receiveOffers"
                                            name="receiveOffers"
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            onChange={handleInputChange}
                                            checked={formData.receiveOffers}
                                        />
                                        <label htmlFor="receiveOffers" className="ml-2 block text-gray-700">Text me with news and offers</label>
                                    </div>

                                    <div className="mt-8">
                                        <button
                                            type="submit"
                                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded shadow transition-colors"
                                        >
                                            Pay Now
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
};

export default SubscriptionPage;