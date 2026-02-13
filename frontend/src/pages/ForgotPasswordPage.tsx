import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import api from '../api/axios';

interface ForgotFormData {
  email: string;
}

export const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotFormData>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ForgotFormData) => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      await api.post('/auth/forgot-password', data);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.response?.data?.message || 'Щось пішло не так');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
        <div className="max-w-md w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-2xl shadow-lime-500/20 p-8 text-center border border-lime-500/30">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-cyan-500 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-glow-lime">
            ✉️
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-2">Лист відправлено!</h2>
          <p className="text-slate-400 mb-6">
            Ми надіслали інструкції з відновлення пароля на вашу електронну пошту.
          </p>
          <Link to="/login" className="text-lime-400 hover:text-lime-300 font-medium transition">
            Повернутися на сторінку входу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="max-w-md w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-2xl shadow-lime-500/20 p-8 border border-lime-500/30">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Відновлення пароля
        </h2>

        <p className="text-sm text-slate-400 text-center mb-6">
          Введіть email, який ви використовували при реєстрації, і ми надішлемо вам посилання для зміни пароля.
        </p>

        {status === 'error' && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm text-center border border-red-500/50">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-900 font-bold rounded-lg shadow-glow-lime hover:shadow-glow-lime-strong transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Відправка...' : 'Надіслати посилання'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-slate-400 hover:text-lime-300 transition">
            Назад до входу
          </Link>
        </div>
      </div>
    </div>
  );
};