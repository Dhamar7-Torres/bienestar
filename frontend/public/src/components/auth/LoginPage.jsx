import React, { useState } from 'react';
import { User, Shield, BookOpen, Activity } from 'lucide-react';

export const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (selectedRole) => {
    setLoading(true);
    
    // Simular delay de login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUsers = {
      student: {
        id: 1,
        nombre: 'Ana García López',
        email: 'ana.garcia@universidad.edu',
        carrera: 'Ingeniería de Sistemas',
        semestre: 6
      },
      admin: {
        id: 100,
        nombre: 'Dr. Carlos Administrador',
        email: 'admin@universidad.edu',
        departamento: 'Bienestar Estudiantil'
      }
    };
    
    onLogin(demoUsers[selectedRole], selectedRole);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
              <Activity className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mi Bienestar DACYTI
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sistema de detección automática de factores de riesgo psicosocial en estudiantes de alto rendimiento
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Bienvenido
            </h2>
            <p className="text-gray-600 text-sm">
              Selecciona tu rol para acceder al sistema
            </p>
          </div>

          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de Usuario:
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                {/* Student Option */}
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${role === 'student' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${role === 'student' ? 'bg-primary-100' : 'bg-gray-100'}
                    `}>
                      <User className={`h-5 w-5 ${role === 'student' ? 'text-primary-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${role === 'student' ? 'text-primary-900' : 'text-gray-900'}`}>
                        Estudiante
                      </div>
                      <div className="text-xs text-gray-500">
                        Acceso a evaluaciones
                      </div>
                    </div>
                  </div>
                </button>

                {/* Admin Option */}
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-200 text-left
                    ${role === 'admin' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${role === 'admin' ? 'bg-primary-100' : 'bg-gray-100'}
                    `}>
                      <Shield className={`h-5 w-5 ${role === 'admin' ? 'text-primary-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <div className={`font-medium text-sm ${role === 'admin' ? 'text-primary-900' : 'text-gray-900'}`}>
                        Coordinador
                      </div>
                      <div className="text-xs text-gray-500">
                        Panel administrativo
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={() => handleLogin(role)}
              disabled={loading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <span>
                    Ingresar como {role === 'student' ? 'Estudiante' : 'Coordinador'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-gray-500">
            Esta es una versión de demostración
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <span className="flex items-center space-x-1">
              <BookOpen className="h-3 w-3" />
              <span>Sistema de Bienestar</span>
            </span>
            <span>•</span>
            <span>Versión 1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};