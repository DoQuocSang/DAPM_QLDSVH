import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/user/misc/Headings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faTag, faUserPen } from "@fortawesome/free-solid-svg-icons";
import PostDefault from "images/post-default.png";
import PostDefaultFull from "images/post-default-full.png";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import BlogSidebar from "../../components/user/blogs/BlogSidebar";
import { formatDateTme } from "../../components/utils/Utils";
import { isEmptyOrSpaces } from "../../components/utils/Utils";
import { FormatParagraph } from "../../components/utils/Utils";

const HeadingRow = tw.div`flex`;
const BlogImage = tw.img`w-full h-auto rounded-lg my-4 shadow-lg`;
// const BlogImage = styled.div(props => [
//   `background-image: url("${props.imageSrc}"); `,
//   tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
// ]);
const Heading = tw(SectionHeading)`text-gray-900 mb-0 mt-3 text-3xl text-left`;
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

const PopularPostsContainer = tw.div`lg:w-2/3 mr-16`;
const PostsContainer = tw.div`mt-5 `;

const PostCategory = tw(motion.a)`cursor-pointer font-semibold text-base transition duration-300 hover:text-primary-500`;


export default () => {

  const { slug } = useParams();
  //console.log(slug);
  const [postsList, setPostsList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    document.title = 'Thông tin sản phẩm';

    // getPostBySlug(slug).then(data => {
    //   if (data) {
    //     setPostsList(data.items);
    //     setMetadata(data.metadata);
    //   }
    //   else
    //     setPostsList([]);
    //   console.log(data.items[0])
    // })

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
          {postsList.map((post, index) => (
            <PopularPostsContainer key={index}>
              <PostCategory href={`/blog/${"category/"}${post.category.urlSlug}`}>{post.category.name}</PostCategory>
              <Heading>{post.title}</Heading>
              <InfoItem>
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                {"Số lượt xem: "}{post.viewCount}
              </InfoItem>
              <PostsContainer>
                <TagContainer >
                  {post.tags.map((tag, index) => (
                    <a href={`/blog/${"tag/"}${tag.urlSlug}`}>
                      <TagItem key={index} >
                        <FontAwesomeIcon icon={faTag} className="pr-2" />
                        {tag.name}
                      </TagItem>
                    </a>
                  ))}
                </TagContainer>

                {isEmptyOrSpaces(post.imageUrl) ? (
                  <BlogImage src={PostDefaultFull} />
                ) : (
                  <BlogImage src={post.imageUrl} />
                )}

                <Text>
                    {<FormatParagraph props={post.description} />}
                </Text>
                <InfoContainer>
                  <InfoItem>
                    <FontAwesomeIcon icon={faUserPen} className="mr-2" />
                    Tác giả:{" "}
                    <PostCategory href={`/blog/${"author/"}${post.author.urlSlug}`}>{post.author.fullName}</PostCategory>
                  </InfoItem>
                  <InfoItem>
                    <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
                    {formatDateTme(post.postedDate)}
                  </InfoItem>
                </InfoContainer>

                <TagContainer>
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
                </TagContainer>
              </PostsContainer>
            </PopularPostsContainer>
          ))}

          <BlogSidebar isDetailPage={true} />
        </Row>
      </Container>
    </AnimationRevealPage>
  );
};
