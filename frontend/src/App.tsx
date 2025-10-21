import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

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

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            backgroundColor: '#ffffff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
      </div>
    </>
  );
}

export default App;
