import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Importing icons
import { useAuth } from "../hooks/useAuth"; // Assuming these hooks are defined as discussed
import InputDemo from "./ui/password";

export function DialogDemo() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: '',
    email: '',
    password: '',
    birthDate: '',
  });

  const { register, login } = useAuth();

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files?.[0];
    if (fileInput) {
      setFile(fileInput);
    }
  };

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


    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      bio: formData.bio,
      email: formData.email,
      password: formData.password,
      birthDate: formattedBirthDate, 
    };

    await register(userData); 

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>Log in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="login" className="w-full flex flex-col p-4">
          <TabsList className="w-full h-fit">
            <TabsTrigger className="w-1/2 rounded-full p-4" value="login">
              Log in
            </TabsTrigger>
            <TabsTrigger className="w-1/2 rounded-full p-4" value="signup">
              Sign up
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <DialogHeader className="my-4">
              <DialogTitle>Log in</DialogTitle>
              <DialogDescription>Enter your credentials to log in.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  className="col-span-3 py-6"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  className="col-span-3 py-6"
                  onChange={handleInputChange}
                />
              </div>
              <DialogFooter className="w-full">
                <Button type="submit" className="w-full p-6 text-lg" onClick={() => login({ email: formData.email, password: formData.password })}>Log in</Button>
              </DialogFooter>
            </div>
          </TabsContent>

          {/* Signup Form */}
          <TabsContent value="signup">
            <DialogHeader className="mt-6">
              <DialogTitle>Sign up</DialogTitle>
              <DialogDescription>Create a new account.</DialogDescription>
            </DialogHeader>

            {/* Step 1 */}
            {step === 1 && (
              <div className="grid gap-4 pt-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    className="py-6"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    className="py-6"
                    onChange={handleInputChange}
                  />
                </div>
                <Button onClick={nextStep} className="w-full p-6 text-lg flex justify-center items-center">
                  Next <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="grid gap-4 pt-4">
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="+123456789"
                    className="py-6"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    className="py-6"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between">
                  <Button onClick={prevStep} className="p-4 flex items-center">
                    <ArrowLeft className="h-6 w-6" /> Back
                  </Button>
                  <Button onClick={nextStep} className="p-4 flex items-center">
                    Next <ArrowRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="grid gap-4 pt-4">
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    name="bio"
                    placeholder="Developer"
                    className="py-6"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    className="py-6"
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <InputDemo/>
                </div>
                <div>
                  <Label htmlFor="picture">Profile Picture</Label>
                  <Input
                    id="picture"
                    type="file"
                    onChange={handleFileChange}
                    className="py-6"
                  />
                </div>
                <div className="flex justify-between">
                  <Button onClick={prevStep} className="p-4 flex items-center">
                    <ArrowLeft className="h-6 w-6" /> Back
                  </Button>
                  <Button onClick={handleRegister} className="w-full p-6 text-lg text-white">
                    Sign up
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
