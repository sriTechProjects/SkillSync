// src/router.tsx
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { WelcomePage } from "./pages/auth/WelcomePage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { CompleteProfilePage } from "@/pages/profile/CompleteProfilePage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { IsProfileCompleteRoute } from "@/routes/IsProfileCompleteRoute";
import SkillsMarketplace from '@/pages/skills/SkillsMarketplace';
import DashboardPage from "@/pages/DashboardPage";
import DashboardLayout from "@/components/layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "complete-profile",
        element: (
          <ProtectedRoute>
            <CompleteProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <IsProfileCompleteRoute>
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            </IsProfileCompleteRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "skills",
        element: (
          <ProtectedRoute>
              <DashboardLayout>
                <SkillsMarketplace />
              </DashboardLayout>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
