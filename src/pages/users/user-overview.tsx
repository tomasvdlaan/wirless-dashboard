import React from "react";
import PaginatedTable, {
  ColumnDefinitionType,
} from "../products/paginated-table";
import { Paginated } from "wirless-lib/dist/domain/helper/paginated";
import { SeriesModel } from "wirless-lib/dist/domain/models/series.model";
import { useNavigate } from "react-router-dom";
import { UserModel } from "wirless-lib/dist/domain/models/user.model";

const columns: ColumnDefinitionType<UserModel, keyof UserModel>[] = [
  {
    key: "firstName",
    header: "Name",
    editable: false,
    customView: (item) => `${item.firstName} ${item.lastName}`,
  },
  {
    key: "email",
    header: "E-mail address",
    editable: false,
  },
  {
    key: "createDateTime",
    header: "Created at",
    editable: false,
  },
];

function UserOverviewPage() {
  const navigate = useNavigate();

  const load = async (
    page: number,
    itemsPerPage: number
  ): Promise<Paginated<UserModel>> =>
    fetch(
      `http://localhost:3000/user?page=${page}&itemsPerPage=${itemsPerPage}`
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

  const deleteUser = (id: string) =>
    fetch(`http://localhost:3000/user/${id}`, { method: "DELETE" })
      .then(() => navigate("/users/overview"))

  return (
    <PaginatedTable
      columns={columns}
      load={load}
      options={{ title: "Users" }}
      onEdit={(id: string) => navigate(`/users/edit/${id}`)}
      onNew={() => navigate("/users/add")}
      onDelete={deleteUser}
    />
  );
}

export default UserOverviewPage;
