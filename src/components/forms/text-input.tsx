import React, { useState } from 'react'

type TextInputProps = {
    onChange?: (value: string) => any;
    value?: string;
    title: string;
    placeholder?: string;
    id?: string;
    regex?: RegExp;
}

function TextInput(props: TextInputProps) {
    const [isRegexvalid, setRegexValid] = useState(true)

    const onChange = (e: any) => {
        if (props.regex) setRegexValid(props.regex?.test(e.target.value));
        props.onChange?.(e.target.value)
        return true;
    }

    return (
        <div className="flex flex-col w-full">
            <label htmlFor={props.id}>{props.title}</label>
            <input id={props.id} type="text" className={`rounded-lg bg-white border w-full p-4 py-2 ${isRegexvalid ? "border-gray-300" : "border-red-500 outline-red-500"}`} value={props.value} onChange={onChange} />

            {!isRegexvalid && (
                <div className='font-light italic gap-1 flex flex-row'>
                    <span className="text-red-500">Invalid regular expression</span>
                    <span className="text-gray-400">{`${props.regex}`}</span>
                </div>
            )}
        </div>
    )
}

export default TextInput