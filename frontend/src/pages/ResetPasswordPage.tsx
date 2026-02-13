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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
        <div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Помилка посилання</h2>
          <p className="text-gray-600 mb-4">Це посилання недійсне або в ньому відсутній токен.</p>
          <Link to="/login" className="text-blue-600 hover:underline">На головну</Link>
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            ✅
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Пароль змінено!</h2>
          <p className="text-gray-600 mb-6">
            Тепер ви можете увійти з новим паролем.
            <br />
            <span className="text-sm text-gray-400">(Перенаправлення через 3 сек...)</span>
          </p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Увійти зараз
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Новий пароль
        </h2>

        {status === 'error' && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Придумайте новий пароль</label>
            <input
              type="password"
              {...register('newPassword', { 
                required: 'Введіть пароль', 
                minLength: { value: 6, message: 'Мінімум 6 символів' } 
              })}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition
                ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="••••••••"
            />
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-3 text-white font-bold rounded-lg shadow-md transition duration-300
              ${status === 'loading' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {status === 'loading' ? 'Збереження...' : 'Змінити пароль'}
          </button>
        </form>
      </div>
    </div>
  );
};