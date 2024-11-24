/* eslint-disable react/no-unescaped-entities */
'use client'
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link'
import { Button as SmallBtn } from 'antd'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: '',
    email: '',
    password: '',
    birthDate: '',
  });

  const { register } = useAuth();

  // Step navigation functions
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    // Format the birth date to ISO string
    const birthDate = new Date(formData.birthDate);
    const formattedBirthDate = birthDate.toISOString();

    // Create a plain object with user data
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      bio: formData.bio,
      email: formData.email,
      password: formData.password,
      birthDate: formattedBirthDate,  // Use the formatted birth date
    };

    console.log(userData);


    await register(userData); // Send the user data as JSON

  };

  return (
    <div className="h-screen bg-gray-100 flex">
      <div className='flex bg-white mx-auto mb-16 mt-44'>
        {/* Left section with blue background */}
        <div className="hidden lg:flex bg-blue-600 relative items-center justify-center">
          {/* Content */}
          <div className="text-white px-8 flex flex-col -mt-16">
            <h1 className="text-2xl truncate font-black mb-4">Join Our Real Estate Community</h1>
            <p>Create an account to discover listings, manage properties, and find your perfect home.</p>
          </div>
          <div className='p-24'>
            {/* Triangle - Three rectangles forming a triangle */}
            <div className="absolute w-96 h-16 bg-white opacity-20 transform rotate-45 top-32 right-0"></div>
            <div className="absolute w-96 h-16 bg-white opacity-20 transform -rotate-45 bottom-42 right-0"></div>

            <div className="absolute w-96 h-16 bg-white opacity-15 transform -rotate-45 bottom-36 right-0"></div>

          </div>
        </div>
        {/* Right section with login form */}
        <div className="m-10 p-14 max-w-xl bg-white w-full">
          <h2 className="text-2xl font-semibold mb-6">Register</h2>
          <form className='space-y-8'>
            {step === 1 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    First name
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="text"
                    name='firstName'
                    onChange={handleInputChange}
                    id="firstName"
                    placeholder="Doe" />
                </div><div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Last name
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="text"
                    name='lastName'
                    onChange={handleInputChange}
                    id="lastName"
                    placeholder="John" />
                </div><div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Phone number
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="text"
                    name='phoneNumber'
                    onChange={handleInputChange}
                    id="phoneNumber"
                    placeholder="+25018471378" />
                </div>
                <SmallBtn onClick={nextStep} className="w-full p-6 text-lg flex justify-center items-center">
                  Next <ArrowRight className="ml-2 h-6 w-6" />
                </SmallBtn>
              </>
            )}
            {step === 2 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email address
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="email"
                    name='email'
                    onChange={handleInputChange}
                    id="email"
                    placeholder="name@mail.com" />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="password"
                    name='password'
                    id="password"
                    placeholder="********" />
                </div>
                <div className="flex justify-between">
                  <SmallBtn onClick={prevStep} className="p-4 flex items-center">
                    <ArrowLeft className="h-6 w-6" /> Back
                  </SmallBtn>
                  <SmallBtn onClick={nextStep} className="p-4 flex items-center">
                    Next <ArrowRight className="h-6 w-6" />
                  </SmallBtn>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Bio
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="text"
                    name='bio'
                    onChange={handleInputChange}
                    id="bio"
                    placeholder="Developer" />
                </div><div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Birth date
                  </label>
                  <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    type="date"
                    name='birthDate'
                    onChange={handleInputChange}
                    id="birthDate" />
                </div>
                <SmallBtn onClick={prevStep} className="p-4 flex items-center">
                  <ArrowLeft className="h-6 w-6" /> Back
                </SmallBtn>
                <Button onClick={handleRegister} className="w-full p-6 text-lg text-white">
                  Register
                </Button>
              </>
            )}
          </form>
          <div className="mt-8">
            <p className="text-gray-600 text-sm">
              Already have an account? <Link href="/login" className="text-blue-600">Login</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RegisterPage
