import React, { useEffect, useState } from "react";
import { BsTrash, BsSave } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { DeviceModel } from "wirless-lib/dist/domain/models/device.model";
import TextInput from "../../components/forms/text-input";
import ImageSelect from "../../components/forms/image-select";
import Select from "../../components/forms/select";
import { SeriesModel } from "wirless-lib/dist/domain/models/series.model";
import { BrandModel } from "wirless-lib/dist/domain/models/brand.model";
import { Paginated } from "wirless-lib/dist/domain/helper/paginated";

function EditDevicePage() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [device, setDevice] = useState<DeviceModel>();
  const [brands, setBrands] = useState<Paginated<BrandModel>>();
  const [series, setSeries] = useState<Paginated<SeriesModel>>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUpdated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (id) load();
    loadBrands();
    loadSeries();
  }, []);

  const loadBrands = async () => {
    const brands = await fetch(
      `http://localhost:3000/brand?page=1&itemsPerPage=10`
    ).then((data) => data.json());
    setBrands(brands);
  };

  const loadSeries = async () => {
    const series = await fetch(
      `http://localhost:3000/series?page=1&itemsPerPage=10`
    ).then((data) => data.json());
    setSeries(series);
  };

  const load = async () => {
    setLoading(true);
    const product = await fetch(`http://localhost:3000/device/${id}`).then(
      (data) => data.json()
    );
    setDevice(product);
    setLoading(false);
  };

  const change = (key: keyof DeviceModel, value: any) => {
    setUpdated(true);
    const updatedProduct = { ...device, [key]: value } as DeviceModel;
    setDevice(updatedProduct);
  };

  const save = async () => {
    const savedProduct = await fetch(
      `http://localhost:3000/device/${id ? id : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(device),
      }
    )
      .then((data) => data.json())
      .then((data) => {
        navigate(`/devices/edit/${data.id}`);
      });
    console.log(savedProduct);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div>
            <span className="text-lg font-medium text-gray-800">
              {id ? device?.name : "New product"}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {id ? device?.id : "New device"}
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
            <label htmlFor="name">Title</label>
            <input
              id="name"
              type="text"
              className="rounded-lg bg-white border border-gray-300 w-full p-4 py-2"
              value={device?.name}
              onChange={(e) => change("name", e.target.value)}
            />
          </div>
        </div>

        <TextInput
          title="Slug"
          value={device?.slug}
          onChange={(v) => change("slug", v)}
          regex={/^[a-zA-Z0-9-\_]*$/}
        />

        {series && (
          <div className="flex flex-col w-full">
            <label htmlFor="series">Series</label>
            <Select
              value={device?.series?.id}
              onChange={(id) => change("series", { id })}
              options={series.data.map((s) => {
                return { title: s.name, value: s.id };
              })}
            />
          </div>
        )}

        {brands && (
          <div className="flex flex-col w-full">
            <label htmlFor="series">Brand</label>
            <Select
              value={device?.brand?.id}
              onChange={(id) => change("brand", { id })}
              options={brands.data.map((s) => {
                return { title: s.name, value: s.id };
              })}
            />
          </div>
        )}

        <div className="flex flex-row gap-4">
          <ImageSelect
            value={device?.image}
            onChange={(v) => change("image", v)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditDevicePage;
