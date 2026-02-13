import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import type { User } from '../types/auth';

export const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUsers = async () => {
        setIsLoading(true);
        try {
          const response = await api.get<User[]>('/users');
          setUsersList(response.data);
        } catch (error) {
          console.error('Не вдалося завантажити користувачів', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUsers();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            Вітаємо в <span className="text-blue-600">AuthSys</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Щоб побачити список наших користувачів та отримати доступ до повного функціоналу, будь ласка, увійдіть у свій акаунт.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              Увійти
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition"
            >
              Реєстрація
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Спільнота</h1>
          <p className="text-gray-500 mt-2">Привіт, {user?.fullName}! Ось список усіх зареєстрованих користувачів.</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
          Всього користувачів: {usersList.length}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-gray-500">Завантаження списку...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersList.map((u) => (
            <div key={u._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                {u.avatarUrl ? (
                  <img src={u.avatarUrl} alt={u.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 font-bold text-lg">{u.fullName?.[0]?.toUpperCase()}</span>
                )}
              </div>
              
              <div className="overflow-hidden">
                <h3 className="font-bold text-gray-800 truncate">{u.fullName}</h3>
                <p className="text-sm text-gray-500 truncate">{u.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};