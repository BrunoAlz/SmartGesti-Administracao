import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

// Contexts
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";

// Admin Components
import { AdminLoginPage } from "@/admin/pages/auth/Login";
import { AdminApp } from "@/admin/pages/AdminApp";

// Landing Page
import SmartGestiLandingPage from "@/landing-page";

import ScrollToTop from "./components/common/ScrollToTop";
import LoadingGuard from "./components/common/LoadingGuard";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RoleProvider>
          <Router>
            <LoadingGuard>
              <AppContent />
            </LoadingGuard>
          </Router>
        </RoleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<SmartGestiLandingPage />} />
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              style: {
                background: "#10b981",
              },
            },
            error: {
              style: {
                background: "#ef4444",
              },
            },
          }}
        />
      </div>
    </>
  );
}

export default App;
