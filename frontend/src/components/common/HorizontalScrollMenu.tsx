import React from "react";
import { scrollToTop } from "@/utils/scroll";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
  onClick: () => void;
}

interface HorizontalScrollMenuProps {
  items: MenuItem[];
  className?: string;
}

const HorizontalScrollMenu: React.FC<HorizontalScrollMenuProps> = ({
  items,
  className = "",
}) => {
  return (
    <div className={`md:hidden ${className}`}>
      <div className="mb-6">
        <div
          className="flex space-x-3 overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* Internet Explorer and Edge */,
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick();
                setTimeout(() => {
                  scrollToTop();
                }, 100);
              }}
              className={`
                flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                flex items-center space-x-2 min-w-max
                ${
                  item.isActive
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-primary-300 hover:shadow-md"
                }
              `}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollMenu;
