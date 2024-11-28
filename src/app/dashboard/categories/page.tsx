'use client'
import { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper, Row } from '@tanstack/react-table';
import DashboardLayout from '../../../components/DashboardLayout';  // Assuming your layout component is here
import { Category, CategoryFormValues } from '@/types/types';
import { Button } from '@/components/ui/button';
import { createCategoryApiCall, deleteCategoryApiCall, updateCategoryApiCall, useGetCategories } from '@/utils/api';
import AddCategoryForm from '@/components/AddCategoryForm';
import DeleteModal from '@/components/DeleteModal';
import { MdDelete, MdEdit } from 'react-icons/md';
import { TbDots } from 'react-icons/tb';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoriesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<Partial<Category> | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number>();

    const toggleDropdown = (id: number) => {
        setSelectedId(id)
        setIsOpen((prev) => !prev); // Toggle state
    };
    // Close modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCategory(null);
    };

    const { data: categories, isLoading, refetch } = useGetCategories()

    // Handle form submission (create or update)
    const handleFormSubmit = async (data: CategoryFormValues) => {
        if (modalMode === 'create') {
            await createCategoryApiCall(data);
        } else {
            await updateCategoryApiCall(selectedCategory?.id as number, data);
        }
        handleCloseModal();
        refetch();
    };

    const handleEditClick = (info: Row<Category>) => {
        setSelectedCategory(info.original)
        setModalMode("edit")
        setModalOpen(true)
    };

    const handleDeleteClick = (info: Row<Category>) => {
        setSelectedCategory(info.original)
        setDeleteModalOpen(true)
    };


    const columnHelper = createColumnHelper<Category>();

    // Define columns for Categories table
    const categoryColumns = [
        columnHelper.accessor('name', {
            header: () => <span>Name</span>,
            cell: (info) => (info.getValue() ? info.getValue() : '-'),
            footer: (info) => info.column.id,
        }),

        columnHelper.accessor('description', {
            header: () => <span>Description</span>,
            cell: (info) => <p className='truncate'>{info.getValue() ? info.getValue() : '-'}</p>,
            footer: (info) => info.column.id,
        }),

        columnHelper.accessor('parentId', {
            header: () => <span>Parent Category</span>,
            cell: (info) => {
                const parentCategory = info.getValue() ? `Parent ID: ${info.getValue()}` : 'No Parent';
                return <span>{parentCategory}</span>;
            },
            footer: (info) => info.column.id,
        }),

        /*
                columnHelper.accessor('parentId', {
                    header: () => <span>Parent Category</span>,
                    cell: (info) => {
                        const parentCategory = (info.getValue() && selectedId === info.row.original.id) ? `Parent ID: ${parentCat} ` : 'No Parent';
                        return (
                            <>{parentCategory && (
                                <>
                                    <MdViewColumn className='cursor-pointer' onClick={() => setSelectedId(info.row.original.id)} />
                                    <span>{parentCategory}</span>
                                </>
                            )}
                            </>
                        );
                    },
                    footer: (info) => info.column.id,
                }),
        */
        columnHelper.accessor('id', {
            header: () => <span>Actions</span>,
            cell: (info) => (
                <>
                    <TbDots className='cursor-pointer' onClick={() => toggleDropdown(info.row.original.id)} />
                    {isOpen && selectedId === info.row.original.id && (
                        <div className="absolute right-12 py-2 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                            <button
                                onClick={() => handleEditClick(info.row)}
                                className="gap-x-2 flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
                            >
                                <MdEdit />   Edit
                            </button>
                            <button
                                onClick={() => handleDeleteClick(info.row)}
                                className="w-full gap-x-2 flex items-center px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                            >
                                <MdDelete /> Delete
                            </button>
                        </div>
                    )}
                </>),
            footer: (info) => info.column.id,
        }),
    ];

    // Create table instance
    const table = useReactTable({
        data: categories?.data || [],
        columns: categoryColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleDeleteConfirm = async () => {
        await deleteCategoryApiCall(selectedCategory?.id as number)
        refetch()
        setDeleteModalOpen(false);
        setSelectedCategory(null);
    };
    // Handling the loading and error states
    if (isLoading) return <div>Loading...</div>;

    return (
        <DashboardLayout>
            <ToastContainer position="top-right" />
            <div className='flex justify-between mx-2'>
                <h1 className="text-2xl font-semibold my-4">Categories</h1>
                <Button onClick={() => {
                    setModalMode("create")
                    setModalOpen(true)
                }}>Add Category</Button>
            </div>
            <div className="overflow-auto bg-white rounded-lg shadow">
                <table className="min-w-full text-left border-collapse">
                    <thead className="bg-gray-200">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-2 border-b">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-100">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-5 border-b">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && modalMode === "create" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
                        <AddCategoryForm
                            seModalOpen={setModalOpen}
                            mode='create'
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                </div>
            )}

            {isModalOpen && modalMode === "edit" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
                        <AddCategoryForm
                            mode='edit'
                            seModalOpen={setModalOpen}
                            defaultValues={selectedCategory || {}}
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <DeleteModal
                    onDelete={handleDeleteConfirm}
                    onCancel={() => setDeleteModalOpen(false)}
                />
            )}
        </DashboardLayout>
    );
};

export default CategoriesPage;
