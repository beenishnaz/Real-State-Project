
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../css/Dashboard.css";

function Dashboard() {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchProperties = async () => {

        try {

            const response = await API.get("/api/properties");

            setProperties(
                response.data.properties || response.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const deleteProperty = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(
                `/api/properties/${id}`
            );

            alert("Property deleted successfully");

            fetchProperties();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete property"
            );

        }
    };

    const totalProperties = properties.length;

    const saleProperties = properties.filter(
        (property) => property.listingType === "Sale"
    ).length;

    const rentProperties = properties.filter(
        (property) => property.listingType === "Rent"
    ).length;

    return (

        <div className="dashboard-page">

            {/* =========================
                HEADER
            ========================= */}

            <section className="dashboard-header">

                <div>

                    <span className="dashboard-label">
                        REALTOR DASHBOARD
                    </span>

                    <h1>
                        Welcome{user?.name ? `, ${user.name}` : ""} 👋
                    </h1>

                    <p>
                        Manage your property listings and keep your
                        real estate portfolio organized.
                    </p>

                </div>

                <Link
                    to="/add-property"
                    className="dashboard-add-btn"
                >
                    + Add New Property
                </Link>

            </section>


            {/* =========================
                STATS
            ========================= */}

            <section className="dashboard-stats">

                <div className="dashboard-stat-card">

                    <div className="stat-icon">
                        🏠
                    </div>

                    <div>
                        <span>Total Properties</span>
                        <h2>{totalProperties}</h2>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon sale-icon">
                        🏷️
                    </div>

                    <div>
                        <span>For Sale</span>
                        <h2>{saleProperties}</h2>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon rent-icon">
                        🔑
                    </div>

                    <div>
                        <span>For Rent</span>
                        <h2>{rentProperties}</h2>
                    </div>

                </div>


                <div className="dashboard-stat-card">

                    <div className="stat-icon available-icon">
                        ✓
                    </div>

                    <div>
                        <span>Available</span>
                        <h2>
                            {
                                properties.filter(
                                    (property) =>
                                        property.status === "Available"
                                ).length
                            }
                        </h2>
                    </div>

                </div>

            </section>


            {/* =========================
                PROPERTY LIST
            ========================= */}

            <section className="dashboard-properties">

                <div className="dashboard-section-header">

                    <div>

                        <span>PROPERTY MANAGEMENT</span>

                        <h2>
                            My Properties
                        </h2>

                    </div>

                    <Link to="/properties">
                        View Public Listings →
                    </Link>

                </div>


                {loading ? (

                    <div className="dashboard-message">
                        Loading properties...
                    </div>

                ) : properties.length === 0 ? (

                    <div className="empty-dashboard">

                        <div className="empty-icon">
                            🏠
                        </div>

                        <h3>
                            No Properties Yet
                        </h3>

                        <p>
                            Start building your property portfolio
                            by adding your first listing.
                        </p>

                        <Link
                            to="/add-property"
                            className="dashboard-add-btn"
                        >
                            Add Your First Property
                        </Link>

                    </div>

                ) : (

                    <div className="dashboard-grid">

                        {properties.map((property) => (

                            <div
                                className="dashboard-property-card"
                                key={property._id}
                            >

                                {/* Image */}

                                <div className="dashboard-property-image">

                                    {property.images &&
                                    property.images.length > 0 ? (

                                        <img
                                            src={property.images[0]}
                                            alt={property.title}
                                        />

                                    ) : (

                                        <div className="dashboard-no-image">
                                            No Image
                                        </div>

                                    )}

                                    <span>
                                        {property.listingType}
                                    </span>

                                </div>


                                {/* Content */}

                                <div className="dashboard-property-content">

                                    <h3>
                                        {property.title}
                                    </h3>

                                    <p className="dashboard-location">
                                        📍 {property.location}
                                    </p>

                                    <h4>
                                        PKR {property.price?.toLocaleString()}
                                    </h4>


                                    <div className="dashboard-meta">

                                        <span>
                                            🛏 {property.bedrooms}
                                        </span>

                                        <span>
                                            🛁 {property.bathrooms}
                                        </span>

                                        <span>
                                            📐 {property.area || "N/A"}
                                        </span>

                                    </div>


                                    <div className="dashboard-actions">

                                        <Link
                                            to={`/properties/${property._id}`}
                                            className="view-action"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            to={`/update-property/${property._id}`}
                                            className="update-action"
                                        >
                                            Update
                                        </Link>

                                        <button
                                            className="delete-action"
                                            onClick={() =>
                                                deleteProperty(
                                                    property._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default Dashboard;
