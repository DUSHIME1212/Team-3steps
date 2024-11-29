'use client'
import { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender, Row } from '@tanstack/react-table';
import DashboardLayout from '../../../components/DashboardLayout';  // Assuming your layout component is here
import axios from 'axios';
import { ApprovalStatus, Currency, ListingType, PaymentStatus, PropertyCondition, PropertyFormValues, PropertyPost, propertyPostSchema } from '@/types/types';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import PropertyPostForm from '@/components/AddPropertyPost';
import { createPropertyApiCall, updatePropertyApiCall } from '@/utils/api';

const PropertiesPage = () => {
    const [propertyToDelete, setPropertyToDelete] = useState<PropertyPost | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Partial<PropertyPost> | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    // Close modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
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

    // Initialize react-hook-form with Zod schema validation
    const { control, handleSubmit, formState: { errors }, reset } = useForm<PropertyPost>({
        resolver: zodResolver(propertyPostSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            published: false,
            paymentStatus: PaymentStatus.PENDING,
            approvalStatus: ApprovalStatus.PENDING,
            listingType: ListingType.SALE,
            propertyCondition: PropertyCondition.NEW,
            currency: Currency.RWF,
            authorId: 1,
            categories: [],
            attachments: [],
        },
    });

    // Handle delete property
    const handleDeleteProperty = (property: Row<PropertyPost>) => {
        setPropertyToDelete(property.original);
        setIsDeleteModalOpen(true);
    };

    const handleEditClick = (info: Row<User>) => {
        setSelectedProperty(info.original)
        setModalMode("edit")
        setModalOpen(true)
    };

    const handleDeleteClick = (info: Row<User>) => {
        setSelectedProperty(info.original)
        setDeleteModalOpen(true)
    };

    // Define columns for Properties table
    const propertyColumns: ColumnDef<PropertyPost>[] = [
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'price',
            header: 'Price',
        },
        {
            accessorKey: 'paymentStatus',
            header: 'Payment Status',
        },
        {
            accessorKey: 'approvalStatus',
            header: 'Approval Status',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEditProperty(row)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                    <button onClick={() => handleDeleteProperty(row)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: properties,
        columns: propertyColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <DashboardLayout>
            <div className='flex justify-between'>
                <h1 className="text-2xl font-semibold mb-4">Properties</h1>
                <Button onClick={() => {
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
            {/* Create Property Modal */}
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

            {/* Edit Property Modal */}
            {isEditModalOpen && propertyToEdit && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Property</h2>
                        <form onSubmit={handleSubmit(handleSaveEdit)}>
                            {/* Title Field */}
                            <div className="mb-4">
                                <label className="block mb-2">Title</label>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={propertyToEdit.title}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full mb-4 p-2 border rounded"
                                            placeholder="Property Title"
                                        />
                                    )}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            {/* Description Field */}
                            <div className="mb-4">
                                <label className="block mb-2">Description</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue={propertyToEdit.description}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            className="w-full mb-4 p-2 border rounded"
                                            placeholder="Description"
                                        />
                                    )}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>



                            {/* Price Field */}
                            <div className="mb-4">
                                <label className="block mb-2">Price</label>
                                <Controller
                                    name="price"
                                    control={control}
                                    defaultValue={propertyToEdit.price}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="number"
                                            className="w-full mb-4 p-2 border rounded"
                                            placeholder="Price"
                                        />
                                    )}
                                />
                                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                            </div>

                            {/* Other fields for paymentStatus, approvalStatus, etc. can be added similarly */}

                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Property Modal */}
            {isDeleteModalOpen && propertyToDelete && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this property?</h2>
                        <p>{propertyToDelete.title}</p>
                        <div className="flex space-x-2 mt-4">
                            <button onClick={handleDeleteConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            <button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default PropertiesPage;
