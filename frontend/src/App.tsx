import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center mt-20">Завантаження...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Статус авторизації</h1>
        
        {isAuthenticated ? (
          <div>
            <p className="text-green-600 font-bold text-xl mb-2">Ви увійшли як: {user?.fullName}</p>
            <p className="text-gray-500 mb-4">Email: {user?.email}</p>
            <button 
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Вийти
            </button>
          </div>
        ) : (
          <div>
            <p className="text-red-500 text-xl mb-4">Ви не авторизовані ❌</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Увійти (Поки що не працює)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;