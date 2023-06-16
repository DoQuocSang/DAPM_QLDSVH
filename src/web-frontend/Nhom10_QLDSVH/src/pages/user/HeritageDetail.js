import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/user/misc/Headings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarCheck, faCaretDown, faCaretUp, faTag, faUserPen } from "@fortawesome/free-solid-svg-icons";
import PostDefault from "images/post-default.png";
import PostDefaultFull from "images/post-default-full.png";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import InfoSidebar from "../../components/user/blogs/InfoSidebar";
import { formatDateTme } from "../../components/utils/Utils";
import { isEmptyOrSpaces } from "../../components/utils/Utils";
import { FormatParagraph } from "../../components/utils/Utils";
import { getHeritageWithDetailBySlug } from "../../services/HeritageRepository";
import { DescriptionWithImage } from "../../components/utils/Utils";
import { PrimaryButton } from "components/user/misc/Buttons";

const HeadingRow = tw.div`flex`;
const BlogImage = tw.img`w-full h-auto rounded-lg my-4 shadow-lg`;
// const BlogImage = styled.div(props => [
//   `background-image: url("${props.imageSrc}"); `,
//   tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
// ]);
const Heading = tw(SectionHeading)`text-gray-900 mb-0 mt-2 text-3xl text-left`;
const HeadingSmall = tw(Heading)`text-lg mr-3 `;

const TagContainer = tw.div`my-3 flex flex-wrap`;
const TagItem = tw.p`mr-3 my-2 py-2 px-3 bg-teal-400 rounded-lg font-semibold text-xs text-white transition duration-300 hover:bg-teal-500`;

const InfoContainer = tw.div`my-3 text-right`;
const InfoItem = tw.p`py-1 text-base text-gray-500`;

const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;

const Row = tw.div`flex flex-col lg:flex-row mx-20 max-w-screen-xl mx-auto`;

const PopularPostsContainer = tw.div`lg:w-2/3 mr-16 my-5`;
const PostsContainer = tw.div`mt-5 `;

const SubHeading = tw.p`cursor-pointer font-semibold text-base text-teal-600`;

const DescriptionContainer = styled.div`
  ${tw``}
  & .imageContainer {
    ${tw`flex flex-col mx-20 h-full bg-gray-200 rounded-lg`}
  }

  & .imageSection {
    ${tw`rounded-t-lg`}
  }

  & .imageDescription {
    ${tw`text-gray-900 text-sm py-3 text-center`}
  }

  & .title {
    ${tw`text-gray-900 text-2xl font-semibold`}
  }

  & .description {
    ${tw`text-gray-900 my-4`}
  }
`;

