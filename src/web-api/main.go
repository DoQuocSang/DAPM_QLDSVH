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

//======================== HeritageType
// `id` bigint unsigned NOT NULL AUTO_INCREMENT,
// `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
// `UrlSlug` text,
// `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
// `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,

type HeritageType struct {
	Id        int        `json:"id" gorm:"column:id"`
	Name      string     `json:"Name" gorm:"column:Name"`
	UrlSlug   string     `json:"UrlSlug" gorm:"column:UrlSlug"`
	CreatedAt *time.Time `json:"created_at" gorm:"column:created_at"`
	UpdateAt  *time.Time `json:"updated_at" gorm:"column:updated_at"`
}

func (HeritageType) TableName() string {
	return "HeritageType"
}

type HeritageType_Creation struct {
	Id      int    `json:"-" gorm:"column:id;"`
	Name    string `json:"Name" gorm:"column:Name"`
	UrlSlug string `json:"UrlSlug" gorm:"column:UrlSlug"`
}

func (HeritageType_Creation) TableName() string {
	return HeritageType{}.TableName()
}

type HeritageType_Update struct {
	Name    string `json:"Name" gorm:"column:Name"`
	UrlSlug string `json:"UrlSlug" gorm:"column:UrlSlug"`
}

func (HeritageType_Update) TableName() string {
	return HeritageType{}.TableName()
}

//======================== Heritage
// `id` bigint unsigned NOT NULL AUTO_INCREMENT,
// `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
// `IdHeritageType` int DEFAULT NULL,
// `Description` text,
// `Image` json DEFAULT NULL,
// `Time` datetime DEFAULT NULL,
// `Location` varchar(255) DEFAULT NULL,
// `Status` enum('DangSuaChua','CanSuaChua','BinhThuong') DEFAULT 'BinhThuong',
// `UrlSlug` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
// `ShortDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
// `ImageUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
// `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
// `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,

type Heritage struct {
	Id               int        `json:"id" gorm:"column:id;"`
	Name             string     `json:"Name" gorm:"column:Name;"`
	IdHeritageType   int        `json:"IdHeritageType" gorm:"column:IdHeritageType;"`
	Description      string     `json:"Description" gorm:"column:Description;"`
	ShortDescription string     `json:"ShortDescription" gorm:"column:ShortDescription;"`
	Location         string     `json:"Location" gorm:"column:Location;"`
	ImageUrl         string     `json:"ImageUrl" gorm:"column:ImageUrl;"`
	UrlSlug          string     `json:"UrlSlug" gorm:"column:UrlSlug;"`
	Time             *time.Time `json:"Time" gorm:"column:Time;"`
	Status           string     `json:"Status" gorm:"column:Status;"`
	CreatedAt        *time.Time `json:"created_at" gorm:"column:created_at;"`
	UpdateAt         *time.Time `json:"updated_at" gorm:"column:updated_at;"`
}

func (Heritage) TableName() string {
	return "Heritage"
}

type Heritage_Creation struct {
	Id               int        `json:"id" gorm:"column:id;"`
	Name             string     `json:"Name" gorm:"column:Name;"`
	IdHeritageType   int        `json:"IdHeritageType" gorm:"column:IdHeritageType;"`
	Description      string     `json:"Description" gorm:"column:Description;"`
	ShortDescription string     `json:"ShortDescription" gorm:"column:ShortDescription;"`
	Location         string     `json:"Location" gorm:"column:Location;"`
	ImageUrl         string     `json:"ImageUrl" gorm:"column:ImageUrl;"`
	UrlSlug          string     `json:"UrlSlug" gorm:"column:UrlSlug;"`
	Time             *time.Time `json:"Time" gorm:"column:Time;"`
}

func (Heritage_Creation) TableName() string {
	return Heritage{}.TableName()
}

type Heritage_Update struct {
	Name             string     `json:"Name" gorm:"column:Name;"`
	IdHeritageType   int        `json:"IdHeritageType" gorm:"column:IdHeritageType;"`
	Description      string     `json:"Description" gorm:"column:Description;"`
	ShortDescription string     `json:"ShortDescription" gorm:"column:ShortDescription;"`
	Location         string     `json:"Location" gorm:"column:Location;"`
	ImageUrl         string     `json:"ImageUrl" gorm:"column:ImageUrl;"`
	UrlSlug          string     `json:"UrlSlug" gorm:"column:UrlSlug;"`
	Time             *time.Time `json:"Time" gorm:"column:Time;"`
	Status           string     `json:"Status" gorm:"column:Status;"`
}

func (Heritage_Update) TableName() string {
	return Heritage{}.TableName()
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
	r.Use(addCorsHeaders())

	//CRUD: create, read, update, delete
	// POST/v1/loaidisan -> tạo item
	// GET/v1/loaidisan/?page=1 -> lấy danh sách
	// GET/v1/loaidisan/:id -> Lấy chi tiết item
	// PUT/v1/loaidisan/:id -> Update item
	// DELETE/v1/loaidisan/:id -> Xóa item

	v1 := r.Group("/v1")
	{
		HeritageType := v1.Group("/heritage-type")
		{
			HeritageType.POST("", Create_HeritageType(db))
			HeritageType.GET("", List_HeritageType(db))
			HeritageType.GET("/:id", Get_HeritageType(db))
			HeritageType.PATCH("/:id", Update_HeritageType(db))
			HeritageType.DELETE("/:id", Delete_HeritageType(db))
		}

		Heritage := v1.Group("/heritage")
		{
			Heritage.POST("", Create_Heritage(db))
			Heritage.GET("", List_Heritage(db))
			Heritage.GET("/:id", Get_Heritage(db))
			Heritage.PATCH("/:id", Update_Heritage(db))
			Heritage.DELETE("/:id", Delete_Heritage(db))
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

// ======================== HeritageType
func Create_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data HeritageType_Creation

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

func Get_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data HeritageType

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

func Update_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data HeritageType_Update

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

func Delete_HeritageType(db *gorm.DB) func(*gin.Context) {
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
		if err := db.Table(HeritageType{}.TableName()).Where("Id = ?", id).Delete(nil).Error; err != nil {
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

func List_HeritageType(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		paging.Process()

		var result []HeritageType

		if err := db.Table(HeritageType{}.TableName()).Count(&paging.Total).Error; err != nil {
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
func Create_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data Heritage_Creation

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

func Get_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data Heritage

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

func Update_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var data Heritage_Update

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

func Delete_Heritage(db *gorm.DB) func(*gin.Context) {
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
		if err := db.Table(Heritage{}.TableName()).Where("Id = ?", id).Delete(nil).Error; err != nil {
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

func List_Heritage(db *gorm.DB) func(*gin.Context) {
	return func(c *gin.Context) {
		var paging Paging

		if err := c.ShouldBind(&paging); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})

			return
		}

		paging.Process()

		var result []Heritage

		if err := db.Table(Heritage{}.TableName()).Count(&paging.Total).Error; err != nil {
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

func addCorsHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
