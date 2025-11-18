import React, { useState } from 'react';
import { UserIcon, LogOutIcon, ActivityIcon, TrophyIcon, BoltIcon, ChartIcon } from '../components/icons';
import Races from './profile/Races';
import Runs from './profile/Runs';
import PersonalBests from './profile/PersonalBests';
import Stats from './profile/Stats';
import HighlightsCarousel from './profile/HighlightsCarousel';

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

            {/* Carousel (extracted) */}
            <HighlightsCarousel items={carouselItems} />

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
                        <span className="text-sm">Personal Bests</span>
                    </button>
                    <button onClick={() => setProfileTab('stats')} className={`flex items-center space-x-2 pb-2 ${profileTab==='stats' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>
                        <ChartIcon className="w-5 h-5" />
                        <span className="text-sm">Statistics</span>
                    </button>
                </div>

                {/* Tab content placeholders */}
                <div className="mt-4">
                    {profileTab === 'runs' && <Runs />}
                    {profileTab === 'races' && <Races user={user} />}
                    {profileTab === 'pbs' && <PersonalBests />}
                    {profileTab === 'stats' && <Stats />}
                </div>
            </div>

        </div>
    );
}
