import React, { useEffect, useState } from "react";
import { BsTrash, BsSave } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { SeriesModel } from "wirless-lib/dist/domain/models/series.model";
import TextInput from "../../components/forms/text-input";
import ImageSelect from "../../components/forms/image-select";
import { SkinModel } from "wirless-lib/dist/domain/models/skin.model";
import AsyncSelect from "../../components/forms/search-select";
import SearchableSelect from "../../components/forms/search-select";
import { Paginated } from "wirless-lib/dist/domain/helper/paginated";
import { DeviceModel } from "wirless-lib/dist/domain/models/device.model";
import { UserModel } from "wirless-lib/dist/domain/models/user.model";

function EditUserPage() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState<UserModel>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isUpdated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    if (id) load();
  }, []);

  const load = async () => {
    setLoading(true);
    const product = await fetch(`http://localhost:3000/user/${id}`).then(
      (data) => data.json()
    );
    setUser(product);
    setLoading(false);
  };

  const change = (key: keyof UserModel, value: any) => {
    setUpdated(true);
    const updatedSkin = { ...user, [key]: value } as UserModel;
    setUser(updatedSkin);
  };

  const save = async () => {
    const savedProduct = await fetch(
      `http://localhost:3000/user/${id ? id : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((data) => data.json())
      .then((data) => {
        navigate(`/users/edit/${data.id}`);
      });
    console.log(savedProduct);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div>
            <span className="text-lg font-medium text-gray-800">
              {id ? `${user?.firstName} ${user?.lastName}` : "New user"}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {id ? `${user?.firstName} ${user?.lastName}` : "New User"}
          </div>
        </div>

        <div className="flex items-center mt-4 gap-x-3 ml-auto">
          <button className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100">
            <AiFillLock /> Forgot password
          </button>
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
          <TextInput
            title="First name"
            value={user?.firstName}
            onChange={(v) => change("firstName", v)}
          />
          <TextInput
            title="Last name"
            value={user?.lastName}
            onChange={(v) => change("lastName", v)}
          />
        </div>
        <div className="flex flex-row gap-4">
          <TextInput
            title="Email"
            value={user?.email}
            onChange={(v) => change("email", v)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditUserPage;
