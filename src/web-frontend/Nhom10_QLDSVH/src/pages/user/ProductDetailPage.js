import React from "react";
import {useParams} from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Features from "components/user/features/TwoColSingleFeatureWithStats2";
import Testimonial from "components/user/testimonials/SimplePrimaryBackground";
import SliderCard from "components/user/cards/TabBookCardGrid";

export default () => {
  const {slug} = useParams();
  //console.log(slug);
  return(
    <AnimationRevealPage>
      <Features slug={slug}/>
      <Testimonial />
      <SliderCard hasTab={false} isProductPage={true}/>
    </AnimationRevealPage>
  )
};
