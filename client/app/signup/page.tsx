"use client"
import Link from "next/link"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from 'js-cookie';
import Header from "../Header/page"


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isloading, setIsloading] = React.useState(false);

    const onSignup = async () => {
        try {
            setIsloading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/register`, user);
            Cookies.set('token', res.data.token, { expires: 1, path: '/' }); // Expires in 1 da
            router.push("/profile");

        } catch (error) {
            console.log(error);

        } finally {
            setIsloading(false);
        }
    }
    const isAuthenticated=true;

    useEffect(() => {
        if (user.email.length > 0 && user.name.length > 0 && user.password.length > 0) {
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
                        {isloading ? "Processing" : "Signup"}
                    </h1>
                    <br />

                    {/* Name Field */}
                    <div className="mt-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                            type="text"
                            name="name"
                            id="name"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            placeholder="Name"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mt-4">
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

                    {/* Password Field */}
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

                    {/* Confirm Password Field */}
                    <div className="mt-4">
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500"
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            value={user.password_confirmation}
                            onChange={(e) =>
                                setUser({ ...user, password_confirmation: e.target.value })
                            }
                            placeholder="Confirm Password"
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        disabled={buttonDisabled}
                        className={`w-full py-2 mt-6 text-white rounded-lg ${buttonDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        onClick={onSignup}
                    >
                        {buttonDisabled ? "No Signup" : "Signup"}
                    </button>

                    {/* Login Link */}
                    <div className="mt-4 text-center">
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Click To Login Here
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}