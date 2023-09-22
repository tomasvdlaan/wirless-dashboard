import React, { useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import { Brand } from '../../lib/entities/brand.entity';
import { Paginated } from '../../lib/models/page.dto';
import { ColumnDefinitionType, TableOptions } from '../../components/table/Table.dto';


const columns: ColumnDefinitionType<Brand, keyof Brand>[] = [
  { key: "name", header: "title" },
];

const tableOptions: TableOptions = {
  editHref: "/brands/edit/{id}",
};

function BrandsOverviewPage() {

  const [result, setResult] = useState<Paginated<Brand>>();

  useEffect(() => {
    fetch("http://localhost:3000/brand?page=1&itemsPerPage=10")
      .then((data) => data.json())
      .then((data) => setResult(data));
  }, []);

  return (<>
    <ul className="border-t border-b border-gray-200 px-4 p-2 w-full bg-white flex flex-row gap-8">
      <li>Brands</li>
      <li>Series</li>
      <li>Devices</li>
      <li className="ml-auto text-gray-500">
        Devices / Brands / Overview
      </li>
    </ul>
    <div className="p4">
      <Table options={tableOptions} columns={columns} data={result} />
    </div>
  </>
  )
}

export default BrandsOverviewPage