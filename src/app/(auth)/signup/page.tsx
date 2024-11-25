"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import InputDemo from "@/components/ui/password";

interface FormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  bio: string;
  email: string;
  picture: File | null;
  password: string;
}

const page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    birthDate: "",
    bio: "",
    email: "",
    picture: null,
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, picture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    // TODO: Implement actual registration logic here
    setTimeout(() => {
      setIsLoading(false);
      router.push("/property");
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image 
          src="/image.png"
          alt="Sign up background"
          fill
          className="object-cover rounded-r-3xl"
          priority
        />
        <div className="absolute inset-0 bg-darkBlue/20" />
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-4xl font-bold mb-4">Join our community</h2>
          <p className="text-lg">Start your journey with us today.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-start mt-48 justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h1>
            <div className="mt-4 flex justify-between items-start">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex size-8 items-center">
                  <div className={`size-8 rounded-full flex items-center justify-center ${
                    step >= num ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                  }`}>
                    {num}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+250 (7_5) 000-0000"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    name="bio"
                    placeholder="Tell us about yourself"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-4">
                  <Label htmlFor="picture" className="block mb-2">Profile Picture</Label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-600 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      {!imagePreview ? (
                        <>
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="picture" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                              Upload a file
                            </label>
                          </div>
                        </>
                      ) : (
                        <Image
                          src={imagePreview}
                          alt="Profile Preview"
                          width={100}
                          height={100}
                          className="mx-auto rounded-full"
                        />
                      )}
                      <Input
                        id="picture"
                        name="picture"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <InputDemo onChange={handleInputChange} />
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  onClick={prevStep}
                  className="flex items-center px-4 py-2"
                  variant="outline"
                  type="button"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              
              {step < 3 ? (
                <Button
                  onClick={nextStep}
                  className="flex items-center px-4 py-2 ml-auto"
                  type="button"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleRegister}
                  className="w-full"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page
;

