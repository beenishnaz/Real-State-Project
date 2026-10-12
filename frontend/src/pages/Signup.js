import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../css/Auth.css";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (e) => {

        e.preventDefault();

        try {

            const response = await API.post(
                "/api/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            console.log("SIGNUP ERROR:", error);

            if (error.response) {

                alert(
                    "Backend Error: " +
                    (error.response.data.message || "Unknown error")
                );

            } else if (error.request) {

                alert("Backend se response nahi aa raha.");

            } else {

                alert("Request Error: " + error.message);

            }
        }
    };

    return (

        <div className="auth-container">

            <form onSubmit={handleSignup}>

                <h2>Create Account</h2>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Signup
                </button>

            </form>

        </div>
    );
}

export default Signup;