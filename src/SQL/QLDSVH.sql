/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BaiViet` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `TieuDe` varchar(255) DEFAULT NULL,
  `NoiDung` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `HinhAnh` json DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Ten` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DiaChi` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `QuyenTruyCap` tinyint(1) DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BaiViet` (`id`, `TieuDe`, `NoiDung`, `HinhAnh`, `create_at`, `update_at`) VALUES
(1, ' Nhã nhạc cung đình Huế', 'Nhã nhạc là âm nhạc cung đình thời phong kiến, được trình diễn trong các dịp triều hội, tế lễ hoặc các sự kiện trọng đại (lễ đăng quang của nhà vua, tiếp đón sứ thần…).', NULL, '2023-04-25 08:34:52', '2023-04-25 08:34:52');
INSERT INTO `BaiViet` (`id`, `TieuDe`, `NoiDung`, `HinhAnh`, `create_at`, `update_at`) VALUES
(2, 'Không gian văn hóa cồng chiêng Tây Nguyên', 'Không gian văn hóa Cồng Chiêng Tây Nguyên trải rộng trên địa bàn năm tỉnh: Kon Tum, Gia Lai, Đắk Lắk, Đắk Nông và Lâm Đồng.\r\n        Không gian văn hóa cồng chiêng Tây Nguyên bao gồm các bộ phận cấu thành như: cồng chiêng, các bản nhạc tấu bằng cồng chiêng, những người chơi cồng chiêng, các lễ hội có sử dụng cồng chiêng, những địa điểm tổ chức các lễ hội đó…', NULL, '2023-04-25 08:35:15', '2023-04-25 08:35:15');
INSERT INTO `BaiViet` (`id`, `TieuDe`, `NoiDung`, `HinhAnh`, `create_at`, `update_at`) VALUES
(3, ' Dân ca quan họ Bắc Ninh', ' Quan họ là những làn điệu dân ca của vùng Đồng bằng Bắc Bộ, tập trung chủ yếu ở vùng Kinh Bắc (Bắc Ninh và Bắc Giang). Đây là hình thức hát đối đáp giữa nam và nữ để biểu lộ tâm tình, ca tụng tình yêu thông qua những câu ca mộc mạc, đằm thắm. Hầu hết các bài Quan họ đều theo thể lục bát hay lục bát biến thể.', NULL, '2023-04-25 08:35:52', '2023-04-25 08:35:52');
INSERT INTO `BaiViet` (`id`, `TieuDe`, `NoiDung`, `HinhAnh`, `create_at`, `update_at`) VALUES
(4, 'Ca trù', 'Ca trù (hay còn gọi là hát ả đào) có vị trí đặc biệt trong kho tàng âm nhạc truyền thống của Việt Nam, gắn liền với lễ hội, phong tục, tín ngưỡng, văn chương, tư tưởng và triết lý sống của người Việt. Loại hình nghệ thuật này rất phổ biến trong đời sống sinh hoạt văn hóa ở Việt Nam từ đầu thế kỷ XX trở về trước.', NULL, '2023-04-25 08:38:53', '2023-04-25 08:38:53'),
(5, 'Hội Gióng ở đền Phù Đổng và đền Sóc', ' Hội Gióng ở đền Phù Đổng và đền Sóc (Hà Nội) gắn với truyền thuyết về một cậu bé được mẹ sinh ra một cách kỳ lạ ở làng Phù Đổng.\r\n	Hội Gióng ở đền Phù Đổng (xã Phù Đổng, huyện Gia Lâm - nơi Thánh Gióng sinh ra) diễn ra từ ngày 7/9 tháng tư Âm lịch. Hội Gióng ở đền Sóc (xã Phù Linh, huyện Sóc Sơn nơi Thánh hóa, cưỡi ngựa về trời) diễn ra từ ngày 6/8 tháng Giêng Âm lịch.', NULL, '2023-04-25 08:38:53', '2023-04-25 08:38:53'),
(7, 'TieuDe update', 'NoiDungMoi1', NULL, '2023-04-26 15:18:40', '2023-04-26 15:21:50');

INSERT INTO `NguoiDung` (`id`, `Ten`, `DiaChi`, `Email`, `MatKhau`, `QuyenTruyCap`, `create_at`, `update_at`) VALUES
(1, 'hoaiTrang', NULL, '2014496@dlu.edu.vn', '1234567', 1, '2023-04-25 08:33:45', '2023-04-25 08:33:45');
INSERT INTO `NguoiDung` (`id`, `Ten`, `DiaChi`, `Email`, `MatKhau`, `QuyenTruyCap`, `create_at`, `update_at`) VALUES
(3, 'tenmoi1', NULL, '2014422@dlu.edu.vn', '1234567', NULL, '2023-04-26 14:40:20', '2023-04-26 14:40:20');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;