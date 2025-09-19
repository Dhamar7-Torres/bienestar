import React from 'react';
import { BarChart3, Users, AlertTriangle, BookOpen, Home } from 'lucide-react';

export const Navigation = ({ activeView, onViewChange, userRole = 'student' }) => {
  const studentMenuItems = [
    { id: 'dashboard', label: 'Mi Dashboard', icon: Home },
    { id: 'evaluation', label: 'Evaluación Semanal', icon: BarChart3 },
    { id: 'resources', label: 'Recursos de Apoyo', icon: BookOpen }
  ];
  
  const adminMenuItems = [
    { id: 'summary', label: 'Resumen General', icon: BarChart3 },
    { id: 'students', label: 'Lista de Estudiantes', icon: Users },
    { id: 'alerts', label: 'Sistema de Alertas', icon: AlertTriangle },
    { id: 'resources-admin', label: 'Gestión de Recursos', icon: BookOpen }
  ];
  
  const menuItems = userRole === 'admin' ? adminMenuItems : studentMenuItems;
  
  return (
    <nav className="bg-white shadow-sm border-r border-gray-200 h-screen w-64 fixed left-0 top-16 overflow-y-auto">
      <div className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`
                    w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                    ${isActive 
                      ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};