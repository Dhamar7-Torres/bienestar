import React from 'react';
import { Bell, User, Menu, LogOut } from 'lucide-react';

export const Header = ({ 
  title, 
  user = null, 
  alertsCount = 0, 
  onMenuToggle,
  onNotificationsClick,
  onLogout 
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-4 lg:ml-0 text-2xl font-bold text-gray-900">
              {title}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notificaciones */}
            <button
              onClick={onNotificationsClick}
              className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
            >
              <Bell className="h-6 w-6" />
              {alertsCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {alertsCount > 99 ? '99+' : alertsCount}
                </span>
              )}
            </button>
            
            {/* Usuario */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-600">
                <User className="h-5 w-5 text-white" />
              </div>
              {user && (
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user.nombre}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              )}
              
              {/* Logout Button */}
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};