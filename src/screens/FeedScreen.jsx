import React from 'react';

export default function FeedScreen({ user }) {
    const placeholderPosts = [
        { id: 1, author: user?.displayName || 'Alex Runner', time: '2h', text: 'Great run this morning! 5 miles @ 7:30/mi' },
        { id: 2, author: 'Jordan Pace', time: '4h', text: 'New shoes day — first impressions coming soon.' },
        { id: 3, author: 'Taylor Sprint', time: '1d', text: 'Trail recommendation: Pine Ridge loop — so scenic.' },
        { id: 4, author: 'Sam Stride', time: '2d', text: 'PB on the 10k! 42:10. Feeling strong.' },
        { id: 5, author: 'Riley Miles', time: '3d', text: 'Recovery day: yoga and light stretching.' },
    ];

    return (
        <div className="w-full max-w-xl mx-auto py-6 space-y-4 px-4">
            {placeholderPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">{(post.author || 'U').slice(0,1)}</div>
                            <div>
                                <div className="text-sm font-semibold text-gray-800">{post.author}</div>
                                <div className="text-xs text-gray-400">{post.time}</div>
                            </div>
                        </div>
                    </div>
                    <p className="mt-3 text-gray-700">{post.text}</p>
                </div>
            ))}
        </div>
    );
}
