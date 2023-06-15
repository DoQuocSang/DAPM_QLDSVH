import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/user/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts.js";
import PostDefault from "images/post-default.png";
import { useParams } from 'react-router-dom';
import { isEmptyOrSpaces } from "../../utils/Utils";


const Row = tw.div`flex flex-col lg:flex-row mx-20 max-w-screen-xl mx-auto`;

const PopularPostsContainer = tw.div`lg:w-2/3 mr-16`;
const PostsContainer = tw.div`mt-5 `;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Category = tw(motion.a)`block sm:max-w-sm cursor-pointer py-3 px-4 border border-gray-200 shadow-md rounded-lg mb-4 last:mb-2 hover:bg-primary-500 transition duration-300`;

const Image = styled(motion.div)(props => [
    `background-image: url("${props.$imageSrc}");`,
    tw`h-64 bg-cover bg-center rounded mt-2`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500 line-clamp-1`;
const CategoryTitle = tw.h5`text-base font-semibold transition duration-300 group-hover:text-white line-clamp-2`;

const PostCategory = tw(motion.a)`cursor-pointer font-semibold text-base transition duration-300 hover:text-primary-500`;

const Description = styled.p(({ moreShort }) => [
    tw`mt-2 font-medium text-secondary-100 leading-loose text-sm line-clamp-2`,
    moreShort && tw`line-clamp-2`,
]);

const AuthorName = tw.h6`font-semibold text-lg`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div`mr-8`

const Heading = tw(SectionHeading)`text-gray-900 mb-0 mt-3 text-3xl text-left`;


export default ({ isDetailPage = false }) => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);
    const [tagsList, setTagsList] = useState([]);
    const [randomPostList, setRandomPostList] = useState([]);


    useEffect(() => {
        // getCategories().then(data => {
        //     if (data) {
        //         setCategoriesList(data.items);
        //     }
        //     else
        //         setCategoriesList([]);
        //     //console.log(data)
        // })

        // getAuthors().then(data => {
        //     if (data) {
        //         setAuthorsList(data.items);
        //     }
        //     else
        //         setAuthorsList([]);
        //     //console.log(data)
        // })

        // getTags().then(data => {
        //     if (data) {
        //         setTagsList(data.items);
        //     }
        //     else
        //         setTagsList([]);
        //     //console.log(data)
        // })

        // if (isDetailPage === true) {
        //     getRandomPosts(5).then(data => {
        //         if (data) {
        //             setRandomPostList(data.items);
        //         }
        //         else
        //             setRandomPostList([]);
        //         //console.log(data)
        //     })
        // }

    }, []);

    return (
        <RecentPostsContainer>
            {
                isDetailPage ?
                    (
                        <>
                            <Heading>Các bài viết</Heading>
                            <PostsContainer>
                                {randomPostList.map((post, index) => (
                                    <Post key={index} href={`/blog-detail/${post.urlSlug}`} className="group">
                                        <PostTextContainer>
                                            <Title>{post.title}</Title>
                                            <Description moreShort>{post.shortDescription}</Description>
                                        </PostTextContainer>

                                        {isEmptyOrSpaces(post.imageUrl) ? (
                                            <Image $imageSrc={PostDefault} />

                                        ) : (
                                            <Image $imageSrc={post.imageUrl} />
                                        )}
                                    </Post>
                                ))}
                            </PostsContainer>
                        </>
                    )
                    :
                    (
                        <>
                            <Heading>Các thẻ</Heading>
                            <PostsContainer>
                                {tagsList.map((tag, index) => (
                                    <Category key={index} href={`/blog/${"tag/"}${tag.urlSlug}`} className="group">
                                        <PostTextContainer>
                                            <CategoryTitle>{`${tag.name} (${tag.postCount})`}</CategoryTitle>
                                        </PostTextContainer>
                                    </Category>
                                ))}
                            </PostsContainer>
                        </>
                    )
            }

            <Heading>Các chủ đề</Heading>
            <PostsContainer>
                {categoriesList.map((category, index) => (
                    <Category key={index} href={`/blog/${"category/"}${category.urlSlug}`} className="group">
                        <PostTextContainer>
                            <CategoryTitle>{`${category.name} (${category.postCount})`}</CategoryTitle>
                        </PostTextContainer>
                    </Category>
                ))}
            </PostsContainer>

            <Heading>Các tác giả</Heading>
            <PostsContainer>
                {authorsList.map((author, index) => (
                    <Category key={index} href={`/blog/${"author/"}${author.urlSlug}`} className="group">
                        <PostTextContainer>
                            <CategoryTitle>{`${author.fullName} (${author.postCount})`}</CategoryTitle>
                        </PostTextContainer>
                    </Category>
                ))}
            </PostsContainer>
        </RecentPostsContainer>
    );
};
