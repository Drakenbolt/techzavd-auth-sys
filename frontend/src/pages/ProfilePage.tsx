import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div className="text-center mt-10">Завантаження профілю...</div>;
  }

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Мій профіль</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="relative h-32 bg-linear-to-r from-blue-500 to-indigo-600">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-4xl text-gray-500 font-bold">
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
              <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Активний користувач
              </div>
            </div>
            
            <button 
              onClick={logout}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Вийти з акаунту
            </button>
          </div>

          <hr className="my-6 border-gray-100" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Контактна інформація
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-xs text-gray-400 block">Email</label>
                  <span className="text-gray-800 font-medium">{user.email}</span>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block">User ID</label>
                  <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
                    {user._id}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                Налаштування безпеки
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Ви можете змінити свій пароль, скориставшись формою відновлення пароля після виходу з системи.
                </p>
                <button 
                  disabled 
                  className="text-sm text-gray-400 cursor-not-allowed border border-dashed border-gray-300 px-3 py-1 rounded"
                >
                  Змінити пароль (cкоро)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};