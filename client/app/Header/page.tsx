import Link from "next/link";
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from 'js-cookie';
import { useEffect } from "react";
import React from "react"

export default function Header() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const token = Cookies.get('token');
    const logout = () => {
        // Remove the token
        Cookies.remove('token', { path: '/' });
        router.push("/login")
    }
    const fetchUserData = async()=>{
        const response = await axios.get(
            'http://localhost:5000/api/user/logged-user',
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to the Authorization header
                },
            }
        )
        setIsAdmin(response.data.user.isAdmin)
        console.log("this is response",response.data.user.isAdmin);
        
    }
    useEffect(() => {
        if (token) {
            fetchUserData();
            setIsAuthenticated(true);
        }
    }, [])
    return (
        <header className="bg-blue-500 shadow">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <div>
                    <Link href="/" className="text-white text-2xl font-semibold">
                        My App
                    </Link>
                </div>

                {/* Authentication Links */}
                <div>
                    {isAuthenticated ? (
                        <nav className="flex space-x-6">
                            <Link href="/profile" className="text-white hover:underline">
                                Profile
                            </Link>
                    
                            {isAdmin && <Link href="/userlogs" className="text-white hover:underline">
                                User Logs
                            </Link>}
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Logout
                            </button>
                        </nav>

                    ) : (
                        <div className="flex space-x-4">
                            <Link href="/login" className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                                Login
                            </Link>
                            <Link href="/signup" className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
