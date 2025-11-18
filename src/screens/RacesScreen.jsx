import React, { useEffect, useState } from 'react';
import { getApp, getApps } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

export default function RacesScreen({ user }) {
  const [profileDoc, setProfileDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setProfileDoc(null);
    setError('');
    setLoading(true);

    if (!user || !user.uid) {
      setError('No user available');
      setLoading(false);
      return;
    }

    if (!getApps().length) {
      setError('Firebase app is not initialized');
      setLoading(false);
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
        setLoading(false);
      },
      (err) => {
        console.error('RacesScreen: firestore error', err);
        setError('Failed to load profile data');
        setLoading(false);
      }
    );

    return () => unsub();
  }, [user]);

  return (
    <div className="space-y-3 text-gray-600">
      <div className="bg-white border border-gray-100 rounded-lg p-3">
        {/* Dump user profile doc into this card */}
        {loading ? (
          <div className="text-sm text-gray-500">Loading profile…</div>
        ) : error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : profileDoc ? (
          <div className="text-sm text-gray-700">
            <div className="font-semibold text-gray-800">{profileDoc.name ?? user.displayName ?? 'User'}</div>
            <div className="text-xs text-gray-500 mt-1">{profileDoc.bio ?? 'No bio'}</div>
            <div className="mt-2 text-xs text-gray-600">Followers: {Array.isArray(profileDoc.followers) ? profileDoc.followers.length : (profileDoc.followers ?? '—')}</div>
            <div className="text-xs text-gray-600">Following: {Array.isArray(profileDoc.following) ? profileDoc.following.length : (profileDoc.following ?? '—')}</div>
          </div>
        ) : (
          <div className="text-sm text-gray-600">No profile document found for this user.</div>
        )}
      </div>

      <div className="bg-white border border-gray-100 rounded-lg p-3">Race placeholder card</div>
    </div>
  );
}
