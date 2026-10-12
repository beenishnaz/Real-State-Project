import React from "react";
import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Brand */}
                <div className="footer-column footer-brand">
                    <Link to="/" className="footer-logo">
                        <span>Real</span>Estate
                    </Link>

                    <p>
                        Find modern homes, apartments, villas and
                        commercial properties with a simple and
                        trusted real estate experience.
                    </p>

                    <div className="footer-socials">
                        <a
                            href="https://www.facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Face
                        </a>

                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Inst
                        </a>

                        <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Lin
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-column">
                    <h3>Quick Links</h3>

                    <Link to="/">Home</Link>
                    <Link to="/properties">Properties</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                {/* Property */}
                <div className="footer-column">
                    <h3>Property</h3>

                    <Link to="/properties">Houses</Link>
                    <Link to="/properties">Apartments</Link>
                    <Link to="/properties">Villas</Link>
                    <Link to="/properties">Commercial</Link>
                    <Link to="/add-property">List Property</Link>
                </div>

                {/* Contact */}
                <div className="footer-column">
                    <h3>Contact Us</h3>

                    <p>📍 Faisalabad, Pakistan</p>
                    <p>📞 +92 300 1234567</p>
                    <p>✉ info@realestate.com</p>

                    <Link to="/contact" className="footer-contact-btn">
                        Get In Touch
                    </Link>
                </div>
            </div>

            {/* Bottom */}
            <div className="footer-bottom">
                <p>© 2026 RealEstate. All rights reserved.</p>

                <div>
                    <span>Privacy Policy</span>
                    <span>Terms &amp; Conditions</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;