
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "../css/PropertyDetails.css";

function PropertyDetails() {

    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProperty = async () => {

            try {

                const response = await API.get(
                    `/api/properties/${id}`
                );

                setProperty(
                    response.data.property || response.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchProperty();

    }, [id]);


    if (loading) {
        return (
            <div className="details-loading">
                Loading property...
            </div>
        );
    }


    if (!property) {
        return (
            <div className="details-not-found">
                <h2>Property not found</h2>

                <Link to="/properties">
                    Back to Properties
                </Link>
            </div>
        );
    }


    return (

        <div className="property-details-page">

            {/* =========================
                IMAGE SECTION
            ========================= */}

            <section className="details-image-section">

                <div className="main-property-image">

                    {property.images &&
                    property.images.length > 0 ? (

                        <img
                            src={property.images[0]}
                            alt={property.title}
                        />

                    ) : (

                        <div className="no-image">
                            No Image Available
                        </div>

                    )}

                    <span className="details-listing-badge">
                        {property.listingType}
                    </span>

                </div>

            </section>


            {/* =========================
                PROPERTY CONTENT
            ========================= */}

            <section className="details-content">

                <div className="details-main">

                    <div className="details-header">

                        <div>

                            <p className="details-property-type">
                                {property.propertyType}
                            </p>

                            <h1>
                                {property.title}
                            </h1>

                            <p className="details-location">
                                📍 {property.location}
                            </p>

                        </div>

                        <div className="details-price">

                            <span>Price</span>

                            <h2>
                                PKR {property.price?.toLocaleString()}
                            </h2>

                        </div>

                    </div>


                    {/* =========================
                        PROPERTY FEATURES
                    ========================= */}

                    <div className="details-features">

                        <div className="feature-box">
                            <span className="feature-icon">🛏</span>
                            <strong>{property.bedrooms}</strong>
                            <small>Bedrooms</small>
                        </div>

                        <div className="feature-box">
                            <span className="feature-icon">🛁</span>
                            <strong>{property.bathrooms}</strong>
                            <small>Bathrooms</small>
                        </div>

                        <div className="feature-box">
                            <span className="feature-icon">📐</span>
                            <strong>{property.area || "N/A"}</strong>
                            <small>Sq Ft</small>
                        </div>

                        <div className="feature-box">
                            <span className="feature-icon">🏠</span>
                            <strong>{property.status}</strong>
                            <small>Status</small>
                        </div>

                    </div>


                    {/* =========================
                        DESCRIPTION
                    ========================= */}

                    <div className="details-section">

                        <h2>Property Description</h2>

                        <p>
                            {property.description}
                        </p>

                    </div>


                    {/* =========================
                        PROPERTY INFORMATION
                    ========================= */}

                    <div className="details-section">

                        <h2>Property Information</h2>

                        <div className="information-grid">

                            <div>
                                <span>Property Type</span>
                                <strong>
                                    {property.propertyType}
                                </strong>
                            </div>

                            <div>
                                <span>Listing Type</span>
                                <strong>
                                    {property.listingType}
                                </strong>
                            </div>

                            <div>
                                <span>Bedrooms</span>
                                <strong>
                                    {property.bedrooms}
                                </strong>
                            </div>

                            <div>
                                <span>Bathrooms</span>
                                <strong>
                                    {property.bathrooms}
                                </strong>
                            </div>

                            <div>
                                <span>Area</span>
                                <strong>
                                    {property.area || "N/A"} sq ft
                                </strong>
                            </div>

                            <div>
                                <span>Status</span>
                                <strong>
                                    {property.status}
                                </strong>
                            </div>

                        </div>

                    </div>


                    {/* =========================
                        BACK BUTTON
                    ========================= */}

                    <Link
                        to="/properties"
                        className="back-properties-btn"
                    >
                        ← Back to Properties
                    </Link>

                </div>


                {/* =========================
                    CONTACT CARD
                ========================= */}

                <aside className="contact-card">

                    <span>INTERESTED IN THIS PROPERTY?</span>

                    <h2>
                        Make It Yours Today
                    </h2>

                    <p>
                        Contact our real estate team to get more
                        information about this property.
                    </p>

                    <a
                        href="tel:+923001234567"
                        className="contact-btn"
                    >
                        📞 Contact Realtor
                    </a>

                    <a
                        href="mailto:info@realestate.com"
                        className="email-btn"
                    >
                        ✉ Send Email
                    </a>

                </aside>

            </section>

        </div>
    );
}

export default PropertyDetails;
