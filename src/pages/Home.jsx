import React from "react";
import Slider from "../components/slider/Slider";
import NewProducts from "../components/newProducts/NewProducts";
import Footer from "../components/layout/Footer";
import Content from "../components/ui/Content";
import Features from "../components/features/Features";
import Navbar from "../components/layout/navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <Content>
        <NewProducts
          title="New Arrivals"
          text="Always the latest and most special products"
        />
        <Features />
      </Content>
      <Footer />
    </>
  );
};

export default Home;
