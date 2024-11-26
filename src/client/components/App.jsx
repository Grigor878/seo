import React from "react";
import { Navbar } from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ContactUs from "./ContactUs";

const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path={`/seo`}>
          <Route index element={<Home/>} />
          <Route path="/seo/about" element={<About />} />
          <Route path="/seo/contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
