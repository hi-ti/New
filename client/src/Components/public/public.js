import React from 'react';

const Prompt = () => {
    return (
        <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
                <h2 className="text-4xl font-bold text-center mb-4">Surprise!</h2>
                <p className="text-lg text-center">Surprise ke liye id de dijiye</p>
                <div className="flex items-center">
                    <div className="w-1/2 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg justify-center text-center">
                        <a href="/login">Id-Pass</a>
                    </div>
                    <p className="w-1/2 mt-0 justify-center text-center text-0.5xl">Id nahi h?
                        <a href="/register" className="font-medium text-indigo-600"> Bana lijiye</a>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Prompt;
