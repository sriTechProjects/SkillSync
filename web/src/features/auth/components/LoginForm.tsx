// src/features/auth/components/LoginForm.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

type LoginFormProps = {
  email: string;
  password: string;
  showPassword: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  onSubmit: () => void;
  status: string;
  error: string | null;
};

export function LoginForm({
  email,
  password,
  showPassword,
  setEmail,
  setPassword,
  setShowPassword,
  onSubmit,
  status,
  error,
}: LoginFormProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
          <CardDescription>Enter your email below to log in to your account.</CardDescription>
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

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {status === "loading" && <p>Loading...</p>}

          <Button type="submit" className="w-full mt-2">
            Log In
          </Button>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm w-full">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
