import React from "react";
import PaginatedTable, {
  ColumnDefinitionType,
} from "../products/paginated-table";
import { Paginated } from "wirless-lib/dist/domain/helper/paginated";
import { SeriesModel } from "wirless-lib/dist/domain/models/series.model";
import { useNavigate } from "react-router-dom";

const TableTitleView = (item: SeriesModel) => (
  <div className="flex flex-row gap-4 items-center">
    <img src={item.image?.url} className="h-12 w-12 object-cover" />
    <div className="flex flex-col">
      <div className="font-medium text-black">{item.name}</div>
      <div className="text-sm text-gray-500">{item.slug}</div>
    </div>
  </div>
);

const columns: ColumnDefinitionType<SeriesModel, keyof SeriesModel>[] = [
  { key: "name", header: "Title", editable: false, customView: TableTitleView },
  {
    key: "brand",
    header: "Brand",
    editable: false,
    customView: (item) => item.brand.name,
  },
];

function SeriesOverviewPage() {
  const navigate = useNavigate();

  const load = async (
    page: number,
    itemsPerPage: number
  ): Promise<Paginated<SeriesModel>> =>
    fetch(
      `http://localhost:3000/series?page=${page}&itemsPerPage=${itemsPerPage}`
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
      options={{ title: "Series" }}
      onEdit={(id: string) => navigate(`/series/edit/${id}`)}
      onNew={() => navigate("/series/add")}
    />
  );
}

export default SeriesOverviewPage;
