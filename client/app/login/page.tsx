"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from 'js-cookie';
import Header from "../Header/page"


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isloading, setIsloading] = React.useState(false);

    const onLogin = async () => {
        try {
            setIsloading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login`, user);
            Cookies.set('token', res.data.token, { expires: 1, path: '/' }); // Expires in 1 day
            router.push("/profile");

        } catch (error) {
            console.log(error);

        } finally {
            setIsloading(false);
        }
    }
    const isAuthenticated = true;

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <>
        <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                    <h1 className="text-2xl font-semibold text-center text-gray-800">
                        {isloading ? "Processing" : "Login"}
                    </h1>

                    <div className="mt-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>

                    <div className="mt-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                            type="password"
                            name="password"
                            id="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                        />
                    </div>

                    <button
                        disabled={buttonDisabled}
                        className={`w-full py-2 mt-6 text-white rounded-lg ${buttonDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        onClick={onLogin}
                    >
                        {buttonDisabled ? "No Signup" : "Login"}
                    </button>

                    <div className="mt-4 text-center">
                        <Link href="/signup" className="text-blue-500 hover:underline">
                            Click To Signup Here
                        </Link>
                    </div>
                </div>
            </div>
        </>

    )
}