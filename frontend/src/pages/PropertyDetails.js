
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


    const recordContact = async (contactMethod) => {
        const name = window.prompt("Your name:");
        if (!name?.trim()) return null;
        const email = window.prompt("Your email address:");
        if (!email?.trim()) return null;
        const phone = window.prompt("Your phone number:");
        if (!phone?.trim()) return null;
        try {
            const result = await API.post(`/api/contact/property/${id}`, {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                message: "Customer initiated contact from the property details page.",
                contactMethod
            });
            return result.data.owner;
        } catch (error) {
            alert(error.response?.data?.message || "Could not record your inquiry.");
            return null;
        }
    };

    const handleCall = async () => {
        const owner = await recordContact("call");
        if (owner && property.contactPhone) window.location.href = `tel:${property.contactPhone}`;
        else if (owner) alert("Inquiry saved, but this listing has no phone number yet.");
    };

    const handleEmail = async () => {
        const owner = await recordContact("email");
        if (owner?.email) {
            const subject = encodeURIComponent(`Inquiry about ${property.title}`);
            window.location.href = `mailto:${owner.email}?subject=${subject}`;
        }
    };

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

                    <button type="button" onClick={handleCall} className="contact-btn">
                        📞 Call Realtor
                    </button>

                    <button type="button" onClick={handleEmail} className="email-btn">
                        ✉ Email Realtor
                    </button>

                    <p className="realtor-owner-label">
                        Listed by: {property.userId?.name || "Property owner"}
                    </p>

                </aside>

            </section>

        </div>
    );
}

export default PropertyDetails;
