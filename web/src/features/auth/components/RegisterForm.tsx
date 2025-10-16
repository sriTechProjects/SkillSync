// src/features/auth/components/RegisterForm.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { PasswordValidation } from "@/helpers/PasswordValidation";

type RegisterFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  onSubmit: () => void;
  status: string;
  error: string | null;
};

export function RegisterForm({
  email,
  password,
  confirmPassword,
  showPassword,
  showConfirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  onSubmit,
  status,
  error,
}: RegisterFormProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>Enter your details below to join the community.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 text-left">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-2 text-left">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <PasswordValidation password={password} />

          <div className="grid gap-2 text-left">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {status === "loading" && <p>Registering...</p>}

          <Button type="submit" className="w-full mt-2">
            Sign Up
          </Button>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            Already have an account? <Link to="/login" className="underline">Log In</Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
