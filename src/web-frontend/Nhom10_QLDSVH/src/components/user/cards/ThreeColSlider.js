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
import  Book1  from "images/book1.png";
import  Book2  from "images/book2.jpg";
import  Book3  from "images/book3.jpg";
import  BookDefault from "images/book-default.png"
import CatDefault from "images/cat-404-full-2.png";


import { Link } from "react-router-dom";
import { getBooks, getBookByCategorySlug } from "../../../services/BookRepository";
import { isEmptyOrSpaces } from "../../utils/Utils";
import { toVND } from "../../utils/Utils";

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

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-lg font-bold line-clamp-2`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`mr-2 font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4 line-clamp-3`;

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
  tw`flex items-center mr-3 my-2 sm:my-0 bg-red-500 rounded-md transition duration-300 hover:bg-red-600`,
  otherColor && tw`bg-teal-500 hover:bg-teal-600`,
]);
const TagText = tw.a`px-2 py-1 text-xs font-semibold text-white line-clamp-1`;
const ErrorImage = tw.img`max-w-3xl h-auto mx-auto rounded-lg pt-4`;

const PriceContainer = tw.p`text-lg font-semibold leading-loose mt-1 sm:mt-2`;
const PriceText = tw.span`text-xl leading-loose text-red-500`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
export default ({HeadingText = "Sản phẩm", hasFilter = false}) => {
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

  // const cards = [
  //   {
  //     // imageSrc: "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974185628.png",
  //     imageSrc: Book1,
  //     title: "Wyatt Residency",
  //     description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
  //     locationText: "Rome, Italy",
  //     pricingText: "128.000 VND",
  //     rating: "4.8",
  //   },
  //   {
  //     // imageSrc: "https://cdn0.fahasa.com/media/catalog/product/c/t/cthct11_1.jpg",
  //     imageSrc: Book2,
  //     title: "Soho Paradise",
  //     description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
  //     locationText: "Ibiza, Spain",
  //     pricingText: "128.000 VND",
  //     rating: 4.9,
  //   },
  //   {
  //     // imageSrc: "https://cdn0.fahasa.com/media/catalog/product/8/9/8934974185598.jpg",
  //     imageSrc: Book3,
  //     title: "Hotel Baja",
  //     description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
  //     locationText: "Palo Alto, CA",
  //     pricingText: "128.000 VND",
  //     rating: "5.0",
  //   },
  //   {
  //     // imageSrc: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935244888034.jpg",
  //     imageSrc: Book1,
  //     title: "Hudak Homes",
  //     description: "Lorem ipsum dolor sit amet, consectur dolori adipiscing elit, sed do eiusmod tempor nova incididunt ut labore et dolore magna aliqua.",
  //     locationText: "Arizona, RAK",
  //     pricingText: "128.000 VND",
  //     rating: 4.5,
  //   },
  // ]

  const [booksList, setBooksList] = useState([]);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    document.title = 'Trang chủ';

    if(hasFilter === false){
      getBooks().then(data => {
        if (data) {
          setBooksList(data.items);
          setMetadata(data.metadata);
        }
        else
          setBooksList([]);
        //console.log(data.items)
      })
    }
    else{
      getBookByCategorySlug("giaotrinhgiaotrinh").then(data => {
        if (data) {
          setBooksList(data.items);
          setMetadata(data.metadata);
        }
        else
          setBooksList([]);
        //console.log(data.items)
      })
    }
  }, []);

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>{HeadingText}</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
          </Controls>
        </HeadingWithControl>
        {booksList.length === 0 ? <ErrorImage src={CatDefault} /> : ""}
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {booksList.map((card, index) => (
            <Card key={index}>
              {isEmptyOrSpaces(card.imageUrl) ? (
                <CardImage imageSrc={BookDefault} />
              ) : (
                <CardImage imageSrc={card.imageUrl} />
              )} 
              <TextInfo>
              <InfoTagContainer> 
                  <TagContainer>
                    <TagText href={"/all-product/" + "category/" + card.category.urlSlug}>{card.category.name}</TagText>
                  </TagContainer>
                  <TagContainer otherColor>
                    <TagText href={"/all-product/" + "author/" + card.author.urlSlug}>{card.author.fullName}</TagText>
                  </TagContainer>
                </InfoTagContainer>

                <TitleReviewContainer>
                  <Title>{card.title}</Title>
                  <RatingsInfo>
                    <Rating>{card.starNumber}</Rating>
                    <StarIcon />
                  </RatingsInfo>
                </TitleReviewContainer>
                {/* <SecondaryInfoContainer>
                  <IconWithText>
                    <IconContainer>
                      <LocationIcon />
                    </IconContainer>
                    <Text>{card.category.name}</Text>
                  </IconWithText>
                  <IconWithText>
                    <IconContainer>
                      <PriceIcon />
                    </IconContainer>
                    <Text>{card.price}</Text>
                  </IconWithText>
                </SecondaryInfoContainer> */}
                <Description>{card.shortDescription}</Description>
                
                <PriceContainer>
                  Giá bán:
                  <PriceText>{" "}{toVND(card.price)}</PriceText>
                </PriceContainer>
              </TextInfo>
              <a href={`/product-detail/${card.urlSlug}`}>
                <PrimaryButton>Mua ngay</PrimaryButton>
              </a>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
