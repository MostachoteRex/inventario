import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/inventario" className="text-white hover:text-gray-200">
            Inventario
          </Link>
        </li>
        <li>
          <Link to="/ventas" className="text-white hover:text-gray-200">
            Ventas
          </Link>
        </li>
        <li>
          <Link to="/actualizar" className="text-white hover:text-gray-200">
            Actualizar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;