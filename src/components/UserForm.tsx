import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, userSchema } from '@/types/types';
import { Button } from './ui/button';
import { Button as CloseButton } from 'antd'
import { Dispatch, SetStateAction, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
    onSubmit: (data: UserFormValues) => void;
    mode: 'create' | 'edit';
    seModalOpen: Dispatch<SetStateAction<boolean>>;
    defaultValues?: Partial<User>; // For edit form
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, defaultValues, mode, seModalOpen, }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues
    });

    console.log('Validation errors:', errors);
    // Watch for changes in defaultValues (selectedUser)
    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues); // Reset the form with new values
        }
    }, [defaultValues, reset]);

    return (
        <div>
            <div className='flex justify-between'>
                {mode === 'create' ? <p className='text-xl font-bold'>Create User</p> : <p className='text-xl font-bold'>Edit User</p>}
                <MdClose size={30} onClick={() => seModalOpen(false)} className='cursor-pointer' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4">
                {/* First Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        {...register('firstName')}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        {...register('lastName')}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                        {...register('phoneNumber')}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                {/* Birth Date */}
                <div className="mb-4">
                    <label className="block text-gray-700">Birth Date</label>
                    <input
                        type="date"
                        {...register('birthDate')}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                    />
                    {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
                </div>
                <div>
                    <label className="block mb-2">Bio</label>
                    <Controller
                        name="bio"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                {...field}
                                className="w-full mb-4 p-2 border rounded"
                                placeholder="Developer"
                            />
                        )}
                    />
                    {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
                </div>
                {/* Submit Button */}
                <div className='flex justify-between items-center mt-2'>
                    <div>
                        <Button className='px-10 py-4' size='lg' >
                            {mode === 'edit' ? 'Update User' : 'Create User'}
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

export default UserForm;
