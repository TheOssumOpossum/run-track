import React from 'react';
import { HomeIcon, SearchIcon, AddIcon, ActivityIcon, UserIcon } from './icons';

export default function BottomNav({ activeTab, setActiveTab }) {
    return (
        <nav className="w-full bg-white border-t border-gray-100 py-2 fixed bottom-0 left-0 right-0 sm:relative sm:rounded-t-xl sm:shadow-md">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <button onClick={() => setActiveTab('home')} className={`flex-1 py-2 flex flex-col items-center text-xs ${activeTab==='home' ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <HomeIcon className="w-6 h-6 mb-1" />
                        Home
                    </button>
                    <button onClick={() => setActiveTab('search')} className={`flex-1 py-2 flex flex-col items-center text-xs ${activeTab==='search' ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <SearchIcon className="w-6 h-6 mb-1" />
                        Search
                    </button>
                    <button onClick={() => setActiveTab('add')} className={`flex-1 py-2 flex flex-col items-center text-xs ${activeTab==='add' ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <div className="w-12 h-12 -mt-6 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg">
                            <AddIcon className="w-5 h-5" />
                        </div>
                        <span className="sr-only">Add</span>
                    </button>
                    <button onClick={() => setActiveTab('activity')} className={`flex-1 py-2 flex flex-col items-center text-xs ${activeTab==='activity' ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <ActivityIcon className="w-6 h-6 mb-1" />
                        Activity
                    </button>
                    <button onClick={() => setActiveTab('profile')} className={`flex-1 py-2 flex flex-col items-center text-xs ${activeTab==='profile' ? 'text-indigo-600' : 'text-gray-500'}`}>
                        <UserIcon className="w-6 h-6 mb-1" />
                        Profile
                    </button>
                </div>
            </div>
        </nav>
    );
}
