import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import UpdateProperty from "./pages/UpdateProperty";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./App.css";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/properties" element={<Properties />} />

                <Route path="/gallery" element={<Gallery />} />

                <Route path="/about" element={<About />} />

                <Route path="/contact" element={<Contact />} />



                <Route
                    path="/properties/:id"
                    element={<PropertyDetails />}
                />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/add-property"
                    element={
                        <PrivateRoute>
                            <AddProperty />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/update-property/:id"
                    element={
                        <PrivateRoute>
                            <UpdateProperty />
                        </PrivateRoute>
                    }
                />

            </Routes>

            <Footer />

        </BrowserRouter>
    );
}

export default App;