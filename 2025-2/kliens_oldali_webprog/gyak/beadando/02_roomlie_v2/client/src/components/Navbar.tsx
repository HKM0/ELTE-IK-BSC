import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout, selectUser } from '../store/authSlice';
import { showToast } from '../store/toastSlice';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // sotet mod kezel
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showToast({ message: 'Sikeres kijelentkezés!', type: 'success' }));
    navigate('/login');
  };

  return (
    <nav className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-card border-b border-border mb-6 shadow-sm text-foreground">
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-primary">Roomlie</Link>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Terem oldal</Link>

            {!user && (
              <>
                <Link to="/login" className="hover:text-primary transition-colors">Bejelentkezés</Link>
                <Link to="/register" className="hover:text-primary transition-colors">Regisztráció</Link>
              </>
            )}

            {user?.role === 'user' && (
              <Link to="/my-bookings" className="hover:text-primary transition-colors">Foglalásaim</Link>
            )}

            {user?.role === 'admin' && (
              <>
                <Link to="/admin-bookings" className="hover:text-primary transition-colors">Beérkezett foglalások</Link>
              </>
            )}
          </div>
        </div>

        {/* telefon menu gomb */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-muted"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* telefon navigacio */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col gap-4 mt-4 pb-4 border-b border-border text-sm font-medium`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Terem oldal</Link>
        {!user && (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Bejelentkezés</Link>
            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Regisztráció</Link>
          </>
        )}
        {user?.role === 'user' && (
          <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Foglalásaim</Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin-bookings" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Beérkezett foglalások</Link>
        )}
      </div>

      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-start md:items-center gap-4 text-sm mt-4 md:mt-0`}>
        {/* sotet es vilagos mod valt */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full md:w-auto p-2 rounded-md bg-secondary text-secondary-foreground hover:opacity-95 transition-opacity text-left"
        >
          {darkMode ? 'Világos mód' : 'Sötét mód'}
        </button>

        {user && (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
            <span className="text-muted-foreground">
              {user.name} {user.role === 'admin' && <span className="ml-1 px-1.5 py-0.5 text-xs bg-destructive text-destructive-foreground rounded font-bold">ADMIN</span>}
            </span>
            <button
              onClick={handleLogout}
              className="w-full md:w-auto px-3 py-1.5 bg-secondary text-secondary-foreground rounded hover:opacity-90 transition-opacity"
            >
              Kijelentkezés
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}