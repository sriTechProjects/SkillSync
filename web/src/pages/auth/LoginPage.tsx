// src/pages/auth/LoginPage.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { login } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = () => {
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {});
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <LoginForm
        email={email}
        password={password}
        showPassword={showPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        setShowPassword={setShowPassword}
        onSubmit={handleSubmit}
        status={status}
        error={error}
      />
    </div>
  );
}
