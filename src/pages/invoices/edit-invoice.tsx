import React, { useEffect, useState } from "react";
import { BsTrash, BsSave } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { SeriesModel } from "wirless-lib/dist/domain/models/series.model";
import TextInput from "../../components/forms/text-input";
import ImageSelect from "../../components/forms/image-select";
import { SkinModel } from "wirless-lib/dist/domain/models/skin.model";
import AsyncSelect from "../../components/forms/search-select";
import SearchableSelect from "../../components/forms/search-select";
import { Paginated } from "wirless-lib/dist/domain/helper/paginated";
import { DeviceModel } from "wirless-lib/dist/domain/models/device.model";

function EditSkinPage() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [series, setSeries] = useState<SkinModel>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUpdated, setUpdated] = useState<boolean>(false);

  const loadDevices = async (search: string) =>
    await fetch(
      `http://localhost:3000/device?search=${search}&page=1&itemsPerPage=5`
    ).then((data) => data.json());

  useEffect(() => {
    if (id) load();
  }, []);

  const load = async () => {
    setLoading(true);
    const product = await fetch(`http://localhost:3000/skin/${id}`).then(
      (data) => data.json()
    );
    setSeries(product);
    setLoading(false);
  };

  const change = (key: keyof SkinModel, value: any) => {
    setUpdated(true);
    const updatedSkin = { ...series, [key]: value } as SkinModel;
    setSeries(updatedSkin);
  };

  const save = async () => {
    const savedProduct = await fetch(
      `http://localhost:3000/skin/${id ? id : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(series),
      }
    )
      .then((data) => data.json())
      .then((data) => {
        navigate(`/skins/edit/${data.id}`);
      });
    console.log(savedProduct);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div>
            <span className="text-lg font-medium text-gray-800">
              {id ? series?.name : "New product"}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {id ? series?.id : "New series"}
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
              value={series?.name}
              onChange={(e) => change("name", e.target.value)}
            />
          </div>
        </div>

        <TextInput
          title="Slug"
          value={series?.slug}
          onChange={(v) => change("slug", v)}
          regex={/^[a-zA-Z0-9-\_]*$/}
        />

        <div className="flex flex-row gap-4">
          <ImageSelect
            value={series?.image}
            onChange={(v) => change("image", v)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label>Device</label>
          <SearchableSelect
            value={series?.device}
            onChange={(v) => change("device", v)}
            itemKey="name"
            load={loadDevices}
            component={(item: DeviceModel) => (
              <div className="flex flex-row p-2 hover:bg-blue-500 items-center gap-2">
                <img
                  src={item.image?.url}
                  alt={item.image?.alt}
                  className="w-8 h-8"
                />
                <div className="flex flex-col flex-1">
                  <span className="h-4">{item.name}</span>
                  <span className="font-light text-gray-500 h-4">{item.slug}</span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default EditSkinPage;
