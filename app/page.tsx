"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LandingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    dob: "",
    gender: "",
    country: "",
    state: "",
    district: "",
    constituency: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
    const username = `${age}-${formData.gender.charAt(0)}-${formData.constituency}`;
    
    // Save username to local storage
    localStorage.setItem('username', username);
    
    // Redirect to home page with username
    router.push(`/home?username=${username}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Voizo</CardTitle>
          <CardDescription>Share your opinions anonymously</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input type="date" id="dob" name="dob" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select name="gender" onValueChange={(value) => handleSelectChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                  <SelectItem value="O">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input type="text" id="country" name="country" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input type="text" id="state" name="state" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input type="text" id="district" name="district" required onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="constituency">Constituency</Label>
              <Input type="text" id="constituency" name="constituency" required onChange={handleInputChange} />
            </div>
            <CardFooter>
              <Button type="submit" className="w-full">Join Voizo</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
