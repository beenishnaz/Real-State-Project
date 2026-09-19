
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/About.css";

function About() {

    const [properties, setProperties] = useState(0);
    const [clients, setClients] = useState(0);
    const [locations, setLocations] = useState(0);

    useEffect(() => {

        const duration = 1500;
        const steps = 50;
        const intervalTime = duration / steps;

        let currentStep = 0;

        const counter = setInterval(() => {

            currentStep++;

            const progress = currentStep / steps;

            setProperties(Math.floor(100 * progress));
            setClients(Math.floor(50 * progress));
            setLocations(Math.floor(20 * progress));

            if (currentStep >= steps) {
                clearInterval(counter);
            }

        }, intervalTime);

        return () => clearInterval(counter);

    }, []);


    return (
        <div className="about-page">

            {/* Hero */}
            <section className="about-hero">

                <div className="about-hero-content">

                    <span>ABOUT OUR COMPANY</span>

                    <h1>
                        Helping You Find a Place
                        You’ll Love to Call Home
                    </h1>

                    <p>
                        We connect buyers, renters and property owners
                        with quality real estate opportunities through a
                        modern and trusted platform.
                    </p>

                </div>

            </section>


            {/* Main About Section */}
            <section className="about-intro">

                <div className="about-image">

                    <img
                        src="/images/house.png"
                        alt="Beautiful property"
                    />

                </div>

                <div className="about-content">

                    <span>WHO WE ARE</span>

                    <h2>
                        Your Trusted Real Estate Partner
                    </h2>

                    <p>
                        Our goal is to make property search simple,
                        transparent and convenient. Whether you are
                        looking for a family home, apartment, villa or
                        commercial property, our platform helps you
                        explore suitable options with ease.
                    </p>

                    <p>
                        We focus on presenting properties clearly so
                        clients can make better and more confident
                        decisions.
                    </p>

                    <Link
                        to="/properties"
                        className="about-btn"
                    >
                        Explore Properties
                    </Link>

                </div>

            </section>


            {/* Animated Stats */}
            <section className="about-stats">

                <div className="stat-card">

                    <h3>
                        {properties}+
                    </h3>

                    <p>
                        Properties Listed
                    </p>

                </div>


                <div className="stat-card">

                    <h3>
                        {clients}+
                    </h3>

                    <p>
                        Happy Clients
                    </p>

                </div>


                <div className="stat-card">

                    <h3>
                        {locations}+
                    </h3>

                    <p>
                        Prime Locations
                    </p>

                </div>


                <div className="stat-card">

                    <h3>
                        24/7
                    </h3>

                    <p>
                        Client Support
                    </p>

                </div>

            </section>


            {/* Why Choose Us */}
            <section className="why-us">

                <div className="section-title">

                    <span>WHY CHOOSE US</span>

                    <h2>
                        Why Clients Choose Our Platform
                    </h2>

                    <p>
                        We combine a modern digital experience with
                        a client-first approach.
                    </p>

                </div>


                <div className="why-grid">

                    <div className="why-card">

                        <div className="why-icon">
                            🏠
                        </div>

                        <h3>
                            Quality Properties
                        </h3>

                        <p>
                            Explore a wide range of residential and
                            commercial properties.
                        </p>

                    </div>


                    <div className="why-card">

                        <div className="why-icon">
                            🔎
                        </div>

                        <h3>
                            Easy Property Search
                        </h3>

                        <p>
                            Find properties quickly using location,
                            type and listing preferences.
                        </p>

                    </div>


                    <div className="why-card">

                        <div className="why-icon">
                            🤝
                        </div>

                        <h3>
                            Client Focused
                        </h3>

                        <p>
                            We aim to provide a smooth and helpful
                            property discovery experience.
                        </p>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="about-cta">

                <div>

                    <span>
                        READY TO FIND YOUR NEXT PROPERTY?
                    </span>

                    <h2>
                        Start Your Property Journey Today
                    </h2>

                </div>

                <Link to="/properties">
                    Browse Properties
                </Link>

            </section>

        </div>
    );
}

export default About;
