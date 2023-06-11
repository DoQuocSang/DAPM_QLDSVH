import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts.js";
// import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/user/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import CatDefault from "images/cat-404-full-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getBooks } from "../../../services/BookRepository";
import { getRandomBooks } from "../../../services/BookRepository";
import { isEmptyOrSpaces } from "../../utils/Utils";
import { toVND } from "../../utils/Utils";
import { getBookByAuthorSlug } from "../../../services/BookRepository";
import { getBookByCategorySlug } from "../../../services/BookRepository";
import { getAuthorBySlug } from "../../../services/AuthorRepository";
import { getCategoryBySlug } from "../../../services/CategoryRepository";
import { getBookRelatedBySlug } from "../../../services/BookRepository";
import { icon } from "@fortawesome/fontawesome-svg-core";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw.h2`text-4xl sm:text-4xl font-black tracking-wide text-left`
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 shadow-md`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500 line-clamp-2`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600 line-clamp-3`;
const CardPrice = tw.p`mt-4 text-lg font-bold text-red-500`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const BlogImage = tw.img`w-full h-auto rounded-lg pt-4`;

export default ({hasTab = true, isProductPage = false}) => {

  let { slug } = useParams();
  let { type } = useParams();

  if (typeof slug === 'undefined') {
    slug = "";
  }

  if (typeof type === 'undefined') {
    type = "";
  }

  const [booksList, setBooksList] = useState([]);
  const [headingText, setheadingText] = useState("Danh mục sản phẩm");
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    document.title = 'Trang chủ';

    if (isEmptyOrSpaces(slug)) {
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
    else {
      if(type === "author"){
        getAuthorBySlug(slug).then(data => {
          if (data) {
            setheadingText("Sản phẩm của " + data.fullName);
          }
          else{
              setheadingText("Danh mục sản phẩm");
          }
          //console.log(data.fullName)
        })

        getBookByAuthorSlug(slug).then(data => {
          if (data) {
            setBooksList(data.items);
          }
          else
            setBooksList([]);
          // console.log(data.items)
        })
      }

      if(type === "category"){
        getCategoryBySlug(slug).then(data => {
          if (data) {
            setheadingText("Sản phẩm thuộc loại " + data.name);
          }
          else
            setheadingText("Danh mục sản phẩm");
          //console.log(data.name)
        })

        getBookByCategorySlug(slug).then(data => {
          if (data) {
            setBooksList(data.items);
          }
          else
            setBooksList([]);
          // console.log(data.items)
        })
      }

      if(isProductPage === true){
        getBookRelatedBySlug(slug).then(data => {
          if (data) {
            setheadingText("Các sản phẩm liên quan");
            setBooksList(data.items);
          }
          else
          {
            setheadingText("Danh mục sản phẩm");
            setBooksList([]);
          }
          console.log(data.items)
        })
      }

  }
  }, []);

  // const onLoadMoreClick = () => {
  //   getRandomBooks(8).then(data => {
  //     if (data) {
  //       setBooksList(data.items);
  //       setMetadata(data.metadata);
  //     }
  //     else
  //       setBooksList([]);
  //     //console.log(data.items)
  //   })
  //   return booksList;
  // };

  let tabs = {
    "A-Z" : ["Title", "ASC"],
    "Z-A": ["Title", "DESC"],
    "Giá tăng": ["Price", "ASC"],
    "Giá giảm": ["Price", "DESC"]
  }

  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);


  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>
            {headingText}
          </Header>

          {booksList.length > 0 ? (
            <TabsControl>
              {hasTab && Object.keys(tabs).map((tabName, index) => (
                <TabControl key={index} active={activeTab === tabName} onClick={() => {{ setActiveTab(tabName); 
                  if (isEmptyOrSpaces(slug)) {
                    getBooks(tabs[tabName][0], tabs[tabName][1]).then(data => {
                      if (data) {
                        setBooksList(data.items);
                      }
                      else
                      {
                        setBooksList([]);
                      }
                      //console.log(booksList);
                    })}
  
                  }
                  
                  if(type === "author"){
                    getBookByAuthorSlug(slug, tabs[tabName][0], tabs[tabName][1]).then(data => {
                      if (data) {
                        setBooksList(data.items);
                      }
                      else
                        setBooksList([]);
                      // console.log(data.items)
                    })
                  }
            
                  if(type === "category"){
                    getBookByCategorySlug(slug, tabs[tabName][0], tabs[tabName][1]).then(data => {
                      if (data) {
                        setBooksList(data.items);
                      }
                      else
                        setBooksList([]);
                      // console.log(data.items)
                    })
                  }
                }}>
                  {tabName}
                </TabControl>
              ))}
            </TabsControl>
          )
            : ("")}
        </HeaderRow>

        {booksList.length === 0 ? <BlogImage src={CatDefault} /> : ""}

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {booksList.map((card, index) => (  
              <CardContainer key={index}>
                <Card className="group" href={"/product-detail/" + card.urlSlug} initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={card.imageUrl}>
                    <CardRatingContainer>
                      <CardRating>
                        <StarIcon />
                        {card.starNumber}
                      </CardRating>
                      <CardReview>({card.reviewNumber})</CardReview>
                    </CardRatingContainer>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto"
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <a href={`/product-detail/${card.urlSlug}`}>
                        <CardButton>Mua ngay</CardButton>
                      </a>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.shortDescription}</CardContent>
                    <CardPrice>
                      {toVND(card.price)}
                    </CardPrice>
                  </CardText>
                </Card> 
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

// const getRandomCards = () => {
//   const cards = [
//     {
//       imageSrc: Book1,
//       title: "Veg Mixer",
//       content: "To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab",
//       price: "120.000VND",
//       rating: "5.0",
//       reviews: "87",
//       url: "#"
//     },
//     {
//       imageSrc: Book2,
//       title: "Macaroni",
//       content: "To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab",
//       price: "120.000VND",
//       rating: "4.8",
//       reviews: "32",
//       url: "#"
//     },
//     {
//       imageSrc: Book3,
//       title: "Nelli",
//       content: "To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab",
//       price: "120.000VND",
//       rating: "4.9",
//       reviews: "89",
//       url: "#"
//     },
//     {
//       imageSrc: Book1,
//       title: "Jalapeno Poppers",
//       content: "To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab",
//       price: "120.000VND",
//       rating: "4.6",
//       reviews: "12",
//       url: "#"
//     },
//     {
//       imageSrc: Book2,
//       title: "Cajun Chicken",
//       content: "To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab",
//       price: "120.000VND",
//       rating: "4.2",
//       reviews: "19",
//       url: "#"
//     },
//     {
//       imageSrc: Book3,
//       title: "Chillie Cake",
//       content: "To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab",
//       price: "120.000VND",
//       rating: "5.0",
//       reviews: "61",
//       url: "#"
//     },
//     {
//       imageSrc: Book3,
//       title: "Guacamole Mex",
//       content: "To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab",
//       price: "120.000VND",
//       rating: "4.2",
//       reviews: "95",
//       url: "#"
//     },
//     {
//       imageSrc: Book3,
//       title: "Carnet Nachos",
//       content: "To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab",
//       price: "120.000VND",
//       rating: "3.9",
//       reviews: "26",
//       url: "#"
//     }
//   ];

//   // Shuffle array
//   return cards.sort(() => Math.random() - 0.5);
// };

// const getRandomCards = ({booksList}) => {
//   let arr = [];
//   getBooks().then(data => {
//     if (data) {
//       arr = data.items;
//     }
//     //console.log(arr);
//   })
//   return arr;
// };

