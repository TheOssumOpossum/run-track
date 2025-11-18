import React, { useState } from 'react';
import { UserIcon, LogOutIcon, ActivityIcon, TrophyIcon, BoltIcon, ChartIcon } from '../components/icons';
import RacesScreen from './RacesScreen';

export default function ProfileScreen({ user, handleSignOut, loading, appId }) {
    const [profileTab, setProfileTab] = useState('runs'); // runs | races | pbs | stats

    const carouselItems = [
        { id: 1, title: 'Recent Adventure', text: 'Sunrise trail run in the hills.' },
        { id: 2, title: 'Gear Highlight', text: 'Tried new trail shoes this week.' },
        { id: 3, title: 'Weekly Summary', text: '20 miles total, great progress.' },
    ];

    const stats = {
        followers: 124,
        following: 89,
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-6 px-4">
            {/* Top header: avatar left, name & counts center, sign out top-right */}
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-20 h-20 rounded-full border-2 border-indigo-100 object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/96x96/93c5fd/ffffff?text=U'; }}
                        />
                    ) : (
                        <UserIcon className="w-16 h-16 text-indigo-500" />
                    )}

                    <div className="pt-1">
                        <div className="flex items-end space-x-4">
                            <h2 className="text-2xl font-bold text-gray-800">{user?.displayName || 'User'}</h2>
                        </div>
                        <div className="mt-2 flex space-x-6 text-sm text-gray-600">
                            <div className="text-center">
                                <div className="font-semibold text-gray-800">{stats.followers}</div>
                                <div className="text-xs text-gray-400">Followers</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-gray-800">{stats.following}</div>
                                <div className="text-xs text-gray-400">Following</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ml-4">
                    <button onClick={handleSignOut} disabled={loading} className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                        {loading ? 'Signing out...' : <span className="inline-flex items-center"><LogOutIcon className="w-4 h-4 mr-1" />Sign out</span>}
                    </button>
                </div>
            </div>

            {/* Bio */}
            <div className="mt-4 text-gray-700 text-sm">
                {user?.photoURL || user?.displayName ? (
                    <p className="max-w-2xl">{user?.providerData?.[0]?.bio || 'This runner loves long trails, PB chasing, and coffee.'}</p>
                ) : (
                    <p className="max-w-2xl">This runner loves long trails, PB chasing, and coffee.</p>
                )}
            </div>

            {/* Carousel */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Highlights</h3>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    {carouselItems.map(item => (
                        <div key={item.id} className="min-w-[220px] bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                            <div className="font-semibold text-gray-800">{item.title}</div>
                            <div className="text-sm text-gray-600 mt-2">{item.text}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-6">
                <div className="flex space-x-2 border-b border-gray-100 pb-2">
                    <button onClick={() => setProfileTab('runs')} className={`flex items-center space-x-2 pb-2 ${profileTab==='runs' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>
                        <ActivityIcon className="w-5 h-5" />
                        <span className="text-sm">Runs</span>
                    </button>
                    <button onClick={() => setProfileTab('races')} className={`flex items-center space-x-2 pb-2 ${profileTab==='races' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>
                        <TrophyIcon className="w-5 h-5" />
                        <span className="text-sm">Races</span>
                    </button>
                    <button onClick={() => setProfileTab('pbs')} className={`flex items-center space-x-2 pb-2 ${profileTab==='pbs' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>
                        <BoltIcon className="w-5 h-5" />
                        <span className="text-sm">PBs</span>
                    </button>
                    <button onClick={() => setProfileTab('stats')} className={`flex items-center space-x-2 pb-2 ${profileTab==='stats' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>
                        <ChartIcon className="w-5 h-5" />
                        <span className="text-sm">Statistics</span>
                    </button>
                </div>

                {/* Tab content placeholders */}
                <div className="mt-4">
                    {profileTab === 'runs' && (
                        <div className="space-y-3">
                            <div className="bg-white border border-gray-100 rounded-lg p-3">Run placeholder card</div>
                            <div className="bg-white border border-gray-100 rounded-lg p-3">Run placeholder card</div>
                        </div>
                    )}
                    {profileTab === 'races' && (
                        <RacesScreen user={user} />
                    )}
                    {profileTab === 'pbs' && (
                        <div className="space-y-3 text-gray-600">PBs placeholder content</div>
                    )}
                    {profileTab === 'stats' && (
                        <div className="space-y-3 text-gray-600">Statistics placeholder content</div>
                    )}
                </div>
            </div>

        </div>
    );
}
