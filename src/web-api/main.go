package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

//======================== LoaiDiSan
// `id` bigint unsigned NOT NULL AUTO_INCREMENT,
// `TenLoai` varchar(255) DEFAULT NULL,
// `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
// `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,

type LoaiDiSan struct {
	Id        int        `json:"Id"`
	TenLoai   string     `json:"TenLoai"`
	CreatedAt *time.Time `json:"created_at"`
	UpdateAt  *time.Time `json:"update_at"`
}

type LoaiDiSan_Creation struct {
	Id      int    `json:"-" gorm:"column:Id;`
	TenLoai string `json:"TenLoai" gorm:"column:TenLoai;"`
}

func (LoaiDiSan_Creation) TableName() string {
	return "LoaiDiSan"
}

//======================== DiSanVanHoa
// `id` bigint unsigned NOT NULL AUTO_INCREMENT,
// `TenDiSan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
// `IdDiSan` int DEFAULT NULL,
// `MoTa` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
// `HinhAnh` json DEFAULT NULL,
// `ThoiGian` datetime DEFAULT NULL,
// `DiaDiem` varchar(255) DEFAULT NULL,
// `TinhTrang` enum('DangSuaChua','CanSuaChua','BinhThuong') DEFAULT 'BinhThuong',
// `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
// `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

type DiSanVanHoa struct {
	Id        int        `json:"Id"`
	TenDiSan  string     `json:"TenDiSan"`
	IdDiSan   int        `json:"IdDiSan"`
	MoTa      string     `json:"MoTa"`
	DiaDiem   string     `json:"DiaDiem"`
	ThoiGian  time.Time  `json:"ThoiGian"`
	TinhTrang string     `json:"TinhTrang"`
	CreatedAt *time.Time `json:"created_at"`
	UpdateAt  *time.Time `json:"update_at"`
}

type DiSanVanHoa_Creation struct {
	TenDiSan  string    `json:"TenDiSan"`
	IdDiSan   int       `json:"IdDiSan"`
	MoTa      string    `json:"MoTa"`
	DiaDiem   string    `json:"DiaDiem"`
	ThoiGian  time.Time `json:"ThoiGian"`
	TinhTrang string    `json:"TinhTrang"`
}

func main() {
	//=================================================== Kết nối db
	// dsn := os.Getenv("DB_CONN_STR")
	DB_CONN_STR := "root:my-secret-pw@tcp(127.0.0.1:3306)/QLDSVH?charset=utf8mb4&parseTime=True&loc=Local"
	dsn := DB_CONN_STR
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		//Log lỗi và thoát chương trình
		log.Fatalln(err)
	}

	fmt.Println(db)

	//=================================================== Khởi tạo
	now := time.Now().UTC()

	item := LoaiDiSan{
		Id:        1,
		TenLoai:   "Di sản văn hóa phi vật thể",
		CreatedAt: &now,
		UpdateAt:  &now,
	}

	// //=================================================== Chuyển struct thành json
	// jsonData, err := json.Marshal(item)

	// if err != nil {
	// 	fmt.Println(err)
	// 	return
	// }

	// fmt.Println(string(jsonData))

	// //=================================================== Chuyển từ json về struct
	// jsonStr := `{"Id":1,"TenLoai":"Di sản văn hóa phi vật thể","created_at":"2023-04-24T21:00:42.3242677Z","update_at":null}`

	// var item2 LoaiDiSan

	// if err := json.Unmarshal([]byte(jsonStr), &item2); err != nil {
	// 	fmt.Println(err)
	// 	return
	// }

	// fmt.Println(item2)

	//=================================================== Http server
	r := gin.Default()

	//CRUD: create, read, update, delete
	// POST/v1/loaidisan -> tạo item
	// GET/v1/loaidisan/?page=1 -> lấy danh sách
	// GET/v1/loaidisan/:id -> Lấy chi tiết item
	// PUT/v1/loaidisan/:id -> Update item
	// DELETE/v1/loaidisan/:id -> Xóa item

	v1 := r.Group("/v1")
	{
		LoaiDiSan := v1.Group("/loai-di-san")
		{
			LoaiDiSan.POST("", Create_LoaiDiSan(db))
			LoaiDiSan.GET("")
			LoaiDiSan.GET("/:id")
			LoaiDiSan.PATCH("/:id")
			LoaiDiSan.DELETE("/:id")
		}
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": item,
		})
	})

	r.Run(":3000") // 0.0.0.0:8080 (for windows "localhost:8080")
}

func Create_LoaiDiSan(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data LoaiDiSan_Creation

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := db.Create(&data).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusBadRequest, gin.H{
			"data": data.Id,
		})
	}
}
