
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../css/AddProperty.css";

function AddProperty() {

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

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSubmitting(true);

            const propertyData = {
                ...property,

                price: Number(property.price),

                bedrooms: Number(property.bedrooms),

                bathrooms: Number(property.bathrooms),

                area: property.area
                    ? Number(property.area)
                    : 0,

                images: property.images
                    ? property.images
                        .split(",")
                        .map((image) => image.trim())
                        .filter((image) => image !== "")
                    : []
            };

            await API.post(
                "/api/properties",
                propertyData
            );

            alert("Property added successfully");

            navigate("/properties");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add property"
            );

        } finally {

            setSubmitting(false);

        }
    };

    return (

        <div className="add-property-page">

            {/* Hero / Heading */}

            <section className="add-property-hero">

                <div>

                    <span>
                        PROPERTY MANAGEMENT
                    </span>

                    <h1>
                        Add a New Property
                    </h1>

                    <p>
                        Create a professional listing and showcase
                        your property to potential buyers and renters.
                    </p>

                </div>

            </section>


            {/* Form Section */}

            <section className="add-property-section">

                <div className="add-property-card">

                    <div className="form-heading">

                        <div>

                            <span>
                                PROPERTY DETAILS
                            </span>

                            <h2>
                                Listing Information
                            </h2>

                        </div>

                        <div className="required-note">
                            * Required fields
                        </div>

                    </div>


                    <form onSubmit={handleSubmit}>

                        {/* Basic Information */}

                        <div className="form-block">

                            <h3>
                                Basic Information
                            </h3>

                            <div className="form-grid">

                                <div className="form-group full-width">

                                    <label>
                                        Property Title *
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="e.g. Modern Family House"
                                        value={property.title}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Price *
                                    </label>

                                    <input
                                        type="number"
                                        name="price"
                                        placeholder="e.g. 25000000"
                                        value={property.price}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Location *
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Faisalabad"
                                        value={property.location}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Property Details */}

                        <div className="form-block">

                            <h3>
                                Property Details
                            </h3>

                            <div className="form-grid">

                                <div className="form-group">

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


                                <div className="form-group">

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


                                <div className="form-group">

                                    <label>
                                        Bedrooms *
                                    </label>

                                    <input
                                        type="number"
                                        name="bedrooms"
                                        placeholder="e.g. 4"
                                        min="0"
                                        value={property.bedrooms}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Bathrooms *
                                    </label>

                                    <input
                                        type="number"
                                        name="bathrooms"
                                        placeholder="e.g. 3"
                                        min="0"
                                        value={property.bathrooms}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                <div className="form-group full-width">

                                    <label>
                                        Area (sq ft)
                                    </label>

                                    <input
                                        type="number"
                                        name="area"
                                        placeholder="e.g. 2500"
                                        min="0"
                                        value={property.area}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Description */}

                        <div className="form-block">

                            <h3>
                                Property Description
                            </h3>

                            <div className="form-group">

                                <label>
                                    Description *
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Write a detailed description of the property..."
                                    value={property.description}
                                    onChange={handleChange}
                                    rows="7"
                                    required
                                ></textarea>

                            </div>

                        </div>


                        {/* Images */}

                        <div className="form-block">

                            <h3>
                                Property Images
                            </h3>

                            <div className="form-group">

                                <label>
                                    Image URLs
                                </label>

                                <input
                                    type="text"
                                    name="images"
                                    placeholder="/images/house.png, https://example.com/image.jpg"
                                    value={property.images}
                                    onChange={handleChange}
                                />

                                <small>
                                    Add multiple image URLs separated by commas.
                                </small>

                            </div>

                        </div>


                        {/* Actions */}

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => navigate("/dashboard")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="submit-property-btn"
                                disabled={submitting}
                            >
                                {submitting
                                    ? "Adding Property..."
                                    : "Add Property"
                                }
                            </button>

                        </div>

                    </form>

                </div>

            </section>

        </div>
    );
}

export default AddProperty;
