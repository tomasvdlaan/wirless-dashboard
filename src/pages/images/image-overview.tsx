import React, { useEffect, useRef, useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { Paginated } from 'wirless-lib/dist/domain/helper/paginated'
import { ImageModel } from 'wirless-lib/dist/domain/models/image.model'
import ImageUploadModal from '../../components/modal/image-upload-modal'
import { useDropzone } from 'react-dropzone'
import { FaLink, FaTrash, FaTrashAlt } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'

function ImageOverviewPage() {
    const [images, setImages] = useState<Paginated<ImageModel>>()

    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const [searchTerm, setSearchTerm] = useState<string>()

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            console.log(acceptedFiles)
            setUploadedImage(acceptedFiles[0])
            setUploadModalOpen(true)
        }
    });

    const [uploadedImage, setUploadedImage] = useState<any>()
    const [isUploadModalOpen, setUploadModalOpen] = useState<boolean>(false)


    const load = async () =>
        fetch(`http://localhost:3000/file/image?page=${page}&itemsPerPage=${itemsPerPage}${searchTerm ? `&title=${searchTerm}` : ""}`)
            .then((data) => data.json())
            .then((data) => setImages(new Paginated(data.data, { page: data.page, itemsPerPage: data.itemsPerPage }, data.totalItemCount)))

    useEffect(() => {
        load();
    }, [page, itemsPerPage, searchTerm])


    return (
        <div className="p-4">
            <div className="flex flex-row mb-4">
                <div className="w-full border border-gray-300 bg-gray-100 border-dashed rounded-lg flex items-center justify-center" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className='flex flex-col items-center justify-center h-64'>
                        <div><BsCloudUpload className='w-12 h-12' /></div>
                        <div className='font-gray-500'>
                            <span className="font-bold mr-1">Click to upload</span>
                            <span>or drag and drop</span>
                        </div>
                        <div className="text-gray-300">
                            SVG, PNG, JPG or GIF (MAX. 1024x960px)
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row mb-4">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                        <FiSearch />
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-4">
                {images?.data.map(i => (
                    <div className="p-1">
                        <div className="rounded-lg bg-white overflow-hidden">
                            <img
                                alt={i.alt}
                                className="block aspect-[6/5] w-full object-contain object-center bg-gray-100"
                                src={i.url} />
                            <div className='px-4 p-2 flex flex-row justify-center'>
                                <span className='mr-auto'>
                                    {i.title}
                                </span>
                                <a href={i.url} target='_blank'><FaLink className='ml-auto text-blue-500 w-6 h-6' /></a>
                                <FaTrashAlt className='text-red-500 w-6 h-6' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isUploadModalOpen && <ImageUploadModal image={uploadedImage} onClose={() => setUploadModalOpen(false)} />}
        </div>
    )
}

export default ImageOverviewPage