
import React, { useState } from "react";
import "../css/Contact.css";
import API from "../services/api";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await API.post("/api/contact", formData);
            alert("Thank you! Your message has been sent to the agency.");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            alert(error.response?.data?.message || "Could not send your message. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="contact-page">

            {/* Hero */}
            <section className="contact-hero">

                <div className="contact-hero-content">

                    <span>GET IN TOUCH</span>

                    <h1>
                        Let’s Talk About Your Property
                    </h1>

                    <p>
                        Whether you are buying, renting or listing a
                        property, our team is here to help.
                    </p>

                </div>

            </section>


            {/* Contact Section */}
            <section className="contact-section">

                {/* Contact Info */}
                <div className="contact-info">

                    <span className="contact-label">
                        CONTACT US
                    </span>

                    <h2>
                        We’re Here To Help
                    </h2>

                    <p>
                        Have a question about a property or want to
                        discuss your real estate needs? Get in touch
                        with our team.
                    </p>


                    <div className="contact-info-item">

                        <div className="contact-icon">
                            📍
                        </div>

                        <div>
                            <h3>Our Location</h3>
                            <p>Faisalabad, Pakistan</p>
                        </div>

                    </div>


                    <div className="contact-info-item">

                        <div className="contact-icon">
                            📞
                        </div>

                        <div>
                            <h3>Phone</h3>
                            <p>+92 300 1234567</p>
                        </div>

                    </div>


                    <div className="contact-info-item">

                        <div className="contact-icon">
                            ✉️
                        </div>

                        <div>
                            <h3>Email</h3>
                            <p>info@realestate.com</p>
                        </div>

                    </div>

                </div>


                {/* Contact Form */}
                <div className="contact-form-card">

                    <h2>
                        Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-row">

                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />


                        <textarea
                            name="message"
                            placeholder="Tell us how we can help..."
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            required
                        ></textarea>


                        <button type="submit" disabled={submitting}>
                            {submitting ? "Sending..." : "Send Message"}
                        </button>

                    </form>

                </div>

            </section>


            {/* CTA */}
            <section className="contact-cta">

                <div>

                    <span>
                        LOOKING FOR YOUR NEXT PROPERTY?
                    </span>

                    <h2>
                        Let’s Find The Right One For You
                    </h2>

                </div>

                <a href="/properties">
                    Browse Properties
                </a>

            </section>

        </div>
    );
}

export default Contact;
