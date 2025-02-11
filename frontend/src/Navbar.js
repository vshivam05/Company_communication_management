import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = ({ isAuthenticated, isAdmin}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const onLogout = () => {
    if(localStorage.getItem('adminToken') !== null){
      localStorage.removeItem('adminToken');
    }
    navigate('/');
  }

  const landingLinks = [
    { to: '/admin/login', label: 'Admin' },
    { to: '/user/login', label: 'User ' }
  ];

  const userLinks = [
    { to: '/log-communication', label: 'Log Communication' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  const adminLinks = [
    { to: '/companies', label: 'Company Management' },
    { to: '/communication-methods', label: 'Communication Methods' },
    ...userLinks
  ];

  const isLoginPage = location.pathname.includes('/login');
  const isHomePage = location.pathname === '/';
  const links = isHomePage
    ? landingLinks
    : isLoginPage
    ? []
    : isAdmin
    ? adminLinks
    : userLinks;

  return (
    <nav className="bg-teal-600 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <ul className="flex justify-center sm:justify-start space-x-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-white font-semibold transition-all duration-200 ${
                    isActive ? 'bg-indigo-700 px-3 py-1.5 rounded-lg shadow-sm' : 'hover:bg-indigo-700/90 px-3 py-1.5 rounded-lg'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          {isAuthenticated && (
            <li>
              <button
                onClick={onLogout}
                className="text-white font-semibold hover:bg-indigo-800 px-4 py-1.5 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
