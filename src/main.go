package main

import (
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// ======================== PhanTrang
type Paging struct {
	Page  int   `json:"Page" form:"page"`
	Limit int   `json:"Limit" form:"limit"`
	Total int64 `json:"Total" form:"-"`
}

func (p *Paging) Process() {
	if p.Page <= 0 {
		p.Page = 1
	}

	if p.Limit <= 0 || p.Limit >= 100 {
		p.Limit = 10
	}
}

//======================== LoaiDiSan
// `id` bigint unsigned NOT NULL AUTO_INCREMENT,
// `TenLoai` varchar(255) DEFAULT NULL,
// `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
// `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,

type LoaiDiSan struct {
	Id        int        `json:"id" gorm:"column:id"`
	TenLoai   string     `json:"TenLoai" gorm:"column:TenLoai"`
	CreatedAt *time.Time `json:"created_at" gorm:"column:created_at"`
	UpdateAt  *time.Time `json:"updated_at" gorm:"column:updated_at"`
}

func (LoaiDiSan) TableName() string {
	return "LoaiDiSan"
}

type LoaiDiSan_Creation struct {
	Id      int    `json:"-" gorm:"column:id;"`
	TenLoai string `json:"TenLoai" gorm:"column:TenLoai;"`
}

func (LoaiDiSan_Creation) TableName() string {
	return LoaiDiSan{}.TableName()
}

type LoaiDiSan_Update struct {
	TenLoai string `json:"TenLoai" gorm:"column:TenLoai;"`
}

func (LoaiDiSan_Update) TableName() string {
	return LoaiDiSan{}.TableName()
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
	Id        int        `json:"id" gorm:"column:id;"`
	TenDiSan  string     `json:"TenDiSan" gorm:"column:TenDiSan;"`
	IdDiSan   int        `json:"IdDiSan" gorm:"column:IdDiSan;"`
	MoTa      string     `json:"MoTa" gorm:"column:MoTa;"`
	DiaDiem   string     `json:"DiaDiem" gorm:"column:DiaDiem;"`
	ThoiGian  *time.Time `json:"ThoiGian" gorm:"column:ThoiGian;"`
	TinhTrang string     `json:"TinhTrang" gorm:"column:TinhTrang;"`
	CreatedAt *time.Time `json:"created_at" gorm:"column:created_at;"`
	UpdateAt  *time.Time `json:"updated_at" gorm:"column:updated_at;"`
}

func (DiSanVanHoa) TableName() string {
	return "DiSanVanHoa"
}

type DiSanVanHoa_Creation struct {
	Id        int        `json:"-" gorm:"column:id;"`
	TenDiSan  string     `json:"TenDiSan" gorm:"column:TenDiSan;"`
	IdDiSan   int        `json:"IdDiSan" gorm:"column:IdDiSan;"`
	MoTa      string     `json:"MoTa" gorm:"column:MoTa;"`
	DiaDiem   string     `json:"DiaDiem" gorm:"column:DiaDiem;"`
	ThoiGian  *time.Time `json:"ThoiGian" gorm:"column:ThoiGian;"`
	TinhTrang string     `json:"TinhTrang" gorm:"column:TinhTrang;"`
}

func (DiSanVanHoa_Creation) TableName() string {
	return DiSanVanHoa{}.TableName()
}

type DiSanVanHoa_Update struct {
	TenDiSan  string     `json:"TenDiSan" gorm:"column:TenDiSan;"`
	IdDiSan   int        `json:"IdDiSan" gorm:"column:IdDiSan;"`
	MoTa      string     `json:"MoTa" gorm:"column:MoTa;"`
	DiaDiem   string     `json:"DiaDiem" gorm:"column:DiaDiem;"`
	ThoiGian  *time.Time `json:"ThoiGian" gorm:"column:ThoiGian;"`
	TinhTrang string     `json:"TinhTrang" gorm:"column:TinhTrang;"`
}

func (DiSanVanHoa_Update) TableName() string {
	return DiSanVanHoa{}.TableName()
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
	//now := time.Now().UTC()

	// item := LoaiDiSan{
	// 	Id:        1,
	// 	TenLoai:   "Di sản văn hóa phi vật thể",
	// 	CreatedAt: &now,
	// 	UpdateAt:  &now,
	// }

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
			LoaiDiSan.GET("", List_LoaiDiSan(db))
			LoaiDiSan.GET("/:id", Get_LoaiDiSan(db))
			LoaiDiSan.PATCH("/:id", Update_LoaiDiSan(db))
			LoaiDiSan.DELETE("/:id", Delete_LoaiDiSan(db))
		}

		DiSanVanHoa := v1.Group("/di-san-van-hoa")
		{
			DiSanVanHoa.POST("", Create_DiSanVanHoa(db))
			DiSanVanHoa.GET("", List_DiSanVanHoa(db))
			DiSanVanHoa.GET("/:id", Get_DiSanVanHoa(db))
			DiSanVanHoa.PATCH("/:id", Update_DiSanVanHoa(db))
			DiSanVanHoa.DELETE("/:id", Delete_DiSanVanHoa(db))
		}
	}

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Server đang chạy ở port 3000",
			//"message": item,
		})
	})

	r.Run(":3000") // 0.0.0.0:8080 (for windows "localhost:8080")
}

