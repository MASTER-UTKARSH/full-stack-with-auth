import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(10, 8, 20, 0.7)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      padding: '16px 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{
          fontSize: '24px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none',
          letterSpacing: '-0.5px'
        }}>
          Aura
        </Link>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'white'
                }}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  {user.username}
                </span>
              </div>
              <Link to="/create" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                New Post
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '14px' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
