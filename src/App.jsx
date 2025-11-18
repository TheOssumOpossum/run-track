import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signOut, 
    onAuthStateChanged, 
    signInWithCustomToken,
    // New imports for Google OAuth
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';

// Local components and icons (extracted)
import {
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
} from './components/icons';
import BottomNav from './components/BottomNav';
import SignInScreen from './screens/SignInScreen';
import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import AddScreen from './screens/AddScreen';
import ActivityScreen from './screens/ActivityScreen';

// --- Global Variable Handling (MANDATORY) ---
const firebaseConfig = {
    "apiKey": "AIzaSyD3DEd7DHxrGwAq3GHSyIyFn7vz8iN9xi8",
    "authDomain": "run-tracker-app-344e1.firebaseapp.com",
    "projectId": "run-tracker-app-344e1",
    "storageBucket": "run-tracker-app-344e1.appspot.com",
    "messagingSenderId": "343389539715",
    "appId": "1:run-tracker-app-344e1:web:longappiddetail"
}
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// icons and small components are extracted to `src/components/icons` and imported above

// --- Component ---
function App() {
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('home'); // home | search | add | activity | profile

    // 1. Firebase Initialization and Authentication Listener
    useEffect(() => {
        // Since firebaseConfig is now hardcoded, we check if it's set to null (which it isn't here)
        // For robustness, we still use a check, although it will now always pass if the object is defined.
        if (!firebaseConfig || !firebaseConfig.apiKey) {
            setError("Firebase configuration is missing or incomplete.");
            setLoading(false);
            return;
        }

        try {
            const app = initializeApp(firebaseConfig);
            const authInstance = getAuth(app);
            setAuth(authInstance);

            const attemptAuth = async () => {
                try {
                    // Attempt to sign in with custom token from the environment
                    if (initialAuthToken) {
                        await signInWithCustomToken(authInstance, initialAuthToken);
                    }
                } catch (e) {
                    console.error("Custom token sign-in failed, proceeding with standard auth check:", e);
                }
            };
            
            attemptAuth();

            // Set up state change listener
            const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
                setUser(currentUser);
                setLoading(false);
                setError('');
            });

            return () => unsubscribe(); // Cleanup listener
        } catch (e) {
            console.error("Firebase Initialization Error:", e);
            setError(`Failed to initialize Firebase: ${e.message}`);
            setLoading(false);
        }
    }, []);

    // 2. Handle Google Sign-In Logic (Passwordless)
    const handleGoogleSignIn = async () => {
        if (!auth) return;

        setError('');
        setLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            // Use signInWithPopup for a typical web/mobile flow
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error("Google Sign-In Error:", err);
            
            let message = "An unexpected error occurred during Google sign-in.";
            
            if (err.code === 'auth/popup-closed-by-user') {
                message = 'Sign-in cancelled. Please try again.';
            } else if (err.message) {
                message = err.message;
            }
            
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    // 3. Handle Sign Out Logic
    const handleSignOut = async () => {
        if (!auth) return;
        setLoading(true);
        try {
            await signOut(auth);
        } catch (err) {
            console.error("Sign Out Error:", err);
            setError("Failed to sign out.");
        } finally {
            setLoading(false);
        }
    };

    // --- UI Rendering ---

    // Extracted screens are in separate files under src/screens
    // App orchestrates them and passes required props
    
    // Note: SignInScreen, FeedScreen, ProfileScreen, SearchScreen, AddScreen, ActivityScreen are imported above

    // --- Main Layout ---
    return (
        // Main container: ensure content starts at the top, with comfortable padding
        <div className="w-full min-h-screen bg-white font-sans flex flex-col justify-start items-start p-6 sm:p-8">
            {/* Inner container: align content to the top to avoid empty banner/vertical centering */}
            <div className="w-full h-full flex flex-col justify-start items-start">
                
                {/* Loading State */}
                {loading && !auth && !user ? (
                    <div className="text-center py-12">
                        <svg className="animate-spin mx-auto h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-4 text-lg text-gray-500">Initializing Authentication...</p>
                    </div>
                ) : user ? (
                    // Signed-in layout: show the selected tab + bottom navigation
                    <div className="w-full max-w-3xl mx-auto flex flex-col min-h-[60vh] pb-24"> {/* pb-24 prevents fixed bottom nav from overlapping content */}
                        <div className="flex-1 w-full">
                            {activeTab === 'home' && <FeedScreen user={user} />}
                            {activeTab === 'search' && <SearchScreen user={user} />}
                            {activeTab === 'add' && <AddScreen />}
                            {activeTab === 'activity' && <ActivityScreen />}
                            {activeTab === 'profile' && <ProfileScreen user={user} handleSignOut={handleSignOut} loading={loading} appId={appId} />}
                        </div>

                        {/* Bottom navigation (extracted) */}
                        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                ) : (
                    <SignInScreen onGoogleSignIn={handleGoogleSignIn} loading={loading} error={error} />
                )}
            </div>
        </div>
    );
}

export default App;
