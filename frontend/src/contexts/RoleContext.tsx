import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

export type UserRole = "admin" | "patient";

interface UserPermissions {
  canViewAllPatients: boolean;
  canEditAllPatients: boolean;
  canViewReports: boolean;
  canManageSystem: boolean;
  canViewOwnData: boolean;
  canEditOwnData: boolean;
}

interface RoleContextType {
  userRole: UserRole;
  permissions: UserPermissions;
  isAdmin: boolean;
  isPatient: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

interface RoleProviderProps {
  children: React.ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const { user } = useAuth();

  // Define o role baseado no email
  const getUserRole = (): UserRole => {
    if (user?.email === "bruno6821@gmail.com") {
      return "admin";
    }
    return "patient";
  };

  const userRole = getUserRole();
  const isAdmin = userRole === "admin";
  const isPatient = userRole === "patient";

  // Define permissões baseadas no role
  const getPermissions = (role: UserRole): UserPermissions => {
    switch (role) {
      case "admin":
        return {
          canViewAllPatients: true,
          canEditAllPatients: true,
          canViewReports: true,
          canManageSystem: true,
          canViewOwnData: true,
          canEditOwnData: true,
        };
      case "patient":
        return {
          canViewAllPatients: false,
          canEditAllPatients: false,
          canViewReports: false,
          canManageSystem: false,
          canViewOwnData: true,
          canEditOwnData: true,
        };
      default:
        return {
          canViewAllPatients: false,
          canEditAllPatients: false,
          canViewReports: false,
          canManageSystem: false,
          canViewOwnData: false,
          canEditOwnData: false,
        };
    }
  };

  const permissions = getPermissions(userRole);

  const contextValue: RoleContextType = {
    userRole,
    permissions,
    isAdmin,
    isPatient,
  };

  return (
    <RoleContext.Provider value={contextValue}>{children}</RoleContext.Provider>
  );
};
