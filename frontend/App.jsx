import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { LoadingPage } from './components/common/LoadingSpinner';

// Student Components
import { Dashboard } from './components/student/Dashboard';
import { WeeklyEvaluation } from './components/student/WeeklyEvaluation';
import { Resources } from './components/student/Resources';

// Admin Components
import { GeneralSummary } from './components/admin/GeneralSummary';
import { StudentsList } from './components/admin/StudentsList';
import { AlertsSystem } from './components/admin/AlertsSystem';

// Auth Hook
import { useAuth, AuthProvider } from './hooks/useAuth';

const AppContent = () => {
  const { user, login, logout, loading, isAdmin } = useAuth();
  const [activeView, setActiveView] = useState(isAdmin ? 'summary' : 'dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Simulación de login para desarrollo
  React.useEffect(() => {
    if (!user && !loading) {
      // Para demo: login automático como estudiante
      // En producción, esto vendría de un form de login real
      const demoUser = {
        id: 1,
        nombre: 'Ana García López',
        email: 'ana.garcia@universidad.edu',
        carrera: 'Ingeniería de Sistemas',
        semestre: 6
      };
      
      // Cambiar entre 'student' y 'admin' para probar diferentes vistas
      login(demoUser, 'student'); // o 'admin' para vista administrativa
    }
  }, [user, loading, login]);

  if (loading) {
    return <LoadingPage message="Cargando aplicación..." />;
  }

  if (!user) {
    return <LoginScreen onLogin={login} />;
  }

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
  };

  const handleEvaluationComplete = (evaluation) => {
    // Cambiar a dashboard después de completar evaluación
    setActiveView('dashboard');
    // Aquí podrías agregar notificaciones, etc.
  };

  const renderContent = () => {
    if (isAdmin) {
      switch (activeView) {
        case 'summary':
          return <GeneralSummary />;
        case 'students':
          return <StudentsList />;
        case 'alerts':
          return <AlertsSystem />;
        default:
          return <GeneralSummary />;
      }
    } else {
      switch (activeView) {
        case 'dashboard':
          return <Dashboard studentId={user.id} />;
        case 'evaluation':
          return (
            <WeeklyEvaluation 
              studentId={user.id} 
              onEvaluationComplete={handleEvaluationComplete}
            />
          );
        case 'resources':
          return <Resources studentId={user.id} />;
        default:
          return <Dashboard studentId={user.id} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        title="Mi Bienestar DACYTI"
        user={user}
        alertsCount={5} // Este valor vendría de un hook o estado global
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onNotificationsClick={() => isAdmin ? setActiveView('alerts') : console.log('Notifications')}
      />

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className={`${sidebarOpen ? 'block' : 'hidden'} lg:block fixed lg:static inset-y-0 z-50`}>
          <Navigation
            activeView={activeView}
            onViewChange={handleViewChange}
            userRole={user.role}
          />
        </div>

        {/* Main Content */}
        <div className={`flex-1 ${sidebarOpen ? 'lg:ml-64' : ''} min-h-screen`}>
          <main className="pt-0">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Simple Login Screen para desarrollo
const LoginScreen = ({ onLogin }) => {
  const [role, setRole] = useState('student');

  const handleLogin = (selectedRole) => {
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
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Mi Bienestar DACYTI</h2>
          <p className="mt-2 text-gray-600">
            Sistema de detección automática de factores de riesgo psicosocial
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona tu rol para la demo:
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="student">Estudiante</option>
              <option value="admin">Coordinador/Admin</option>
            </select>
          </div>
          
          <button
            onClick={() => handleLogin(role)}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Ingresar como {role === 'student' ? 'Estudiante' : 'Administrador'}
          </button>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>Esta es una versión de demostración.</p>
          <p>En producción, aquí habría un login real con credenciales.</p>
        </div>
      </div>
    </div>
  );
};

// App principal con AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;