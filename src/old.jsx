import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Zap,
  Users,
  Trophy,
  Activity,
  Search,
  ChevronRight,
  MapPin,
  Clock,
  Send,
  User,
  Settings,
  Plus,
  X,
} from 'lucide-react';

// --- FIREBASE IMPORTS (Reverted to bare package imports - may cause "Failed to resolve import" error) ---
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInAnonymously, 
    signInWithCustomToken, 
    onAuthStateChanged,
} from 'firebase/auth';
import { 
    getFirestore, 
    collection, 
    query, 
    onSnapshot, 
    addDoc,
    serverTimestamp,
    // orderBy removed as it's not used in the query and can cause index errors
} from 'firebase/firestore';


// --- Mock Private Data (Will replace with private Firestore logic later) ---

const MOCK_UPCOMING_RACES = [
  { id: 1, name: "City Half Marathon", date: "2025-11-15", distance: "13.1 mi", weeksLeft: 6 },
  { id: 2, name: "Trail 10K Challenge", date: "2025-12-05", distance: "6.2 mi", weeksLeft: 9 },
];

const MOCK_PR_SUMMARY = [
  { distance: "5K", time: "20:15" },
  { distance: "10K", time: "42:30" },
  { distance: "Marathon", time: "3:45:00" },
];

// --- Utility Functions ---

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// --- Components ---

// A simple card wrapper for content
const Card = ({ children, className = '' }) => (
  <div className={`bg-white p-4 rounded-xl shadow-lg ${className}`}>
    {children}
  </div>
);

// Component for displaying a single feed item
const FeedItem = ({ item }) => {
  // Use a fallback user ID if the field is missing
  // Show full userId as required for multi-user apps
  const displayUserId = item.userId ? item.userId : 'Unknown';
  
  // Determine if it was a PR for styling
  const prStyle = item.isPR ? 'text-amber-500' : 'text-slate-500';

  return (
    <Card className="mb-4 border border-gray-100">
      {/* Header */}
      <div className="flex items-start mb-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm mr-4">
          <User className="w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-gray-800 break-all">{displayUserId}</p>
          <p className="text-sm text-gray-500">
            {item.isPR ? 'ran a new PR at the ' : 'finished the '}
            <span className="font-semibold">{item.raceName}</span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Trophy className={`w-5 h-5 ${prStyle}`} />
          <h3 className="font-semibold text-lg text-gray-800">{item.raceName}</h3>
        </div>
        <p className="mt-1 text-gray-600">
          Time: <span className="font-bold">{item.hours}h {item.minutes}m {item.seconds}s</span> | Distance: {item.distance}
        </p>
        {item.report && (
            <p className="mt-2 text-sm italic text-gray-500">"{item.report}"</p>
        )}
      </div>

      {/* Footer/Interaction - Placeholder for likes/comments */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <div className="flex space-x-4">
          <span className="flex items-center space-x-1">
            <span className="font-bold">0</span><Zap className="w-4 h-4" />
          </span>
          <span className="flex items-center space-x-1">
            <span className="font-bold">0</span><Send className="w-4 h-4" />
          </span>
        </div>
        {/* Check if timestamp exists before accessing seconds */}
        <div className="text-xs">{item.timestamp?.seconds ? new Date(item.timestamp.seconds * 1000).toLocaleTimeString() : 'Just now'}</div>
      </div>
      <p className="text-xs text-blue-400 mt-2">Race Date: {formatDate(item.date)}</p>
    </Card>
  );
};

// Component for the main feed (Social Flow)
const SocialFeed = ({ items, isAuthReady }) => {
  if (!isAuthReady) {
    return <div className="text-center py-10 text-gray-500">Loading user data...</div>;
  }
  if (items.length === 0) {
    return <div className="text-center py-10 text-gray-500">No race results posted yet. Be the first!</div>;
  }
  
  return (
    <div className="pb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Friends Feed</h2>
      {/* Sort in-memory by timestamp for newest first, since we avoid orderBy in query */}
      {items.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds).map(item => (
        <FeedItem key={item.id} item={item} />
      ))}
      <p className="text-center text-gray-500 text-sm mt-8">You've reached the end of the feed.</p>
    </div>
  );
};

