// pages/property-post.tsx
'use client'
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { propertySchema, PropertyFormValues, PropertyPost } from '@/types/types';
import { MdClose } from 'react-icons/md';
import { useGetCells, useGetDistricts, useGetProvinces, useGetSectors, useGetVillages } from '@/utils/api';
import { Button } from './ui/button';
import { Button as CustomButton } from 'antd'
import { ArrowLeft, ArrowRight } from '@geist-ui/icons';

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
                            <input {...register('price')} type="number" className="w-full  bg-white px-4 py-3 border border-gray-100 rounded" />
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
