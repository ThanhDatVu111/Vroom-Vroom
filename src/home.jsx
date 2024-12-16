import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Category from "./components/Category";
import MostSearchedCar from "./components/MostSearchedCar";
import { Info } from "lucide-react";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Category />
      <MostSearchedCar />
      <InfoSection />
      <Footer/>
    </div>
  );
};

export default Home;

