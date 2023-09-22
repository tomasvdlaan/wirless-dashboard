import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BsArrowLeft, BsArrowRight, BsCloudUpload, BsGrid3X2, BsSave, BsThreeDotsVertical, BsTrash } from 'react-icons/bs'
import { FaCheck, FaColumns, FaEye, FaThList, FaTimes } from 'react-icons/fa'
import { FiSearch } from 'react-icons/fi'
import { Paginated } from 'wirless-lib/dist/domain/helper/paginated'
import { ImageModel } from 'wirless-lib/dist/domain/models/image.model'
import TextInput from './text-input'

type ImageSelectProps = {
    onChange?: (value: ImageModel) => any;
    value?: ImageModel;
}

function ImageSelect(props: ImageSelectProps) {
    const [selectedImage, setSelectedImage] = useState<ImageModel | undefined>(props.value);
    const [isSelectModalOpen, setSelectModalOpen] = useState<boolean>(false);

    useEffect(() => {
      setSelectedImage(props.value);
    }, [props.value])
    

    const select = (value: ImageModel) => {
        setSelectedImage(value);
        props.onChange?.(value);
    }

    const [images, setImages] = useState<Paginated<ImageModel>>()
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState<string>()

    const [loading, setLoading] = useState<boolean>(false)

    const [fileToUpload, setFileToUpload] = useState<any>();
    const [metaToUpload, setMetaToUpload] = useState<ImageModel>();
    const [isFileModalOpen, setFileModalOpen] = useState<boolean>(false)

    const load = async (options?: { page?: number }) => {
        if (options?.page) setPage(options.page);
        setLoading(true);
        await fetch(`http://localhost:3000/file/image?page=${options?.page || page}&itemsPerPage=${itemsPerPage}${searchTerm ? `&title=${searchTerm}` : ""}`)
            .then((data) => data.json())
            .then((data: Paginated<ImageModel>) => {
                setImages(new Paginated(data.data, { page: data.meta.page, itemsPerPage: data.meta.itemsPerPage }, data.meta.itemCount))
            })
        setLoading(false);
    }


    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', ".webp"]
        },
        async onDropAccepted(files, event) {
            setFileToUpload(files[0]);
            setFileModalOpen(true);

            let title = files[0].name;
            title = title.split(".")[0]
            title = title.replaceAll(/[^a-zA-Z0-9]/g, " ")
            title = title.replaceAll(/ +/g, " ")

            setMetaToUpload({ ...metaToUpload!, title, name: files[0].name })

        },
    });

    const upload = async () => {
        if (!metaToUpload || !metaToUpload.name || !metaToUpload.title) return;
        const formData = new FormData();
        formData.append("file", fileToUpload)
        formData.append("title", metaToUpload!.title)
        formData.append("name", metaToUpload!.name)
        formData.append("alt", metaToUpload.alt || `Image upload ${new Date().toISOString}`)
        await fetch(`http://localhost:3000/file/image/upload`, {
            method: "POST",
            body: formData
        })
            .then((data) => console.log(data))
        setFileModalOpen(false);
        load()
    }

    useEffect(() => {
        load();
    }, [page, itemsPerPage, searchTerm])

    return (
        <>
            <div className="flex flex-col w-full">
                <label htmlFor="image">Image</label>
                <div className="rounded-lg bg-gray-200 border border-gray-300 flex flex-row overflow-hidden">
                    <div className='w-full p-4 py-2 text-gray-500' onClick={() => setSelectModalOpen(true)}>
                        {selectedImage?.name || "Select an image..."}
                    </div>
                    <span className="h-full aspect-square flex justify-center items-center bg-blue-500 text-white hover:bg-blue-700">
                        <FaEye />
                    </span>
                </div>
            </div>

            {isSelectModalOpen &&
                <div className="fixed z-10 inset-0 bg-black/25 flex justify-center items-center">
                    <div className="bg-white rounded-lg w-1/2 p-4">
                        <div className="flex flex-row gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                                    <FiSearch />
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search for items"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="w-36 h-10 bg-blue-200 rounded-lg border border-dashed border-blue-400 flex justify-center items-center">
                                <span className='text-blue-400 flex flex-row justify-center' {...getRootProps()}>
                                    <BsCloudUpload className='w-6 h-6' />
                                    <input {...getInputProps()} />
                                </span>
                            </div>

                            <div className={`rounded-lg w-10 h-10 flex justify-center items-center ${selectedImage ? "bg-blue-500" : "bg-gray-400"} text-white`} onClick={() => selectedImage && setSelectModalOpen(false)}>
                                <FaCheck />
                            </div>

                            <div className="rounded-lg w-10 h-10 flex justify-center items-center bg-red-500 text-white" onClick={() => selectedImage && select(selectedImage)}>
                                <FaTimes />
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            {images?.data.map(img => (
                                <div className={`flex flex-row items-center border-b border-gray-200 py-2 hover:bg-blue-100 ${img.id == selectedImage?.id ? "bg-blue-100" : ""}`} key={img.id} onClick={() => select(img)}>
                                    <img src={img.url} alt={img.alt} className="h-12 w-12 m-2 object-contain" />
                                    <div className="flex flex-col">
                                        <span className="font-bold">
                                            {img.title}
                                        </span>
                                        <span>
                                            {img.name}
                                        </span>
                                    </div>
                                    <span className="ml-auto">
                                        <BsThreeDotsVertical className='mx-2' />
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                <BsArrowLeft />
                                <span>
                                    previous
                                </span>
                            </a>

                            <div className="items-center hidden md:flex gap-x-3">
                                {Array.from({ length: images?.meta.pageCount || 1 }, (_, i) => i + 1).map(i => (
                                    i == images?.meta.page ?
                                        (<a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">{i}</a>) :
                                        (<a key={i} href="#" onClick={() => load({ page: i })} className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">{i}</a>)
                                ))}
                            </div>

                            <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                                <span>
                                    Next
                                </span>

                                <BsArrowRight />
                            </a>
                        </div>
                    </div>
                </div>
            }

            {isFileModalOpen && (
                <div className="fixed z-10 inset-0 bg-black/25 flex justify-center items-center">
                    <div className="bg-white rounded-lg w-1/4 p-4 flex flex-col gap-4">
                        <div>
                            <span className="font-bold">
                                Image Metadata
                            </span>
                            <hr />
                        </div>
                        <TextInput title='Title' value={metaToUpload?.title} onChange={(v) => setMetaToUpload({ ...metaToUpload!, title: v })} />
                        <TextInput title='Name' value={metaToUpload?.name} onChange={(v) => setMetaToUpload({ ...metaToUpload!, name: v })} />
                        <TextInput title='Alt' value={metaToUpload?.alt} onChange={(v) => setMetaToUpload({ ...metaToUpload!, alt: v })} />
                        <div className="flex flex-row gap-4">
                            <button className="flex-1 flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100" onClick={() => setFileModalOpen(false)}>
                                <BsTrash /> Cancel
                            </button>
                            <button className="flex-1 flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600" onClick={upload}>
                                <BsSave /> Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ImageSelect