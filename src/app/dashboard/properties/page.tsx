'use client'
import { useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, Row, createColumnHelper } from '@tanstack/react-table';
import DashboardLayout from '../../../components/DashboardLayout';
import { PropertyFormValues, PropertyPost } from '@/types/types';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import PropertyPostForm from '@/components/AddPropertyPost';
import { createPropertyApiCall, deletePropertyApiCall, updatePropertyApiCall, useGetProperties } from '@/utils/api';
import { TbDots } from 'react-icons/tb';
import { MdDelete, MdEdit } from 'react-icons/md';
import DeleteModal from '@/components/DeleteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertiesPage = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number>();
    const [selectedProperty, setSelectedProperty] = useState<Partial<PropertyPost> | null>(null);

    const toggleDropdown = (id: number) => {
        setSelectedId(id)
        setIsOpen((prev) => !prev); // Toggle state
    };

    const { data: properties, isLoading: isPropertiesLoading, refetch } = useGetProperties()
    // Close modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedProperty(null);
    };

    // Handle form submission (create or update)
    const handleFormSubmit = async (data: PropertyFormValues) => {
        if (modalMode === 'create') {
            // Call API to create a new user
            await createPropertyApiCall(data); // Replace with your API call
        } else {
            // Call API to update existing user
            await updatePropertyApiCall(selectedProperty?.id as number, data); // Replace with your API call
        }
        handleCloseModal(); // Close the modal
        refetch(); // Refresh the user data
    };

    const handleDeleteConfirm = async () => {
        await deletePropertyApiCall(selectedProperty?.id as number)
        refetch()
        setIsDeleteModalOpen(false);
        setSelectedProperty(null);
    };

    const handleEditClick = (info: Row<PropertyPost>) => {
        setSelectedProperty(info.original)
        setModalMode("edit")
        setModalOpen(true)
    };

    const handleDeleteClick = (info: Row<PropertyPost>) => {
        setSelectedProperty(info.original)
        setIsDeleteModalOpen(true)
    };


    const columnHelper = createColumnHelper<PropertyPost>();

    const propertyColumns = [
        columnHelper.accessor('title', {
            header: () => <span>Title</span>,
            cell: (info) => (info.getValue() ? info.getValue() : '-'),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('description', {
            header: () => <span>Title</span>,
            cell: (info) => <p className='truncate'> {info.getValue() ? info.getValue() : '-'}</p>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('price', {
            header: () => <span>Price</span>,
            cell: (info) => <p className='truncate'> {info.getValue() ? info.getValue() : '-'}</p>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('paymentStatus', {
            header: () => <span>Payment Status</span>,
            cell: (info) => <p className='truncate'> {info.getValue() ? info.getValue() : '-'}</p>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('approvalStatus', {
            header: () => <span>Approval Status</span>,
            cell: (info) => <p className='truncate'> {info.getValue() ? info.getValue() : '-'}</p>,
            footer: (info) => info.column.id,
        }),
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

    ]

    const table = useReactTable({
        data: properties?.data || [],
        columns: propertyColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isPropertiesLoading) {
        return <div>Loading...</div>
    }
    return (
        <DashboardLayout>
            <ToastContainer position="top-right" />
            <div className='flex justify-between'>
                <h1 className="text-2xl font-semibold mb-4">Properties</h1>
                <Button onClick={() => {
                    setModalMode('create')
                    setModalOpen(true)
                }}>Add New Property</Button>
            </div>
            <div className="overflow-auto bg-white rounded-lg shadow p-6">
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
                                    <td key={cell.id} className="px-4 py-2 border-b">
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
                        <PropertyPostForm
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
                        <PropertyPostForm
                            mode='edit'
                            seModalOpen={setModalOpen}
                            defaultValues={selectedProperty || {}}
                            onSubmit={handleFormSubmit}
                        />
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <DeleteModal
                    onDelete={handleDeleteConfirm}
                    onCancel={() => setIsDeleteModalOpen(false)}
                />
            )}
        </DashboardLayout>
    );
};

export default PropertiesPage;
