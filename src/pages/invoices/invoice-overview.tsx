import React from "react";
import PaginatedTable, {
  ColumnDefinitionType,
} from "../products/paginated-table";
import { Paginated } from "wirless-lib/dist/domain/helper/paginated";
import { SeriesModel } from "wirless-lib/dist/domain/models/series.model";
import { useNavigate } from "react-router-dom";
import { SkinModel } from "wirless-lib/dist/domain/models/skin.model";

const TableTitleView = (item: SkinModel) => (
  <div className="flex flex-row gap-4 items-center">
    <img src={item.image?.url} className="h-12 w-12 object-cover" />
    <div className="flex flex-col">
      <div className="font-medium text-black">{item.name}</div>
      <div className="text-sm text-gray-500">{item.slug}</div>
    </div>
  </div>
);

const columns: ColumnDefinitionType<SkinModel, keyof SkinModel>[] = [
  { key: "name", header: "Title", editable: false, customView: TableTitleView },
  {
    key: "device",
    header: "Device",
    editable: false,
    customView: (item) => item.device.name,
  },
];

function SkinOverviewPage() {
  const navigate = useNavigate();

  const load = async (
    page: number,
    itemsPerPage: number
  ): Promise<Paginated<SkinModel>> =>
    fetch(
      `http://localhost:3000/skin?page=${page}&itemsPerPage=${itemsPerPage}`
    )
      .then((data) => data.json())
      .then(
        (data) =>
          new Paginated(
            data.data,
            { page: data.page, itemsPerPage: data.itemsPerPage },
            data.itemCount
          )
      );

  return (
    <PaginatedTable
      columns={columns}
      load={load}
      options={{ title: "Skins" }}
      onEdit={(id: string) => navigate(`/skins/edit/${id}`)}
      onNew={() => navigate("/skins/add")}
    />
  );
}

export default SkinOverviewPage;
