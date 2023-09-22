import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp, BsX } from "react-icons/bs";
import { Paginated } from "wirless-lib/dist/domain/helper/paginated";

type SelectProps<T extends { id: string }, K extends keyof T> = {
  placeholder?: string;
  value?: any;
  onChange?: (value: T) => any;
  component?: (item: T) => any;
  load: (search: string) => Promise<Paginated<T>>;
  itemKey: K;
};

function SearchableSelect<T extends { id: string }, K extends keyof T>(
  props: SelectProps<T, K>
) {
  const [isOpen, setOpen] = useState(false);

  const [value, setValue] = useState<T>(props.value);
  const [items, setItems] = useState<Paginated<T>>();

  const select = (value: T) => {
    setValue(value);
    setOpen(false);
    if (props.onChange) props.onChange(value);
  };

  useEffect(() => {
    load();
    setValue(props.value)
  }, [props.value]);

  const load = async (search: string = "") =>
    setItems(await props.load(search));

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full">
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded-lg min-w-[12rem]">
          <div className="flex flex-auto flex-wrap"></div>
          <div
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800 pr-6"
            onClick={() => setOpen(true)}
          >
            {value
              ? `${value[props.itemKey]}`
              : props.placeholder || "Select an option..."}
          </div>
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
        <div className="absolute shadow top-100 z-40 w-full lef-0 rounded max-h-select overflow-y-auto mt-14 bg-white">
          <div className="flex flex-col w-full">
            <div className="p-2">
              <input
                className="w-full p-2 rounded-lg bg-white border border-gray-200"
                onChange={(e) => load(e.target.value)}
              />
            </div>
            {items?.data.map((item) =>
              props.component ? (
                <div onClick={() => select(item)}>
                  {props.component?.(item)}
                </div>
              ) : (
                <div
                  className="p-2 hover:bg-blue-50"
                  onClick={() => select(item)}
                >
                  {item.id}
                </div>
              )
            )}
            {/* {props.options.map((o) => (
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
            ))} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;
