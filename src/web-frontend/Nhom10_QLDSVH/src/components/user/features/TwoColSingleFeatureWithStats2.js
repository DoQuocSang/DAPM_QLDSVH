import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/user/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/user/misc/Buttons.js";
import StatsIllustrationSrc from "images/stats-illustration.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";
import Book1 from "images/book1.png";
import BookDefault from "images/book-default.png"
import { getBookBySlug } from "../../../services/BookRepository";
import { isEmptyOrSpaces } from "../../utils/Utils";
import { toVND } from "../../utils/Utils";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-2`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left transition duration-300 hover:text-primary-700`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-4xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const PriceText = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-xl font-bold leading-relaxed text-secondary-500`;
const PriceValue = tw.span`mt-4 text-3xl font-bold text-red-500`;

const RatingsInfo = styled.div`
  ${tw`flex items-center mt-2 sm:mt-5`}
  svg {
    ${tw`w-6 h-6 text-yellow-500`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;


const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Key = tw.div`font-bold text-sm sm:text-xl lg:text-xl text-secondary-500 tracking-wide`;
const Value = tw.div`font-medium text-sm text-primary-700`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;
const SecondaryButton = tw(PrimaryButton)`md:ml-5 bg-gray-500`;

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`
]);

export default ({
  primaryButtonText = "Mua ngay",
  secondaryButtonText = "Thêm vào giỏ hàng",
  primaryButtonUrl = "",
  imageCss = null,
  imageContainerCss = null,
  imageDecoratorBlob = false,
  imageDecoratorBlobCss = null,
  imageInsideDiv = true,
  textOnLeft = false,
  slug = ""
}) => {

  const [booksList, setBooksList] = useState([]);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    document.title = 'Thông tin sản phẩm';

    getBookBySlug(slug).then(data => {
      if (data) {
        setBooksList(data.items);
        setMetadata(data.metadata);
      }
      else
        setBooksList([]);
      //console.log(data.items)
    })

  }, []);

  // const defaultStatistics = [
  //   {
  //     key: "Nhà cung cấp",
  //     value: "NXB Trẻ"
  //   },
  //   {
  //     key: "Nhà xuất bản",
  //     value: "Trẻ"
  //   },
  //   {
  //     key: "Tác giả",
  //     value: "Haro Aso"
  //   }
  //   ,
  //   {
  //     key: "Hình thức bìa",
  //     value: "Bìa mềm"
  //   }
  // ];

  //if (!statistics) statistics = defaultStatistics;

  const starNum = (numLoop) => {
    //numLoop = parseInt(num, 10)
    const rows = [];
    for (var i = 0; i < numLoop; i++) {
      rows.push(<StarIcon css={tw`fill-current`} key={i} />);
    }

    for (var i = 0; i < 5 - numLoop; i++) {
      rows.push(<StarIcon css={tw`stroke-current`} key={i} />);
    }

    return rows;
  };

  return (
    <Container>
      {booksList.map((card, i) => (
        <TwoColumn css={!imageInsideDiv && tw`md:items-center`} key={i}>
          <ImageColumn css={imageContainerCss}>
            {imageInsideDiv ? <Image imageSrc={card.imageUrl} css={imageCss} /> : <img src={BookDefault} css={imageCss} alt="" />}
            {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
          </ImageColumn>
          <TextColumn textOnLeft={textOnLeft}>
            <TextContent>
              {card.category.name && <Subheading as="a" href={"/all-product/" + "category/" + card.category.urlSlug}>{card.category.name}</Subheading>}
              <Heading>{card.title}</Heading>
              <Statistics>
                {/* {statistics.map((statistic, index) => (
                  <Statistic key={index}>
                    <Key>{statistic.key}</Key>
                    <Value>{statistic.value}</Value>
                  </Statistic>
                ))} */}
                <Statistic>
                  <Key>Nhà cung cấp</Key>
                  <Value>{card.supplier}</Value>
                </Statistic>
                <Statistic>
                  <Key>Nhà xuất bản</Key>
                  <Value>{card.publishCompany}</Value>
                </Statistic>
                <Statistic as="a" href={"/all-product/" + "author/" + card.author.urlSlug}>
                  <Key>Tác giả</Key>
                  <Value css={tw`text-primary-700 transition duration-300 hover:text-primary-500`}>{card.author.fullName}</Value>
                </Statistic>
                <Statistic>
                  <Key>Hình thức bìa</Key>
                  <Value>{card.coverForm}</Value>
                </Statistic>
              </Statistics>

              <RatingsInfo>
                {starNum(card.starNumber)}
                <Rating>({card.reviewNumber + " lượt đánh giá"})</Rating>
              </RatingsInfo>
              <Description>{card.description}</Description>
              <PriceText>
                Giá bán: <PriceValue>{" "}{toVND(card.price)}</PriceValue>
              </PriceText>

              <PrimaryButton as="a" href={primaryButtonUrl}>
                {primaryButtonText}
              </PrimaryButton>

              <SecondaryButton as="a" href={primaryButtonUrl}>
                {secondaryButtonText}
              </SecondaryButton>
            </TextContent>
          </TextColumn>
        </TwoColumn>
      ))}
    </Container>
  );
};
