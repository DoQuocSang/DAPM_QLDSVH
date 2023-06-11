import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import MainFeature1 from "components/user/features/TwoColNormal.js";
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature3 from "components/features/TwoColSingleFeatureWithStats2.js";
import Features from "components/user/features/ThreeColSimple.js";
// import Features from "components/features/ThreeColWithSideImage.js";
import TeamCardGrid from "components/user/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <MainFeature1
        subheading={<Subheading>FAHASA NHÀ PHÂN PHỐI SÁCH CHUYÊN NGHIỆP</Subheading>}
        heading="Hệ thống nhà sách FAHASA rộng khắp trên toàn quốc"
        description={"Công ty FAHASA chuyên kinh doanh: sách quốc văn, ngoại văn, văn hóa phẩm, văn phòng phẩm, dụng cụ học tập, quà lưu niệm, đồ chơi dành cho trẻ em… Một số Nhà sách trực thuộc Công ty FAHASA còn kinh doanh các mặt hàng siêu thị như: hàng tiêu dùng, hàng gia dụng, hóa  mỹ phẩm… \n Mạng lưới phát hành của Công ty FAHASA rộng khắp trên toàn quốc, gồm 5 Trung tâm sách, 1 Xí nghiệp in và với gần 60 Nhà sách trải dọc khắp các tỉnh thành trên cả nước."}
        imageSrc="https://gioitreviet.vn/wp-content/uploads/2022/06/z3505925975391_93491a96b156ea9a5bf830858a16100f-2048x1536.jpg"
      />
      <MainFeature1
        subheading={<Subheading>SỨ MỆNH CỦA FAHASA</Subheading>}
        heading="Mang tri thức và văn hóa đọc đến với mọi nhà"
        description={"FAHASA là thương hiệu hàng đầu trong ngành Phát hành sách Việt Nam, ngay từ thời bao cấp cho đến thời kỳ kinh tế thị trường, đổi mới, hội nhập quốc tế, Công ty FAHASA luôn khẳng định vị thế đầu ngành và được đánh giá cao trong quá trình xây dựng đời sống văn hóa, trước hết là văn hóa đọc của nước nhà. \n Hiện nay, Công ty FAHASA đã và đang ngày càng nỗ lực hơn trong hoạt động sản xuất kinh doanh, tiếp tục góp phần vào sự nghiệp phát triển “văn hóa đọc”, làm cho những giá trị vĩnh hằng của sách ngày càng thấm sâu vào đời sống văn hóa tinh thần của xã hội, nhằm góp phần tích cực, đáp ứng yêu cầu nâng cao dân trí, bồi dưỡng nhân tài và nguồn nhân lực cho sự nghiệp công nghiệp hóa, hiện đại hóa đất nước."}
        imageSrc="https://gioitreviet.vn/wp-content/uploads/2022/06/z3505925956315_c13b82c8f528b494fd334c40bc1367ba-2048x1536.jpg"
        textOnLeft={false}
      />
      <Features
        subheading={<Subheading>Phương châm hoạt động</Subheading>}
        heading="Đây là 3 tiêu chí đi đầu của Fahasa"
        description="Với phương châm phục vụ quý khách ngày càng tốt hơn, Công ty FAHASA sẽ nỗ lực và phấn đấu hơn nữa để mang đến cho bạn đọc nhiều sách hay, sách tốt"
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Hỗ trợ tận tâm",
            description: "Fahasa luôn đặt khách hàng lên hàng đầu và sẵn sàng giải đáp mọi thắc mắc của khách hàng"
          },
          {
            imageSrc: ShieldIconImage,
            title: "Nguồn nhân lực",
            description: "Để xây dựng Thương hiệu mạnh, Fahasa tập trung vào chiến lược phát triển nguồn nhân lực - mấu chốt của mọi sự thành công."
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Hướng đến người dùng",
            description: "Với sứ mệnh mang tri thức đến với mọi nhà, Fahasa cam kết sẽ đem lại những sản phẩm có chất lượng tốt nhất cho khách hàng"
          },
        ]}
        linkText=""
      />
      <TeamCardGrid 
        subheading={<Subheading>Đội ngũ của chúng tôi</Subheading>}
        heading="3 thành viên chủ chốt của Fahasa"
        description="Dưới đây là những người đã sáng lập nên Fahasa và có những đóng góp rất lớn vào sự nghiệp phát triển của công ty, không có họ Fahasa sẽ không đứng ở vị trí ngày hôm nay"
      />
    </AnimationRevealPage>
  );
};
