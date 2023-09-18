import { Link } from 'react-router-dom';
import React from 'react';
const Sidebar = () => {
    return (
        <div className="bg-gray-800 w-64 py-4 px-6 flex-shrink-0">
            <nav>
                <Link className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition duration-200 text-white" to="/Dashboard">Dashboard</Link>
                <Link className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition duration-200 text-white" to="/managers">Managers</Link>
                <Link className="block py-2.5 px-4 rounded-lg hover:bg-gray-700 transition duration-200 text-white" to="/login">Login</Link>
            </nav>
        </div>
    )
}

export default Sidebar