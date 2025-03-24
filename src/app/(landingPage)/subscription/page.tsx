'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSubscriptionsQuery, useSingleSubscriptionQuery } from '../../../lib/redux/slices/subscribersSlice';
import { useCreatePaymentMutation } from '../../../lib/redux/slices/PaymentSlice';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import b from "../../../../public/images/Americano.jpg";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type PlanType = 'weekly' | 'monthly' | 'yearly';

interface PlanDetails {
    name: string;
    price: string;
    imageSrc: string;
}

const SubscriptionPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

const PaymentForm = () => {
    const router = useRouter();
    const {status } = useSession();
    const isLoggedIn = status === 'authenticated';

    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    const { data: subscriptions, isLoading: isLoadingSubscriptions } = useSubscriptionsQuery<SubscriptionsQueryResult>({});

    useSingleSubscriptionQuery(
        selectedPlan ? selectedPlan : undefined,
        { skip: !selectedPlan }
    );

    const [createPayment, { isLoading: isPaymentLoading, isSuccess: isPaymentSuccess }] = useCreatePaymentMutation();

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
        receiveOffers: false,
        paymentMethod: 'card',
    });

    const stripe = useStripe();
    const elements = useElements();

    const fallbackPlans: Record<PlanType, PlanDetails> = {
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

    interface Subscription {
        type: string;
        name: string;
        price: number;
        billingCycle: string;
    }

    interface SubscriptionsQueryResult {
        data: Subscription[];
        isLoading: boolean;
    }

    interface Subscription {
        imageSrc: string;
    }

    const plans: Record<PlanType, PlanDetails[]> = subscriptions?.length
        ? subscriptions.reduce<Record<PlanType, PlanDetails[]>>((acc: Record<PlanType, PlanDetails[]>, plan: Subscription) => {
            const planType = plan.type as PlanType;
            return {
                ...acc,
                [planType]: [
                    ...(acc[planType] || []),
                    {
                        name: plan.name,
                        price: `$${plan.price}/${plan.name}`,
                    }
                ]
            };
        }, {} as Record<PlanType, PlanDetails[]>)
        : {
            weekly: Array.isArray(fallbackPlans.weekly) ? fallbackPlans.weekly : [fallbackPlans.weekly],
            monthly: Array.isArray(fallbackPlans.monthly) ? fallbackPlans.monthly : [fallbackPlans.monthly],
            yearly: Array.isArray(fallbackPlans.yearly) ? fallbackPlans.yearly : [fallbackPlans.yearly]
        };

    useEffect(() => {
        if (isPaymentSuccess) {
            alert('Payment successful! Thank you for subscribing.');
            router.push('/dashboard');
        }
    }, [isPaymentSuccess, router]);

    const handlePlanSelect = (plan: PlanType) => {
        setSelectedPlan(plan);

        if (!isLoggedIn) {
            setShowLoginMessage(true);
            setTimeout(() => {
                document.getElementById('login-message')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return;
        }

        setShowPaymentForm(true);
        setTimeout(() => {
            document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedPlan || !stripe || !elements) return;

        try {
            const paymentData = {
                subscriptionType: selectedPlan,
                ...formData,
                paymentMethodId: '',
            };

            if (formData.paymentMethod === 'card') {
                const { paymentMethod, error } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: elements.getElement(CardElement)!,
                    billing_details: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        phone: formData.phone,
                        address: {
                            line1: formData.address,
                            line2: formData.apartment,
                            city: formData.city,
                            postal_code: formData.zipCode,
                        },
                    },
                });

                if (error) {
                    throw error;
                }

                paymentData.paymentMethodId = paymentMethod.id;
            } else if (formData.paymentMethod === 'blik') {
                paymentData.paymentMethodId = 'blik'; // Replace with actual BLIK logic
            } else if (formData.paymentMethod === 'apple_pay') {
                paymentData.paymentMethodId = 'apple_pay'; // Replace with actual Apple Pay logic
            }

            await createPayment(paymentData).unwrap();
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment processing failed. Please try again.');
        }
    };

    const handleLoginRedirect = () => {
        if (selectedPlan) {
            sessionStorage.setItem('selectedSubscriptionPlan', selectedPlan);
        }
        router.push('/auth');
    };

    return (
        <>
            <section className="relative h-screen flex items-center justify-center text-white text-center">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/me5.webp')" }}></div>
                <div className="absolute inset-0 bg-black/50"></div>
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
                <section id="plans" className="py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-6">Subscription Plans</h2>
                        {isLoadingSubscriptions ? (
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {Object.entries(plans).map(([key, planArray]) => (
                                    planArray.map((plan, index) => (
                                        <div key={`${key}-${index}`} className="p-8 bg-white shadow-lg rounded transition-all hover:shadow-xl">
                                            <div className="relative h-48 w-full mb-4">
                                                <Image
                                                    src={b}
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
                                    ))
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {showLoginMessage && (
                    <section id="login-message" className="py-16 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
                        <div className="container mx-auto px-6 text-center">
                            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
                                <div className="text-yellow-500 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V7a3 3 0 00-3-3H5a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3v-4" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Please Log In Before You Pay</h2>
                                <p className="text-gray-600 mb-6">
                                    To complete your subscription to our {selectedPlan && plans[selectedPlan][0].name},
                                    please log in to your account or create a new one.
                                </p>
                                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                                    <button
                                        onClick={handleLoginRedirect}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded shadow transition-colors"
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => router.push('/signup?redirect=subscription')}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded shadow transition-colors"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {showPaymentForm && (
                    <section id="payment-form" className="py-16 bg-gray-100">
                        <div className="container mx-auto px-6">
                            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold mb-6 text-center">Payment Details</h2>
                                <h3 className="text-xl mb-6 text-center">
                                    Selected Plan: <span className="font-semibold text-blue-600">{selectedPlan && plans[selectedPlan][0].name}</span> - {selectedPlan && plans[selectedPlan][0].price}
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* <div>
                                        <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">Payment Method</label>
                                        <select
                                            id="paymentMethod"
                                            name="paymentMethod"
                                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.paymentMethod}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="card">Credit/Debit Card</option>
                                            <option value="blik">BLIK</option>
                                            <option value="apple_pay">Apple Pay</option>
                                        </select>
                                    </div> */}


                                    <h3 className="text-2xl font-bold mt-8 mb-4">Delivery</h3>

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
                                                value={formData.firstName || ''}
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
                                                value={formData.lastName || ''}
                                            />
                                        </div>
                                    </div>

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
                                            value={formData.address || ''}
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
                                            value={formData.apartment || ''}
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
                                                value={formData.city || ''}
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
                                                value={formData.zipCode || ''}
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
                                            value={formData.phone || ''}
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
                                            disabled={isPaymentLoading}
                                        >
                                            {isPaymentLoading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </span>
                                            ) : (
                                                'Pay Now'
                                            )}
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