import React, { useEffect, useState } from "react";
import { BsSave, BsTrash } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { ProductModel } from "wirless-lib/dist/domain/models/product.model";
import ImageSelect from "../../components/forms/image-select";
import TextInput from "../../components/forms/text-input";
import { CategoryModel } from "wirless-lib/dist/domain/models/category.model";
import CategorySelect from "../../components/forms/category-select";

function EditProductPage() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [product, setProduct] = useState<ProductModel>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUpdated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (id) load();
  }, []);

  const load = async () => {
    setLoading(true);
    const product = await fetch(`http://localhost:3000/product/${id}`).then(
      (data) => data.json()
    );
    setProduct(product);
    setLoading(false);
  };

  const change = (key: keyof ProductModel, value: any) => {
    setUpdated(true);
    const updatedProduct = { ...product, [key]: value } as ProductModel;
    setProduct(updatedProduct);
  };

  const CategorySelectComponent = (
    category: CategoryModel | undefined,
    setModalOpen: any
  ) => (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col w-full">
        <label htmlFor="longDescription">Category</label>
        <button
          className="rounded-lg bg-gray-200 border border-gray-300 text-gray-500 w-full p-4 py-2 text-left"
          onClick={(e) => setModalOpen(true)}
        >
          {category?.name || "Select an category..."}
        </button>
      </div>
    </div>
  );

  const save = async () => {
    const savedProduct = await fetch(
      `http://localhost:3000/product/${id ? id : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    )
      .then((data) => data.json())
      .then((data) => {
        navigate(`/products/edit/${data.id}`);
      });
    console.log(savedProduct);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div>
            <span className="text-lg font-medium text-gray-800">
              {id ? product?.name : "New product"}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {id ? product?.id : "New product"}
          </div>
        </div>

        <div className="flex items-center mt-4 gap-x-3 ml-auto">
          <button className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100">
            <BsTrash /> cancel
          </button>
          <button
            className="flex items-center justify-center px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600"
            onClick={save}
          >
            <BsSave /> Save
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-4 gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="name">Product title</label>
            <input
              id="name"
              type="text"
              className="rounded-lg bg-white border border-gray-300 w-full p-4 py-2"
              value={product?.name}
              onChange={(e) => change("name", e.target.value)}
            />
          </div>
        </div>

        <TextInput
          title="Slug"
          value={product?.slug}
          onChange={(v) => change("slug", v)}
          regex={/^[a-zA-Z0-9-\_]*$/}
        />

        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="sellingPrice">Selling Price</label>
            <input
              id="sellingPrice"
              type="number"
              className="rounded-lg bg-white border border-gray-300 w-full p-4 py-2"
              value={product?.sellingPrice}
              onChange={(e) => change("sellingPrice", e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="purchasePrice">Purchase price</label>
            <input
              id="purchasePrice"
              type="number"
              className="rounded-lg bg-white border border-gray-300 w-full p-4 py-2"
              value={product?.purchasePrice}
              onChange={(e) => change("purchasePrice", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="descriptionShort">Short Description</label>
            <textarea
              id="descriptionShort"
              rows={3}
              className="rounded-lg bg-white border border-gray-300 w-full p-4 py-2"
              value={product?.shortDescription}
              onChange={(e) => change("shortDescription", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="longDescription">Long description</label>
            <textarea
              id="longDescription"
              rows={8}
              className="rounded-lg bg-white border border-gray-300 w-full p-4 py-2"
              value={product?.longDescription}
              onChange={(e) => change("longDescription", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <ImageSelect
            value={product?.image}
            onChange={(v) => change("image", v)}
          />
        </div>

        <CategorySelect
          component={CategorySelectComponent}
          value={product?.category}
          onChange={(c) => change("category", c)}
        />
      </div>
    </div>
  );
}

export default EditProductPage;
