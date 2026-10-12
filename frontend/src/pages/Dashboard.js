
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../css/Dashboard.css";

function Dashboard() {

    const [properties, setProperties] = useState([]);
    const [inquiries, setInquiries] = useState([]);
    const [centralMessages, setCentralMessages] = useState([]);
    const [platformUsers, setPlatformUsers] = useState([]);
    const [platformProperties, setPlatformProperties] = useState([]);
    const [isPlatformOwner, setIsPlatformOwner] = useState(false);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchProperties = async () => {

        try {

            const response = await API.get("/api/properties/my/listings");

            setProperties(
                response.data.properties || response.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    const fetchInquiries = async () => {
        try {
            const response = await API.get("/api/contact/my-property-inquiries");
            setInquiries(response.data.messages || []);
        } catch (error) {
            console.log("Property inquiries:", error.response?.data?.message || error.message);
        }
    };

    const fetchCentralMessages = async () => {
        try {
            const response = await API.get("/api/contact");
            setCentralMessages(response.data.messages || []);
            setIsPlatformOwner(true);
            const overview = await API.get("/api/contact/platform-overview");
            setPlatformUsers(overview.data.users || []);
            setPlatformProperties(overview.data.properties || []);
        } catch (error) {
            // A 403 means this account is not the configured platform owner.
            setIsPlatformOwner(false);
        }
    };

    useEffect(() => {
        fetchProperties();
        fetchInquiries();
        fetchCentralMessages();
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


            <section className="dashboard-messages">
                <div className="dashboard-section-header">
                    <div>
                        <span>PROPERTY CONNECTIONS</span>
                        <h2>Inquiries About My Properties</h2>
                    </div>
                    <span className="message-count">{inquiries.length} inquiries</span>
                </div>
                {inquiries.length === 0 ? (
                    <p>No customer has contacted you about your properties yet.</p>
                ) : (
                    <div className="messages-list">
                        {inquiries.map((item) => (
                            <article className="customer-message-card" key={item._id}>
                                <div className="message-header">
                                    <div>
                                        <h3>{item.name} — {item.propertyTitle}</h3>
                                        <span className="message-status">{item.contactMethod === "call" ? "Call requested" : "Email requested"}</span>
                                    </div>
                                    <span className="message-date">{new Date(item.createdAt).toLocaleString()}</span>
                                </div>
                                <div className="message-contact">
                                    <span>Email: {item.email}</span>
                                    <span>Phone: {item.phone}</span>
                                </div>
                                <p className="message-body">{item.message}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {isPlatformOwner && (
                <section className="dashboard-messages">
                    <div className="dashboard-section-header">
                        <div>
                            <span>AGENCY OWNER INBOX</span>
                            <h2>Contact Us Messages & Platform Activity</h2>
                        </div>
                        <span className="message-count">{centralMessages.length} records</span>
                    </div>
                    {centralMessages.length === 0 ? (
                        <p>No Contact Us messages or property connections yet.</p>
                    ) : (
                        <div className="messages-list">
                            {centralMessages.map((item) => (
                                <article className="customer-message-card" key={item._id}>
                                    <div className="message-header">
                                        <div>
                                            <h3>{item.kind === "property" ? `Property inquiry: ${item.propertyTitle || "Property"}` : "Contact Us message"}</h3>
                                            <span className="message-status">{item.kind === "property" ? `Contact method: ${item.contactMethod}` : "Agency contact"} · {item.status}</span>
                                        </div>
                                        <span className="message-date">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}</span>
                                    </div>
                                    <div className="message-contact">
                                        <span>Customer: {item.name}</span>
                                        <span>Email: {item.email}</span>
                                        <span>Phone: {item.phone}</span>
                                        {item.kind === "property" && <span>Property owner: {item.propertyOwnerName || "Unknown"} ({item.propertyOwnerEmail || "Email unavailable"})</span>}
                                    </div>
                                    <p className="message-body">{item.message || "Customer opened a contact option."}</p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {isPlatformOwner && (
                <section className="dashboard-messages">
                    <div className="dashboard-section-header">
                        <div><span>PLATFORM MANAGEMENT</span><h2>Registered Users & Seller Listings</h2></div>
                        <span className="message-count">{platformUsers.length} users · {platformProperties.length} properties</span>
                    </div>
                    <h3>Registered Users</h3>
                    {platformUsers.length === 0 ? <p>No registered users yet.</p> : (
                        <div className="messages-list">{platformUsers.map((person) => (
                            <article className="customer-message-card" key={person._id}>
                                <div className="message-header"><div><h3>{person.name}</h3><span className="message-status">{person.role || "realtor"}</span></div><span className="message-date">{person.createdAt ? new Date(person.createdAt).toLocaleDateString() : ""}</span></div>
                                <div className="message-contact"><span>Email: {person.email}</span></div>
                            </article>
                        ))}</div>
                    )}
                    <h3 style={{ marginTop: "28px" }}>All Seller Properties</h3>
                    {platformProperties.length === 0 ? <p>No properties have been listed yet.</p> : (
                        <div className="messages-list">{platformProperties.map((listing) => (
                            <article className="customer-message-card" key={listing._id}>
                                <div className="message-header"><div><h3>{listing.title}</h3><span className="message-status">{listing.listingType} · {listing.status}</span></div><span className="message-date">{listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : ""}</span></div>
                                <div className="message-contact"><span>Location: {listing.location}</span><span>Price: PKR {Number(listing.price || 0).toLocaleString()}</span><span>Seller: {listing.userId?.name || "Unknown"} ({listing.userId?.email || "unavailable"})</span></div>
                            </article>
                        ))}</div>
                    )}
                </section>
            )}

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
