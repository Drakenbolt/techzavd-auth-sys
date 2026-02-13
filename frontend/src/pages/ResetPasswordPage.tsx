import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

interface ResetFormData {
  newPassword: string;
}

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetFormData>();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-center px-4">
        <div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Помилка посилання</h2>
          <p className="text-slate-400 mb-4">Це посилання недійсне або в ньому відсутній токен.</p>
          <Link to="/login" className="text-lime-400 hover:text-lime-300 transition">На сторінку входу</Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ResetFormData) => {
    setStatus('loading');
    try {
      await api.post('/auth/reset-password', {
        token: token,
        newPassword: data.newPassword
      });
      setStatus('success');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.response?.data?.message || 'Посилання застаріло або недійсне');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
        <div className="max-w-md w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-2xl shadow-lime-500/20 p-8 text-center border border-lime-500/30">
          <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-cyan-500 text-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-glow-lime">
            ✅
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-2">Пароль змінено!</h2>
          <p className="text-slate-400 mb-6">
            Тепер ви можете увійти з новим паролем.
            <br />
            <span className="text-sm text-slate-500">(Перенаправлення через 3 сек...)</span>
          </p>
          <Link to="/login" className="inline-block bg-gradient-to-r from-lime-500 to-lime-400 text-slate-900 px-6 py-2 rounded-lg hover:shadow-glow-lime-strong transition shadow-glow-lime font-bold">
            Увійти зараз
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <div className="max-w-md w-full bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-2xl shadow-lime-500/20 p-8 border border-lime-500/30">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-6">
          Новий пароль
        </h2>

        {status === 'error' && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-sm text-center border border-red-500/50">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-lime-300 mb-1">Придумайте новий пароль</label>
            <input
              type="password"
              {...register('newPassword', { 
                required: 'Введіть пароль', 
                minLength: { value: 6, message: 'Мінімум 6 символів' } 
              })}
              className={`w-full px-4 py-2 bg-slate-700/50 border rounded-lg focus:ring-2 outline-none transition text-slate-100 placeholder-slate-500
                ${errors.newPassword ? 'border-red-500 focus:ring-red-400/50' : 'border-lime-500/30 focus:ring-lime-400/50'}`}
              placeholder="••••••••"
            />
            {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-900 font-bold rounded-lg shadow-glow-lime hover:shadow-glow-lime-strong transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Змінення пароля...' : 'Змінити пароль'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-slate-400 hover:text-lime-300 transition">
            Вернутися до входу
          </Link>
        </div>
      </div>
    </div>
  );
};