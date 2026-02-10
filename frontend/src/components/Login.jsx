import React, { useState } from "react";
import {loginUser} from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");

        }
        };

        return (
            <div style={{ maxWidth: "400px", margin: "50px auto"}}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                            </div>
                            <button type="submit">Login</button>
                            {error && <p style={{ color: "red"}}>{error}</p>}
                            </form>
                    </div>
             
        );
    }
