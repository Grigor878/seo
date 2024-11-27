import React from "react";
import { Navbar } from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUs from "../pages/ContactUs";
import NotFound from "../pages/NotFound";

const View = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path={`/seo`}>
          <Route index element={<Home />} />
          <Route path="/seo/about" element={<About />} />
          <Route path="/seo/contact-us" element={<ContactUs />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default View;
