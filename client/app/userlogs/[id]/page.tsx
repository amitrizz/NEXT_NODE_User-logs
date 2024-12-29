"use client"
"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Cookies from 'js-cookie';
import styles from '@/style/index.module.css';
import Header from "@/app/Header/page"



interface Location {
    _id: string;
    lat: string;
    lng: string;
}
interface User{
    _id:string;
    email:string;
    name:string;
}


export default function userLogs({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [logs, setLogs] = useState<Location[]>([]);
    const { id } = React.use(params);
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    const saveDraftBlog = async () => {
        try {
            setLoading(true);
            const token = Cookies.get("token");
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/api/gps/get-user-logs/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                }
            );
            console.log(res.data.data);
            setLogs(res.data.data.location)
            setUser(res.data.data.userId);

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
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs && logs.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.lat}</td>
                                    <td>{log.lng}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
