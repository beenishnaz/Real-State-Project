import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../css/UpdateProperty.css";

function UpdateProperty() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState({
        title: "",
        price: "",
        location: "",
        propertyType: "",
        listingType: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        description: "",
        images: ""
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await API.get(
                    `/api/properties/${id}`
                );

                const data =
                    response.data.property || response.data;

                setProperty({
                    title: data.title || "",
                    price: data.price || "",
                    location: data.location || "",
                    propertyType: data.propertyType || "",
                    listingType: data.listingType || "",
                    bedrooms: data.bedrooms || "",
                    bathrooms: data.bathrooms || "",
                    area: data.area || "",
                    description: data.description || "",
                    images: data.images
                        ? data.images.join(", ")
                        : ""
                });

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setUpdating(true);

            const propertyData = {
                ...property,
                price: Number(property.price),
                bedrooms: Number(property.bedrooms),
                bathrooms: Number(property.bathrooms),
                area: property.area ? Number(property.area) : 0,
                images: property.images
                    ? property.images
                        .split(",")
                        .map((image) => image.trim())
                        .filter((image) => image !== "")
                    : []
            };

            await API.put(
                `/api/properties/${id}`,
                propertyData
            );

            alert("Property updated successfully");

            navigate("/dashboard");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update property"
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="update-loading">
                Loading property...
            </div>
        );
    }

    return (
        <div className="update-property-page">

            <section className="update-property-hero">
                <span>PROPERTY MANAGEMENT</span>

                <h1>
                    Update Your Property
                </h1>

                <p>
                    Make changes to your listing information and keep
                    your property details up to date.
                </p>
            </section>


            <section className="update-property-section">

                <div className="update-property-card">

                    <div className="update-heading">
                        <div>
                            <span>EDIT LISTING</span>

                            <h2>
                                Property Information
                            </h2>
                        </div>

                        <button
                            type="button"
                            className="back-dashboard-btn"
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            ← Dashboard
                        </button>
                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="update-block">

                            <h3>
                                Basic Information
                            </h3>

                            <div className="update-grid">

                                <div className="update-group full-width">
                                    <label>
                                        Property Title *
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={property.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                <div className="update-group">
                                    <label>
                                        Price *
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        value={property.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                <div className="update-group">
                                    <label>
                                        Location *
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={property.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </div>
                        </div>


                        <div className="update-block">

                            <h3>
                                Property Details
                            </h3>

                            <div className="update-grid">

                                <div className="update-group">
                                    <label>
                                        Property Type *
                                    </label>

                                    <select
                                        name="propertyType"
                                        value={property.propertyType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select Property Type
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
                                </div>


                                <div className="update-group">
                                    <label>
                                        Listing Type *
                                    </label>

                                    <select
                                        name="listingType"
                                        value={property.listingType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">
                                            Select Listing Type
                                        </option>

                                        <option value="Sale">
                                            For Sale
                                        </option>

                                        <option value="Rent">
                                            For Rent
                                        </option>
                                    </select>
                                </div>


                                <div className="update-group">
                                    <label>
                                        Bedrooms *
                                    </label>

                                    <input
                                        type="number"
                                        name="bedrooms"
                                        value={property.bedrooms}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                <div className="update-group">
                                    <label>
                                        Bathrooms *
                                    </label>

                                    <input
                                        type="number"
                                        name="bathrooms"
                                        value={property.bathrooms}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                                <div className="update-group full-width">
                                    <label>
                                        Area (sq ft)
                                    </label>

                                    <input
                                        type="number"
                                        name="area"
                                        value={property.area}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                        </div>


                        <div className="update-block">

                            <h3>
                                Description
                            </h3>

                            <div className="update-group">

                                <textarea
                                    name="description"
                                    value={property.description}
                                    onChange={handleChange}
                                    rows="7"
                                    required
                                ></textarea>

                            </div>
                        </div>


                        <div className="update-block">

                            <h3>
                                Property Images
                            </h3>

                            <div className="update-group">

                                <input
                                    type="text"
                                    name="images"
                                    value={property.images}
                                    onChange={handleChange}
                                    placeholder="Image URLs separated by commas"
                                />

                                <small>
                                    Use comma-separated image URLs.
                                </small>

                            </div>
                        </div>


                        <div className="update-actions">

                            <button
                                type="button"
                                className="cancel-update-btn"
                                onClick={() =>
                                    navigate("/dashboard")
                                }
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="save-update-btn"
                                disabled={updating}
                            >
                                {updating
                                    ? "Saving Changes..."
                                    : "Save Changes"
                                }
                            </button>

                        </div>

                    </form>

                </div>

            </section>

        </div>
    );
}

export default UpdateProperty;
