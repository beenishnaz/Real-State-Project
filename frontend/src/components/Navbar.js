
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">

            {/* Logo */}
            <div className="navbar-logo">
                <Link to="/" onClick={closeMenu}>
                    <span className="logo-main">Real</span>
                    <span className="logo-highlight">Estate</span>
                </Link>
            </div>


            {/* Mobile Menu Button */}
            <button
                className="menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                ☰
            </button>


            {/* Navigation */}
            <div className={`nav-links ${menuOpen ? "active" : ""}`}>

                <Link to="/" onClick={closeMenu}>
                    Home
                </Link>

                <Link to="/properties" onClick={closeMenu}>
                    Properties
                </Link>

                <Link to="/gallery" onClick={closeMenu}>
                    Gallery
                </Link>

                <Link to="/about" onClick={closeMenu}>
                    About
                </Link>

                <Link to="/contact" onClick={closeMenu}>
                    Contact
                </Link>


                {token ? (
                    <>
                        <Link
                            to="/dashboard"
                            className="dashboard-link"
                            onClick={closeMenu}
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/add-property"
                            className="add-property-link"
                            onClick={closeMenu}
                        >
                            Add Property
                        </Link>

                        <button
                            className="logout-btn"
                            onClick={() => {
                                logout();
                                closeMenu();
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="login-link"
                            onClick={closeMenu}
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="signup-btn"
                            onClick={closeMenu}
                        >
                            Get Started
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;
