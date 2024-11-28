'use client'
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper, Row } from '@tanstack/react-table';
import DashboardLayout from '../../../components/DashboardLayout';
import { createUserApiCall, deleteUserApiCall, updateUserApiCall, useGetUsers } from '@/utils/api';
import { User, UserFormValues } from '@/types/types';
import { useState } from 'react';
import UserForm from '@/components/UserForm';
import DeleteModal from '@/components/DeleteModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { TbDots } from 'react-icons/tb';
import { MdDelete, MdEdit } from 'react-icons/md';

const UsersTable = () => {
    // State for managing modal visibility and selected user
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number>();

    const toggleDropdown = (id: number) => {
        setSelectedId(id)
        setIsOpen((prev) => !prev); // Toggle state
    };

    // Close modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedUser(null);
    };

    const { data: users, isLoading, refetch } = useGetUsers()

    // Handle form submission (create or update)
    const handleFormSubmit = async (data: UserFormValues) => {
        const birthDate = new Date(data.birthDate);
        const formattedBirthDate = birthDate.toISOString();
        const formattedData = {
            ...data,
            birthDate: formattedBirthDate,
        };
        console.log('hereee: ', formattedData);

        if (modalMode === 'create') {
            // Call API to create a new user
            await createUserApiCall(formattedData); // Replace with your API call
        } else {
            // Call API to update existing user
            await updateUserApiCall(selectedUser?.id as number, formattedData); // Replace with your API call
        }
        handleCloseModal(); // Close the modal
        refetch(); // Refresh the user data
    };

    const handleEditClick = (info: Row<User>) => {
        setSelectedUser(info.original)
        setModalMode("edit")
        setModalOpen(true)
    };

    const handleDeleteClick = (info: Row<User>) => {
        setSelectedUser(info.original)
        setDeleteModalOpen(true)
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
            <div className='mt-4 mx-2'>
                <div className='flex justify-between my-4'>
                    <h1 className="text-2xl font-semibold mb-4">Users</h1>
                    <Button onClick={() => {
                        setModalMode("create")
                        setModalOpen(true)
                    }}>Add User</Button>
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
