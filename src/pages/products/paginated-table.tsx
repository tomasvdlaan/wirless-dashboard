import React, { useEffect, useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsCloudDownload, BsFunnel, BsLayoutThreeColumns, BsLink, BsPencilSquare, BsPlusCircle, BsSearch, BsTrash } from 'react-icons/bs';
import { Paginated } from 'wirless-lib/src/domain/helper/paginated';
import Select from '../../components/forms/select';

type TableProps<T extends { id: string }, K extends keyof T> = {
    options?: TableOptions<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
    page?: Partial<Paginated<T>>
    load: (page: number, itemsPerPage: number) => Promise<Paginated<T>>;
    onEdit?: (id: string) => any;
    onDelete?: (id: string) => any;
    onView?: (id: string) => any;
    onNew?: () => any;
    filters?: any;
};

export type ColumnDefinitionType<T extends { id: string }, K extends keyof T> = {
    key: K;
    header: string;
    editable?: boolean;
    customView?: (item: T) => any
};

export type TableOptions<T extends { id: string }> = {
    eagerLoad?: boolean;
    title?: string;
    subtitle?: string;
}

function PaginatedTable<T extends { id: string }, K extends keyof T>(props: TableProps<T, K>) {
    const [page, setPage] = useState<number>(props.page?.meta!.page || 1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(props.page?.meta!.itemsPerPage || 10)

    const [loading, setLoading] = useState<boolean>(true)

    const [data, setData] = useState<T[]>(props.page?.data || [])

    useEffect(() => {
        if (!props.options || props.options.eagerLoad != false)
            refresh();
    }, [])

    const refresh = async () => {
        setLoading(true);
        const result = await props.load(page, itemsPerPage);
        setData(result.data);
        setItemsPerPage(result.meta.itemsPerPage);
        setPage(result.meta.itemsPerPage);
        setLoading(false);
    }

    const itemsPerPageOption = [
        { value: "5", title: "5" },
        { value: "10", title: "10" },
        { value: "25", title: "25" },
        { value: "50", title: "50" },
        { value: "100", title: "100" }
    ]


    return (
        <div className='p-4'>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <div>
                        <span className="text-lg font-medium text-gray-800">
                            {props.options?.title || "Table title"}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        {props.options?.subtitle || "Here goes the table subtitle"}
                    </div>
                </div>

                <div className="flex items-center mt-4 gap-x-3 ml-auto">
                    <button className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100">
                        <BsCloudDownload /> Download
                    </button>
                    <button className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600" onClick={props.onNew}>
                        <BsPlusCircle /> Add new
                    </button>
                </div>
            </div>

            <div className="mt-4 md:flex md:items-center md:justify-between">
                <div className="relative flex items-center">
                    <span className="absolute">
                        <BsSearch className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600" />
                    </span>

                    <input type="text" placeholder="Search" className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div className="flex flex-row gap-3 items-center">
                    {props.filters}
                    <Select onChange={(v) => { setItemsPerPage(Number.parseInt(v)); refresh() }} value={`${itemsPerPage}`} append='items per page' options={itemsPerPageOption} />
                    <div className="bg-white rounded-lg border border-gray-200 flex items-center justify-center h-10 w-10 text-gray-500">
                        <BsFunnel />
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 flex items-center justify-center h-10 w-10 text-gray-500">
                        <BsLayoutThreeColumns />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="w-full h-[16rem] bg-white rounded-lg flex items-center justify-center">
                    <div className='flex flex-col items-center'>
                        <svg role="status" className="inline h-8 w-8 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span className='text-gray-400'>
                            Loading the data...
                        </span>
                    </div>
                </div>) :
                (<>
                    <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                        <thead className='bg-gray-50'>
                            <tr className='text-left'>
                                {props.columns.map(c => (
                                    <th className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500' key={c.header}>
                                        {c.header}
                                    </th>
                                ))}
                                <th scope="col" className="relative py-3.5 px-4">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700'>
                            {data.map(i => (
                                <tr key={i.id}>
                                    {props.columns.map((column, index) => (
                                        <td className='px-4 py-4 text-sm text-gray-500'>
                                            {column.customView ? column.customView(i) : `${i[column.key]}`}
                                        </td>
                                    ))}
                                    <td>
                                        <div className="flex flex-row justify-center items-center gap-2 h-full">
                                            {props.onView && <BsLink onClick={() => props.onView!(i.id)} className='text-blue-300 w-5 h-5' />}
                                            {props.onEdit && <BsPencilSquare onClick={() => props.onEdit!(i.id)} className='text-blue-300 w-5 h-5' />}
                                            {props.onDelete && <BsTrash onClick={() => props.onDelete!(i.id)} className='text-rose-300 w-5 h-5' />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex items-center justify-between mt-3">
                        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <BsArrowLeft />
                            <span>
                                previous
                            </span>
                        </a>

                        <div className="items-center hidden md:flex gap-x-3">
                            <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                            <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                        </div>

                        <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                            <span>
                                Next
                            </span>

                            <BsArrowRight />
                        </a>
                    </div>
                </>)}
        </div>
    )
}

export default PaginatedTable