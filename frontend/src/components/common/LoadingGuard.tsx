/**
 * 🔄 LOADING GUARD SIMPLIFICADO
 * Sistema administrativo sem multi-tenancy
 */

import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface LoadingGuardProps {
  children: React.ReactNode;
}

function LoadingGuard({ children }: LoadingGuardProps) {
  const { isLoading: authLoading } = useAuth();

  // Só bloqueia se auth está loading por mais de 2 segundos
  const [shouldBlock, setShouldBlock] = React.useState(false);

  React.useEffect(() => {
    if (authLoading) {
      const timer = setTimeout(() => {
        setShouldBlock(true);
      }, 2000); // 2 segundos

      return () => clearTimeout(timer);
    } else {
      setShouldBlock(false);
    }
  }, [authLoading]);

  // 99% das vezes, renderiza imediatamente
  if (!shouldBlock) {
    return <>{children}</>;
  }

  // Só em casos extremos mostra loading
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-2 text-sm text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}

export default LoadingGuard;
