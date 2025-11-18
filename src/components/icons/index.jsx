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
export const LeaderboardIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Podium-style icon drawn with path d= attributes to match other icons */}
        <path d="M2 20V12h5v8H2z" />
        <path d="M9.5 20V6h5v14h-5z" />
        <path d="M17 20V16h5v4h-5z" />
    </svg>
);

export const RunningShoeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -588.5 2201 2201" strokeWidth="60" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* Simple running shoe outline with lace lines, drawn with path d= attributes */}
        <path d="M36.493482 977.39459h2117.908116l-7.474453-377.240017s-186.861314-311.288965-476.166595-366.248175S769.429507 39.570631 769.429507 39.570631s-175.869472 455.941606-696.443109 305.133534l-36.492916 18.466294v615.543152z"/>
        <path d="M51.002714 608.508373a481.003006 481.003006 0 0 1 197.853156-40.449979c93.21082 7.034779 175.869472-113.435809 190.378703-190.378703 0 0-355.256333-10.991842-366.248175-32.975526s-36.492915 18.466295-36.492916 18.466294z"/>
        <path d="M1025.319588 321.40146l453.303564 115.634178-258.08845 389.990553-489.356806-19.345641 294.141692-486.27909z"/>
        <path d="M1755.177896 226.871619L783.938738 1.319021h-10.112495a43.967368 43.967368 0 0 0-38.691283 23.742379c-57.597252 116.513525-175.869472 254.571061-315.685702 287.98626a622.138257 622.138257 0 0 1-143.33362 16.267926 579.050236 579.050236 0 0 1-215.000429-38.691284 43.967368 43.967368 0 0 0-17.147274-3.517389 43.967368 43.967368 0 0 0-43.967368 43.967368v692.925719h2198.368399v-293.262344c0.439674-241.820524-209.284672-450.225848-443.19107-503.866037zM2110.873903 729.418635v31.216831h-236.984113a842.854444 842.854444 0 0 0-175.869472-456.38128l38.691284 7.914127c182.904251 42.648347 374.162301 211.043366 374.162301 417.250322zM1209.103186 405.818806l-233.906397 354.81666h-175.869472l257.209102-389.55088z m91.452126 21.104337l113.435809 25.940747-203.12924 307.771576h-131.902104z m204.887934 47.045084l219.83684 50.562473a754.919708 754.919708 0 0 1 57.597252 236.104766H1318.142259zM794.93058 94.529841l61.554315 14.509232-7.034779 31.216831a43.967368 43.967368 0 1 0 85.736368 19.785315l10.112494-32.535852 85.736368 19.785316-7.034779 30.337484a43.967368 43.967368 0 0 0 85.736368 19.785315l7.034778-30.337484 85.736368 19.785316-7.034779 29.89781a43.967368 43.967368 0 0 0 85.736368 19.785316l7.034779-29.897811 85.736367 19.785316-6.595105 29.458137a43.967368 43.967368 0 1 0 85.736367 19.785315l6.595106-29.458136 92.771146 21.54401a766.351224 766.351224 0 0 1 123.987978 152.566767l-952.772864-219.83684a776.024045 776.024045 0 0 0 73.425504-106.401031zM651.157287 277.873766l314.366681 72.106483-270.838987 410.655217H88.374977v-83.537999c31.656505-52.321168 63.752684-59.355947 143.773293-76.063547 31.216831-6.595105 66.830399-14.069558 109.91842-25.940747a199.172177 199.172177 0 0 0 134.97982-98.047231 156.52383 156.52383 0 0 0 12.750536-95.848862 515.737226 515.737226 0 0 0 163.118935-103.323314zM273.91727 415.931301a714.030056 714.030056 0 0 0 127.94504-12.310863 67.270073 67.270073 0 0 1-6.595105 35.613568 118.711894 118.711894 0 0 1-79.141262 51.002147c-40.010305 10.991842-74.304852 18.466295-104.202662 24.621726a416.810648 416.810648 0 0 0-125.746673 40.010305V391.309575a708.753972 708.753972 0 0 0 189.93903 24.621726zM86.176608 934.306569v-87.934736h2022.498927v87.934736h-2022.498927z"/>
    </svg>
);

export const BellIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.5 14.5V11a6.5 6.5 0 10-13 0v3.5c0 .538-.214 1.055-.595 1.445L3 17h5" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
);

export const MenuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h16" />
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
    LeaderboardIcon,
    RunningShoeIcon,
    TrophyIcon,
    BoltIcon,
    ChartIcon,
};
