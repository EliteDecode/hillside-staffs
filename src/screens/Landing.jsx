import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";

import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";
import Newsletter from "../components/Sections/NewsLetter";
import { Box } from "@mui/material";

export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Services />

      <Newsletter />

      {/* <Blog />
      <Pricing /> */}
      <Contact />
      <Footer />
    </>
  );
}
