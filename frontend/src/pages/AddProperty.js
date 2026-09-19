
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
        contactPhone: "",
        description: "",
        images: []
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);

        const invalidFile = files.find((file) => ![
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ].includes(file.type));

        if (invalidFile) {
            alert(`${invalidFile.name} is not a supported image format. Please choose JPG, PNG or WEBP.`);
            e.target.value = "";
            return;
        }

        const oversizedFile = files.find((file) => file.size > 5 * 1024 * 1024);

        if (oversizedFile) {
            alert(`${oversizedFile.name} is larger than 5MB.`);
            e.target.value = "";
            return;
        }

        if (files.length > 10) {
            alert("You can select up to 10 images.");
            e.target.value = "";
            return;
        }

        setProperty({
            ...property,
            images: files
        });
    };

    const removeImage = (indexToRemove) => {
        setProperty((current) => ({
            ...current,
            images: current.images.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSubmitting(true);

            const formData = new FormData();

            formData.append("title", property.title);
            formData.append("price", Number(property.price));
            formData.append("location", property.location);
            formData.append("propertyType", property.propertyType);
            formData.append("listingType", property.listingType);
            formData.append("bedrooms", Number(property.bedrooms));
            formData.append("bathrooms", Number(property.bathrooms));
            formData.append("area", property.area ? Number(property.area) : 0);
            formData.append("contactPhone", property.contactPhone);
            formData.append("description", property.description);

            property.images.forEach((image) => {
                formData.append("images", image);
            });

            await API.post("/api/properties", formData);

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

                                <div className="form-group full-width">
                                    <label>Contact Phone *</label>
                                    <input
                                        type="tel"
                                        name="contactPhone"
                                        placeholder="e.g. +923001234567"
                                        value={property.contactPhone}
                                        onChange={handleChange}
                                        required
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
                                    Property Images
                                </label>

                                <input
                                    type="file"
                                    name="images"
                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                    multiple
                                    onChange={handleImageChange}
                                />

                                <small>
                                    Choose up to 10 images from your computer. JPG, PNG and WEBP up to 5MB each.
                                </small>

                                {property.images.length > 0 && (
                                    <>
                                        <small>
                                            {property.images.length} image(s) selected.
                                        </small>

                                        <div className="selected-images-list">
                                            {property.images.map((image, index) => (
                                                <div className="selected-image-item" key={`${image.name}-${index}`}>
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={image.name}
                                                    />

                                                    <div className="selected-image-info">
                                                        <span title={image.name}>
                                                            {image.name}
                                                        </span>
                                                        <small>
                                                            {(image.size / (1024 * 1024)).toFixed(2)} MB
                                                        </small>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        className="remove-image-btn"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

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
