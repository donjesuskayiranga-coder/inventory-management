import React, { useEffect , useState } from "react";
import { getAdminData } from "../api/api";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found, login first");
                return;
            }
            try {
                const response = await getAdminData(token);
                setData(response);

            } catch (err) {
                setError(err.response?.data?.message || "Failded to fetch admin data");

            }

        };
        fetchData();

    },[]);

    return (
        <div style ={{ maxWidth: "600px", margin: "50px auto"}}>
            <h2>Admin Dashboard</h2>
            {error && <p style={{ color:  "red"}}>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}