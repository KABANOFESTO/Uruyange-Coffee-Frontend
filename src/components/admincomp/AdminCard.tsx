import React from 'react'

interface AdminCardProps {
    title: string;
    number: number;
    icon: React.ReactNode;
    percentage: number;
}

const AdminCard = ({ title, number, icon, percentage }: AdminCardProps) => {
    return (
        <div className='flex flex-col gap-[10px] p-4 bg-[#FFFFFF] border-[2px] border-[#E4E7EC] rounded-[12px] w-full'>
            <div className='px-2 ml-auto' >
                <select name="" id="" className='text-[14px] font-[400] text-[#475367]'>
                    <option value="">This Year</option>
                </select>
            </div>
            <div className='flex flex-row gap-[10px] items-center'>
                <div className=' p-4 rounded-full bg-[#D0E0FC]'>
                    {icon}
                </div>
                <div className='flex flex-col gap-[4px]'>
                    <h1 className='text-[16px] font-[400] text-[#667185]'>{title}</h1>
                    <div className='flex flex-row gap-[10px] items-center'>
                        <h1 className='text-[18px] font-[600] text-[#101928]'>{number}</h1>
                        <div className=' px-[10px] bg-[#E7F6EC] rounded-[20px] items-center justify-center'>
                            <span className='text-[14px] text-[#2B71F0] flex flex-row gap-[4px] items-center'>
                                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.42086 1.14645C6.61612 0.951184 6.93271 0.951184 7.12797 1.14645L9.12797 3.14645C9.32323 3.34171 9.32323 3.65829 9.12797 3.85355C8.93271 4.04882 8.61612 4.04882 8.42086 3.85355L7.27441 2.70711V10.5C7.27441 10.7761 7.05056 11 6.77441 11C6.49827 11 6.27441 10.7761 6.27441 10.5V2.70711L5.12797 3.85355C4.93271 4.04882 4.61612 4.04882 4.42086 3.85355C4.2256 3.65829 4.2256 3.34171 4.42086 3.14645L6.42086 1.14645Z" fill="#2B71F0" />
                                </svg>
                                {percentage}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCard