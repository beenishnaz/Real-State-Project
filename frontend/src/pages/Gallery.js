
import React from "react";
import "../css/Gallery.css";

function Gallery() {
    const images = [
        {
            src: "/images/house.png",
            title: "Modern Family House"
        },
        {
            src: "/images/house.png",
            title: "Luxury Villa"
        },
        {
            src: "/images/house.png",
            title: "Modern Apartment"
        },
        {
            src: "/images/house.png",
            title: "Beautiful Home"
        },
        {
            src: "/images/house.png",
            title: "Premium Property"
        },
        {
            src: "/images/house.png",
            title: "Elegant Residence"
        }
    ];

    return (
        <div className="gallery-page">

            <section className="gallery-hero">
                <span>OUR GALLERY</span>
                <h1>Explore Our Properties</h1>
                <p>
                    Take a look at our beautiful homes,
                    apartments and premium properties.
                </p>
            </section>

            <section className="gallery-section">

                <div className="gallery-grid">

                    {images.map((image, index) => (
                        <div className="gallery-item" key={index}>

                            <img
                                src={image.src}
                                alt={image.title}
                            />

                            <div className="gallery-overlay">
                                <h3>{image.title}</h3>
                            </div>

                        </div>
                    ))}

                </div>

            </section>

        </div>
    );
}

export default Gallery;
