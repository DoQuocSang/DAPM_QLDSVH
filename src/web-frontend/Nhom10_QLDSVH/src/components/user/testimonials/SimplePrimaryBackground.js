import React, {useState} from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled, { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/user/misc/Headings.js";
import { SectionDescription } from "components/user/misc/Typography.js";
import { ReactComponent as QuoteIconBase } from "images/quotes-l.svg"
import { ReactComponent as ArrowLeftIcon } from "images/arrow-left-3-icon.svg"
import { ReactComponent as ArrowRightIcon } from "images/arrow-right-3-icon.svg"
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";

import "slick-carousel/slick/slick.css";

const PrimaryBackgroundContainer = tw(Container)`-mx-8 px-8`;

const HeadingContainer = tw.div``;
const Subheading = tw(SubheadingBase)`text-center mb-4`;
const Heading = tw(SectionHeading)`text-4xl`;
const Description = tw(SectionDescription)`mx-auto text-center text-secondary-100`;

const TestimonialsSlider = styled(Slider)`
  ${tw`flex mt-16 mx-auto max-w-xs sm:max-w-xl lg:max-w-4xl text-left bg-gray-100 rounded-lg text-gray-900 shadow-lg`}
  .slick-track {
    ${tw`flex!`}
  }
  .slick-slide {
    ${tw`h-auto`}
  }
  .slick-slide > div {
    ${tw`h-full`}
  }
`;
const Testimonial = tw.div`px-6 py-12 sm:px-20 sm:py-16 focus:outline-none flex! flex-col justify-between h-full`
const QuoteContainer = tw.div`relative`
const QuoteIcon = tw(QuoteIconBase)`absolute opacity-15 top-0 left-0 transform -translate-y-2 -translate-x-1/2 sm:-translate-x-full w-10 fill-current text-primary-500`
const Quote = tw.blockquote`font-medium sm:font-normal relative text-sm sm:text-xl text-center sm:text-left`
const CustomerInfoAndControlsContainer = tw.div`mt-8 flex items-center flex-col sm:flex-row justify-center text-center sm:text-left`
const CustomerImage = tw.img`w-16 h-16 rounded-full`
const CustomerNameAndProfileContainer = tw.div`mt-4 sm:mt-0 sm:ml-4 flex flex-col`
const CustomerName = tw.span`text-lg font-semibold`
const CustomerProfile = tw.span`text-sm font-normal text-gray-700`
const ControlsContainer = tw.div`sm:ml-auto flex`
const ControlButton = styled.button`
  ${tw`text-gray-600 hover:text-primary-700 focus:outline-none transition-colors duration-300 ml-4 first:ml-0 sm:first:ml-4 mt-4 sm:mt-0`}
  .icon {
    ${tw`fill-current w-6`}
  }
`;

const RatingsInfo = styled.div`
  ${tw`flex items-center mt-2 sm:mb-5`}
  svg {
    ${tw`w-6 h-6 text-yellow-500`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const starNum = (numLoop) => {
  //numLoop = parseInt(num, 10)
  const rows = [];
  for (var i = 0; i < numLoop; i++) {
    rows.push(<StarIcon css= {tw`fill-current`} key={i}/>);
  } 

  for (var i = 0; i < 5-numLoop; i++) {
    rows.push(<StarIcon css= {tw`stroke-current`} key={i}/>);
  } 

  return rows;
};

export default ({
  subheading = "",
  heading = "Đánh giá của người mua",
  description = "Dưới đây là một số đánh giá của người mua sản phẩm này.",
  testimonials = [
    {
      ratingIcon: 5,
      ratingState: "Cực kì hài lòng",
      customerName: "Sang Đỗ",
      customerProfile: "12/05/2023",
      imageSrc:
        "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.85&w=256&h=256&q=80",
      quote:
        "Sách được bọc nilông cẩn thận giao hàng rất nhanh trong vòng một ngày nội dung sách thì mình chưa đọc nên chưa thể nhận xét nhưng đã có rất nhiều YouTuber review Đánh giá với số điểm cao nên mình quyết định mua"
    },
    {
      ratingIcon: 4,
      ratingState: "Khá hài lòng",
      customerName: "Đoàn Đình Hoàng",
      customerProfile: "12/05/2023",
      imageSrc:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=256&h=256&q=80",
      quote:
        "Cuốn sách rất đẹp, giấy xịn, mượt, trơn, cực kì thích luôn ạ. Fahasha giao hàng rất nhanh, mới đặt ngày sau đã có rùi ❤❤❤"
    },
    {
      ratingIcon: 3,
      ratingState: "Tạm ổn",
      customerName: "Quảng Văn Sương",
      customerProfile: "12/05/2023",
      imageSrc:
        "https://images.unsplash.com/photo-1580852300654-03c803a14e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4.25&w=256&h=256&q=80",
      quote:
        "Mình bất ngờ bởi bìa sách siêu sắc nét, mỗi khi nhìn vào mình cảm nhận như thầy đang hiện diện. Trang giấy có hơi mỏng nhưng giấy màu ngà vàng tốt cho mắt. Do là bản dịch lại nên đôi khi mình thấy việc đọc không được mượt mà lắm, tuy nhiên không ảnh hưởng đến ý nghĩa của thầy muốn truyền tải"
    }
  ]
}) => {
  const [sliderRef, setSliderRef] = useState(null)

  return (
    <PrimaryBackgroundContainer>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading>{heading}</Heading>
          <Description>{description}</Description>
        </HeadingContainer>
        <TestimonialsSlider arrows={false} ref={setSliderRef}>
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index}>
              <QuoteContainer>
                <QuoteIcon />
                <RatingsInfo>
                {starNum(testimonial.ratingIcon)}
                <Rating>({testimonial.ratingState})</Rating>
            </RatingsInfo>
                <Quote>
                  {testimonial.quote}
                </Quote>
              </QuoteContainer>
              <CustomerInfoAndControlsContainer>
                <CustomerImage src={testimonial.imageSrc} />
                <CustomerNameAndProfileContainer>
                  <CustomerName>
                    {testimonial.customerName}
                  </CustomerName>
                  <CustomerProfile>
                    {testimonial.customerProfile}
                  </CustomerProfile>
                </CustomerNameAndProfileContainer>
                <ControlsContainer>
                  <ControlButton onClick={sliderRef?.slickPrev}>
                    <ArrowLeftIcon className="icon" />
                  </ControlButton>
                  <ControlButton>
                    <ArrowRightIcon className="icon" onClick={sliderRef?.slickNext}/>
                  </ControlButton>
                </ControlsContainer>
              </CustomerInfoAndControlsContainer>
            </Testimonial>
          ))}
        </TestimonialsSlider>
      </ContentWithPaddingXl>
    </PrimaryBackgroundContainer>
  );
};
