import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import type { AdminNavbarProps } from "../../types/admin";

// ================================
// COMPONENTE NAVBAR ADMIN
// ================================

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between shadow-sm">
      {/* Lado Esquerdo - Busca */}
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Buscar tenants, usuários..."
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Lado Direito - Ações */}
      <div className="flex items-center space-x-2">
        {/* Toggle Tema */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Notificações */}
        <div className="relative">
          <button
            onClick={toggleNotifications}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
          >
            <Bell className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            {/* Badge de notificação */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center text-[10px]">
              3
            </span>
          </button>

          {/* Dropdown Notificações */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-lg shadow-lg z-50"
              >
                <div className="p-2 border-b border-gray-400 dark:border-gray-600">
                  <h3 className="font-semibold text-sm text-black dark:text-white">Notificações</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {/* Exemplo de notificações */}
                  {[
                    {
                      id: 1,
                      message: "Novo tenant criado: Dra. Maria Silva",
                      time: "5 min",
                    },
                    {
                      id: 2,
                      message: "Pagamento processado: R$ 299,00",
                      time: "1 hora",
                    },
                    {
                      id: 3,
                      message: "Usuário suspenso por inatividade",
                      time: "2 horas",
                    },
                  ].map((notification) => (
                    <div
                      key={notification.id}
                      className="p-2 border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <p className="text-xs text-black dark:text-white">
                        {notification.message}
                      </p>
                      <p className="text-[10px] text-gray-700 dark:text-gray-400 mt-1">
                        {notification.time} atrás
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-400 dark:border-gray-600">
                  <button className="w-full text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                    Ver todas as notificações
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Menu do Usuário */}
        <div className="relative">
          <button
            onClick={toggleUserMenu}
            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            {user && (
              <div className="text-left hidden sm:block">
                <p className="text-xs font-medium text-black dark:text-white">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-[10px] text-gray-700 dark:text-gray-400">
                  {user.is_superuser ? "Super Admin" : "Admin"}
                </p>
              </div>
            )}
            <ChevronDown className="w-3 h-3 text-gray-800 dark:text-gray-400" />
          </button>

          {/* Dropdown do Usuário */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-lg shadow-lg z-50"
              >
                <div className="p-2 border-b border-gray-400 dark:border-gray-600">
                  {user && (
                    <div>
                      <p className="font-medium text-sm text-black dark:text-white">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-gray-700 dark:text-gray-400">{user.email}</p>
                    </div>
                  )}
                </div>

                <div className="py-1">
                  <button className="w-full px-2 py-1.5 text-left text-xs text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span>Meu Perfil</span>
                  </button>
                  <button className="w-full px-2 py-1.5 text-left text-xs text-black dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
                    <Settings className="w-3 h-3" />
                    <span>Configurações</span>
                  </button>
                </div>

                <div className="border-t border-gray-400 dark:border-gray-600 py-1">
                  <button
                    onClick={onLogout}
                    className="w-full px-2 py-1.5 text-left text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sair</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Overlay para fechar dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default AdminNavbar;
