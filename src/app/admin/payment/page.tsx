"use client";

import React, { useState } from 'react';
import { usePaymentsQuery } from '../../../lib/redux/slices/PaymentSlice';
import { useBoughtSubscriptionQuery } from '../../../lib/redux/slices/subscribersSlice';
import { useSession } from 'next-auth/react';

const AdminPaymentsDashboard = () => {
    useSession();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'payments' | 'subscriptions'>('payments');

    // Fetch payments with pagination
    const { data: paymentsData, isLoading: paymentsLoading, error: paymentsError } = usePaymentsQuery({
        page: currentPage,
        limit: pageSize,
        search: searchTerm
    });

    // Fetch subscriptions with pagination
    const { data: subscriptionsData, isLoading: subscriptionsLoading, error: subscriptionsError } = useBoughtSubscriptionQuery({
        page: currentPage,
        limit: pageSize,
        search: searchTerm
    });

    // Extract data based on active tab
    const payments = paymentsData?.data?.payments || [];
    const subscriptions = subscriptionsData || []; // Directly use the array response
    const totalPages = activeTab === 'payments'
        ? paymentsData?.data?.totalPages || 1
        : subscriptionsData?.data?.totalPages || 1;
    const totalItems = activeTab === 'payments'
        ? paymentsData?.data?.total || 0
        : subscriptionsData?.data?.total || 0;

    interface Payment {
        id: string;
        email: string;
        planName: string;
        planPrice: number;
        paymentDate: string;
        status: 'ACTIVE' | 'PENDING' | 'CANCELLED';
        startDate: string;
    }

    interface Subscription {
        id: string;
        status: 'ACTIVE' | 'PENDING' | 'CANCELLED';
        startDate: string;
        endDate: string;
        type: string;
        address: string;
        apartment: string;
        city: string;
        zipCode: string;
        phone: string | null;
        userId: string;
        email: string | null;
        subscriptionId: string;
        subscription: {
            id: string;
            name: string;
            price: number;
            createdAt: string;
            userId: string | null;
        };
    }

    const formatDate = (dateString: string): string => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount || 0);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    type SearchChangeEvent = React.ChangeEvent<HTMLInputElement>;

    const handleSearchChange = (e: SearchChangeEvent): void => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const isLoading = activeTab === 'payments' ? paymentsLoading : subscriptionsLoading;
    const error = activeTab === 'payments' ? paymentsError : subscriptionsError;
    const items = activeTab === 'payments' ? payments : subscriptions;

    // Calculate total revenue and average subscription
    const totalRevenue = subscriptions.reduce((sum: number, s: Subscription) => sum + (s.subscription?.price || 0), 0);
    const avgSubscription = subscriptions.length > 0 ? totalRevenue / subscriptions.length : 0;

    return (
        <div className="w-full">
            {/* Header with search */}
            <div className='w-full flex flex-col md:flex-row gap-4 items-start md:items-center bg-white px-4 py-4 justify-between'>
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            setActiveTab('payments');
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium text-sm ${activeTab === 'payments' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Individual Purchases
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('subscriptions');
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium text-sm ${activeTab === 'subscriptions' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Subscriptions
                    </button>
                </div>

                <div className='w-full md:w-auto flex flex-col md:flex-row gap-4'>
                    <div className='flex items-center p-2 bg-[#F9FAFB] rounded-[12px] px-4 py-3 gap-[10px]'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 17L12.3333 12.3333M13.8889 8.44444C13.8889 11.4513 11.4513 13.8889 8.44444 13.8889C5.43756 13.8889 3 11.4513 3 8.44444C3 5.43756 5.43756 3 8.44444 3C11.4513 3 13.8889 5.43756 13.8889 8.44444Z" stroke="#475367" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            type="text"
                            placeholder={`Search ${activeTab === 'payments' ? 'payments' : 'subscriptions'}`}
                            className='bg-transparent outline-none border-none w-full'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className='flex flex-row gap-[10px] items-center'>
                        <div className='p-3 cursor-pointer rounded-full bg-[#F0F2F5] '>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.25 3.125C6.25 2.77982 6.52982 2.5 6.875 2.5H13.125C13.4702 2.5 13.75 2.77982 13.75 3.125V4.375H16.25C16.5952 4.375 16.875 4.65482 16.875 5V6.875C16.875 7.22018 16.5952 7.5 16.25 7.5H3.75C3.40482 7.5 3.125 7.22018 3.125 6.875V5C3.125 4.65482 3.40482 4.375 3.75 4.375H6.25V3.125ZM7.5 4.375H12.5V3.75H7.5V4.375Z" fill="#344054" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M5 15.625V8.75H6.25V15.625C6.25 15.9702 6.52982 16.25 6.875 16.25H13.125C13.4702 16.25 13.75 15.9702 13.75 15.625V8.75H15V15.625C15 16.6605 14.1605 17.5 13.125 17.5H6.875C5.83947 17.5 5 16.6605 5 15.625Z" fill="#344054" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.75 10V15H7.5V10H8.75Z" fill="#344054" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.5 10V15H11.25V10H12.5Z" fill="#344054" />
                            </svg>
                        </div>
                        <select
                            className='p-2 cursor-pointer rounded-lg bg-[#F0F2F5] border-none outline-none text-sm'
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                        >
                            <option value="10">10 per page</option>
                            <option value="25">25 per page</option>
                            <option value="50">50 per page</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total {activeTab === 'payments' ? 'Purchases' : 'Subscriptions'}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{totalItems}</p>
                        </div>
                        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {activeTab === 'payments' ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                )}
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {activeTab === 'payments'
                                    ? formatCurrency(payments.reduce((sum: number, p: Payment) => sum + (p.planPrice || 0), 0))
                                    : formatCurrency(totalRevenue)}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Avg. {activeTab === 'payments' ? 'Purchase' : 'Subscription'}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                {activeTab === 'payments'
                                    ? formatCurrency(
                                        payments.length > 0
                                            ? payments.reduce((sum: number, p: Payment) => sum + (p.planPrice || 0), 0) / payments.length
                                            : 0
                                    )
                                    : formatCurrency(avgSubscription)}
                            </p>
                        </div>
                        <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-sm mx-4 mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Address</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Subscription</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Type</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Start Date</th>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={8} className="py-4 px-4 text-center text-gray-500">
                                        Loading {activeTab === 'payments' ? 'payments' : 'subscriptions'}...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={8} className="py-4 px-4 text-center text-red-500">
                                        Error loading {activeTab === 'payments' ? 'payments' : 'subscriptions'}
                                    </td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-4 px-4 text-center text-gray-500">
                                        No {activeTab === 'payments' ? 'payments' : 'subscriptions'} found
                                    </td>
                                </tr>
                            ) : activeTab === 'payments' ? (
                                payments.map((payment: Payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-800">-</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium">
                                                    {payment.email?.charAt(0) || 'U'}
                                                </div>
                                                <div className="text-sm font-medium text-gray-800">
                                                    {payment.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-800">-</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">-</td>
                                        <td className="py-3 px-4 text-sm font-medium text-gray-800">
                                            {formatCurrency(payment.planPrice)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">{formatDate(payment.paymentDate)}</td>
                                        <td className="py-3 px-4">
                                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700">
                                                Completed
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-1 rounded-md hover:bg-gray-100" title="View Details">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#475367" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M1.66699 10.0003C1.66699 9.08376 1.66699 8.62549 1.93407 8.35842C2.20115 8.09134 2.65941 8.09134 3.57593 8.09134H16.4259C17.3424 8.09134 17.8006 8.09134 18.0677 8.35842C18.3348 8.62549 18.3348 9.08376 18.3348 10.0003C18.3348 10.9168 18.3348 11.3751 18.0677 11.6421C17.8006 11.9092 17.3424 11.9092 16.4259 11.9092H3.57593C2.65941 11.9092 2.20115 11.9092 1.93407 11.6421C1.66699 11.3751 1.66699 10.9168 1.66699 10.0003Z" stroke="#475367" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <button className="p-1 rounded-md hover:bg-gray-100" title="Delete">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2.5 5H17.5M15.8333 5L15.1105 13.8953C15.0482 14.6984 14.4285 15.3333 13.6923 15.3333H6.30769C5.57153 15.3333 4.95175 14.6984 4.88953 13.8953L4.16667 5M8.33333 8.33333V12.5M11.6667 8.33333V12.5M7.5 5V3.33333C7.5 2.8731 7.8731 2.5 8.33333 2.5H11.6667C12.1269 2.5 12.5 2.8731 12.5 3.33333V5" stroke="#475367" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                subscriptions.map((subscription: Subscription) => (
                                    <tr key={subscription.id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-800">{subscription.address || '-'}</td>
                                        <td className="py-3 px-4 text-sm text-gray-800">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium">
                                                    {subscription.email?.charAt(0) || subscription.userId?.charAt(0) || 'S'}
                                                </div>
                                                <div className="text-sm font-medium text-gray-800">
                                                    {subscription.email || 'No email'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-800">
                                            {subscription.subscription?.name || 'N/A'}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-800">
                                            {subscription.type || 'N/A'}
                                        </td>
                                        <td className="py-3 px-4 text-sm font-medium text-gray-800">
                                            {formatCurrency(subscription.subscription?.price || 0)}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-600">
                                            {formatDate(subscription.startDate)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                subscription.status === 'ACTIVE' ? 'bg-green-50 text-green-700' :
                                                subscription.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                                                'bg-red-50 text-red-700'
                                            }`}>
                                                {subscription.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-1 rounded-md hover:bg-gray-100" title="View Details">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="#475367" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M1.66699 10.0003C1.66699 9.08376 1.66699 8.62549 1.93407 8.35842C2.20115 8.09134 2.65941 8.09134 3.57593 8.09134H16.4259C17.3424 8.09134 17.8006 8.09134 18.0677 8.35842C18.3348 8.62549 18.3348 9.08376 18.3348 10.0003C18.3348 10.9168 18.3348 11.3751 18.0677 11.6421C17.8006 11.9092 17.3424 11.9092 16.4259 11.9092H3.57593C2.65941 11.9092 2.20115 11.9092 1.93407 11.6421C1.66699 11.3751 1.66699 10.9168 1.66699 10.0003Z" stroke="#475367" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                                <button className="p-1 rounded-md hover:bg-gray-100" title="Cancel Subscription">
                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.16667 5.83333H15.8333M15.8333 5.83333V15.8333C15.8333 16.7538 15.0871 17.5 14.1667 17.5H5.83333C4.91286 17.5 4.16667 16.7538 4.16667 15.8333V5.83333M15.8333 5.83333V4.16667C15.8333 3.24619 15.0871 2.5 14.1667 2.5H5.83333C4.91286 2.5 4.16667 3.24619 4.16667 4.16667V5.83333" stroke="#475367" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                        >
                            Next
                        </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
                                <span className="font-medium">{Math.min(currentPage * pageSize, totalItems)}</span> of{' '}
                                <span className="font-medium">{totalItems}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="sr-only">Previous</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {/* Page numbers */}
                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    // Show current page, first page, last page, and pages around current page
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setCurrentPage(pageNumber)}
                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${pageNumber === currentPage
                                                    ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    } else if (
                                        (pageNumber === 2 && currentPage > 3) ||
                                        (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                                    ) {
                                        // Show ellipsis
                                        return (
                                            <span
                                                key={pageNumber}
                                                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300"
                                            >
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                })}

                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPaymentsDashboard;