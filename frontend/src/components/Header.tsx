import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-lime-500/30 sticky top-0 z-50 shadow-lg shadow-lime-500/10">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-cyan-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-lg group-hover:rotate-12 transition-transform group-hover:shadow-glow-lime">
            A
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">AuthSys</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-700/50 transition-all border border-lime-500/30 hover:border-lime-400/60 hover:shadow-glow-lime"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-lime-400 to-slate-600 border border-lime-400/50">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.fullName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lime-400 to-cyan-500 text-slate-900 font-bold text-sm">
                      {getInitials(user?.fullName || '')}
                    </div>
                  )}
                </div>
                
                <span className="font-medium text-lime-300 text-sm hidden sm:block">
                  {user?.fullName}
                </span>
              </Link>

              <button 
                onClick={logout}
                className="text-sm text-slate-400 hover:text-red-400 font-medium px-3 py-1 rounded-md hover:bg-red-500/10 transition border border-transparent hover:border-red-500/30"
              >
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-slate-400 hover:text-lime-300 font-medium px-3 py-1 rounded-md hover:bg-slate-700/50 transition"
              >
                Увійти
              </Link>
              <Link
                to="/register"
                className="text-sm bg-lime-500 hover:bg-lime-400 text-slate-900 font-bold px-4 py-2 rounded-lg transition shadow-glow-lime hover:shadow-glow-lime-strong"
              >
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;