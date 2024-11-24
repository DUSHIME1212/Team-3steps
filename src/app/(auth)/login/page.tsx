/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client'
import { useAuth } from '@/hooks/useAuth';
import React, { useState } from 'react'
import Link from 'next/link';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const authData = {
      email: formData.email,
      password: formData.password,
    }
    await login(authData);
  }

  return (
    <div className="h-screen bg-gray-100 flex">

      <div className='flex bg-white mx-auto mb-16 mt-44'>

        {/* Left section with blue background */}
        <div className="hidden lg:flex flex-1 bg-[#3A0CA3] relative items-center justify-center">
          {/* Content */}
          <div className="text-white px-8 flex flex-col -mt-16">
            <h1 className="text-2xl truncate font-black mb-4">Welcome Back to Your Property Portal</h1>
            <p>Access your account to explore listings, manage properties, and connect with your future home.</p>
          </div>
          <div className='p-8'>
            {/* Triangle - Three rectangles forming a triangle */}
            <div className="absolute w-96 h-16 bg-white opacity-20 transform rotate-45 top-32 right-0"></div>
            <div className="absolute w-96 h-16 bg-white opacity-20 transform -rotate-45 bottom-42 right-0"></div>

            <div className="absolute w-96 h-16 bg-white opacity-15 transform -rotate-45 bottom-36 right-0"></div>

          </div>
        </div>

        {/* Right section with login form */}
        <div className="m-10 p-14 max-w-xl bg-white w-full">
          <h2 className="text-2xl font-semibold mb-6">Login</h2>
          <form className='space-y-8'>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email address
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]"
                type="email"
                name='email'
                onChange={handleInputChange}
                id="email"
                placeholder="name@mail.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3A0CA3]"
                type="password"
                onChange={handleInputChange}
                id="password"
                name='password'
                placeholder="********"
              />
              <a href="#" className="text-[#3A0CA3] text-sm mt-4 inline-block">Reset Password</a>
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember Password</label>
            </div>
            <button
              onClick={handleLogin}
              type="submit"
              className="w-full bg-[#3A0CA3] hover:bg-[#3A0CA3] text-white font-bold py-2 rounded-lg transition duration-300"
            >
              Login
            </button>
            <div className="text-center mt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account? <Link href="register" className="text-[#3A0CA3]">Sign up</Link>
              </p>
            </div>
            <div className="text-center mt-4">
              <button
                className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition duration-300"
              >
                Authorize with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage