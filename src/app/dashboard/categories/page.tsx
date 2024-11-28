'use client'
import { useEffect, useState } from 'react';
import { useReactTable, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';
import DashboardLayout from '../../../components/DashboardLayout';  // Assuming your layout component is here
import axios from 'axios';
import { Row } from '@tanstack/react-table';
import { PropertyPost } from '@/types/types';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

// Define Category interface
interface Category {
    id: number;
    name: string;
    description: string;
    parentId?: number;
    posts: PropertyPost[];
    createdAt: string;
    updatedAt: string;
    subcategories: Category[];
    parent?: Category;
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    // Initialize react-hook-form
    const { control, handleSubmit } = useForm<Category>({
        defaultValues: {
            name: '',
            description: ''
        }
    });

    const handleEditCategory = (row: Row<Category>) => {
        setCategoryToEdit(row.original);
        setIsEditModalOpen(true);
    };

    const handleDeleteCategory = (row: Row<Category>) => {
        setCategoryToDelete(row.original);
        setIsDeleteModalOpen(true);
    };

    // Handle edit form submission
    const handleSaveEdit = (data: Category) => {
        if (categoryToEdit) {
            axios.put(`/api/categories/${categoryToEdit.id}`, data)
                .then(() => {
                    toast.success('Category updated successfully!');
                    setIsEditModalOpen(false);
                    setCategories(categories.map(category =>
                        category.id === categoryToEdit.id ? { ...category, ...data } : category
                    ));
                })
                .catch(() => {
                    toast.error('Failed to update category.');
                });
        }
    };

    // Handle delete confirmation
    const handleDeleteConfirm = () => {
        if (categoryToDelete) {
            axios.delete(`/api/categories/${categoryToDelete.id}`)
                .then(() => {
                    toast.success('Category deleted successfully!');
                    setCategories(categories.filter(category => category.id !== categoryToDelete.id));
                    setIsDeleteModalOpen(false);
                })
                .catch(() => {
                    toast.error('Failed to delete category.');
                });
        }
    };

    // Define columns for Categories table
    const categoryColumns: ColumnDef<Category>[] = [
        {
            accessorKey: 'name',
            header: 'Category Name',
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
        {
            accessorKey: 'parentId',
            header: 'Parent Category',
            cell: ({ cell }) => {
                const parentCategory = cell.getValue() ? `Parent ID: ${cell.getValue()}` : 'No Parent';
                return <span>{parentCategory}</span>;
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button onClick={() => handleEditCategory(row)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                    <button onClick={() => handleDeleteCategory(row)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
            ),
        },
    ];

    // Fetch categories from API
    useEffect(() => {
        axios.get('/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const table = useReactTable({
        data: categories,
        columns: categoryColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-semibold mb-4">Categories</h1>
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
            {isEditModalOpen && categoryToEdit && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
                        <form onSubmit={handleSubmit(handleSaveEdit)}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue={categoryToEdit.name}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        {...field}
                                        className="w-full mb-4 p-2 border rounded"
                                        placeholder="Category Name"
                                    />
                                )}
                            />
                            <Controller
                                name="description"
                                control={control}
                                defaultValue={categoryToEdit.description}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        className="w-full mb-4 p-2 border rounded"
                                        placeholder="Description"
                                    />
                                )}
                            />
                            <div className="flex space-x-2">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDeleteModalOpen && categoryToDelete && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this category?</h2>
                        <p>{categoryToDelete.name}</p>
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

export default CategoriesPage;
