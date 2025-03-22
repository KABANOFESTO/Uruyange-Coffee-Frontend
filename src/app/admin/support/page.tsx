"use client"
import React, { useState, useEffect } from 'react'
import {
    useGetMessagesQuery,
    useDeleteMessageMutation
} from '../../../lib/redux/slices/ContactSlice'
import { format } from 'date-fns'

type Message = {
    id: string;
    name: string;
    email: string;
    description: string;
    createdAt: string | Date;
}

const MessagesPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const {
        data: messagesData,
        isLoading,
        isError,
        refetch
    } = useGetMessagesQuery({ page: currentPage, limit: itemsPerPage })

    const [deleteMessage] = useDeleteMessageMutation()

    useEffect(() => {
        refetch();
    }, [currentPage, refetch]);

    const handleDeleteMessage = async (id: string) => {
        try {
            await deleteMessage(id)
            refetch()
        } catch (error) {
            console.error('Failed to delete message:', error)
        }
    }

    const formatDate = (date: string | Date) => {
        return format(new Date(date), 'MMM dd, yyyy')
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Function to handle the "Reply" button click
    const handleReply = (email: string) => {
        window.location.href = `mailto:${email}`;
    }

    if (isLoading) {
        return <div className="flex justify-center p-8">Loading messages...</div>
    }

    if (isError) {
        return <div className="flex justify-center p-8 text-red-500">Error loading messages</div>
    }

    const messages = Array.isArray(messagesData?.data) ? messagesData.data : [];
    // const totalItems = messages.length;
    // const totalPages = Math.ceil(totalItems / itemsPerPage);

    console.log('messagesData:', messagesData);
    console.log('messages array:', messages);

    return (
        <div className="w-full px-4 md:px-6 py-6 bg-white">
            <h1 className="text-3xl font-bold mb-8">Messages</h1>

            <div className="space-y-4">
                {messages.length > 0 ? (
                    messages.map((message: Message) => (
                        <div key={message.id} className="bg-[#F9FAFB] rounded-lg p-4 shadow-sm">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                                        {message.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{message.name}</h3>
                                        <p className="text-sm text-gray-500">{message.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">{formatDate(message.createdAt)}</span>
                                    <button
                                        onClick={() => handleReply(message.email)}
                                        className="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-gray-100"
                                        aria-label="Reply to message"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.33325 14.6667V9.33334C1.33325 8.40486 1.33325 7.94062 1.51123 7.57772C1.6675 7.25894 1.92521 6.99862 2.24279 6.84134C2.60398 6.66211 3.06603 6.66668 3.99013 6.66668H12.6666C13.403 6.66668 14 7.26364 14 8.00001V12C14 12.7364 13.403 13.3333 12.6666 13.3333H8.66659L4.66659 14.6667V13.3333H3.99013C3.06603 13.3333 2.60398 13.3379 2.24279 13.1587C1.92521 13.0014 1.6675 12.7411 1.51123 12.4223C1.33325 12.0594 1.33325 11.5951 1.33325 10.6667V14.6667Z" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M4.66675 6.66668V5.33334C4.66675 3.1242 6.4576 1.33334 8.66675 1.33334C10.8759 1.33334 12.6667 3.1242 12.6667 5.33334V6.66668" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteMessage(message.id)}
                                        className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100"
                                        aria-label="Delete message"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 4H3.33333H14" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.33337 4.00001V2.66668C5.33337 2.31305 5.47385 1.97392 5.7239 1.72387C5.97395 1.47382 6.31309 1.33334 6.66671 1.33334H9.33337C9.687 1.33334 10.0261 1.47382 10.2762 1.72387C10.5262 1.97392 10.6667 2.31305 10.6667 2.66668V4.00001" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12.6666 4V13.3333C12.6666 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.6869 14.6667 11.3333 14.6667H4.66659C4.31296 14.6667 3.97383 14.5262 3.72378 14.2761C3.47373 14.0261 3.33325 13.687 3.33325 13.3333V4" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="mt-3 bg-white p-3 rounded-md">
                                <p className="text-gray-700">{message.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H14L9 21V16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2">No messages found</p>
                        <button
                            onClick={() => refetch()}
                            className="mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                        >
                            Refresh Messages
                        </button>
                    </div>
                )}
            </div>

            {messages.length > 0 && (
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                    <div className="text-sm text-gray-500">
                        Showing {messages.length} messages
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-md ${currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Previous
                        </button>
                        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md">
                            <span className="text-gray-700">
                                {currentPage}
                            </span>
                        </div>
                        <button
                            onClick={handleNextPage}
                            disabled={messages.length < itemsPerPage}
                            className={`px-3 py-2 rounded-md ${messages.length < itemsPerPage
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MessagesPage