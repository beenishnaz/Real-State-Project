import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import PropertyCard from "../components/PropertyCard";
import "../css/Properties.css";

function Properties() {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("location") || ""
    );

    const [propertyType, setPropertyType] = useState(
        searchParams.get("propertyType") || ""
    );

    const [listingType, setListingType] = useState(
        searchParams.get("listingType") || ""
    );


    /* =========================
       FETCH PROPERTIES
    ========================= */

    useEffect(() => {

        const fetchProperties = async () => {

            try {

                const response = await API.get(
                    "/api/properties"
                );

                setProperties(
                    response.data.properties || response.data
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchProperties();

    }, []);


    /* =========================
       UPDATE URL
    ========================= */

    useEffect(() => {

        const params = {};

        if (search.trim()) {
            params.location = search.trim();
        }

        if (propertyType) {
            params.propertyType = propertyType;
        }

        if (listingType) {
            params.listingType = listingType;
        }

        setSearchParams(params);

    }, [
        search,
        propertyType,
        listingType,
        setSearchParams
    ]);


    /* =========================
       FILTER PROPERTIES
    ========================= */

    const filteredProperties = properties.filter(
        (property) => {

            const propertyLocation =
                property.location?.toLowerCase() || "";

            const propertyTitle =
                property.title?.toLowerCase() || "";

            const searchValue =
                search.toLowerCase().trim();


            const matchesSearch =
                searchValue === "" ||
                propertyLocation.includes(searchValue) ||
                propertyTitle.includes(searchValue);


            const matchesPropertyType =
                propertyType === "" ||
                property.propertyType === propertyType;


            const matchesListingType =
                listingType === "" ||
                property.listingType === listingType;


            return (
                matchesSearch &&
                matchesPropertyType &&
                matchesListingType
            );
        }
    );


    /* =========================
       RESET
    ========================= */

    const resetFilters = () => {

        setSearch("");
        setPropertyType("");
        setListingType("");

        setSearchParams({});

    };


    /* =========================
       LOADING
    ========================= */

    if (loading) {
        return (
            <div className="properties-loading">
                Loading properties...
            </div>
        );
    }


    return (

        <div className="properties-page">


            {/* =========================
                HERO
            ========================= */}

            <section className="properties-header">

                <span>
                    EXPLORE PROPERTIES
                </span>

                <h1>
                    Find Your Perfect Property
                </h1>

                <p>
                    Browse our latest homes, apartments, villas
                    and commercial properties.
                </p>

            </section>


            {/* =========================
                FILTER BAR
            ========================= */}

            <section className="property-filters">


                {/* Search */}

                <div className="filter-group">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        placeholder="Search by title or location"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>


                {/* Property Type */}

                <div className="filter-group">

                    <label>
                        Property Type
                    </label>

                    <select
                        value={propertyType}
                        onChange={(e) =>
                            setPropertyType(e.target.value)
                        }
                    >

                        <option value="">
                            All Types
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


                {/* Listing Type */}

                <div className="filter-group">

                    <label>
                        Listing Type
                    </label>

                    <select
                        value={listingType}
                        onChange={(e) =>
                            setListingType(e.target.value)
                        }
                    >

                        <option value="">
                            All Listings
                        </option>

                        <option value="Sale">
                            For Sale
                        </option>

                        <option value="Rent">
                            For Rent
                        </option>

                    </select>

                </div>


                {/* Reset */}

                <button
                    type="button"
                    className="reset-filters-btn"
                    onClick={resetFilters}
                >
                    Reset
                </button>

            </section>


            {/* =========================
                RESULTS
            ========================= */}

            <section className="properties-results">

                <div className="results-heading">

                    <div>

                        <span>
                            PROPERTY LISTINGS
                        </span>

                        <h2>
                            Available Properties
                        </h2>

                    </div>

                    <p>
                        {filteredProperties.length} Properties Found
                    </p>

                </div>


                {filteredProperties.length > 0 ? (

                    <div className="property-grid">

                        {filteredProperties.map(
                            (property) => (

                                <PropertyCard
                                    key={property._id}
                                    property={property}
                                />

                            )
                        )}

                    </div>

                ) : (

                    <div className="no-properties">

                        <div>
                            🔎
                        </div>

                        <h3>
                            No Properties Found
                        </h3>

                        <p>
                            Try changing your search or filters.
                        </p>

                        <button
                            type="button"
                            onClick={resetFilters}
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

            </section>

        </div>
    );
}

export default Properties;