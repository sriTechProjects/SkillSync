// src/pages/auth/RegisterPage.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { register } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { toast } from "sonner";

export function RegisterPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      // alert("Passwords do not match");
      toast.error("Passwords do not match",{
        className: "toast-error"
      });
      return;
    }

    dispatch(register({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 py-12">
      <RegisterForm
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setShowPassword={setShowPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        onSubmit={handleSubmit}
        status={status}
        error={error}
      />
    </div>
  );
}
