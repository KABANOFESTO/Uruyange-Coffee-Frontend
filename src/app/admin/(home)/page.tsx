"use client"
import AdminCard from '@/components/admincomp/AdminCard'
import { Card, CardContent } from '@/components/ui/card'
import { Inbox } from 'lucide-react'
import React from 'react'
import { useSession } from 'next-auth/react'

const AdminHome = () => {
    const { data: userProfile, status } = useSession()

    return (
        <div className='flex flex-col gap-[16px] w-full'>
            <div className='flex flex-row items-center gap-[20px] justify-between w-full p-4'>
                <div className='flex flex-col gap-[4px]'>
                    <h1 className='text-[24px] font-bold'>Welcome Back {userProfile?.user?.name}</h1>
                    <span className='text-[14px] text-[#475367]'>Build Your world of Coffee Experiance Here😉!!!</span>
                </div>
            </div>
            <div className='flex flex-col gap-[10px] px-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-[16px] '>
                    <AdminCard title='Total Coffee Items' number={0} icon={<Inbox size={24} />} percentage={0} />
                    <AdminCard title='Total Subscribers' number={0} icon={<Inbox size={24} />} percentage={0} />
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[16px] '>
                    <AdminCard title='Completed Vistors' number={0} icon={<Inbox size={24} />} percentage={0} />
                </div>
            </div>
        </div>
    )
}

export default AdminHome;
