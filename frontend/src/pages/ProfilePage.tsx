import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="text-center mt-10 text-slate-400">Завантаження профілю...</div>;
  }

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent mb-6">Мій профіль</h1>

      <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-lime-500/20 border border-lime-500/40 overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-lime-500/30 to-cyan-500/30 border-b border-lime-500/40">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-lime-400 bg-slate-800 p-1 shadow-glow-lime">
              <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center text-4xl text-lime-300 font-bold">
                {user.avatarUrl ? (
                  <img 
                    src={user.avatarUrl} 
                    alt={user.fullName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(user.fullName)
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-lime-300">{user.fullName}</h2>
              <p className="text-slate-400">{user.email}</p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lime-500/30 text-lime-300 border border-lime-500/60 shadow-glow-lime/50">
                🟢 Активний користувач
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="px-4 py-2 border border-red-500/50 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
            >
              Вийти з акаунту
            </button>
          </div>

          <hr className="my-6 border-lime-500/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-lime-400 uppercase tracking-wider mb-2">
                Контактна інформація
              </h3>
              <div className="bg-slate-700/60 backdrop-blur-sm border border-lime-500/40 rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-xs text-slate-400 block">Email</label>
                  <span className="text-lime-300 font-medium">{user.email}</span>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block">User ID</label>
                  <span className="text-xs text-slate-300 font-mono bg-slate-700/50 px-2 py-1 rounded border border-lime-500/30">
                    {user._id}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-lime-400 uppercase tracking-wider mb-2">
                Налаштування безпеки
              </h3>
              <div className="bg-slate-700/60 backdrop-blur-sm border border-lime-500/40 rounded-lg p-4">
                <p className="text-sm text-slate-300 mb-3">
                  Ви можете змінити свій пароль, скориставшись формою відновлення пароля після виходу з системи.
                </p>
                <button 
                  disabled 
                  className="text-sm text-slate-500 cursor-not-allowed border border-dashed border-slate-600 px-3 py-1 rounded"
                >
                  Змінити пароль (скоро)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};