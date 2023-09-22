import { stringify } from "querystring";
import React, { useState } from "react";
import { BsChevronDown, BsChevronUp, BsX } from "react-icons/bs";

type SelectProps = {
  nullable?: boolean;
  options: Array<SelectOption>;
  placeholder?: string;
  value?: any;
  prepend?: string;
  append?: string;
  onChange?: (value: string) => any;
};

type SelectOption = {
  value: string;
  title: string;
};

function Select(props: SelectProps) {
  const [isOpen, setOpen] = useState(false);

  const [value, setValue] = useState<string>(`${props.value}`);

  const select = (value: string) => {
    setValue(value);
    setOpen(false);
    if (props.onChange) props.onChange(value);
  };

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full">
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded-lg min-w-[12rem]">
          <div className="flex flex-auto flex-wrap"></div>
          <div
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800 pr-6"
            onClick={() => setOpen(true)}
          >
            <span className="text-gray-500">{props.prepend}</span>
            <span className="mx-1">
              {props.options.find((o) => o.value == value)?.title ||
                props.placeholder ||
                "Select an option..."}
            </span>
            <span className="text-gray-500">{props.append}</span>
          </div>
          {props.nullable && (
            <div>
              <button className="cursor-pointer w-6 h-full flex items-center text-gray-400 outline-none focus:outline-none">
                <BsX />
              </button>
            </div>
          )}
          <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
            <button
              className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
              onClick={() => setOpen(!isOpen)}
            >
              {isOpen ? <BsChevronUp /> : <BsChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto mt-14">
          <div className="flex flex-col w-full">
            {props.options.map((o) => (
              <div
                className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-teal-100"
                onClick={() => select(o.value)}
              >
                <div
                  className={`flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-blue-500 hover:text-teal-100 hover:border-blue-500 ${
                    o.value === value ? "border-blue-500" : ""
                  }`}
                >
                  <div className="w-full items-center flex">
                    <div className="mx-2 leading-6">{o.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
