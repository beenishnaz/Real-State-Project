import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Home.css";

function Home() {

    const navigate = useNavigate();

    const [location, setLocation] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [listingType, setListingType] = useState("");

    const handleSearch = () => {

        const params = new URLSearchParams();

        if (location.trim()) {
            params.set("location", location.trim());
        }

        if (propertyType) {
            params.set("propertyType", propertyType);
        }

        if (listingType) {
            params.set("listingType", listingType);
        }

        const query = params.toString();

        navigate(
            query
                ? `/properties?${query}`
                : "/properties"
        );
    };


    return (
        <div className="home">

            {/* =========================
                HERO SECTION
            ========================= */}

            <section className="hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        FIND YOUR PERFECT HOME
                    </span>

                    <h1>
                        Find Your Dream Property
                    </h1>

                    <p>
                        Explore beautiful homes, apartments and commercial
                        properties with our modern real estate platform.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/properties"
                            className="primary-btn"
                        >
                            Explore Properties
                        </Link>

                        <Link
                            to="/add-property"
                            className="secondary-btn"
                        >
                            List Your Property
                        </Link>

                    </div>

                </div>


                {/* =========================
                    SEARCH BOX
                ========================= */}

                <div className="property-search">

                    <h3>
                        Search Your Property
                    </h3>

                    <div className="search-fields">

                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                        />


                        <select
                            value={propertyType}
                            onChange={(e) =>
                                setPropertyType(e.target.value)
                            }
                        >
                            <option value="">
                                Property Type
                            </option>

                            <option value="House">
                                House
                            </option>

                            <option value="Apartment">
                                Apartment
                            </option>

                            <option value="Flat">
                                Flat
                            </option>

                            <option value="Villa">
                                Villa
                            </option>

                            <option value="Commercial">
                                Commercial
                            </option>

                        </select>


                        <select
                            value={listingType}
                            onChange={(e) =>
                                setListingType(e.target.value)
                            }
                        >
                            <option value="">
                                Listing Type
                            </option>

                            <option value="Sale">
                                For Sale
                            </option>

                            <option value="Rent">
                                For Rent
                            </option>

                        </select>


                        <button
                            type="button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                    </div>

                </div>

            </section>


            {/* =========================
                CATEGORIES
            ========================= */}

            <section className="categories">

                <div className="section-heading">

                    <span>
                        PROPERTY TYPES
                    </span>

                    <h2>
                        Explore By Category
                    </h2>

                    <p>
                        Find a property that matches your lifestyle.
                    </p>

                </div>


                <div className="category-grid">

                    <Link
                        to="/properties?propertyType=House"
                        className="category-card"
                    >
                        <div className="category-icon">
                            🏠
                        </div>

                        <h3>
                            Houses
                        </h3>

                        <p>
                            Modern family homes
                        </p>
                    </Link>


                    <Link
                        to="/properties?propertyType=Apartment"
                        className="category-card"
                    >
                        <div className="category-icon">
                            🏢
                        </div>

                        <h3>
                            Apartments
                        </h3>

                        <p>
                            Comfortable apartments
                        </p>
                    </Link>


                    <Link
                        to="/properties?propertyType=Commercial"
                        className="category-card"
                    >
                        <div className="category-icon">
                            🏬
                        </div>

                        <h3>
                            Commercial
                        </h3>

                        <p>
                            Business properties
                        </p>
                    </Link>


                    <Link
                        to="/properties?propertyType=Villa"
                        className="category-card"
                    >
                        <div className="category-icon">
                            🏡
                        </div>

                        <h3>
                            Villas
                        </h3>

                        <p>
                            Luxury living spaces
                        </p>
                    </Link>

                </div>

            </section>


            {/* =========================
                FEATURED PROPERTIES
            ========================= */}

            <section className="featured">

                <div className="section-heading">

                    <span>
                        FEATURED PROPERTIES
                    </span>

                    <h2>
                        Discover Our Properties
                    </h2>

                    <p>
                        Browse some of our latest property listings.
                    </p>

                </div>


                <div className="featured-grid">

                    <div className="property-card">

                        <div className="property-card-image">

                            <img
                                src="/images/house.png"
                                alt="Modern Family House"
                            />

                        </div>

                        <div className="property-card-content">

                            <span className="property-badge">
                                For Sale
                            </span>

                            <h3>
                                Modern Family House
                            </h3>

                            <p>
                                Faisalabad, Pakistan
                            </p>

                            <h4>
                                PKR 25,000,000
                            </h4>

                            <div className="property-info">

                                <span>
                                    🛏 4 Beds
                                </span>

                                <span>
                                    🛁 3 Baths
                                </span>

                                <span>
                                    📐 2500 sqft
                                </span>

                            </div>

                            <Link
                                to="/properties"
                                className="details-btn"
                            >
                                View Properties
                            </Link>

                        </div>

                    </div>


                    <div className="property-card">

                        <div className="property-card-image">

                            <img
                                src="/images/house.png"
                                alt="Luxury Villa"
                            />

                        </div>

                        <div className="property-card-content">

                            <span className="property-badge rent">
                                For Rent
                            </span>

                            <h3>
                                Luxury Villa
                            </h3>

                            <p>
                                Faisalabad, Pakistan
                            </p>

                            <h4>
                                PKR 150,000 / Month
                            </h4>

                            <div className="property-info">

                                <span>
                                    🛏 5 Beds
                                </span>

                                <span>
                                    🛁 4 Baths
                                </span>

                                <span>
                                    📐 3200 sqft
                                </span>

                            </div>

                            <Link
                                to="/properties"
                                className="details-btn"
                            >
                                View Properties
                            </Link>

                        </div>

                    </div>


                    <div className="property-card">

                        <div className="property-card-image">

                            <img
                                src="/images/house.png"
                                alt="Modern Apartment"
                            />

                        </div>

                        <div className="property-card-content">

                            <span className="property-badge">
                                For Sale
                            </span>

                            <h3>
                                Modern Apartment
                            </h3>

                            <p>
                                Faisalabad, Pakistan
                            </p>

                            <h4>
                                PKR 12,500,000
                            </h4>

                            <div className="property-info">

                                <span>
                                    🛏 3 Beds
                                </span>

                                <span>
                                    🛁 2 Baths
                                </span>

                                <span>
                                    📐 1800 sqft
                                </span>

                            </div>

                            <Link
                                to="/properties"
                                className="details-btn"
                            >
                                View Properties
                            </Link>

                        </div>

                    </div>

                </div>


                <Link
                    to="/properties"
                    className="all-properties-btn"
                >
                    View All Properties
                </Link>

            </section>


            {/* =========================
                CTA
            ========================= */}

            <section className="cta">

                <div>

                    <span>
                        READY TO FIND YOUR PROPERTY?
                    </span>

                    <h2>
                        Let’s Find Your Perfect Home Together
                    </h2>

                    <p>
                        Explore our latest listings and discover a property
                        that feels right for you.
                    </p>

                </div>

                <Link to="/properties">
                    Explore Properties
                </Link>

            </section>

        </div>
    );
}

export default Home;