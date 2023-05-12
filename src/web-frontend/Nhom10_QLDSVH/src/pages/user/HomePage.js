import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/user/hero/TwoColumnWithInput";
import Features from "components/user/features/DashedBorderSixFeatures";
import MainFeature from "components/user/features/VerticalWithAlternateImageAndText";
import SliderCard from "components/user/cards/ThreeColSlider.js";
import Blog from "components/user/blogs/PopularAndRecentBlogPosts.js";
import SubscribeNewsLetterForm from "components/user/forms/TwoColContactUsWithIllustration";


export default () => (
  <AnimationRevealPage>
    <Hero />
    <Features />
    <MainFeature />
    <SliderCard />
    <Blog />
    <SubscribeNewsLetterForm />
  </AnimationRevealPage>
);
