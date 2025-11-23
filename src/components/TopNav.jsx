import React, { useState, useRef, useEffect } from 'react';
import { RunningShoeIcon, BellIcon, MenuIcon, LogOutIcon } from './icons';

export default function TopNav({ handleSignOut, loading }) {
    const [openBell, setOpenBell] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const bellRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleDocClick = (e) => {
            // If click is outside bell and menu containers, close both
            if (bellRef.current && bellRef.current.contains(e.target)) {
                return;
            }
            if (menuRef.current && menuRef.current.contains(e.target)) {
                return;
            }
            setOpenBell(false);
            setOpenMenu(false);
        };

        const handleKey = (e) => {
            if (e.key === 'Escape') {
                setOpenBell(false);
                setOpenMenu(false);
            }
        };

        document.addEventListener('click', handleDocClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('click', handleDocClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, []);

    return (
        <header className="w-full bg-white border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-full">
                        <RunningShoeIcon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg text-gray-800">RunTrack</span>
                </div>

                <div className="flex items-center space-x-3 relative">
                    {/* Notifications */}
                    <div className="relative" ref={bellRef}>
                        <button aria-label="Notifications" onClick={() => { setOpenBell(!openBell); setOpenMenu(false); }} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                            <BellIcon className="w-5 h-5 text-gray-700" />
                        </button>
                        {openBell && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg z-20">
                                <ul className="py-2">
                                    <li className="px-4 py-2 text-sm text-gray-700">Notification 1</li>
                                    <li className="px-4 py-2 text-sm text-gray-700">Notification 2</li>
                                    <li className="px-4 py-2 text-sm text-gray-700">Notification 3</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Menu/Hamburger */}
                    <div className="relative" ref={menuRef}>
                        <button aria-label="Menu" onClick={() => { setOpenMenu(!openMenu); setOpenBell(false); }} className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                            <MenuIcon className="w-5 h-5 text-gray-700" />
                        </button>
                        {openMenu && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-lg shadow-lg z-20">
                                <ul className="py-2">
                                    <li className="px-4 py-2 text-sm text-gray-700">Profile</li>
                                    <li className="px-4 py-2 text-sm text-gray-700">Settings</li>
                                    <li className="px-4 py-2 text-sm text-gray-700">Help</li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                if (handleSignOut) handleSignOut();
                                                setOpenMenu(false);
                                            }}
                                            disabled={loading}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center space-x-2"
                                        >
                                            <LogOutIcon className="w-4 h-4" />
                                            <span>{loading ? 'Signing out…' : 'Sign out'}</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
