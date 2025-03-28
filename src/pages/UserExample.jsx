import React, { useEffect, useState } from 'react';
import { getProtectedData } from '../services/authApi';
import { logout } from '../services/authApi';

const UserInfoPage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Send GET request to protected route with credentials (cookies)
    getProtectedData()
    .then(response => {
        console.log(response)
      setUser(response);  // Assuming the response contains user data
    })
    .catch(err => {
      setError('Failed to fetch user data. Please ensure you are logged in.');
      console.error(err).response || err;
    });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Loading user info...</div>;
  }
  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }
  return (
    <div>
      <h1>User Information</h1>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserInfoPage;