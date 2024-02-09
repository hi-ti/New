import React, { useState } from 'react';
import publicApi from '../../bearer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginHandler = async () => {
        try {
            const res = await publicApi.post("api/auth/login", {
                email: email,
                password: password
            });

            if (res.status !== 200) {
                toast.error(res.message);
                return;
            }

            toast.success("Logged in successfully!");
            console.log(res.data);
            sessionStorage.setItem("token", res.data.token);

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Error during login");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-pink-500">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
                <h2 className="text-3xl font-semibold mb-5 text-center">Ek kadam aur</h2>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg mb-4"
                />
                <div className='flex justify-center'>
                    <button className="w-1/2 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 rounded-lg justify-center text-center" onClick={loginHandler}>
                        Yay
                    </button>
                    <p className="w-1/2 mt-0 justify-center text-center">Nhi register kiya?
                        <a href="/register" className="font-medium text-indigo-600"> Karlo</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
