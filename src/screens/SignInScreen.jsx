import React from 'react';
import { GoogleIcon } from '../components/icons';

export default function SignInScreen({ onGoogleSignIn, loading, error }) {
    return (
        <div className="space-y-12 w-full max-w-xs mx-auto text-center p-4">
            <h2 className="text-4xl font-extrabold text-indigo-700 mt-12">Welcome</h2>
            <p className="text-lg text-gray-500">Sign in securely with your Google account.</p>

            {error && (
                <div className="text-red-600 text-sm p-3 bg-red-100 border border-red-300 rounded-lg" role="alert">{error}</div>
            )}

            <button
                type="button"
                onClick={onGoogleSignIn}
                className="w-full flex items-center justify-center py-4 px-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg border border-gray-300 hover:bg-gray-50 transition duration-200 disabled:opacity-50 text-base"
                disabled={loading}
            >
                {loading ? (
                    <span className="flex justify-center items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Connecting...
                    </span>
                ) : (
                    <>
                        <GoogleIcon className="w-5 h-5 mr-3" />
                        Sign in with Google
                    </>
                )}
            </button>
        </div>
    );
}
