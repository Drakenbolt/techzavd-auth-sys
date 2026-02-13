import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:rotate-12 transition-transform">
            A
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">AuthSys</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.fullName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold text-sm">
                      {getInitials(user?.fullName || '')}
                    </div>
                  )}
                </div>
                
                <span className="font-medium text-gray-700 text-sm hidden sm:block">
                  {user?.fullName}
                </span>
              </Link>

              <button 
                onClick={logout}
                className="text-sm text-gray-500 hover:text-red-600 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition"
              >
                Вийти
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Вхід
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
              >
                Реєстрація
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;