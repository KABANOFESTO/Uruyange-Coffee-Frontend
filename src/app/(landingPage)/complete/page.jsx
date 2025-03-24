'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

const ThankYouPage = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
            <Head>
                <title>Payment Successful | Thank You</title>
                <meta name="description" content="Thank you for your payment" />
            </Head>

            <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
                <div className="mb-6">
                    <svg
                        className="w-20 h-20 mx-auto text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Murakoze kwishyura {`"Uruyange"`}. Your payment was successful.
                </p>
                <p className="text-gray-500 animate-pulse">
                    Redirecting to home page in 5 seconds...
                </p>

                <div className="mt-8">
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Go Home Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThankYouPage;