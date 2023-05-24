/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `Heritage`;
CREATE TABLE `Heritage` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IdHeritageType` int DEFAULT NULL,
  `Description` text,
  `Image` json DEFAULT NULL,
  `Time` datetime DEFAULT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Status` enum('Đang bảo tồn','Bị đe dọa','Nguy cơ biến mất') DEFAULT 'Đang bảo tồn',
  `UrlSlug` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ShortDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ImageUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `HeritageType`;
CREATE TABLE `HeritageType` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UrlSlug` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Heritage` (`id`, `Name`, `IdHeritageType`, `Description`, `Image`, `Time`, `Location`, `Status`, `UrlSlug`, `ShortDescription`, `ImageUrl`, `created_at`, `updated_at`) VALUES
(1, 'Quần thể di tích Cố đô Huế', 1, 'Nằm dọc hai bên bờ sông Hương và một vài vùng phụ cận thuộc tỉnh Thừa Thiên Huế, Quần thể di tích Cố đô Huế từng là kinh đô của Việt Nam từ năm 1802 – 1945. Ngày 11/12/1993, Quần thể di tích Cố đô Huế được UNESCO ghi danh vào Danh sách Di sản Văn hóa Thế giới với giá trị nổi bật toàn cầu biểu trưng cho sự nổi bật về uy quyền của một đế chế phong kiến đã mất của Việt Nam vào thời kỳ hưng thịnh nhất của nó đầu thế kỷ XIX – một điển hình nổi bật của Kinh đô phong kiến phương Đông.', NULL, '1993-12-11 00:00:00', 'Thừa Thiên Huế', 'Đang bảo tồn', 'quan-the-di-tich-co-do-hue', 'Nằm dọc hai bên bờ sông Hương và một vài vùng phụ cận thuộc tỉnh Thừa Thiên Huế, Quần thể di tích Cố đô Huế từng là kinh đô của Việt Nam từ năm 1802 – 1945. Ngày 11/12/1993, Quần thể di tích Cố đô Huế được UNESCO ghi danh vào Danh sách Di sản Văn hóa Thế giới với giá trị nổi bật toàn cầu biểu trưng cho sự nổi bật về uy quyền của một đế chế phong kiến đã mất của Việt Nam vào thời kỳ hưng thịnh nhất của nó đầu thế kỷ XIX – một điển hình nổi bật của Kinh đô phong kiến phương Đông.', 'https://khamphahue.com.vn/Portals/0/DiSan/DiSanVatThe/QuanTheDiTichCoDo/QuanTheDiTichCoDoHue-1.jpg?ver=2022-10-05-135441-743', '2023-04-24 09:35:44', '2023-04-24 09:47:49');
INSERT INTO `Heritage` (`id`, `Name`, `IdHeritageType`, `Description`, `Image`, `Time`, `Location`, `Status`, `UrlSlug`, `ShortDescription`, `ImageUrl`, `created_at`, `updated_at`) VALUES
(2, 'Khu di tích Thánh địa Mỹ Sơn', 1, 'Nằm ở tỉnh Quảng Nam, Thánh địa Mỹ Sơn là tổ hợp nhiều đền đài Chăm Pa, đây từng là nơi tổ chức cúng tế và là nơi tập trung lăng mộ của các vị hoàng thân quốc thích của Vương Triều Chăm Pa trong suốt giai đoạn từ thế kỷ VII – XIII. Khu di tích Thánh địa Mỹ Sơn được UNESCO ghi danh vào Danh sách Di sản Văn hóa Thế giới ngày 1/12/1999 với tiêu chí: điển hình nổi bật về sự giao lưu văn hóa với sự hội nhập văn hóa bản địa, phản ánh sinh động tiến trình phát triển của lịch sử văn hóa Chăm Pa trong lịch sử văn hóa Đông Nam Á.', NULL, '1993-12-11 00:00:00', 'Quảng Nam', 'Đang bảo tồn', 'khu-di-tich-thanh-dia-my-son', 'Nằm ở tỉnh Quảng Nam, Thánh địa Mỹ Sơn là tổ hợp nhiều đền đài Chăm Pa, đây từng là nơi tổ chức cúng tế và là nơi tập trung lăng mộ của các vị hoàng thân quốc thích của Vương Triều Chăm Pa trong suốt giai đoạn từ thế kỷ VII – XIII. Khu di tích Thánh địa Mỹ Sơn được UNESCO ghi danh vào Danh sách Di sản Văn hóa Thế giới ngày 1/12/1999 với tiêu chí: điển hình nổi bật về sự giao lưu văn hóa với sự hội nhập văn hóa bản địa, phản ánh sinh động tiến trình phát triển của lịch sử văn hóa Chăm Pa trong lịch sử văn hóa Đông Nam Á.', 'https://static.vinwonders.com/2022/03/thanh-dia-my-son-1.jpeg', '2023-04-24 09:35:44', '2023-04-24 09:47:49');
INSERT INTO `Heritage` (`id`, `Name`, `IdHeritageType`, `Description`, `Image`, `Time`, `Location`, `Status`, `UrlSlug`, `ShortDescription`, `ImageUrl`, `created_at`, `updated_at`) VALUES
(3, 'Đô thị cổ Hội An', 1, 'Là một đô thị cổ của người Việt, Hội An nằm ở vùng hạ lưu sông Thu Bồn thuộc tỉnh Quảng Nam. Nơi đây còn được biết đến là một thương cảng quốc tế được hình thành vào thế kỷ XVI và đặc biệt phát triển khoảng thế kỷ XVII – XVIII. Đô thị cổ Hội An được UNESCO ghi danh vào danh sách Di sản Văn hóa Thế giới ngày 1/12/1999 với giá trị nổi bật toàn cầu về một sự biểu thị vật chất nổi bật của sự hòa trộn các nền văn hóa vượt thời gian tại một thương cảng quốc tế, là một điển hình nổi bật về bảo tồn một thương cảng châu Á cổ truyền.', NULL, '1993-12-11 00:00:00', 'Quảng Nam', 'Đang bảo tồn', 'do-thi-co-hoi-an', 'Là một đô thị cổ của người Việt, Hội An nằm ở vùng hạ lưu sông Thu Bồn thuộc tỉnh Quảng Nam. Nơi đây còn được biết đến là một thương cảng quốc tế được hình thành vào thế kỷ XVI và đặc biệt phát triển khoảng thế kỷ XVII – XVIII. Đô thị cổ Hội An được UNESCO ghi danh vào danh sách Di sản Văn hóa Thế giới ngày 1/12/1999 với giá trị nổi bật toàn cầu về một sự biểu thị vật chất nổi bật của sự hòa trộn các nền văn hóa vượt thời gian tại một thương cảng quốc tế, là một điển hình nổi bật về bảo tồn một thương cảng châu Á cổ truyền.', 'https://hoianheritage.net/uploads/bao-chi/2020_10/3142_hoiantown.jpg', '2023-04-24 09:35:44', '2023-04-24 09:47:49');
INSERT INTO `Heritage` (`id`, `Name`, `IdHeritageType`, `Description`, `Image`, `Time`, `Location`, `Status`, `UrlSlug`, `ShortDescription`, `ImageUrl`, `created_at`, `updated_at`) VALUES
(4, 'Vườn Quốc gia Phong Nha – Kẻ Bàng', 1, 'Với diện tích 123.326ha nằm trong vùng sinh thái bắc Trường Sơn, vườn Quốc gia Phong Nha – Kẻ Bàng là một trong những mẫu hình riêng biệt và đẹp nhất về kiến tạo carxtơ phức tạp ở Đông Nam Á, là nơi hội tụ những giá trị về địa chất, địa mạo, khí hậu, sinh học, cảnh quan và văn hóa cũng như lịch sử độc đáo. Phong Nha – Kẻ Bàng hai lần được UNESCO công nhận là di sản thiên nhiên thế giới, giá trị toàn cầu về địa chất, địa mạo (năm 2003), giá trị về hệ sinh thái và đa dạng sinh học (năm 2015).', NULL, '2015-07-03 00:00:00', 'Quảng Bình', 'Đang bảo tồn', 'vuon-quoc-gia-phong-nha-ke-bang', 'Với diện tích 123.326ha nằm trong vùng sinh thái bắc Trường Sơn, vườn Quốc gia Phong Nha – Kẻ Bàng là một trong những mẫu hình riêng biệt và đẹp nhất về kiến tạo carxtơ phức tạp ở Đông Nam Á, là nơi hội tụ những giá trị về địa chất, địa mạo, khí hậu, sinh học, cảnh quan và văn hóa cũng như lịch sử độc đáo. Phong Nha – Kẻ Bàng hai lần được UNESCO công nhận là di sản thiên nhiên thế giới, giá trị toàn cầu về địa chất, địa mạo (năm 2003), giá trị về hệ sinh thái và đa dạng sinh học (năm 2015).', 'https://www.quangbinhtravel.vn/wp-content/uploads/2016/01/du-lich-phong-nha-ke-bang.jpg', '2023-04-24 09:35:44', '2023-04-24 09:47:49');

INSERT INTO `HeritageType` (`id`, `Name`, `Description`, `UrlSlug`, `created_at`, `updated_at`) VALUES
(1, 'Di sản văn hóa vật thể', 'Là sản phẩm vật chất có giá trị lịch sử, văn hoá, bao gồm các di tích lịch sử văn hoá, danh lam thắng cảnh, các di vật cổ vật, bảo vật quốc gia', 'di-san-van-hoa-vat-the', '2023-04-24 09:59:24', '2023-04-24 09:59:24');
INSERT INTO `HeritageType` (`id`, `Name`, `Description`, `UrlSlug`, `created_at`, `updated_at`) VALUES
(2, 'Di sản văn hóa phi vật thể', 'Là những sản phẩm tinh thần có giá trị về lịch sử, văn hoá, khoa học được lưu giữ bằng trí nhớ, chữ viết, truyền miệng, truyền nghề, trình diễn và các hình thức lưu giữ, lưu truyền khác', 'di-san-van-hoa-phi-vat-the', '2023-04-24 09:59:24', '2023-04-24 09:59:24');
INSERT INTO `HeritageType` (`id`, `Name`, `Description`, `UrlSlug`, `created_at`, `updated_at`) VALUES
(3, 'Chưa xác định', 'Là nhưng di sản chưa xác định được loại', 'chua-xac-dinh', '2023-04-24 09:59:24', '2023-04-24 09:59:24');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;