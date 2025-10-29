import { useState } from 'react';
import "../styles/auth.css"
import { Link, useNavigate } from 'react-router-dom';

export const Auth = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!username || !password) {
        throw new Error('Please fill in all fields.');
      }      
      const response = await fetch("https://fakestoreapi.com/auth/login",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username, password
        })
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token",data.token)
        navigate("/")
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
            <div>
            <label>username:</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            </div>

            <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
            </button>
            <br/><br/>
            <label><span>Don't have an account? <Link to="/auth/register">Register</Link></span></label>
        </form>
        </div>
    </div>
  );
};


