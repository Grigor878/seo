import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ContactUs from "./ContactUs";
// import cookies from "js-cookie";

const App = () => {
  // const { pathname } = useLocation();
  // const language = cookies.get("language") || "am";

  // useEffect(() => {
  //   if (!pathname.startsWith("/login") && !pathname.startsWith("/dashboard")) {
  //     const pathParts = pathname.split("/");
  //     const langFromUrl = pathParts[1];

  //     const validLanguages = ["ru", "am", "en"];

  //     if (langFromUrl && !validLanguages.includes(langFromUrl)) {
  //       window.location.href = `/am${pathname}`;
  //     } else if (!langFromUrl || langFromUrl !== language) {
  //       window.location.href = `/${language}${pathname}`;
  //     }
  //   }
  // }, [pathname]);

  return (
    <main>
      <Navbar />
      <Routes>
        {/* <Route path={`/${language}`}> */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {/* </Route> */}
      </Routes>
    </main>
  );
};

export default App;