// Component for displaying upcoming races (Private Flow)
const UpcomingRaces = ({ races }) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-green-600" />
        Upcoming Races
      </h3>
      <div className="space-y-3">
        {races.map(race => (
          <div key={race.id} className="p-3 bg-white rounded-lg shadow-sm border border-green-100">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-teal-700">{race.name}</span>
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                {race.weeksLeft} WKS LEFT
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
              <MapPin className="w-3 h-3" />
              <span>{race.distance} &bull; {formatDate(race.date)}</span>
            </p>
          </div>
        ))}
        <button className="w-full text-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors pt-2 flex items-center justify-center space-x-1">
            <span>Manage Goals</span> <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
};

// Component for PR Summary (Private Flow)
const PRSummary = ({ prs }) => {
    return (
        <Card className="mb-6 border border-indigo-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                Personal Bests (PRs)
            </h3>
            <div className="grid grid-cols-3 gap-3">
                {prs.map((pr, index) => (
                    <div key={index} className="p-3 bg-indigo-50 rounded-lg text-center">
                        <p className="text-xl font-extrabold text-indigo-700">{pr.time}</p>
                        <p className="text-xs font-medium text-indigo-500 mt-1">{pr.distance}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

// Component for Global Race Search CTA (Global Flow)
const GlobalSearchCTA = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 pb-2">Race Discovery</h2>

            {/* Main Search Input */}
            <Card className="p-3 border-2 border-blue-500">
                <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search races by city, distance, or date..."
                        className="w-full p-1 focus:outline-none text-gray-700"
                    />
                </div>
            </Card>

            {/* Popular Filters */}
            <h3 className="text-lg font-semibold text-gray-700">Popular Categories</h3>
            <div className="flex flex-wrap gap-2">
                {['Marathon', 'Half Marathon', '10K', '5K', 'Trail', 'Ultra'].map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-200 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Featured Races */}
            <h3 className="text-lg font-semibold text-gray-700">Featured Races Near You</h3>
            <div className="space-y-4">
                <Card className="border border-red-200">
                    <h4 className="font-bold text-lg text-red-700">The Lava Trail Run</h4>
                    <p className="text-sm text-gray-600 mt-1">📍 Hawaii, USA | October 2026</p>
                    <button className="mt-3 text-sm font-medium text-red-600 hover:text-red-800">View Details</button>
                </Card>
                 <Card className="border border-yellow-200">
                    <h4 className="font-bold text-lg text-yellow-700">Desert Endurance Challenge</h4>
                    <p className="text-sm text-gray-600 mt-1">📍 Mojave, USA | April 2026</p>
                    <button className="mt-3 text-sm font-medium text-yellow-600 hover:text-yellow-800">View Details</button>
                </Card>
            </div>
        </div>
    );
};


// Component for the fixed bottom navigation
const BottomNav = ({ currentView, setView }) => {
  const navItems = [
    { name: 'Feed', icon: Users, view: 'feed' },
    { name: 'Goals', icon: Calendar, view: 'goals' },
    { name: 'Discover', icon: Search, view: 'discover' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-2xl flex justify-around items-center max-w-lg mx-auto z-50">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        const Icon = item.icon;
        return (
          <button
            key={item.name}
            onClick={() => setView(item.view)}
            className="flex flex-col items-center justify-center p-2 transition-colors flex-1"
          >
            <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
            <span className={`text-xs font-medium mt-0.5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
};

// --- Add Race Result Modal (Now connected to Firestore) ---
const AddRaceResultModal = ({ isOpen, onClose, db, userId }) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        raceName: '',
        date: '',
        distance: '',
        hours: '',
        minutes: '',
        seconds: '',
        report: '',
        isPR: false,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!db || !userId) {
            setMessage('Database connection not ready.');
            return;
        }

        setIsSaving(true);
        setMessage('');

        // Construct the race result object
        const newRaceResult = {
            ...formData,
            userId: userId,
            timestamp: serverTimestamp(), // Firestore timestamp for ordering
        };

        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const collectionPath = `/artifacts/${appId}/public/data/race_results`;

        try {
            // Using exponential backoff for retrying the API call
            const maxRetries = 5;
            let currentRetry = 0;
            let success = false;

            while (currentRetry < maxRetries && !success) {
                try {
                    await addDoc(collection(db, collectionPath), newRaceResult);
                    success = true;
                } catch (error) {
                    currentRetry++;
                    if (currentRetry >= maxRetries) {
                        throw error;
                    }
                    const delay = Math.pow(2, currentRetry) * 1000;
                    // Wait for exponential backoff delay
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
            
            setMessage('Result posted successfully!');
            
            // Clear form and close after a delay
            setTimeout(() => {
                setFormData({
                    raceName: '', date: '', distance: '', hours: '', 
                    minutes: '', seconds: '', report: '', isPR: false,
                });
                onClose();
            }, 1000);
            
        } catch (error) {
            console.error('Error adding document after retries: ', error);
            setMessage('Error posting result. Check console.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
            {/* Modal Content - slides up from bottom */}
            <div className="bg-white w-full max-w-lg rounded-t-3xl p-6 shadow-2xl transform translate-y-0 transition-transform duration-300 ease-out">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                        <Trophy className="w-6 h-6 text-blue-600" />
                        <span>Log New Race Result</span>
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Status Message */}
                {message && (
                    <div className={`mt-3 p-3 rounded-xl text-center font-medium ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                    {/* Race Name */}
                    <div>
                        <label htmlFor="raceName" className="block text-sm font-medium text-gray-700">Race Name</label>
                        <input
                            type="text"
                            name="raceName"
                            id="raceName"
                            value={formData.raceName}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500"
                            placeholder="e.g., City Half Marathon"
                        />
                    </div>
                    
                    {/* Date */}
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date Completed</label>
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Distance and Time */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Distance */}
                        <div>
                            <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distance</label>
                            <select
                                name="distance"
                                id="distance"
                                value={formData.distance}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 bg-white rounded-xl focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select Distance</option>
                                <option value="5K">5K</option>
                                <option value="10K">10K</option>
                                <option value="Half Marathon">Half Marathon</option>
                                <option value="Marathon">Marathon</option>
                                <option value="Ultra">Ultra (50K+)</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {/* Time Input Group (H:M:S) */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Finish Time (HH:MM:SS)</label>
                            <div className="mt-1 flex space-x-2">
                                <input type="number" name="hours" placeholder="HH" value={formData.hours} onChange={handleChange} min="0" className="w-1/3 p-3 border border-gray-300 rounded-xl text-center" />
                                <input type="number" name="minutes" placeholder="MM" value={formData.minutes} onChange={handleChange} min="0" max="59" className="w-1/3 p-3 border border-gray-300 rounded-xl text-center" />
                                <input type="number" name="seconds" placeholder="SS" value={formData.seconds} onChange={handleChange} min="0" max="59" className="w-1/3 p-3 border border-gray-300 rounded-xl text-center" />
                            </div>
                        </div>
                    </div>

                    {/* Report/Comment */}
                    <div>
                        <label htmlFor="report" className="block text-sm font-medium text-gray-700">Race Report / Comment (Optional)</label>
                        <textarea
                            name="report"
                            id="report"
                            rows="3"
                            value={formData.report}
                            onChange={handleChange}
                            className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-blue-500"
                            placeholder="How did the race go? Was it a PR? Tell your friends!"
                        ></textarea>
                    </div>

                    {/* PR Checkbox */}
                    <div className="flex items-center">
                        <input
                            id="isPR"
                            name="isPR"
                            type="checkbox"
                            checked={formData.isPR}
                            onChange={handleChange}
                            className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isPR" className="ml-2 block text-sm font-medium text-gray-900">
                            This was a Personal Record (PR)!
                        </label>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-transparent text-lg font-bold rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            {isSaving ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : (
                                <Plus className="w-5 h-5" />
                            )}
                            <span>{isSaving ? 'Posting...' : 'Post Result to Feed'}</span>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};


// Main App Component
const App = () => {
  // Use state to control the active view displayed in the mobile screen.
  const [currentView, setCurrentView] = useState('feed'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- FIREBASE STATES ---
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  
  // --- 1. FIREBASE INITIALIZATION & AUTH ---
  useEffect(() => {
    try {
        const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
        const app = initializeApp(firebaseConfig);
        const firestore = getFirestore(app);
        const authInstance = getAuth(app);
        
        // Log the current app ID
        console.log("App ID:", typeof __app_id !== 'undefined' ? __app_id : 'default-app-id');
        
        setDb(firestore);
        setAuth(authInstance);

        const authenticate = async () => {
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
            
            if (initialAuthToken) {
                await signInWithCustomToken(authInstance, initialAuthToken);
            } else {
                await signInAnonymously(authInstance);
            }
        };
        
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                // Should not happen if signInWithCustomToken or signInAnonymously succeeds
                setUserId(crypto.randomUUID());
            }
            setIsAuthReady(true);
        });

        // Start authentication
        authenticate().catch(console.error);

        // Cleanup listener on unmount
        return () => unsubscribe();

    } catch (e) {
        console.error("Firebase Initialization Error:", e);
    }
  }, []); // Run only once on mount

  // --- 2. REAL-TIME PUBLIC FEED DATA SUBSCRIPTION ---
  useEffect(() => {
    if (db && isAuthReady) {
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const collectionPath = `/artifacts/${appId}/public/data/race_results`;
        
        // Query to listen for all documents in the public 'race_results' collection
        const q = query(collection(db, collectionPath));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const results = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFeedItems(results);
            console.log('Real-time feed updated:', results.length, 'results fetched.');
        }, (error) => {
            console.error("Error listening to feed collection:", error);
        });

        // Clean up the listener when the component unmounts or dependencies change
        return () => unsubscribe();
    }
  }, [db, isAuthReady]); 

  // Function to render the content based on the active tab
  const renderContent = () => {
    switch (currentView) {
      case 'feed':
        return <SocialFeed items={feedItems} isAuthReady={isAuthReady} />;
      case 'goals':
        return (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 pb-2">My Goals & Progress</h2>
            <UpcomingRaces races={MOCK_UPCOMING_RACES} />
            <PRSummary prs={MOCK_PR_SUMMARY} />
            <p className="text-center text-sm text-gray-500 mt-6">
                Current User ID (Public Data): <span className="font-mono text-blue-600 break-all">{userId || 'Loading...'}</span>
            </p>
          </>
        );
      case 'discover':
        return <GlobalSearchCTA />;
      default:
        return null;
    }
  };

  return (
    // Max-width centers the content, simulating a mobile device view on a larger screen
    <div className="min-h-screen bg-gray-50 font-sans max-w-lg mx-auto shadow-2xl">
      
      {/* Top Bar / Header: Fixed to the top */}
      <header className="sticky top-0 z-20 bg-white shadow-md">
        <div className="px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-extrabold text-blue-600 tracking-tight">RunTrack</h1>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600" 
              aria-label="Settings"
            >
                <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              disabled={!isAuthReady}
              className="flex items-center space-x-1 py-1.5 px-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md text-sm disabled:bg-gray-400"
            >
                <Plus className="w-4 h-4" />
                <span>Result</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area: Padding bottom added to prevent content from being hidden by the bottom nav */}
      <main className="px-4 py-6 mb-16">
        {renderContent()}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNav currentView={currentView} setView={setCurrentView} />

      {/* Race Result Modal (Passing db and userId for persistence) */}
      <AddRaceResultModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        db={db}
        userId={userId}
      />
      
      {/* Global Style Configuration */}
      <style>
        {`
          .font-sans {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
    </div>
  );
};

export default App;
