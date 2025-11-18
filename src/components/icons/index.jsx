import React from 'react';

export const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
export const LogOutIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);
export const GoogleIcon = (props) => (
    <svg {...props} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.03l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c11.045 0 20-8.955 20-20 0-1.34-0.138-2.65-0.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691L1.696 9.077C3.255 5.232 7.234 2 12 2c5.385 0 9.77 2.91 12 7.042l-5.657 5.657C17.72 12.651 15.013 11 12 11c-4.305 0-8.084 3.42-9.358 7.915L6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.4-5.397l-6.326-4.991C29.431 35.857 26.83 37 24 37c-5.228 0-9.697-3.794-10.941-8.834L6.306 33.309C8.991 38.381 15.42 42 24 42c2.053 0 4.02-.382 5.86-1.096z"/><path fill="#1976D2" d="M43.611 20.083L43.595 20h-19.595v8h11.303c-0.792 2.237-2.231 4.166-4.088 5.568c0.001-0.001 0.002-0.002 0.003-0.003l-6.326 4.991C35.035 41.02 44 32.748 44 24c0-2.053-0.382-4.02-1.096-5.86z"/></svg>
);

export const HomeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75V21a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 21V9.75z" />
    </svg>
);
export const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
    </svg>
);
export const AddIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);
export const ActivityIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3l3 8 4-16 3 8h4" />
    </svg>
);

export const TrophyIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M5 3h14v4a3 3 0 01-3 3H8a3 3 0 01-3-3V3z" />
    </svg>
);
export const BoltIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);
export const ChartIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 14v-4M12 18v-10M17 10V7" />
    </svg>
);

export default {
    UserIcon,
    LogOutIcon,
    GoogleIcon,
    HomeIcon,
    SearchIcon,
    AddIcon,
    ActivityIcon,
    TrophyIcon,
    BoltIcon,
    ChartIcon,
};
