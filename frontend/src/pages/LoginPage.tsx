import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types/auth'; 

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const loginResponse = await api.post<{ access_token: string }>('/auth/login', data);
      const token = loginResponse.data.access_token;

      localStorage.setItem('token', token);

      const userResponse = await api.get<User>('/auth/profile');

      login(token, userResponse.data);

      navigate('/');
      
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError('Щось пішло не так. Спробуйте пізніше.');
      }
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Авторизація
        </h2>

        {serverError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Введіть email',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некоректний email'
                }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition
                ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Пароль</label>
              <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Забули пароль?
              </Link>
            </div>
            <input
              type="password"
              {...register('password', { required: 'Введіть пароль', minLength: { value: 6, message: 'Мінімум 6 символів' } })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition
                ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 text-white font-bold rounded-lg shadow-md transition duration-300
              ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
          >
            {isLoading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Ще не маєте акаунту?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Зареєструватися
          </Link>
        </p>
      </div>
    </div>
  );
};