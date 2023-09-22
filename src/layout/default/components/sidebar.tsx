import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { Routes } from '../../routes';

function DefaultSidebar() {
    return (
        <div className="flex flex-col w-[20rem] bg-gradient-to-b from-gray-900 to-gray-600 text-white p-4 gap-8">
            <span className="text-[2.5rem] font-bold">
                Wirless
            </span>
            {Routes.filter(r => r.type == "section").map(r => (
                <div className="flex flex-col gap-4" key={r.title}>
                    <span className="text-gray-500 font-bold uppercase">
                        {r.title}
                    </span>
                    {r.children.map(c => (
                        <a className="flex flex-row gap-4 content-center" href={c.href} key={c.href}>
                            {c.icon}
                            <span>
                                {c.title}
                            </span>
                            {c.badge}
                        </a>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default DefaultSidebar