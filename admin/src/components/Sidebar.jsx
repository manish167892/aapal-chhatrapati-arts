import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Box, LogOut } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col h-full shadow-lg">
            <div className="p-6">
                <h2 className="text-2xl font-bold tracking-wider">Admin Panel</h2>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-4">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                >
                    <LayoutDashboard size={20} />
                    Overview
                </NavLink>
                <NavLink
                    to="/products"
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                >
                    <Package size={20} />
                    Products
                </NavLink>
                <NavLink
                    to="/inventory"
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                >
                    <Box size={20} />
                    Inventory
                </NavLink>
            </nav>
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={onLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-red-600 transition-colors"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