const TableOfContentContainer = tw.div`mx-0 my-5 bg-gray-100 flex flex-col px-4 py-3 rounded-lg shadow`;
const TableOfContentHeadeing = tw.div`leading-normal text-base text-red-400 font-semibold text-lg text-center`;
const TableOfContent = styled.div`
  ${tw`text-sm text-gray-800 font-semibold`}
  ol {
    ${tw`list-decimal list-inside`}
    li {
      ${tw`ml-2 mb-3 hover:text-primary-500 transition duration-300 cursor-pointer`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw.div`my-3 text-teal-400 mx-auto text-sm hover:text-primary-500 transition duration-300 cursor-pointer`;
const ShortenButton = tw.div`my-3 text-red-400 mx-auto text-sm hover:text-primary-500 transition duration-300 cursor-pointer`;

export default () => {

  const { slug } = useParams();

  const defaultHeritage = {
    id: 0,
    name: '',
    short_description: '',
    time: '',
    image_360_url: '',
    urlslug: '',
    location_id: 0,
    management_unit_id: 0,
    heritage_type_id: 0,
    heritage_category_id: 0,
    view_count: 0,
    heritage_category: {
      id: 0,
      name: '',
      description: '',
      urlslug: ''
    },
    heritage_type: {
      id: 0,
      name: '',
      description: '',
      urlslug: ''
    },
    location: {
      id: 0,
      name: '',
      urlslug: '',
      image_url: '',
      description: '',
      short_description: ''
    },
    management_unit: {
      id: 0,
      name: '',
      description: '',
      urlslug: '',
      image_url: '',
      address: '',
      note: '',
      short_description: ''
    },
    images: null
  };

  const defaultParagraphs = [
    {
      id: 0,
      title: '',
      description: '',
      image_description: '',
      image_url: '',
      video_url: '',
      heritage_id: 0
    }
  ];

  const initialState = {
    heritage: {
      ...defaultHeritage,
    },
    paragraphs: defaultParagraphs
  }, [heritageData, setHeritageData] = useState(initialState)

  useEffect(() => {
    document.title = 'Thông tin di sản';

    getHeritageWithDetailBySlug(slug).then(data => {
      if (data) {
        setHeritageData(data);
      }
      else
        setHeritageData(initialState);
    })

    // getTags().then(data => {
    //   if (data) {
    //     setTagsList(data.items);
    //     setMetadata(data.metadata);
    //   }
    //   else
    //     setTagsList([]);
    //   //console.log(data)
    // })

  }, []);

  
  const [visible, setVisible] = useState(3);
  const onLoadMoreClick = () => {
    setVisible(v => v + 3);
  };
  const onShortenClick = () => {
    setVisible(3);
  };

  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%"
    },
    hover: {
      backgroundSize: "110%"
    }
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Row>
          <PopularPostsContainer>
            <SubHeading>Thông tin di sản</SubHeading>
            <Heading>{heritageData.heritage.name}</Heading>
            <InfoItem>
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              {"Số lượt xem: "}{heritageData.heritage.view_count}
            </InfoItem>

            <TableOfContentContainer>
              <TableOfContentHeadeing>
                <FontAwesomeIcon icon={faBars} className="mr-3" />
                Mục lục
              </TableOfContentHeadeing>
              <TableOfContent>
                <ol type="1">
                  {heritageData.paragraphs.slice(0, visible).map((paragraph, index) => (
                    <li>
                      <p>{paragraph.title}</p>
                    </li>
                  ))}
                </ol>
                {visible < heritageData.paragraphs.length ? (
              <ButtonContainer>
                <LoadMoreButton onClick={onLoadMoreClick}>
                  <FontAwesomeIcon icon={faCaretDown} css={tw`mr-2 text-base`} />
                  Xem thêm
                </LoadMoreButton>
              </ButtonContainer>
            )
              :
              (
                heritageData.paragraphs.length > 3 &&
                <ButtonContainer>
                  <ShortenButton onClick={onShortenClick}>
                  <FontAwesomeIcon icon={faCaretUp} css={tw`mr-2 text-base`} />
                    Ẩn bớt
                  </ShortenButton>
                </ButtonContainer>
              )}
              </TableOfContent>
            </TableOfContentContainer>

            <PostsContainer>
              {/* <TagContainer >
                  {heritageData.tags.map((tag, index) => (
                    <a href={`/blog/${"tag/"}${tag.urlSlug}`}>
                      <TagItem key={index} >
                        <FontAwesomeIcon icon={faTag} className="pr-2" />
                        {tag.name}
                      </TagItem>
                    </a>
                  ))}
                </TagContainer> */}

              {/* {isEmptyOrSpaces(heritageData.imageUrl) ? (
                  <BlogImage src={PostDefaultFull} />
                ) : (
                  <BlogImage src={heritageData.imageUrl} />
                )} */}

              {/* {heritageData.paragraphs.map((paragraph, index) => (
                  <Text key={index}>
                    {<FormatParagraph props={paragraph.description} />}
                  </Text>
                ))} */}

              <DescriptionContainer>
                {heritageData.paragraphs.map((paragraph, index) => (
                  <DescriptionWithImage key={index}
                    title={paragraph.title}
                    description={paragraph.description}
                    image_description={paragraph.image_description}
                    image_url={paragraph.image_url}
                  />
                ))}
              </DescriptionContainer>


              {/* Thẻ được viết bằng hàm trong file Utils */}


              {/* <InfoContainer>
                  <InfoItem>
                    <FontAwesomeIcon icon={faUserPen} className="mr-2" />
                    Tác giả:{" "}
                    <PostCategory href={`/blog/${"author/"}${heritageData.author.urlSlug}`}>{heritageData.author.fullName}</PostCategory>
                  </InfoItem>
                  <InfoItem>
                    <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
                    {formatDateTme(heritageData.postedDate)}
                  </InfoItem>
                </InfoContainer> */}

              {/* <TagContainer>
                  <HeadingSmall>
                    Thẻ:
                  </HeadingSmall>
                  {tagsList.map((tag, index) => (
                    <a href={`/blog/${"tag/"}${tag.urlSlug}`}>
                      <TagItem key={index}>
                        <FontAwesomeIcon icon={faTag} className="pr-2" />
                        {tag.name}
                      </TagItem>
                    </a>
                  ))}
                </TagContainer> */}
            </PostsContainer>
          </PopularPostsContainer>

          <InfoSidebar isDetailPage={true} />
        </Row>
      </Container>
    </AnimationRevealPage>
  );
};
