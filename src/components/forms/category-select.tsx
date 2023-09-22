import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaEdit,
  FaPlus,
  FaTimes,
  FaTrash,
  FaTrashAlt,
} from "react-icons/fa";
import { CategoryModel } from "wirless-lib/dist/domain/models/product-category.model";
import TextInput from "./text-input";
import { BsTrash, BsSave } from "react-icons/bs";

type CategorySelectProps = {
  onChange?: (value: CategoryModel) => any;
  value?: CategoryModel;
  component?: (category: CategoryModel | undefined, setModalOpen: any) => any;
};

function CategorySelect(props: CategorySelectProps) {
  const [categories, setCategories] = useState<Array<CategoryModel>>([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [categoryToUpload, setCategoryToUpload] = useState<
    Partial<CategoryModel> | undefined
  >();

  const [selectedCategory, setCategory] = useState<CategoryModel | undefined>(props.value);

  const select = (category: CategoryModel) => {
    props.onChange?.(category);
    setCategory(category);
    setModalOpen(false);
  };

  const newCategory: Partial<CategoryModel> = {
    name: "",
    slug: "",
  };

  const save = async () => {
    if (!categoryToUpload) return;
    const savedCategory = await fetch(
      `http://localhost:3000/category/${categoryToUpload.id || ""}`,
      {
        method: categoryToUpload.id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryToUpload),
      }
    ).then((data) => data.json());
  };

  const deleteCategory = (id: string) => {
    fetch(`http://localhost:3000/category/${id}`, {
      method: "DELETE",
      body: JSON.stringify(categoryToUpload),
    }).then((data) => data.json());
  };

  useEffect(() => {
    load();
    setCategory(props.value)
  }, [props.value]);

  const load = async () => {
    setLoading(true);
    const categories = await fetch(`http://localhost:3000/category`).then(
      (data) => data.json()
    );
    setCategories(categories);
    console.log(categories);
    setLoading(false);
  };

  const CategoryComponent = (category: CategoryModel) => (
    <div className="flex flex-col" key={category.id}>
      <div className="flex flex-row items-center hover:bg-blue-100 gap-2">
        <span>{category.name}</span>
        <span
          className="ml-auto text-blue-300"
          onClick={() => select(category)}
        >
          <FaCheck />
        </span>
        <span
          className="text-gray-300"
          onClick={() =>
            setCategoryToUpload({ ...newCategory, parent: category })
          }
        >
          <FaPlus />
        </span>
        <span
          className="text-gray-300"
          onClick={() => setCategoryToUpload(category)}
        >
          <FaEdit />
        </span>
        <span
          className="text-gray-300"
          onClick={() => deleteCategory(category.id)}
        >
          <FaTrash />
        </span>
      </div>
      <div className="pl-4">
        {category.children?.map((child) => CategoryComponent(child))}
      </div>
    </div>
  );

  return (
    <>
      {props.component?.(selectedCategory, setModalOpen) || (
        <button
          className="px-4 p-2 bg-white border border-gray-300 rounded-lg text-gray-500"
          onClick={() => setModalOpen(true)}
        >
          {selectedCategory?.name || "Select an category"}
        </button>
      )}
      {isModalOpen && (
        <>
          <div className="w-screen h-screen bg-black/25 fixed inset-0 flex items-center justify-center">
            <div className="rounded-xl bg-white p-4 flex flex-col w-1/2">
              <div className="flex flex-row gap-4 justify-center items-center w-full mb-4">
                <span className="text-lg">Categories</span>

                <div
                  className="rounded-lg w-10 h-10 flex justify-center items-center bg-blue-500 ml-auto text-white"
                  onClick={() => setCategoryToUpload({ ...newCategory })}
                >
                  <FaPlus />
                </div>

                <div className="rounded-lg w-10 h-10 flex justify-center items-center bg-blue-500 text-white">
                  <FaCheck />
                </div>

                <div className="rounded-lg w-10 h-10 flex justify-center items-center bg-red-500 text-white">
                  <FaTimes />
                </div>
              </div>
              {categories.map((cat) => CategoryComponent(cat))}
            </div>
          </div>

          {categoryToUpload && (
            <div className="fixed z-10 inset-0 bg-black/25 flex justify-center items-center">
              <div className="bg-white rounded-lg w-1/4 p-4 flex flex-col gap-4">
                <div>
                  <span className="font-bold">New category</span>
                  <hr />
                </div>
                <TextInput
                  title="Title"
                  value={categoryToUpload.name}
                  onChange={(v) =>
                    setCategoryToUpload({ ...categoryToUpload!, name: v })
                  }
                />

                <TextInput
                  title="Slug"
                  value={categoryToUpload?.slug}
                  onChange={(v) =>
                    setCategoryToUpload({ ...categoryToUpload!, slug: v })
                  }
                  regex={/^[a-zA-Z0-9-\_]*$/}
                />

                <div className="flex flex-row gap-4">
                  <button
                    className="flex-1 flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100"
                    onClick={() => setCategoryToUpload(undefined)}
                  >
                    <BsTrash /> Cancel
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600"
                    onClick={save}
                  >
                    <BsSave /> Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CategorySelect;
