import React, { useState } from 'react';
import { UserIcon, LogOutIcon, LeaderboardIcon, TrophyIcon, BoltIcon, ChartIcon, RunningShoeIcon } from '../components/icons';
import Races from './profile/Races';
import Runs from './profile/Runs';
import PersonalBests from './profile/PersonalBests';
import Stats from './profile/Stats';
import HighlightsCarousel from './profile/HighlightsCarousel';
import Header from './profile/Header';

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
    <div className="w-full max-w-3xl mx-auto">
            <Header user={user} handleSignOut={handleSignOut} loading={loading} stats={stats} />

            {/* Carousel (extracted) */}
            <HighlightsCarousel items={carouselItems} />

            {/* Tabs */}
            <div className="mt-6 py-6 px-4">
                <div className="flex space-x-2 border-b border-gray-100 pb-2">
                    <button onClick={() => setProfileTab('runs')} className={`flex items-center space-x-2 pb-2 ${profileTab==='runs' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'}`}>
                        <RunningShoeIcon className="w-5 h-5" />
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
