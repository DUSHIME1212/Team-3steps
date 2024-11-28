'use client'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from '@tanstack/react-table';
import DashboardLayout from '../../../components/DashboardLayout';
import { createUserApiCall, deleteUserApiCall, updateUserApiCall, useGetUsers } from '@/utils/api';
import { User, UserFormValues } from '@/types/types';
import { useState } from 'react';
import UserForm from '@/components/UserForm';
import DeleteModal from '@/components/DeleteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';

const UsersTable = () => {
    // State for managing modal visibility and selected user
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

    // Close modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };


    const { data: users, isLoading, refetch } = useGetUsers()

    // Handle form submission (create or update)
    const handleFormSubmit = async (data: UserFormValues) => {
        if (modalMode === 'create') {
            // Call API to create a new user
            await createUserApiCall(data); // Replace with your API call
        } else {
            // Call API to update existing user
            await updateUserApiCall(selectedUser?.id as number, data); // Replace with your API call
        }
        handleCloseModal(); // Close the modal
        refetch(); // Refresh the user data
    };

    const columnHelper = createColumnHelper<User>();
    // Define table columns
    const columns = [
        columnHelper.accessor('firstName', {
            header: () => <span>First name</span>,
            cell: (info) => (info.getValue() ? info.getValue() : '-'),
            footer: (info) => info.column.id,
        }),

        columnHelper.accessor('lastName', {
            header: () => <span>Last name</span>,
            cell: (info) => (info.getValue() ? info.getValue() : '-'),
            footer: (info) => info.column.id,
        }),

        columnHelper.accessor('email', {
            header: () => <span>Email</span>,
            cell: (info) => (info.getValue() ? info.getValue() : '-'),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('role', {
            header: () => <span>Role</span>,
            cell: (info) => (info.getValue() ? info.getValue() : '-'),
            footer: (info) => info.column.id,
        }),

        columnHelper.accessor('status', {
            header: () => <span>Role</span>,
            cell: (info) => (info.getValue() ? info.getValue() : '-'),
            footer: (info) => info.column.id,
        }),

        columnHelper.accessor('id', {
            header: () => <span>Actions</span>,
            cell: (info) => <div className="flex space-x-2">
                <button onClick={() => {
                    setSelectedUser(info.row.original)
                    setModalMode("edit")
                    setModalOpen(true)
                }} className="bg-indigo-700 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={() => {
                    setSelectedUser(info.row.original)
                    setDeleteModalOpen(true)
                }} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>,
            footer: (info) => info.column.id,
        }),
    ];
    // Create table instance
    const table = useReactTable({
        data: users?.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const handleDeleteConfirm = async () => {
        await deleteUserApiCall(selectedUser?.id as number)
        refetch()
        setDeleteModalOpen(false);
        setSelectedUser(null);
    };
    // Handling the loading and error states
    if (isLoading) return <div>Loading...</div>;

    return (
        <DashboardLayout>
            <ToastContainer position="top-right" />
            <div className='mt-4'>
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-semibold mb-4">Users</h1>
                    <Button onClick={() => {
                        setModalMode("create")
                        setModalOpen(true)
                    }}>Add User</Button>
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
                                        <td key={cell.id} className="px-4 py-5 border-b">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* User Form Modal */}
            {isModalOpen && modalMode === "create" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
                        <UserForm
                            seModalOpen={setModalOpen}
                            mode='create'
                            onSubmit={handleFormSubmit}
                        />
                        <button onClick={handleCloseModal} className="mt-4 w-full bg-gray-300 px-4 py-2 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && modalMode === "edit" && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
                        <UserForm
                            mode='edit'
                            seModalOpen={setModalOpen}
                            defaultValues={selectedUser || {}}
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

export default UsersTable;
