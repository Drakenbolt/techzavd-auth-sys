import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types/auth';

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError(null);

    try {
      await api.post('/users', data);

      const loginResponse = await api.post<{ access_token: string }>('/auth/login', {
        email: data.email,
        password: data.password
      });

      const token = loginResponse.data.access_token;
      localStorage.setItem('token', token);

      const userResponse = await api.get<User>('/auth/profile');
      
      login(token, userResponse.data);
      navigate('/');
      
    } catch (err: any) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        const message = err.response.data.message;
        setServerError(Array.isArray(message) ? message[0] : message);
      } else {
        setServerError('Помилка реєстрації. Спробуйте інший email.');
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
          Створити акаунт
        </h2>

        {serverError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Повне ім'я</label>
            <input
              type="text"
              {...register('fullName', { required: "Введіть ваше ім'я" })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition
                ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Іван Петренко"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Введіть email',
                pattern: { value: /^\S+@\S+$/i, message: 'Некоректний email' }
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="example@mail.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              {...register('password', { required: 'Придумайте пароль', minLength: { value: 6, message: 'Мінімум 6 символів' } })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition
                ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
            {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Вже є акаунт?{' '}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
};