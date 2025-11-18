import React, { useEffect, useState } from 'react';
import { UserIcon, LogOutIcon } from '../../components/icons';
import { getApp, getApps } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

export default function Header({ user, handleSignOut, loading, stats = { followers: 0, following: 0 } }) {
  const [profileDoc, setProfileDoc] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    setProfileDoc(null);
    setProfileError('');
    setProfileLoading(true);

    if (!user || !user.uid) {
      setProfileLoading(false);
      return;
    }

    if (!getApps().length) {
      // Firebase app not initialized – bail out gracefully.
      setProfileError('Firebase app is not initialized');
      setProfileLoading(false);
      return;
    }

    const app = getApp();
    const db = getFirestore(app);
    const ref = doc(db, 'users', user.uid);

    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) setProfileDoc(snap.data());
        else setProfileDoc(null);
        setProfileLoading(false);
      },
      (err) => {
        console.error('Header: firestore error', err);
        setProfileError('Failed to load profile data');
        setProfileLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  // Derive display values: prefer Firestore profileDoc, then auth `user`, then defaults.
  const displayName = profileDoc?.name || user?.displayName || 'User';
  const displayBio = profileDoc?.bio || user?.providerData?.[0]?.bio || 'This runner loves long trails, PB chasing, and coffee.';

  const followersCount = Array.isArray(profileDoc?.followers)
    ? profileDoc.followers.length
    : (profileDoc?.followers ?? stats.followers ?? 0);

  const followingCount = Array.isArray(profileDoc?.following)
    ? profileDoc.following.length
    : (profileDoc?.following ?? stats.following ?? 0);

  return (
    <div className="py-6 px-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-indigo-100 object-cover"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/96x96/93c5fd/ffffff?text=U'; }}
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
                <div className="font-semibold text-gray-800">{followersCount}</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-800">{followingCount}</div>
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
        {profileLoading ? (
          <p className="text-sm text-gray-500">Loading profile…</p>
        ) : profileError ? (
          <p className="text-sm text-red-600">{profileError}</p>
        ) : (
          <p className="max-w-2xl">{displayBio}</p>
        )}
      </div>
    </div>
  );
}
