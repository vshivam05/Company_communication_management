import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const links = [
    { to: '/calendar', label: 'Calendar View' },
    { to: '/companies', label: 'Company Management' },
    { to: '/log-communication', label: 'Log Communication' },
    { to: '/notifications', label: 'Notifications' },
    { to: '/communication-methods', label: 'Communication Methods' },
    { to: '/dashboard', label: 'Dashboard' }, // New link for Dashboard
  ];

  return (
    <nav className="bg-blue-600 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <ul className="flex justify-center sm:justify-start space-x-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-white font-semibold transition-colors ${
                    isActive ? 'underline text-blue-300' : 'hover:text-blue-200'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
