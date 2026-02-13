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
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-10 rounded-2xl shadow-2xl shadow-lime-500/20 max-w-2xl border border-lime-500/30">
          <h1 className="text-4xl font-extrabold mb-6">
            Вітаємо в <span className="bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">AuthSys</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Щоб побачити список наших користувачів та отримати доступ до повного функціоналу, будь ласка, увійдіть у свій акаунт.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/login" 
              className="px-8 py-3 bg-gradient-to-r from-lime-500 to-lime-400 text-slate-900 font-semibold rounded-lg shadow-glow-lime hover:shadow-glow-lime-strong transition"
            >
              Увійти
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-lime-300 font-semibold rounded-lg border border-lime-500/50 transition shadow-glow-lime/50 hover:shadow-glow-lime"
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">Спільнота</h1>
          <p className="text-slate-400 mt-2">Привіт, <span className="text-lime-300">{user?.fullName}</span>! Ось список усіх зареєстрованих користувачів.</p>
        </div>
        <div className="bg-slate-800/80 text-lime-300 px-4 py-2 rounded-lg text-sm font-medium border border-lime-500/50 shadow-lg shadow-lime-500/20">
          Всього користувачів: {usersList.length}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-400">Завантаження списку...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersList.map((u) => (
            <div key={u._id} className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-lime-500/40 hover:border-lime-400/70 hover:shadow-glow-lime transition flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-400 to-cyan-500 flex items-center justify-center overflow-hidden shrink-0 group-hover:shadow-glow-lime">
                {u.avatarUrl ? (
                  <img src={u.avatarUrl} alt={u.fullName} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-slate-900 font-bold text-lg">{u.fullName?.[0]?.toUpperCase()}</span>
                )}
              </div>
              
              <div className="overflow-hidden">
                <h3 className="font-bold text-lime-300 truncate">{u.fullName}</h3>
                <p className="text-sm text-slate-400 truncate">{u.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};