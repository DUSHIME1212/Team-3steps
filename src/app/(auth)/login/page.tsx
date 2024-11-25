"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await login({ email: formData.email, password: formData.password });
      setTimeout(() => {
        router.push("/property");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);  // For debugging
    }
  };

  return (
    <div className="">
      <ToastContainer position="top-right" />
      <div className="min-h-screen w-screen pt-16 relative">
        <Image src={"/image.png"} alt="" fill className="object-cover -z-0" />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="gap-6 rounded-xl  z-10 flex min-w-[512px] items-start bg-white p-16 absolute w-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  justify-center flex-col"
        >
          <div className="w-full text-start mb-4">
            <h1 className="text-5xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-600">
              Please enter your details to sign in
            </p>
          </div>

          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              placeholder="example@example.com"
              className="col-span-3 py-6"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              placeholder="Enter your password"
              className="col-span-3 py-6"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="w-full flex justify-between items-center mb-2">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Forgot password?
            </Link>
          </div>

          <div className="w-full">
            <Button type="submit" onClick={handleSubmit} className="p-6 w-full text-lg">
              Sign in
            </Button>
          </div>

          <div className="w-full text-center mt-4">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
