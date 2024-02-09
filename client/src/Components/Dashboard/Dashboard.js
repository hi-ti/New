import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Quotes from './Quotes';

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [quote, setQuote] = useState('');

    const fetchUser = async () => {
        const token = sessionStorage.getItem('token');

        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                return decodedToken.username;
            } catch (error) {
                console.error('Error decoding token:', error);
                return '';
            }
        } else {
            return '';
        }
    };

    const fetchQuote = () => {
        const quotes = Quotes;

        // Shuffle the quotes to ensure no repetition until all quotes are displayed
        const shuffledQuotes = quotes.sort(() => Math.random() - 0.5);

        const storedQuote = localStorage.getItem('currentQuote');
        const lastDisplayDate = parseInt(localStorage.getItem('lastDisplayDate')) || 0;
        const oneDayInMillis = 24 * 60 * 60 * 1000;

        // If more than 24 hours have passed since the last display, show a new quote
        if (Date.now() - lastDisplayDate > oneDayInMillis) {
            const newQuote = shuffledQuotes[0];
            setQuote(newQuote);
            localStorage.setItem('currentQuote', newQuote);
            localStorage.setItem('lastDisplayDate', Date.now());
        } else {
            setQuote(storedQuote);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchUser();
            setUsername(res);
        };

        fetchData();
        fetchQuote();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
        {/* <Navbar/> */}
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500'>
            <div className='bg-white p-8 rounded-lg shadow-md max-w-md'>
                <h2 className="text-4xl font-bold text-center">Today's daily dose for {username} !</h2>
                <div className='bg-gray-100 p-4 rounded-md mb-4'>
                    <p className='text-lg font-medium'>{quote}!</p>
                </div>
                <div className='flex justify-between items-center mb-4'>
                    <p>I</p>
                    <a href='https://www.google.com/maps/place/Love,+SK+S0J+1P0,+Canada/@53.4855911,-104.1861008,15z/data=!4m10!1m2!2m1!1slove!3m6!1s0x52fe133034e7f73d:0x5f1dd8a83e225a7c!8m2!3d53.4865869!4d-104.1666331!15sCgRsb3ZlkgEIbG9jYWxpdHngAQA!16s%2Fm%2F02pm2q6?entry=ttu'className='font-medium text-indigo-600'>Click here</a>
                    <p>You</p>
                </div>
                <button className='w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg' onClick={handleLogout}>Done Reading ?</button>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
