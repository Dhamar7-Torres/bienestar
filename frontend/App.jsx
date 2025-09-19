import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Navigation } from './components/common/Navigation';
import { LoadingPage } from './components/common/LoadingSpinner';

// Componente de Login
import { LoginPage } from './components/auth/LoginPage';

// Componentes de Estudiante
import { Dashboard } from './components/student/Dashboard';
import { WeeklyEvaluation } from './components/student/WeeklyEvaluation';
import { Resources } from './components/student/Resources';

// Componentes de Admin
import { GeneralSummary } from './components/admin/GeneralSummary';
import { StudentsList } from './components/admin/StudentsList';
import { AlertsSystem } from './components/admin/AlertsSystem';

// Hooks
import { useAuth, AuthProvider } from './hooks/useAuth';

const AppContent = () => {
  const { user, login, logout, loading, isAdmin } = useAuth();
  const [activeView, setActiveView] = useState(isAdmin ? 'summary' : 'dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Simulación de login automático para desarrollo (opcional)
  React.useEffect(() => {
    if (!user && !loading) {
      // Comentar estas líneas para mostrar la pantalla de login
      /*
      const demoUser = {
        id: 1,
        nombre: 'Ana García López',
        email: 'ana.garcia@universidad.edu',
        carrera: 'Ingeniería de Sistemas',
        semestre: 6
      };
      
      login(demoUser, 'student'); // o 'admin'
      */
    }
  }, [user, loading, login]);

  if (loading) {
    return <LoadingPage message="Cargando Mi Bienestar DACYTI..." />;
  }

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
  };

  const handleEvaluationComplete = (evaluation) => {
    // Cambiar a dashboard después de completar evaluación
    setActiveView('dashboard');
    console.log('Evaluación completada:', evaluation);
  };

  const handleLogout = () => {
    logout();
    setActiveView('dashboard');
    setSidebarOpen(true);
  };

  const renderContent = () => {
    if (isAdmin) {
      // Vistas de Administrador
      switch (activeView) {
        case 'summary':
          return <GeneralSummary />;
        case 'students':
          return <StudentsList />;
        case 'alerts':
          return <AlertsSystem />;
        case 'resources-admin':
          return (
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Gestión de Recursos
                </h2>
                <p className="text-gray-600">
                  Esta funcionalidad estará disponible próximamente.
                </p>
              </div>
            </div>
          );
        default:
          return <GeneralSummary />;
      }
    } else {
      // Vistas de Estudiante
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
        alertsCount={5}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onNotificationsClick={() => isAdmin ? setActiveView('alerts') : console.log('Notifications')}
        onLogout={handleLogout}
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
            <div className="fade-in">
              {renderContent()}
            </div>
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

// App principal con AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;