import { useState } from 'react';
import "../styles/auth.css"
import { Link, useNavigate } from 'react-router-dom';

export const Auth = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields.');
      }      
      const response = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
        })
        const data = await response.json()
        if (response.ok) {
            localStorage.setItem("token",data.access_token)
            localStorage.setItem("refresh_token",data.refresh_token)
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
            <label>email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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


