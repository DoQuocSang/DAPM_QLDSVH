/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `DiSanVanHoa` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `TenDiSan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `IdDiSan` int DEFAULT NULL,
  `MoTa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `HinhAnh` json DEFAULT NULL,
  `ThoiGian` datetime DEFAULT NULL,
  `DiaDiem` varchar(255) DEFAULT NULL,
  `TinhTrang` enum('DangSuaChua','CanSuaChua','BinhThuong') DEFAULT 'BinhThuong',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiDiSan` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `TenLoai` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `DiSanVanHoa` (`id`, `TenDiSan`, `IdDiSan`, `MoTa`, `HinhAnh`, `ThoiGian`, `DiaDiem`, `TinhTrang`, `created_at`, `updated_at`) VALUES
(1, 'Quần thể di tích Cố đô Huế', 1, 'Nằm dọc hai bên bờ sông Hương và một vài vùng phụ cận thuộc tỉnh Thừa Thiên Huế, Quần thể di tích Cố đô Huế từng là kinh đô của Việt Nam từ năm 1802 – 1945. Ngày 11/12/1993, Quần thể di tích Cố đô Huế được UNESCO ghi danh vào Danh sách Di sản Văn hóa Thế giới với giá trị nổi bật toàn cầu biểu trưng cho sự nổi bật về uy quyền của một đế chế phong kiến đã mất của Việt Nam vào thời kỳ hưng thịnh nhất của nó đầu thế kỷ XIX – một điển hình nổi bật của Kinh đô phong kiến phương Đông.', NULL, '1993-12-11 00:00:00', 'Thừa Thiên Huế', 'BinhThuong', '2023-04-24 09:35:44', '2023-04-24 09:47:49');
INSERT INTO `DiSanVanHoa` (`id`, `TenDiSan`, `IdDiSan`, `MoTa`, `HinhAnh`, `ThoiGian`, `DiaDiem`, `TinhTrang`, `created_at`, `updated_at`) VALUES
(2, 'Khu di tích Thánh địa Mỹ Sơn', 1, 'Nằm ở tỉnh Quảng Nam, Thánh địa Mỹ Sơn là tổ hợp nhiều đền đài Chăm Pa, đây từng là nơi tổ chức cúng tế và là nơi tập trung lăng mộ của các vị hoàng thân quốc thích của Vương Triều Chăm Pa trong suốt giai đoạn từ thế kỷ VII – XIII. Khu di tích Thánh địa Mỹ Sơn được UNESCO ghi danh vào Danh sách Di sản Văn hóa Thế giới ngày 1/12/1999 với tiêu chí: điển hình nổi bật về sự giao lưu văn hóa với sự hội nhập văn hóa bản địa, phản ánh sinh động tiến trình phát triển của lịch sử văn hóa Chăm Pa trong lịch sử văn hóa Đông Nam Á.', NULL, '1999-12-01 00:00:00', 'Quảng Nam', 'CanSuaChua', '2023-04-24 09:35:44', '2023-04-24 09:48:42');
INSERT INTO `DiSanVanHoa` (`id`, `TenDiSan`, `IdDiSan`, `MoTa`, `HinhAnh`, `ThoiGian`, `DiaDiem`, `TinhTrang`, `created_at`, `updated_at`) VALUES
(3, 'Đô thị cổ Hội An', 1, 'Là một đô thị cổ của người Việt, Hội An nằm ở vùng hạ lưu sông Thu Bồn thuộc tỉnh Quảng Nam. Nơi đây còn được biết đến là một thương cảng quốc tế được hình thành vào thế kỷ XVI và đặc biệt phát triển khoảng thế kỷ XVII – XVIII. Đô thị cổ Hội An được UNESCO ghi danh vào danh sách Di sản Văn hóa Thế giới ngày 1/12/1999 với giá trị nổi bật toàn cầu về một sự biểu thị vật chất nổi bật của sự hòa trộn các nền văn hóa vượt thời gian tại một thương cảng quốc tế, là một điển hình nổi bật về bảo tồn một thương cảng châu Á cổ truyền.', NULL, '1999-12-01 00:00:00', 'Quảng Nam', 'DangSuaChua', '2023-04-24 09:35:44', '2023-04-24 09:48:42');
INSERT INTO `DiSanVanHoa` (`id`, `TenDiSan`, `IdDiSan`, `MoTa`, `HinhAnh`, `ThoiGian`, `DiaDiem`, `TinhTrang`, `created_at`, `updated_at`) VALUES
(4, 'Vườn Quốc gia Phong Nha – Kẻ Bàng', 1, 'Với diện tích 123.326ha nằm trong vùng sinh thái bắc Trường Sơn, vườn Quốc gia Phong Nha – Kẻ Bàng là một trong những mẫu hình riêng biệt và đẹp nhất về kiến tạo carxtơ phức tạp ở Đông Nam Á, là nơi hội tụ những giá trị về địa chất, địa mạo, khí hậu, sinh học, cảnh quan và văn hóa cũng như lịch sử độc đáo. Phong Nha – Kẻ Bàng hai lần được UNESCO công nhận là di sản thiên nhiên thế giới, giá trị toàn cầu về địa chất, địa mạo (năm 2003), giá trị về hệ sinh thái và đa dạng sinh học (năm 2015).', NULL, '2015-07-03 00:00:00', 'Quảng Bình', 'BinhThuong', '2023-04-24 09:35:44', '2023-04-24 09:47:49'),
(5, 'Hoàng Thành Thăng Long', 1, 'Hoàng Thành Thăng Long là quần thể di tích gắn với lịch sử kinh thành Thăng Long Hà Nội. Công trình kiến trức đồ sộ này được các triều vua (Lý – Trần – Lê) xây dựng trong nhiều giai đoạn lịch sử và trở thành di tích quan trọng bậc nhất trong hệ thống các di tích Việt Nam. Ngày 1/8/2010, Hoàng Thành Thăng Long đã được UNESCO công nhận là di sản văn hóa thế giới. Những giá trị nổi bật toàn cầu của khu di sản này được ghi nhận bởi 3 đặc điểm nổi bật: chiều dài lịch sử văn hóa suốt 13 thế kỷ, tính liên tục của di sản với tư cách là một trung tâm quyền lực, và các tầng di tích di vật đa dạng, phong phú, sinh động.', NULL, '2010-08-01 00:00:00', 'Hà Nội', 'BinhThuong', '2023-04-24 09:35:44', '2023-04-24 09:47:49'),
(8, 'Demo', 1, 'Demo', NULL, '2050-04-26 07:00:00', 'Demo', 'BinhThuong', '2023-04-26 05:11:48', '2023-04-26 05:11:48'),
(10, 'Đã cập nhật', 2, 'Đã cập nhật', NULL, '2050-04-26 07:00:00', 'Đã cập nhật', 'DangSuaChua', '2023-04-26 05:15:03', '2023-04-26 05:27:48');

INSERT INTO `LoaiDiSan` (`id`, `TenLoai`, `created_at`, `updated_at`) VALUES
(1, 'Di sản văn hóa vật thể', '2023-04-24 09:59:24', '2023-04-24 09:59:24');
INSERT INTO `LoaiDiSan` (`id`, `TenLoai`, `created_at`, `updated_at`) VALUES
(2, 'Di sản văn hóa phi vật thể', '2023-04-24 09:59:24', '2023-04-24 09:59:24');
INSERT INTO `LoaiDiSan` (`id`, `TenLoai`, `created_at`, `updated_at`) VALUES
(3, 'Chưa xác định', '2023-04-24 23:13:58', '2023-04-24 23:13:58');
INSERT INTO `LoaiDiSan` (`id`, `TenLoai`, `created_at`, `updated_at`) VALUES
(4, 'Cần xem xét', '2023-04-24 23:18:05', '2023-04-24 23:18:05');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;