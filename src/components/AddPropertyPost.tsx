// pages/property-post.tsx
'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertySchema, PropertyFormValues, PropertyPost } from '@/types/types';
import { MdClose } from 'react-icons/md';
import { uploadFileApiCall, useGetCategories, useGetCells, useGetDistricts, useGetProvinces, useGetSectors, useGetVillages } from '@/utils/api';
import { Button } from './ui/button';
import { Button as CustomButton } from 'antd'
import { ArrowLeft, ArrowRight } from '@geist-ui/icons';
import Image from 'next/image';
import { uploadToCloudinary } from '@/app/api/actions/upload'
import { toast } from 'react-toastify';

interface PropertyFormProps {
    onSubmit: (data: PropertyFormValues) => void;
    mode: 'create' | 'edit';
    seModalOpen: Dispatch<SetStateAction<boolean>>;
    defaultValues?: Partial<PropertyPost>; // For edit form
}

const PropertyPostForm: React.FC<PropertyFormProps> = ({ onSubmit, defaultValues, mode, seModalOpen, }) => {
    const [province, setProvince] = useState<string | null>('');
    const [district, setDistrict] = useState<string | null>('');
    const [sector, setSector] = useState<string | null>('');
    const [cell, setCell] = useState<string | null>('');
    const [village, setVillage] = useState<string | null>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const { data: categories } = useGetCategories()
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // FileReader for image preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Create FormData and append the file
        const formData = new FormData();
        formData.append('file', file);

        try {
            // Call Cloudinary upload function
            setUploading(true);
            const result = await uploadToCloudinary(formData) as { url: string; error?: string };

            if (result.error) {
                console.error(result.error);
                toast.error('Upload failed');
            } else {
                setImageUrl(result.url);  // Update the uploaded image URL state
            }
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error('An unexpected error occurred during upload.');
        } finally {
            setUploading(false);  // Stop the uploading indicator
        }

        // Constructing file data object
        const fileData = {
            name: file.name,
            url: imageUrl || '', // Temporary URL for the uploaded file
            size: Number(file.size),
            sizeType: `${(file.size / 1024).toFixed(2)} KB`, // Convert size to KB
            type: file.type,
        };

        // Example API call for file upload metadata
        await uploadFileApiCall(fileData);
    };

    // Fetch provinces
    const { data: provinces, isLoading: isProvinceLoading } = useGetProvinces();

    // Fetch districts based on selected province
    const { data: districts, isLoading: isDistrictLoading } = useGetDistricts(province || '');

    // Fetch sectors based on selected province and district
    const { data: sectors, isLoading: isSectorLoading } = useGetSectors(province || '', district || '');

    // Fetch cells based on selected province, district, and sector
    const { data: cells, isLoading: isCellLoading } = useGetCells(province || '', district || '', sector || '');

    // Fetch villages based on selected province, district, sector, and cell
    const { data: villages, isLoading: isVillageLoading } = useGetVillages(province || '', district || '', sector || '', cell || '');

    const { register, handleSubmit, formState: { errors } } = useForm<PropertyFormValues>({
        resolver: zodResolver(propertySchema),
        defaultValues
    });

    const [step, setStep] = useState(1);
    console.log(categories?.data);

    console.log("eerrors: ", errors);

    return (
        <div className="max-w-4xl mx-auto bg-white p-4">
            <div>
                <div className='flex justify-between'>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 pb-8">
                        {mode === `create` ? `Create Property Listing` : `Edit Property Listing`}
                    </h1>
                    <MdClose size={30} onClick={() => seModalOpen(false)} className='cursor-pointer' />
                </div>
                <div className="mb-8 mt-2 flex justify-between items-start">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex size-8 items-center">
                            <div className={`size-8 rounded-full flex items-center justify-center ${step >= num ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                                }`}>
                                {num}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                    <div className="space-y-6">
                        {/* Title */}
                        <div className='space-y-2'>
                            <label className="block text-gray-700">Title</label>
                            <input {...register('title')} className="w-full  bg-white px-4 py-3 border border-gray-100 rounded" />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                        </div>

                        {/* Description */}
                        <div className='space-y-2'>
                            <label className="block text-gray-700">Description</label>
                            <textarea {...register('description')} className="w-full  bg-white px-4 py-3 border border-gray-100 rounded" />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>

                        {/* Listing Type */}
                        <div className='space-y-2'>
                            <label className="block text-gray-700">Listing Type</label>
                            <select {...register('listingType')} className="w-full  bg-white px-4 py-3 border border-gray-100 rounded">
                                <option value="RENT">Rent</option>
                                <option value="SALE">Sale</option>
                            </select>
                        </div>
                        {/* categories */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Categories</label>
                            <select
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:border-indigo-500"
                                multiple  // Enable multiple selection
                            >
                                {categories?.data?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        {/* Property Condition */}
                        <div className='space-y-2'>
                            <label className="block text-gray-700">Condition</label>
                            <select {...register('propertyCondition')} className="w-full  bg-white px-4 py-3 border border-gray-100 rounded">
                                <option value="NEW">New</option>
                                <option value="USED">Used</option>
                            </select>
                        </div>
                        {/* Price */}
                        <div className='space-y-2'>
                            <label className="block text-gray-700">Price</label>
                            <input {...register('price', {
                                valueAsNumber: true, // Converts string input to number
                                required: 'Price is required',
                                validate: (value) => value > 0 || 'Price must be greater than zero',
                            })} type="number" className="w-full  bg-white px-4 py-3 border border-gray-100 rounded" />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>

                        {/* Currency */}
                        <div className='space-y-2'>
                            <label className="block text-gray-700">Currency</label>
                            <select {...register('currency')} className="w-full  bg-white px-4 py-3 border border-gray-100 rounded">
                                <option value="RWF">RWF</option>
                                <option value="USD">USD</option>
                            </select>
                        </div>
                        <div className='space-y-3'>
                            <label className="block text-gray-700">Property Image</label>

                            <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
                                <div onClick={() => document.getElementById('fileInput')?.click()} style={{ cursor: 'pointer' }} className="grid gap-1">
                                    <svg className="mx-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="File">
                                            <path id="icon" d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z" fill="#4F46E5" />
                                        </g>
                                    </svg>
                                    <div className='flex justify-center cursor-pointer'>
                                        <input disabled={uploading} className='cursor-pointer justify-center' type="file" style={{ display: 'none' }} id='fileInput' onChange={handleFileChange} name="file" />
                                    </div>
                                    <h2 className="text-center text-gray-400 text-xs leading-4">PNG, JPG or PDF, smaller than 15MB</h2>
                                </div>
                                {imagePreview && (
                                    <Image
                                        src={imagePreview}
                                        alt="Profile Preview"
                                        width={100}
                                        height={100}
                                        className="mx-auto rounded-full"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <>
                        <div className='flex flex-col gap-y-6'>
                            <div className='space-y-2'>
                                <label className="block text-gray-700">Province</label>
                                {/* Province Select */}
                                <select
                                    value={province || ''}
                                    onChange={(e) => setProvince(e.target.value)}
                                    className="w-full bg-white px-4 py-3 border border-gray-100 rounded focus:outline-none focus:border-indigo-500"
                                    disabled={isProvinceLoading}
                                >
                                    <option value="">Select Province</option>
                                    {provinces && provinces.data.map((provinceObj, index) => {
                                        const provinceName = Object.keys(provinceObj)[0]
                                        return (
                                            <option key={index} value={provinceName.toLocaleLowerCase()}>
                                                {provinceName}
                                            </option>
                                        )
                                    })}
                                </select>

                            </div>
                            {/* District Select */}
                            <div className='space-y-2'>
                                <label className="block text-gray-700">District</label>
                                <select
                                    value={district || ''}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    className="w-full bg-white px-4 py-3 border border-gray-100 rounded focus:outline-none focus:border-indigo-500"
                                    disabled={isDistrictLoading || !province}
                                >
                                    <option value="">Select District</option>
                                    {districts && districts.data.map((districtObj, index) => {
                                        const districtName = Object.values(districtObj)
                                        return (
                                            <option key={index} value={districtName.join("").toLocaleLowerCase()}>
                                                {districtName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            {/* Sector Select */}
                            <div className='space-y-2'>
                                <label className="block text-gray-700">Sector</label>
                                <select
                                    value={sector || ''}
                                    onChange={(e) => setSector(e.target.value)}
                                    className="w-full  bg-white px-4 py-3 border border-gray-100 rounded focus:outline-none focus:border-indigo-500"
                                    disabled={isSectorLoading || !district}
                                >
                                    <option value="">Select Sector</option>
                                    {sectors && sectors.data.map((sectorObj, index) => {
                                        const sectorName = Object.values(sectorObj)
                                        return (
                                            <option key={index} value={sectorName.join("").toLocaleLowerCase()}>
                                                {sectorName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            {/* Cell Select */}
                            <div className='space-y-2'>
                                <label className="block text-gray-700">Cell</label>
                                <select
                                    value={cell || ''}
                                    onChange={(e) => setCell(e.target.value)}
                                    className="w-full  bg-white px-4 py-3 border border-gray-100 rounded focus:outline-none focus:border-indigo-500"
                                    disabled={isCellLoading || !sector}
                                >
                                    <option value="">Select Cell</option>
                                    {cells && cells.data.map((cellObj, index) => {
                                        const cellName = Object.values(cellObj)
                                        return (
                                            <option key={index} value={cellName.join("").toLocaleLowerCase()}>
                                                {cellName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>

                            {/* Village Select */}
                            <div className='space-y-2'>
                                <label className="block text-gray-700">Village</label>
                                <select
                                    value={village || ''}
                                    onChange={(e) => setVillage(e.target.value)}
                                    className="w-full  bg-white px-4 py-3 border border-gray-100 rounded focus:outline-none focus:border-indigo-500"
                                    disabled={isVillageLoading || !cell}
                                >
                                    <option value="">Select Village</option>
                                    {villages && villages.data.map((cellObj, index) => {
                                        const villageName = Object.values(cellObj)
                                        return (
                                            <option key={index} value={villageName.join("").toLocaleLowerCase()}>
                                                {villageName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </>)}
                {/* Province Selector */}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <CustomButton onClick={() => setStep(step - 1)}>
                            <ArrowLeft size={25} /> Previous
                        </CustomButton>
                    )}
                    {step < 3 ? (
                        <CustomButton onClick={() => setStep(step + 1)}>
                            <ArrowRight size={25} /> Next
                        </CustomButton>
                    ) : (
                        <Button size="lg" type="submit" className='px-14 py-5'>
                            Submit
                        </Button>
                    )}
                </div>
            </form >
        </div >
    );
};

export default PropertyPostForm;
