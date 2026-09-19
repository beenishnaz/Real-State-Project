
import React from "react";
import { Link } from "react-router-dom";

function PropertyCard({ property }) {

    return (

        <div className="property-card">

            {/* Property Image */}
            <div className="property-image">

                {property.images && property.images.length > 0 && (
                    <img
                        src={property.images[0]}
                        alt={property.title}
                    />
                )}

                {/* Listing Badge */}
                <span className="listing-badge">
                    {property.listingType}
                </span>

            </div>


            {/* Property Content */}
            <div className="property-content">

                <h3>
                    {property.title}
                </h3>

                <p className="property-location">
                    📍 {property.location}
                </p>

                <h4 className="property-price">
                    PKR {property.price?.toLocaleString()}
                </h4>


                {/* Property Information */}
                <div className="property-meta">

                    <span>
                        🛏 {property.bedrooms} Beds
                    </span>

                    <span>
                        🛁 {property.bathrooms} Baths
                    </span>

                    <span>
                        📐 {property.area} sq ft
                    </span>

                </div>


                {/* Property Type */}
                <p className="property-type">
                    🏠 {property.propertyType}
                </p>


                {/* Details Button */}
                <Link
                    to={`/properties/${property._id}`}
                    className="view-details-btn"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
}

export default PropertyCard;
