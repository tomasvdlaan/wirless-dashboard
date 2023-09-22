import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function AddNewBrandPage() {
    const [title, setTitle] = useState("");
    let { id } = useParams();


    const Update = () => {
        fetch(`http://localhost:3000/brand/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: title
            })
        })
            .then((data) => data.json())
            .then((data) => console.log(data));
    }

    const Save = () => {
        fetch("http://localhost:3000/brand", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: title
            })
        })
            .then((data) => data.json())
            .then((data) => console.log(data));
    }

    return (
        <div className='p-4 flex flex-col gap-4'>
            <span className="text-4xl">{id ? "New Brand" : `Edit ${title}`}</span>
            <div className="bg-white p-4 flex flex-col rounded gap-4">
                <div className="flex flex-col gap-2">
                    <span>Brand Title</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} className='border border-gray-200 rounded p-4' placeholder='Brand Title' />
                </div>
                <div className="flex flex-row gap-4">
                    {id ? (
                        <button className="rounded bg-sky-500 p-2 px-4 text-white font-bold" onClick={Update}>Update</button>
                        ) : (
                        <button className="rounded bg-emerald-500 p-2 px-4 text-white font-bold" onClick={Save}>Save</button>
                        )}
                    <button className="rounded bg-rose-500 p-2 px-4 text-white font-bold">Discard</button>
                </div>
            </div>
        </div>
    )
}

export default AddNewBrandPage