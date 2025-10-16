import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type StepOneBasicInfoProps = {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setUsername: (v: string) => void;
  setPhoneNumber: (v: string) => void;
  onNext: () => void;
};

export function StepOneBasicInfo({
  firstName,
  lastName,
  username,
  phoneNumber,
  setFirstName,
  setLastName,
  setUsername,
  setPhoneNumber,
  onNext,
}: StepOneBasicInfoProps) {
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
  });

  const validateFields = () => {
    const newErrors: typeof errors = {
      firstName: firstName.trim() ? "" : "First Name is required",
      lastName: lastName.trim() ? "" : "Last Name is required",
      username: username.trim() ? "" : "Username is required",
      phoneNumber: phoneNumber.trim() ? "" : "Phone Number is required",
    };
    setErrors(newErrors);

    // If all fields are valid, return true
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields()) {
      onNext();
    }
  };

  return (
    <form className="space-y-6 max-w-md mx-auto text-left">
      {/* First Name */}
      <div className="flex flex-col">
        <Label htmlFor="firstName" className="font-medium text-slate-700 mb-1">
          First Name
        </Label>
        <Input
          id="firstName"
          placeholder="John"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <Label htmlFor="lastName" className="font-medium text-slate-700 mb-1">
          Last Name
        </Label>
        <Input
          id="lastName"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
      </div>

      {/* Username */}
      <div className="flex flex-col">
        <Label htmlFor="username" className="font-medium text-slate-700 mb-1">
          Username
        </Label>
        <Input
          id="username"
          placeholder="@johnny"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col">
        <Label htmlFor="phoneNumber" className="font-medium text-slate-700 mb-1">
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          placeholder="+91 98765 43210"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
      </div>

      {/* Next Button */}
      <div className="pt-4">
        <Button variant="default" className="w-full" onClick={handleNext}>
          Next Step →
        </Button>
      </div>
    </form>
  );
}