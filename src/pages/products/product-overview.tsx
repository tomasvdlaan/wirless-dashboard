import React from 'react'
import PaginatedTable, { ColumnDefinitionType } from './paginated-table'
import { ProductModel } from 'wirless-lib/dist/domain/models/product.model'
import { Paginated } from 'wirless-lib/dist/domain/helper/paginated'
import { useNavigate } from 'react-router-dom'
import CategorySelect from '../../components/forms/category-select'


const TableTitleView = (item: ProductModel) => (
    <div className="flex flex-row gap-4 items-center">
        <img src={item.image?.url} className='h-12 w-12 object-cover' />
        <div className='flex flex-col'>
            <div className='font-medium text-black'>{item.name}</div>
            <div className="text-sm text-gray-500">{item.slug}</div>
        </div>
    </div>
)

const columns: ColumnDefinitionType<ProductModel, keyof ProductModel>[] = [
    { key: "name", header: "Title", editable: false, customView: TableTitleView },
    { key: "sellingPrice", header: "Price", editable: false, customView: (item: ProductModel) => `€${item.sellingPrice}` },
];

function ProductOVerviewPage() {
    const navigate = useNavigate();

    const load = async (page: number, itemsPerPage: number): Promise<Paginated<ProductModel>> =>
        fetch(`http://localhost:3000/product?page=${page}&itemsPerPage=${itemsPerPage}`)
            .then((data) => data.json())
            .then((data) => new Paginated(data.data, { page: data.page, itemsPerPage: data.itemsPerPage }, data.itemCount))

    const onDelete = (id: string) => {
        fetch(`http://localhost:3000/product/${id}?hardDelete=false`, { method: "DELETE" })
            .then((data) => console.log(data.json()))
    }

    return (
        <>
            <ul className="flex flex-row gap-4 px-4 p-2 bg-white border-t border-b border-gray-300">
                <li><a href="/products" className='text-blue-500'>Products</a></li>
                <li><a href="/categories" className='text-blue-500'>Categories</a></li>
            </ul>
            <PaginatedTable load={load} columns={columns} onEdit={(id: string) => navigate(`/products/edit/${id}`)} onDelete={onDelete} onNew={() => navigate("/products/add")} filters={<CategorySelect/>} />
        </>
    )
}

export default ProductOVerviewPage