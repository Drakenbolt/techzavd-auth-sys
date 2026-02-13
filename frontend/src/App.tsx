import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} 
        />

        <Route 
          path="/forgot-password" element={<ForgotPasswordPage />} 
        />
        <Route 
          path="/reset-password" element={<ResetPasswordPage />} 
        />

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-center">
          <h1 className="text-4xl font-bold text-lime-400 mb-4">404</h1>
          <p className="text-xl text-slate-300">Сторінку не знайдено</p>
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;