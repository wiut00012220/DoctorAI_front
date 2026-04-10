import React from "react";
import HeroSection from "../src/container/Home/HeroSection_v2";
import FeaturesSection from "../src/container/Home/FeaturesSection";
import ReviewSection from "../src/container/Home/ReviewSection";
import FaqSection from "../src/container/Home/FaqSection";

function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <ReviewSection />
      <FaqSection />
    </div>
  );
}

export default Home;
