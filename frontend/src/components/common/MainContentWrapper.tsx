import React from "react";
import { useRole } from "@/contexts/RoleContext";

interface MainContentWrapperProps {
  children: React.ReactNode;
}

const MainContentWrapper: React.FC<MainContentWrapperProps> = ({
  children,
}) => {
  const { isAdmin } = useRole();

  return (
    <main
      className={`flex-grow pb-10 md:pb-0 ${isAdmin ? "md:pt-0 pt-[45px]" : ""}`}
    >
      {children}
    </main>
  );
};

export default MainContentWrapper;
