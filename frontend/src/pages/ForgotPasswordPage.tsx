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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ✉️
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Лист відправлено!</h2>
          <p className="text-gray-600 mb-6">
            Ми надіслали інструкції з відновлення пароля на вашу електронну пошту.
          </p>
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Повернутися на сторінку входу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Відновлення пароля
        </h2>

        <p className="text-sm text-gray-500 text-center mb-6">
          Введіть email, який ви використовували при реєстрації, і ми надішлемо вам посилання для зміни пароля.
        </p>

        {status === 'error' && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center border border-red-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`w-full py-3 text-white font-bold rounded-lg shadow-md transition duration-300
              ${status === 'loading' ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {status === 'loading' ? 'Відправка...' : 'Надіслати посилання'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-gray-500 hover:text-gray-800">
            Назад до входу
          </Link>
        </div>
      </div>
    </div>
  );
};