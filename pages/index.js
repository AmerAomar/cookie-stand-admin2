// pages/index.js
import Head from 'next/head';
import { useState } from 'react';
import { useAuth } from '../contexts/auth';
import Header from './components/Header';
import Home from './Home';

export default function Index() {
  const { login, user, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(username, password);
      // Reset the form fields and error state
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  // Conditionally render either the LoginForm or the Home component based on the user's authentication status
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Head>
        <title>Cookie Stand Admin</title>
      </Head>
      {user ? (
        <>
          <Home />
        </>
      ) : (
        <main className="space-y-4">
          <form onSubmit={handleSubmit} className="bg-green-300 p-6 rounded-lg shadow-md w-96">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border rounded w-full bg-white"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border rounded w-full bg-white"
              />
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              type="submit"
              className="mt-4 p-2 w-full text-white bg-green-500 rounded hover:bg-darkGreen transition duration-200"
            >
              Login
            </button>
          </form>
        </main>
      )}
    </div>
  );
}
