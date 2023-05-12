import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/user/misc/Headings.js";

import defaultCardImage from "images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomizeIconImage from "images/customize-icon.svg";
import FastIconImage from "images/fast-icon.svg";
import ReliableIconImage from "images/reliable-icon.svg";
import SimpleIconImage from "images/simple-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";



const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-primary-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const CustomFontAwesomeIcon = styled.div`
${tw`text-primary-500 text-2xl w-8 leading-8`}
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;



export default () => {
  const cards = [
    {
      imageSrc: faShield,
      title: "Uy tín",
      description: "Fahasa đảm bảo 100% những cuốn sách của mình đêu là hàng chính hãng"
    },
    {
      imageSrc: faHeadset,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ của chúng tôi luôn thường trực để hỗ trợ khách hàng"
    },
    {
      imageSrc: faRotate,
      title: "Đổi trả hàng",
      description: "Thoải mái đổi trả hàng trong vòng 14 ngày nếu có hư hỏng do phía Fahasa"
    },
    {
      imageSrc: faTruck,
      title: "Vận chuyển toàn quốc",
      description: "Bạn hoàn toàn có thể đặt mua sách trên Website và Fahasa sẽ vận chuyển tận nơi cho bạn"
    },
    {
      imageSrc: faSackDollar,
      title: "Ưu đãi hấp dẫn",
      description: "Fahasa thường xuyên có các đợt giảm giá sách để dễ dàng tiếp cận người đọc hơn"
    },
    {
      imageSrc: faMoneyCheckDollar,
      title: "Phương thức thanh toán",
      description: "Đa dạng các phương thức thanh toán trong việc mua sách"
    }
  ];

  return (
    <Container>
      <ThreeColumnContainer>
        <Heading>Nét nổi bật của <span tw="text-primary-500">Fahasa</span></Heading>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <CustomFontAwesomeIcon>
                    <FontAwesomeIcon icon={card.imageSrc}/>
                </CustomFontAwesomeIcon>
                {/* <img src={card.imageSrc || defaultCardImage} alt="" /> */}
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel."}
                </p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
