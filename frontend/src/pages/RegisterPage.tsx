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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="max-w-md w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-2xl shadow-lime-500/20 p-8 border border-lime-500/30">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-8">
          Створити акаунт
        </h2>

        {serverError && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm text-center border border-red-500/50">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-lime-300 mb-1">Повне ім'я</label>
            <input
              type="text"
              {...register('fullName', { required: "Введіть ваше ім'я" })}
              className={`w-full px-4 py-2 bg-slate-700/50 border rounded-lg focus:ring-2 outline-none transition text-slate-100 placeholder-slate-500
                ${errors.fullName ? 'border-red-500 focus:ring-red-400/50' : 'border-lime-500/30 focus:ring-lime-400/50'}`}
              placeholder="Іван Петренко"
            />
            {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-lime-300 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Введіть email',
                pattern: { value: /^\S+@\S+$/i, message: 'Некоректний email' }
              })}
              className={`w-full px-4 py-2 bg-slate-700/50 border rounded-lg focus:ring-2 outline-none transition text-slate-100 placeholder-slate-500
                ${errors.email ? 'border-red-500 focus:ring-red-400/50' : 'border-lime-500/30 focus:ring-lime-400/50'}`}
              placeholder="example@mail.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-lime-300 mb-1">Пароль</label>
            <input
              type="password"
              {...register('password', { required: 'Введіть пароль', minLength: { value: 6, message: 'Мінімум 6 символів' } })}
              className={`w-full px-4 py-2 bg-slate-700/50 border rounded-lg focus:ring-2 outline-none transition text-slate-100 placeholder-slate-500
                ${errors.password ? 'border-red-500 focus:ring-red-400/50' : 'border-lime-500/30 focus:ring-lime-400/50'}`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-900 font-bold rounded-lg shadow-glow-lime hover:shadow-glow-lime-strong transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Завантаження...' : 'Зареєструватися'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400 text-sm">
            Вже маєте акаунт?{' '}
            <Link to="/login" className="text-lime-400 hover:text-lime-300 font-medium transition">
              Увійти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};