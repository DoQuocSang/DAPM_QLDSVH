import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDotPatternIcon } from "images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "components/user/misc/Headings.js";
import  Book1  from "images/book1.png";
import  Book2  from "images/book2.jpg";
import  Book3  from "images/book3.jpg";
import  BookDefault from "images/book-default.png"
import { isEmptyOrSpaces } from "../../utils/Utils";
import { getRandomBooks } from "../../../services/BookRepository";
import CatDefault from "images/cat-404-full-2.png";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const Content = tw.div`mt-16`;

const Card = styled.div(props => [
  tw`mt-12 md:flex justify-center items-center`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}"); `,
  tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100 transition duration-300 hover:text-primary-500`;
const Title = tw.h4`text-3xl font-bold text-gray-900`;
const Description = tw.p`mt-2 text-sm leading-loose`;
const Link = tw.a`inline-block mt-4 text-lg text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;
const ErrorImage = tw.img`max-w-3xl h-auto mx-auto rounded-lg pt-4`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-primary-500 fill-current w-24`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-primary-500 fill-current w-24`;

export default () => {
  // const cards = [
  //   {
  //     imageSrc: Book1,
  //     subtitle: "Paid",
  //     title: "Loachella, NYC",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     url: "https://timerse.com"
  //   },

  //   {
  //     imageSrc: Book2,
  //     subtitle: "Free",
  //     title: "Rock In Rio, Upstate",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     url: "https://timerse.com"
  //   },

  //   {
  //     imageSrc: Book3,
  //     subtitle: "Exclusive",
  //     title: "Lollapalooza, Manhattan",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  //     url: "https://timerse.com"
  //   }
  // ];

  const [booksList, setBooksList] = useState([]);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    document.title = 'Trang chủ';

    getRandomBooks().then(data => {
        if (data){
            setBooksList(data.items);
            setMetadata(data.metadata);
        }
        else
            setBooksList([]);
        console.log(data.items)
    })
  }, []);

  let imageUrl;

  return (
    <Container>
      <SingleColumn>
        <HeadingInfoContainer>
          <HeadingTitle>Đề xuất cho bạn</HeadingTitle>
          {/* <HeadingDescription>
            Dưới đây là một số sách nổi bật của Fahasa
          </HeadingDescription> */}
        </HeadingInfoContainer>

        <Content>
          {booksList.length === 0 ? <ErrorImage src={CatDefault} /> : ""}

          {booksList.map((card, i) => (
            <Card key={i} reversed={i % 2 === 1}>
             
              {isEmptyOrSpaces(card.imageUrl) ? (
                <Image imageSrc={BookDefault} />
              ) : (
                <Image imageSrc={card.imageUrl} />
              )} 
              <Details>
                <Subtitle as="a" href={"/all-product/" + "category/" + card.categorySlug}>{card.categoryName}</Subtitle>
                <Title>{card.title}</Title>
                <Description>{card.shortDescription}</Description>
                <Link href={`/product-detail/${card.urlSlug}`}>Xem chi tiết</Link>
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
      <SvgDotPattern1 />
      <SvgDotPattern2 />
      <SvgDotPattern3 />
      <SvgDotPattern4 />
    </Container>
  );
};
