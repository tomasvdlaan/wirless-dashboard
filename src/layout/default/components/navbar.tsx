import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiMessageRounded } from "react-icons/bi";

function DefaultNavbar() {
    return (
        <div className="w-full h-16 bg-white p-4 flex flex-row justify-end">
            <div className="rounded-full bg-gray-100 flex justify-center items-center w-10 h-10 border border-gray-300 relative mr-4">
                <BiMessageRounded className='text-gray-600 w-6 h-6' />
                <span className="absolute -top-1 -right-3 bg-green-600 flex justify-center items-center rounded-full text-sm text-white w-5 h-5">
                    1
                </span>
            </div>
            <div className="rounded-full bg-gray-100 flex justify-center items-center w-10 h-10 border border-gray-300 relative mr-4">
                <IoIosNotificationsOutline className='text-gray-600 w-6 h-6' />
                <span className="absolute -top-1 -right-3 bg-green-600 flex justify-center items-center rounded-full text-sm text-white w-5 h-5">
                    1
                </span>
            </div>
            <div className="rounded-full bg-gray-100 flex justify-center items-center w-10 h-10 border border-gray-300 relative mr-4">
                <IoIosNotificationsOutline className='text-gray-600 w-6 h-6' />
                <span className="absolute -top-1 -right-3 bg-green-600 flex justify-center items-center rounded-full text-sm text-white w-5 h-5">
                    1
                </span>
            </div>
        </div>
    )
}

export default DefaultNavbar