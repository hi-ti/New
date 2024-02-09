import React, { useState } from 'react';
import publicApi from '../../bearer';
import toast from 'react-hot-toast';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await publicApi.post('api/auth/register', { username, email, password });

            if (res.status === 200) {
                toast.success("Check your email for verification link");
            } else {
                toast.error("Unable to Register");
            }
        } catch (e) {
            console.log(e);
            toast.error("Error in Registration");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
                <h2 className="text-3xl font-semibold mb-5 text-center">Hume pata hai fir bhi</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Apka Naam
                    </label>
                    <input className="w-full px-3 py-2 border rounded-lg" type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="w-full px-3 py-2 border rounded-lg" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="w-full px-3 py-2 border rounded-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center">
                    <button  type="submit" onClick={handleSubmit} className="w-1/2 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg justify-center text-center">
                            Ho gya?
                    </button>
                    <p className="w-1/2 mt-0 justify-center text-center">Phle se hi hai? 
                        <a href="/login" className="font-medium text-indigo-600"> Jaiye</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
