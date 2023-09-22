import React, { useEffect, useState } from 'react'
import { FaSave, FaTimes, FaTrash } from "react-icons/fa";
import { ImageModel } from 'wirless-lib/dist/domain/models/image.model';

type ImageUploadProps = {
    image?: any;
    onClose: () => any;
}

function ImageUploadModal(props: ImageUploadProps) {
    const [metaData, setMetaData] = useState<ImageModel>()
    const [preview, setPreview] = useState<string>()

    const change = (key: keyof ImageModel, value: any) => {
        const updatedMeta = { ...metaData, [key]: value } as ImageModel
        setMetaData(updatedMeta);
    }

    const upload = async () => {
        if (!props.image) return;
        const formData = new FormData();
        formData.append("file", props.image)
        formData.append("title", metaData?.title || "")
        formData.append("name", metaData?.name || "")
        formData.append("alt", metaData?.alt || "")
        fetch(`http://localhost:3000/file/image/upload`, {
            method: "POST",
            body: formData
        })
            .then((data) => console.log(data))
    }

    useEffect(() => {
        if (props.image) {
            console.log(props.image)
            setPreview(URL.createObjectURL(props.image));
            change("title", props.image.name)
            change("name", props.image.name)
        }
    }, [])


    return (
        <div className="w-screen h-screen bg-black/25 fixed inset-0 flex items-center justify-center">
            <div className="rounded-xl bg-white p-4 flex flex-row w-1/2">
                <img src={preview || "https://picsum.photos/300/200"} className='w-1/2 aspect-square object-contain bg-gray-100 rounded-lg' />
                <div className="flex flex-col px-4 w-1/2 gap-4">
                    <div className="flex flew-row items-end justify-center w-full">
                        <span className="mr-auto font-bold">
                            Upload Image
                        </span>
                        <FaTimes className='w-5 h-5' onClick={props.onClose} />
                    </div>
                    <hr />

                    <div className="flex flex-col w-full">
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" className='rounded-lg bg-white border border-gray-300 w-full p-4 py-2' value={metaData?.title} onChange={(e) => change("title", e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="name">name</label>
                        <input id="name" type="text" className='rounded-lg bg-white border border-gray-300 w-full p-4 py-2' value={metaData?.name} onChange={(e) => change("name", e.target.value)} />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="alt">Alt</label>
                        <input id="alt" type="text" className='rounded-lg bg-white border border-gray-300 w-full p-4 py-2' value={metaData?.alt} onChange={(e) => change("alt", e.target.value)} />
                    </div>

                    <div className="mt-auto flex flex-row gap-4">
                        <button className="bg-red-500 text-gray-200 rounded px-4 p-2 ml-auto" onClick={props.onClose}>
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-gray-200 rounded px-4 p-2" onClick={upload}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageUploadModal