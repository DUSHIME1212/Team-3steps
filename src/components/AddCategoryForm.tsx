import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Category, categorySchema } from '@/types/types';
import { Button } from './ui/button';
import { Button as CloseButton } from 'antd'
import { Dispatch, SetStateAction } from 'react';
import { MdClose } from 'react-icons/md';
import { useGetCategories } from '@/utils/api';

type CategoryFormValues = z.infer<typeof categorySchema>;

interface AddCategoryFormProps {
    onSubmit: (data: CategoryFormValues) => void;
    mode: 'create' | 'edit';
    seModalOpen: Dispatch<SetStateAction<boolean>>;
    defaultValues?: Partial<Category>; // For edit form
}

const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onSubmit, defaultValues, mode, seModalOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues
    });


    const { data: categories } = useGetCategories()

    return (
        <div>
            <div className='flex justify-between'>
                {mode === 'create' ? <p className='text-xl font-bold'>Create Category</p> : <p className='text-xl font-bold'>Edit Category</p>}
                <MdClose size={30} onClick={() => seModalOpen(false)} className='cursor-pointer' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
                {/* First Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        {...register('name')}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <input
                        {...register('description')}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
                {mode === 'edit' && (
                    <div className="mb-4">
                        <label className="block text-gray-700">Category</label>
                        <select
                            {...register('parentId', {
                                setValueAs: (value) => (value === "" ? undefined : Number(value)), // Convert to number
                            })}
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                        >
                            <option value="" disabled>Select a category</option>
                            {categories?.data?.map((category, index) => (
                                <option key={index} value={category.id as number}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.parentId && (
                            <p className="text-red-500 text-sm">{errors.parentId.message}</p>
                        )}
                    </div>
                )}
                {/* Submit Button */}
                <div className='flex justify-between items-center mt-8'>
                    <div>
                        <Button className='px-10 py-4' size='lg' >
                            {mode === 'edit' ? 'Update Category' : 'Create Category'}
                        </Button>
                    </div>
                    <div>
                        <CloseButton className='px-8 py-4' onClick={() => seModalOpen(false)}>
                            Cancel
                        </CloseButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddCategoryForm;
