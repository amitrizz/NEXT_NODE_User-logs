"use client"
"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../Header/page";
import axios from "axios"
import Cookies from 'js-cookie';
import styles from '../../style/index.module.css';

interface GPS {
    _id: string;
    createdAt: string;
    updatedAt: string;
    latitude: string;
    longitude: string;
    userId: {
        _id: string;
        email: string;
        name: string;
        isAdmin: boolean;
    };
}
export default function AdminPage() {
    const router = useRouter();
    useRouter
    const [gps, setGPS] = useState<GPS[]>([]);
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    const saveDraftBlog = async () => {
        try {
            setLoading(true);
            const token = Cookies.get("token");
            const res = await axios.get(
                "http://localhost:5000/api/gps/get-all-gps",
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                }
            );
            // console.log(res.data.data);
            setGPS(res.data.data)

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        saveDraftBlog(); // Call the async function
    }, []); // Depend on blog so it runs when b

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1>User GPS Data</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Google Link</th>
                                <th>Last User Online</th>
                                <th>View Logs</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gps && gps.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.userId.name}</td>
                                    <td>{user.userId.email}</td>
                                    <td><a href={`https://www.google.com/maps?q=${user.latitude},${user.longitude}`} target="_blank">Open Google Maps</a>
                                    </td>
                                    <td>  <Link href={`/userlogs/${user.userId._id}`} className="text-2xl font-semibold">
                                        View User
                                    </Link></td>
                                    <td>{new Date(user.updatedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