// ======================== Loại di sản
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

		c.JSON(http.StatusOK, gin.H{
			"data id": data.Id,
		})
	}
}

func Get_LoaiDiSan(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data LoaiDiSan

		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		//data.Id = id

		if err := db.Where("Id = ?", id).First(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": data,
		})
	}
}

func Update_LoaiDiSan(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data LoaiDiSan_Update

		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := db.Where("Id = ?", id).Updates(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func Delete_LoaiDiSan(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// // Xóa nhưng ko xóa hẳn dưới db
		// if err := db.Table(LoaiDiSan{}.TableName()).Where("Id = ?", id).Updates(map[string]interface{}{
		// 	"status": "deleted",
		// }).Error; err != nil {
		// 	c.JSON(http.StatusBadRequest, gin.H{
		// 		"error": err.Error(),
		// 	})

		// 	return
		// }

		// Xóa hẳn dưới db
		if err := db.Table(LoaiDiSan{}.TableName()).Where("Id = ?", id).Delete(nil).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func List_LoaiDiSan(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		paging.Process()

		var result []LoaiDiSan

		if err := db.Table(LoaiDiSan{}.TableName()).Count(&paging.Total).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// db = db.Where("status <> ?", "value")

		if err := db.Order("id desc").
			Offset((paging.Page - 1) * paging.Limit).
			Limit(paging.Limit).
			Find(&result).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data":   result,
			"paging": paging,
		})
	}
}

// ======================== Di sản văn hóa
func Create_DiSanVanHoa(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data DiSanVanHoa_Creation

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

		c.JSON(http.StatusOK, gin.H{
			"data id": data.Id,
		})
	}
}

func Get_DiSanVanHoa(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data DiSanVanHoa

		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		//data.Id = id

		if err := db.Where("Id = ?", id).First(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": data,
		})
	}
}

func Update_DiSanVanHoa(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data DiSanVanHoa_Update

		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := c.ShouldBind(&data); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		if err := db.Where("Id = ?", id).Updates(&data).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func Delete_DiSanVanHoa(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		//ascii to int
		id, err := strconv.Atoi(c.Param("id"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// // Xóa nhưng ko xóa hẳn dưới db
		// if err := db.Table(LoaiDiSan{}.TableName()).Where("Id = ?", id).Updates(map[string]interface{}{
		// 	"status": "deleted",
		// }).Error; err != nil {
		// 	c.JSON(http.StatusBadRequest, gin.H{
		// 		"error": err.Error(),
		// 	})

		// 	return
		// }

		// Xóa hẳn dưới db
		if err := db.Table(DiSanVanHoa{}.TableName()).Where("Id = ?", id).Delete(nil).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": true,
		})
	}
}

func List_DiSanVanHoa(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		paging.Process()

		var result []DiSanVanHoa

		if err := db.Table(DiSanVanHoa{}.TableName()).Count(&paging.Total).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		// db = db.Where("status <> ?", "value")

		if err := db.Order("id desc").
			Offset((paging.Page - 1) * paging.Limit).
			Limit(paging.Limit).
			Find(&result).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data":   result,
			"paging": paging,
		})
	}
}
