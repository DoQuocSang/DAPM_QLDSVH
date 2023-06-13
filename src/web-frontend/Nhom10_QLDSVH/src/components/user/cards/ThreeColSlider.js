import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/user/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/user/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import BookDefault from "images/book-default.png"
import CatDefault from "images/cat-404-full-2.png";

import { Link } from "react-router-dom";
import { isEmptyOrSpaces } from "../../utils/Utils";
import { toVND } from "../../utils/Utils";
import { getManagementUnits } from "../../../services/ManagementUnitRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSynagogue } from "@fortawesome/free-solid-svg-icons";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)`text-4xl`;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col border-gray-400 sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6 flex-grow`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-xl font-bold line-clamp-2`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`mr-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-2 line-clamp-3`;

const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const InfoTagContainer = tw.div`flex flex-col mb-2 sm:flex-row`;
const TagContainer = styled.div(({ otherColor }) => [
  tw`flex items-center mr-3 my-2 sm:my-0 bg-red-500 rounded-md transition duration-300 hover:bg-red-600 text-white text-xs px-2 py-1`,
  otherColor && tw`bg-teal-500 hover:bg-teal-600`,
]);
const TagText = tw.a`pl-2 font-semibold text-white line-clamp-1`;
const ErrorImage = tw.img`max-w-3xl h-auto mx-auto rounded-lg pt-4`;

const PriceContainer = tw.p`text-lg font-semibold leading-loose mt-1 sm:mt-2`;
const PriceText = tw.span`text-xl leading-loose text-red-500`;

const AddressContainer = tw.div`flex items-center text-sm mt-3 font-semibold`;
const AddressText = tw.p`pl-2 max-w-xs`;
const InfoImage = tw.span`bg-gray-200 rounded-full w-16 h-12 mr-3 flex items-center justify-center`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default ({ HeadingText = "Đơn vị quản lý" }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  const [managementUnitList, setManagementUnitList] = useState([]);

  useEffect(() => {
    getManagementUnits().then(data => {
      if (data) {
        setManagementUnitList(data.data);
      }
      else
        setManagementUnitList([]);
      //console.log(data.data)
    })
  }, []);

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>{HeadingText}</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon /></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon /></NextButton>
          </Controls>
        </HeadingWithControl>
        {managementUnitList.length === 0 ? <ErrorImage src={CatDefault} /> : ""}
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {managementUnitList.map((card, index) => (
            <Card key={index}>
              {isEmptyOrSpaces(card.image_url) ? (
                <CardImage imageSrc={BookDefault} />
              ) : (
                <CardImage imageSrc={card.image_url} />
              )}
              <TextInfo>
                <InfoTagContainer>
                  <TagContainer otherColor>
                    <FontAwesomeIcon icon={faSynagogue} />
                    <TagText href={"/all-product/" + "author/" + card.urlSlug}>
                      {card.note}
                    </TagText>
                  </TagContainer>
                </InfoTagContainer>

                <TitleReviewContainer>
                  <Title>{card.name}</Title>
                </TitleReviewContainer>
                <Description>{card.description}</Description>

                <AddressContainer>
                  <InfoImage>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </InfoImage>
                    <AddressText>{card.address}</AddressText>
                </AddressContainer>
              </TextInfo>
              <a href={`/product-detail/${card.urlslug}`}>
                <PrimaryButton>Xem chi tiết</PrimaryButton>
              </a>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
