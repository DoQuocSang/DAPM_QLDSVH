import React, { useEffect, useState } from "react";
import HeritageItem from "components/user/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import { getHeritages, getRandomHeritages } from "../../../services/HeritageRepository";

export default () => {
  const [heritageList, setHeritageList] = useState([]);

  useEffect(() => {
    getRandomHeritages().then(data => {
      if (data) {
        setHeritageList(data.data);
      }
      else {
        setHeritageList([]);
      }
      //console.log(data)
    })
  }, []);

  return (
    <>
     {heritageList.map((heritage, index) => (
        <HeritageItem index={index} heritage={heritage}></HeritageItem>
      ))}
    </>
  );
};
