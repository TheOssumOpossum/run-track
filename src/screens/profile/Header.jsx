import React from 'react';
import { UserIcon, LogOutIcon } from '../../components/icons';

export default function Header({ user, handleSignOut, loading, stats = { followers: 0, following: 0 } }) {
  const displayName = user?.displayName || 'User';
  const displayBio = user?.providerData?.[0]?.bio ?? 'This runner loves long trails, PB chasing, and coffee.';

  return (
    <div>
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
              <h2 className="text-2xl font-bold text-gray-800">{displayName}</h2>
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
        <p className="max-w-2xl">{displayBio}</p>
      </div>
    </div>
  );
}
