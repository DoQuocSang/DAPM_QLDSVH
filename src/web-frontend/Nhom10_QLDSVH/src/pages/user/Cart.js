import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/user/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/user//misc/Buttons.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import EmailIllustrationSrc from "images/email-illustration.svg";
import { CardHeader } from "@material-tailwind/react";
import Book1 from "images/book1.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto pb-12 md:pb-16`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const CartColumn = tw(Column)`md:w-6/12 flex-shrink-0 h-80 md:h-auto mt-10`;
const CartContainer = tw.div`w-full rounded-lg shadow-lg`;
const CartTable = tw.table`table-auto p-6`;
const CartHeader = styled.thead`
  ${tw`text-base font-semibold text-white bg-primary-500`}
  
  th {
    ${tw`px-4 py-2 whitespace-nowrap`}
  }
 
  .textHeader {
    ${tw`font-semibold text-left`}
  }
`;
const CartBody = styled.tbody`
  ${tw`text-sm divide-y divide-gray-100`}
  
  td {
    ${tw`px-4 py-2 `}
  }

  tr {
    ${tw`hover:bg-gray-100`}
  }
 
  .textBody {
    ${tw`text-left`}
  }

  .textBodyTitle {
    ${tw`text-left text-xs`}
  }

  .textBodyPrice {
    ${tw`text-left font-semibold text-red-500`}
  }

  .textBodyIcon {
    ${tw`text-left text-gray-500 cursor-pointer text-xl`}
  }
`;
const CartImage = styled.div`
  ${tw`w-20 h-auto flex-shrink-0 mr-2 sm:mr-3`}
  
  img {
    ${tw`rounded-lg`}
  }
`;

const TotalContainer = tw.div`px-4 py-6 w-full rounded-lg shadow-lg mt-4 flex items-center justify-between`;
const TotalText = tw.p`text-base font-semibold text-gray-700`;
const TotalPrice = tw.p`text-base font-semibold text-teal-500`;


const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-xl mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

export default ({
  subheading = "Thanh toán",
  heading = <>Thông tin <span tw="text-primary-500">người mua</span><wbr /></>,
  description = "Vui lòng điền đủ thông tin vào các ô bên dưới để nhận hàng",
  submitButtonText = "Tiếp tục",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.

  return (
    <AnimationRevealPage>
    <Container>
      <TwoColumn>
        <CartColumn>
          <CartContainer>
            <CartTable>
              <CartHeader>
                <tr>
                  <th>
                    <div className="textHeader">STT</div>
                  </th>
                  <th>
                    <div className="textHeader">Ảnh</div>
                  </th>
                  <th>
                    <div className="textHeader">Tên</div>
                  </th>
                  <th>
                    <div className="textHeader">Số lượng</div>
                  </th>
                  <th>
                    <div className="textHeader">Giá</div>
                  </th>
                  <th>

                  </th>
                </tr>
              </CartHeader>
              <CartBody>
                <tr>
                  <td>
                    <div className="textHeader">1</div>
                  </td>
                  <td>
                    <CartImage>
                      <img src={Book1} />
                    </CartImage>
                  </td>
                  <td>
                    <div className="textBodyTitle">Bé Tập Tô Phát Triển Tư Duy - Câu Đố Về Động Vật Trên Cạn</div>
                  </td>
                  <td>
                    <div className="textBody">2</div>
                  </td>
                  <td>
                    <div className="textBodyPrice">120.000VND</div>
                  </td>
                  <td>
                    <div className="textBodyIcon">
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="textHeader">1</div>
                  </td>
                  <td>
                    <CartImage>
                      <img src={Book1} />
                    </CartImage>
                  </td>
                  <td>
                    <div className="textBodyTitle">Bé Tập Tô Phát Triển Tư Duy - Câu Đố Về Động Vật Trên Cạn</div>
                  </td>
                  <td>
                    <div className="textBody">2</div>
                  </td>
                  <td>
                    <div className="textBodyPrice">120.000VND</div>
                  </td>
                  <td>
                    <div className="textBodyIcon">
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="textHeader">1</div>
                  </td>
                  <td>
                    <CartImage>
                      <img src={Book1} />
                    </CartImage>
                  </td>
                  <td>
                    <div className="textBodyTitle">Bé Tập Tô Phát Triển Tư Duy - Câu Đố Về Động Vật Trên Cạn</div>
                  </td>
                  <td>
                    <div className="textBody">2</div>
                  </td>
                  <td>
                    <div className="textBodyPrice">120.000VND</div>
                  </td>
                  <td>
                    <div className="textBodyIcon">
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div className="textHeader">1</div>
                  </td>
                  <td>
                    <CartImage>
                      <img src={Book1} />
                    </CartImage>
                  </td>
                  <td>
                    <div className="textBodyTitle">Bé Tập Tô Phát Triển Tư Duy - Câu Đố Về Động Vật Trên Cạn</div>
                  </td>
                  <td>
                    <div className="textBody">2</div>
                  </td>
                  <td>
                    <div className="textBodyPrice">120.000VND</div>
                  </td>
                  <td>
                    <div className="textBodyIcon">
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </td>
                </tr>
              </CartBody>
            </CartTable>
          </CartContainer>

          <TotalContainer>
            <TotalText>
              <FontAwesomeIcon icon={faCartShopping} className="text-base mr-3" />
              Thành tiền:
            </TotalText>
            <TotalPrice>
              400.000VND
            </TotalPrice>
          </TotalContainer>
        </CartColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form action={formAction} method={formMethod}>
              <Input type="email" name="email" placeholder="Địa chỉ Email" />
              <Input type="text" name="name" placeholder="Tên người nhận" />
              <Input type="number" name="phoneNumber" placeholder="Số điện thoại" />
              <Input type="text" name="address" placeholder="Địa chỉ nhận hàng" />
              {/* <Textarea name="message" placeholder="Ghi che" /> */}
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
    </AnimationRevealPage>
  );
};
